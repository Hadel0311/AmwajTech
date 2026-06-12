<template>
  <div class="terminal-wrapper" :class="{ 'open': isOpen }">
    <div class="terminal-container glass-effect">
      <div class="terminal-header">
        <div class="window-controls">
          <span class="control close" @click="closeTerminal"></span>
          <span class="control minimize" @click="closeTerminal"></span>
          <span class="control maximize"></span>
        </div>
        <div class="terminal-title">amwaj-tech@server: ~</div>
      </div>
      
      <div class="terminal-body" ref="terminalBody" @click="focusInput">
        <div class="output-history">
          <div v-for="(line, index) in history" :key="index" class="history-line" :class="line.type">
            <span v-if="line.type === 'input'" class="prompt">guest@amwaj:~$</span>
            <span class="content" v-html="line.text"></span>
          </div>
        </div>
        
        <div class="input-line">
          <span class="prompt">guest@amwaj:~$</span>
          <input 
            ref="cmdInput"
            type="text" 
            v-model="currentCommand" 
            @keydown.enter="executeCommand"
            class="cmd-input"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </div>
    </div>
  </div>
  
  <button class="terminal-toggle hover-lift" @click="toggleTerminal" :title="t('nav.terminal') || 'Terminal (Ctrl+`)'">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 17L10 11L4 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 19H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, locale } = useI18n()

const isOpen = ref(false)
const currentCommand = ref('')
const terminalBody = ref<HTMLElement | null>(null)
const cmdInput = ref<HTMLInputElement | null>(null)

interface HistoryLine {
  text: string
  type: 'input' | 'output' | 'error' | 'system'
}

const history = ref<HistoryLine[]>([])

const toggleTerminal = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    focusInput()
  }
}

const closeTerminal = () => {
  isOpen.value = false
}

const focusInput = () => {
  nextTick(() => {
    cmdInput.value?.focus()
  })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
}

const executeCommand = () => {
  const cmd = currentCommand.value.trim()
  if (!cmd) return
  
  history.value.push({ text: cmd, type: 'input' })
  currentCommand.value = ''
  
  processCommand(cmd.toLowerCase())
  scrollToBottom()
}

const processCommand = (cmd: string) => {
  const isAr = locale.value === 'ar'
  switch(cmd) {
    case 'help':
      if (isAr) {
        history.value.push({ text: 'الأوامر المتاحة:', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;about&nbsp;&nbsp;&nbsp;&nbsp;- معلومات عن أمواج تك', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;services&nbsp;- قائمة بخدماتنا الأساسية', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;contact&nbsp;&nbsp;- معلومات الاتصال بنا', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;- مسح سجل الشاشة', type: 'output' })
      } else {
        history.value.push({ text: 'Available commands:', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;about&nbsp;&nbsp;&nbsp;&nbsp;- Learn about Amwaj-Tech', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;services&nbsp;- List our core services', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;contact&nbsp;&nbsp;- Get our contact info', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;clear&nbsp;&nbsp;&nbsp;&nbsp;- Clear terminal history', type: 'output' })
      }
      break
    case 'about':
      if (isAr) {
        history.value.push({ text: 'أمواج تك هي شركة تكنولوجيا رائدة يقع مقرها الرئيسي في عمان، الأردن. نحن متخصصون في تقديم الحلول البرمجية المتطورة، والبنية التحتية القوية للشبكات، واستراتيجيات التحول الرقمي الشاملة.', type: 'output' })
      } else {
        history.value.push({ text: 'Amwaj-Tech is a pioneering technology company headquartered in Amman, Jordan. We specialize in delivering cutting-edge software solutions, robust network infrastructure, and comprehensive digital transformation strategies.', type: 'output' })
      }
      break
    case 'services':
      if (isAr) {
        history.value.push({ text: 'خدماتنا:', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;- أمن الشبكات والحلول الدفاعية', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;- البنية التحتية وحلول مراكز البيانات', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;- تطوير البرمجيات والأنظمة المخصصة للمؤسسات', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;- الخدمات السحابية والخدمات المدارة', type: 'output' })
      } else {
        history.value.push({ text: 'Our Services:', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;- Network Security', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;- Hardware Solutions', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;- Custom Software Development', type: 'output' })
        history.value.push({ text: '&nbsp;&nbsp;- Web Application Development', type: 'output' })
      }
      break
    case 'contact':
      if (isAr) {
        history.value.push({ text: 'البريد الإلكتروني: info@amwaj-tech.com', type: 'output' })
        history.value.push({ text: 'المواقع: عمان (الأردن) ودبي (الإمارات العربية المتحدة)', type: 'output' })
        history.value.push({ text: 'الموقع الإلكتروني: www.amwaj-tech.com', type: 'output' })
      } else {
        history.value.push({ text: 'Email: info@amwaj-tech.com', type: 'output' })
        history.value.push({ text: 'Locations: Amman (Jordan) & Dubai (UAE)', type: 'output' })
        history.value.push({ text: 'Website: www.amwaj-tech.com', type: 'output' })
      }
      break
    case 'clear':
      history.value = [
        { text: isAr ? 'طرفية أمواج تك التفاعلية v1.0.0' : 'Amwaj-Tech Interactive Terminal v1.0.0', type: 'system' }
      ]
      break
    default:
      if (isAr) {
        history.value.push({ text: `لم يتم العثور على الأمر: ${cmd}. اكتب "help" لعرض الأوامر المتاحة.`, type: 'error' })
      } else {
        history.value.push({ text: `Command not found: ${cmd}. Type "help" for a list of commands.`, type: 'error' })
      }
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  // Toggle with Ctrl + `
  if (e.ctrlKey && e.key === '`') {
    e.preventDefault()
    toggleTerminal()
  }
  // Close with Escape if open
  if (e.key === 'Escape' && isOpen.value) {
    closeTerminal()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
  
  // Initialize terminal based on active language
  const isAr = locale.value === 'ar'
  history.value = [
    { text: isAr ? 'طرفية أمواج تك التفاعلية v1.0.0' : 'Amwaj-Tech Interactive Terminal v1.0.0', type: 'system' },
    { text: isAr ? 'اكتب "help" لعرض الأوامر المتاحة.' : 'Type "help" to see available commands.', type: 'system' }
  ]
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.terminal-toggle {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--color-primary-dark, #101a2f);
  border: 1px solid var(--color-accent, #f9b233);
  color: var(--color-accent, #f9b233);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal, 1000);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: all var(--transition-fast, 0.2s ease);
}

.terminal-toggle:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(249, 178, 51, 0.3);
  background: var(--color-primary, #1a2a4a);
}

.terminal-wrapper {
  position: fixed;
  bottom: 84px;
  right: 24px;
  width: 450px;
  height: 350px;
  z-index: var(--z-modal, 1000);
  pointer-events: none;
  opacity: 0;
  transform: translateY(20px) scale(0.95);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: bottom right;
}

.terminal-wrapper.open {
  pointer-events: auto;
  opacity: 1;
  transform: translateY(0) scale(1);
}

.terminal-container {
  width: 100%;
  height: 100%;
  background: rgba(10, 15, 30, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.terminal-header {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px 15px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.window-controls {
  display: flex;
  gap: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
}

.close { background: #ff5f56; }
.minimize { background: #ffbd2e; }
.maximize { background: #27c93f; }

.terminal-title {
  flex: 1;
  text-align: center;
  color: #8892b0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.85rem;
  margin-left: -40px; /* Offset to center despite controls */
}

.terminal-body {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  color: #e6f1ff;
  line-height: 1.5;
}

.history-line {
  margin-bottom: 4px;
  word-break: break-word;
}

.history-line.system { color: #64ffda; }
.history-line.error { color: #ff5f56; }
.history-line.output { color: #a8b2d1; }

.prompt {
  color: #64ffda;
  margin-right: 8px;
}

.input-line {
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.cmd-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #e6f1ff;
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  outline: none;
}

@media (max-width: 768px) {
  .terminal-wrapper {
    width: calc(100vw - 48px);
    right: 24px;
    bottom: 84px;
  }
}
</style>
