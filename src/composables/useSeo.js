// Dependency-free document head manager for SEO meta tags.
// Centralizes title, description, canonical, Open Graph and Twitter tags so
// every route exposes accurate metadata to search engines and crawlers.

const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.amwaj-tech.com').replace(/\/$/, '')
const DEFAULT_IMAGE = `${SITE_URL}/logo.png`

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function buildCanonical(path = '/') {
  const clean = String(path).split('#')[0].split('?')[0] || '/'
  if (clean === '/') return `${SITE_URL}/`
  return `${SITE_URL}${clean.startsWith('/') ? '' : '/'}${clean.replace(/\/$/, '')}`
}

/**
 * Apply SEO metadata to the document head.
 * @param {Object} opts
 * @param {string} opts.title        Full document title.
 * @param {string} opts.description  Meta description.
 * @param {string} [opts.path]       Route path used for canonical / og:url.
 * @param {string} [opts.locale]     'en' | 'ar'.
 * @param {string} [opts.image]      Absolute image URL for social cards.
 * @param {string} [opts.type]       Open Graph type (default 'website').
 * @param {boolean} [opts.index]     Whether crawlers may index the page (default true).
 */
export function applySeo({ title, description, path = '/', locale = 'en', image, type = 'website', index = true } = {}) {
  const canonical = buildCanonical(path)
  const ogLocale = locale === 'ar' ? 'ar_JO' : 'en_US'
  const ogImage = image || DEFAULT_IMAGE

  if (title) document.title = title

  // Standard
  upsertMeta('name', 'description', description)
  upsertMeta('name', 'robots', index ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' : 'noindex, nofollow')
  upsertLink('canonical', canonical)

  // Open Graph
  upsertMeta('property', 'og:title', title)
  upsertMeta('property', 'og:description', description)
  upsertMeta('property', 'og:url', canonical)
  upsertMeta('property', 'og:type', type)
  upsertMeta('property', 'og:image', ogImage)
  upsertMeta('property', 'og:locale', ogLocale)
  upsertMeta('property', 'og:site_name', 'Amwaj Tech')

  // Twitter
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', title)
  upsertMeta('name', 'twitter:description', description)
  upsertMeta('name', 'twitter:image', ogImage)

  // Document language / direction
  if (locale) {
    document.documentElement.lang = locale
  }
}
