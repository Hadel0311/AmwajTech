const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'src', 'i18n', 'locales', 'en.json');
const arPath = path.join(__dirname, 'src', 'i18n', 'locales', 'ar.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const arData = JSON.parse(fs.readFileSync(arPath, 'utf8'));

// Update navigation
enData.nav.careers = "Careers";
arData.nav.careers = "الوظائف";

// Careers content - English
enData.careers = {
  hero: {
    title: "Build Your Future With Amwaj Tech",
    subtitle: "We're always looking for passionate professionals who want to create impactful technology solutions and grow alongside a team committed to excellence.",
    cta: "Explore Opportunities"
  },
  culture: {
    title: "Life at Amwaj Tech",
    subtitle: "We're building more than technology solutions. We're building a team of professionals who learn, grow, and succeed together.",
    cards: {
      collaboration: { title: "Team Collaboration", desc: "Work closely with experts to solve complex challenges." },
      learning: { title: "Learning & Development", desc: "Continuous opportunities to upskill and master new technologies." },
      innovation: { title: "Innovation Mindset", desc: "Contribute to cutting-edge enterprise projects." },
      excellence: { title: "Professional Excellence", desc: "High standards and a commitment to quality in everything we do." }
    }
  },
  highlights: {
    team: { title: "Professional Team", desc: "Experienced specialists delivering technology solutions across multiple industries." },
    projects: { title: "Enterprise Projects", desc: "Contributing to infrastructure, cloud, software, and security initiatives." },
    learning: { title: "Continuous Learning", desc: "Supporting certifications, training, and professional development." },
    culture: { title: "Collaborative Culture", desc: "Encouraging teamwork, innovation, and knowledge sharing." }
  },
  whyJoin: {
    growth: { title: "Professional Growth", desc: "Work on challenging projects that accelerate technical and professional development." },
    learning: { title: "Continuous Learning", desc: "Gain exposure to new technologies, certifications, and industry best practices." },
    environment: { title: "Collaborative Environment", desc: "Work alongside experienced professionals in a supportive culture." },
    projects: { title: "Innovative Projects", desc: "Participate in impactful technology initiatives across diverse industries." },
    development: { title: "Career Development", desc: "Build a long-term professional path with opportunities for advancement." },
    supportive: { title: "Supportive Team Culture", desc: "Join a workplace that values respect, teamwork, and shared success." }
  },
  positions: {
    title: "Current Opportunities",
    applyNow: "Apply Now",
    noOpenings: "We are always interested in connecting with talented professionals. Submit your application and we'll contact you when a suitable opportunity becomes available.",
    roles: {
      networkEngineer: { title: "Network Engineer", dept: "Infrastructure", type: "Full-Time", loc: "Amman, Jordan", desc: "Design, implement, and manage secure enterprise network infrastructures." },
      softwareDeveloper: { title: "Software Developer", dept: "Engineering", type: "Full-Time", loc: "Amman, Jordan", desc: "Develop scalable software solutions utilizing modern frameworks." },
      techSupport: { title: "Technical Support Engineer", dept: "Customer Success", type: "Full-Time", loc: "Amman, Jordan", desc: "Provide expert-level support and troubleshooting for enterprise clients." },
      sysAdmin: { title: "System Administrator", dept: "IT Operations", type: "Full-Time", loc: "Amman, Jordan", desc: "Ensure the stability, integrity, and efficient operation of in-house information systems." },
      cybersecurity: { title: "Cybersecurity Specialist", dept: "Security", type: "Full-Time", loc: "Dubai, UAE", desc: "Protect enterprise environments by implementing advanced security measures." },
      salesExec: { title: "Sales Executive", dept: "Sales", type: "Full-Time", loc: "Riyadh, KSA", desc: "Drive growth by building relationships with enterprise clients." },
      secretary: { title: "Secretary / Administrative Assistant", dept: "Administration", type: "Full-Time", loc: "Amman, Jordan", desc: "Support daily operations with exceptional organizational and administrative skills." }
    }
  },
  application: {
    title: "Submit Application",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    linkedin: "LinkedIn Profile (Optional)",
    cv: "Upload CV / Resume",
    cvHint: "Accepted Formats: PDF, DOC, DOCX",
    message: "Additional Message",
    messagePlaceholder: "Tell us a little about yourself.",
    submit: "Submit Application",
    fields: {
      adminExp: "Years of Administrative Experience",
      msOffice: "Microsoft Office Proficiency",
      languages: "Languages Spoken",
      availability: "Availability",
      progLanguages: "Programming Languages",
      frameworks: "Frameworks",
      yearsExp: "Years of Experience",
      portfolio: "Portfolio URL",
      github: "GitHub Profile",
      ciscoExp: "Cisco Experience",
      netCerts: "Network Certifications",
      infraProjects: "Infrastructure Projects Worked On",
      troubleshootingExp: "Troubleshooting Experience",
      supportExp: "Customer Support Experience",
      techCerts: "Technical Certifications",
      fieldWork: "Field Work Availability"
    }
  },
  timeline: {
    title: "Hiring Process",
    subtitle: "Our transparent approach to welcoming new talent to the Amwaj Tech team.",
    finalMessage: "Ready to build your future with us?",
    steps: {
      apply: { title: "Submit Application", desc: "Review our open positions and submit your application with relevant details." },
      review: { title: "Application Review", desc: "Our recruitment team carefully evaluates your qualifications and experience." },
      initial: { title: "Initial Interview", desc: "A brief conversation to understand your career goals and mutual fit." },
      assessment: { title: "Technical Assessment", desc: "Showcase your skills through role-specific evaluations or practical tasks." },
      final: { title: "Final Interview", desc: "Meet with team leaders to discuss potential impact and cultural alignment." },
      welcome: { title: "Welcome To The Team", desc: "Receive an offer and begin your onboarding journey with Amwaj Tech." }
    }
  }
};

// Careers content - Arabic
arData.careers = {
  hero: {
    title: "ابنِ مستقبلك مع أمواج تك",
    subtitle: "نحن نبحث دائماً عن محترفين شغوفين يرغبون في ابتكار حلول تكنولوجية مؤثرة والنمو إلى جانب فريق ملتزم بالتميز.",
    cta: "استكشف الفرص"
  },
  culture: {
    title: "الحياة في أمواج تك",
    subtitle: "نحن لا نبني حلولاً تكنولوجية فحسب. بل نبني فريقاً من المحترفين الذين يتعلمون وينمون وينجحون معاً.",
    cards: {
      collaboration: { title: "تعاون الفريق", desc: "العمل عن كثب مع الخبراء لحل التحديات المعقدة." },
      learning: { title: "التعلم والتطوير", desc: "فرص مستمرة لتطوير المهارات وإتقان تقنيات جديدة." },
      innovation: { title: "عقلية الابتكار", desc: "المساهمة في مشاريع مؤسسية متطورة." },
      excellence: { title: "التميز المهني", desc: "معايير عالية والتزام بالجودة في كل ما نقوم به." }
    }
  },
  highlights: {
    team: { title: "فريق محترف", desc: "متخصصون ذوو خبرة يقدمون حلولاً تكنولوجية عبر صناعات متعددة." },
    projects: { title: "مشاريع مؤسسية", desc: "المساهمة في مبادرات البنية التحتية، السحابة، البرمجيات، والأمن." },
    learning: { title: "التعلم المستمر", desc: "دعم الشهادات والتدريب والتطوير المهني." },
    culture: { title: "ثقافة تعاونية", desc: "تشجيع العمل الجماعي والابتكار وتبادل المعرفة." }
  },
  whyJoin: {
    growth: { title: "النمو المهني", desc: "العمل على مشاريع صعبة تسرع التطور التقني والمهني." },
    learning: { title: "التعلم المستمر", desc: "اكتساب خبرة في تقنيات جديدة وشهادات وأفضل الممارسات." },
    environment: { title: "بيئة تعاونية", desc: "العمل جنباً إلى جنب مع محترفين ذوي خبرة في ثقافة داعمة." },
    projects: { title: "مشاريع مبتكرة", desc: "المشاركة في مبادرات تكنولوجية مؤثرة عبر صناعات متنوعة." },
    development: { title: "التطوير الوظيفي", desc: "بناء مسار مهني طويل الأمد مع فرص للتقدم." },
    supportive: { title: "ثقافة فريق داعمة", desc: "انضم إلى مكان عمل يقدر الاحترام والعمل الجماعي والنجاح المشترك." }
  },
  positions: {
    title: "الفرص الحالية",
    applyNow: "قدم الآن",
    noOpenings: "نحن مهتمون دائماً بالتواصل مع المحترفين الموهوبين. قدم طلبك وسنتصل بك عند توفر فرصة مناسبة.",
    roles: {
      networkEngineer: { title: "مهندس شبكات", dept: "البنية التحتية", type: "دوام كامل", loc: "عمان، الأردن", desc: "تصميم وتنفيذ وإدارة البنى التحتية لشبكات المؤسسات الآمنة." },
      softwareDeveloper: { title: "مطور برمجيات", dept: "الهندسة", type: "دوام كامل", loc: "عمان، الأردن", desc: "تطوير حلول برمجية قابلة للتوسع باستخدام أطر عمل حديثة." },
      techSupport: { title: "مهندس دعم فني", dept: "نجاح العملاء", type: "دوام كامل", loc: "عمان، الأردن", desc: "تقديم دعم على مستوى الخبراء واستكشاف الأخطاء لعملاء المؤسسات." },
      sysAdmin: { title: "مسؤول نظام", dept: "عمليات تقنية المعلومات", type: "دوام كامل", loc: "عمان، الأردن", desc: "ضمان استقرار ونزاهة وتشغيل أنظمة المعلومات بكفاءة." },
      cybersecurity: { title: "أخصائي أمن سيبراني", dept: "الأمن", type: "دوام كامل", loc: "دبي، الإمارات", desc: "حماية بيئات المؤسسات من خلال تنفيذ تدابير أمنية متقدمة." },
      salesExec: { title: "تنفيذي مبيعات", dept: "المبيعات", type: "دوام كامل", loc: "الرياض، السعودية", desc: "دفع النمو من خلال بناء علاقات مع عملاء المؤسسات." },
      secretary: { title: "سكرتير / مساعد إداري", dept: "الإدارة", type: "دوام كامل", loc: "عمان، الأردن", desc: "دعم العمليات اليومية بمهارات تنظيمية وإدارية استثنائية." }
    }
  },
  application: {
    title: "تقديم الطلب",
    fullName: "الاسم الكامل",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    linkedin: "رابط لينكد إن (اختياري)",
    cv: "تحميل السيرة الذاتية",
    cvHint: "الصيغ المقبولة: PDF, DOC, DOCX",
    message: "رسالة إضافية",
    messagePlaceholder: "أخبرنا قليلاً عن نفسك.",
    submit: "تقديم الطلب",
    fields: {
      adminExp: "سنوات الخبرة الإدارية",
      msOffice: "إجادة مايكروسوفت أوفيس",
      languages: "اللغات المتحدثة",
      availability: "التوفر",
      progLanguages: "لغات البرمجة",
      frameworks: "أطر العمل",
      yearsExp: "سنوات الخبرة",
      portfolio: "رابط معرض الأعمال",
      github: "رابط جيت هب",
      ciscoExp: "خبرة في سيسكو",
      netCerts: "شهادات الشبكات",
      infraProjects: "مشاريع البنية التحتية التي عملت عليها",
      troubleshootingExp: "خبرة في استكشاف الأخطاء وإصلاحها",
      supportExp: "خبرة في دعم العملاء",
      techCerts: "شهادات تقنية",
      fieldWork: "التوفر للعمل الميداني"
    }
  },
  timeline: {
    title: "عملية التوظيف",
    subtitle: "نهجنا الشفاف للترحيب بالمواهب الجديدة في فريق أمواج تك.",
    finalMessage: "هل أنت مستعد لبناء مستقبلك معنا؟",
    steps: {
      apply: { title: "تقديم الطلب", desc: "راجع الوظائف المتاحة وقدم طلبك مع التفاصيل ذات الصلة." },
      review: { title: "مراجعة الطلب", desc: "يقوم فريق التوظيف لدينا بتقييم مؤهلاتك وخبراتك بعناية." },
      initial: { title: "المقابلة الأولية", desc: "محادثة قصيرة لفهم أهدافك المهنية والتوافق المتبادل." },
      assessment: { title: "التقييم الفني", desc: "أظهر مهاراتك من خلال تقييمات خاصة بالدور أو مهام عملية." },
      final: { title: "المقابلة النهائية", desc: "التقِ بقادة الفريق لمناقشة التأثير المحتمل والتوافق الثقافي." },
      welcome: { title: "مرحباً بك في الفريق", desc: "تلقي عرض وبدء رحلة الانضمام إلى أمواج تك." }
    }
  }
};

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2));
fs.writeFileSync(arPath, JSON.stringify(arData, null, 2));

console.log('Locales updated successfully');
