// All content comes from Muhammad Saad's CV.

export const profile = {
  name: 'Muhammad Saad',
  firstName: 'Muhammad',
  lastName: 'Saad',
  title: 'Android Developer (Kotlin)',
  roles: [
    'Android Developer (Kotlin)',
    'MVVM & Clean Architecture',
    'AI-Assisted Developer',
    'React Front-End Developer',
  ],
  location: 'Lahore, Pakistan',
  email: 'muhammadsaadabdulsalam18@gmail.com',
  linkedin: 'https://linkedin.com/in/muhammad-saad-4639b52ab',
  linkedinLabel: 'linkedin.com/in/muhammad-saad-4639b52ab',
  github: 'https://github.com/Saad875',
  githubLabel: 'github.com/Saad875',
  summary:
    'Kotlin Android developer at Trusted Technologies building production apps with MVVM/Clean Architecture, Room, and Firebase. Skilled in AI-assisted development (vibe coding) with Cursor AI and prompt engineering to ship features faster. Frontend background in React and JavaScript; focused on clean, maintainable code.',
  cv: 'MuhammadSaad-CV.pdf',
  photo: 'saad.jpg',
}

export const stats = [
  { value: 20, suffix: 'K+', label: 'Downloads on Google Play across my published apps' },
  { value: 3, suffix: '', label: 'Apps live on Google Play, built at Trusted Technologies' },
  { value: 5, suffix: '', label: 'Production Android apps shipped in Kotlin' },
  { value: 18, suffix: '', label: 'Languages localized, including Arabic RTL' },
]

export const company = {
  name: 'Trusted Technologies',
  place: 'Lahore, Pakistan',
  role: 'Junior Android Developer',
  since: 'Feb 2026 – Present',
}

// Numbers read from the Google Play listings on 13 Nov 2026.
export const playApps = [
  {
    name: 'Smart Printer : All Documents',
    downloads: '10K+',
    category: 'Productivity · Printing',
    description:
      'Print PDFs, documents, photos, web pages and email attachments straight from the phone over Wi-Fi, with print preview and print settings.',
    features: ['WiFi / Bluetooth / USB discovery', 'IPP printing', 'eSCL scanning'],
    icon: 'https://play-lh.googleusercontent.com/Q3KL08N-Ns2GzVpZNybXTTjtvEbyOknMRCk13lCmM_Q1okUXLxrhCIh_1Q7W1QV6bC0LW-gN4UTSPIEpR2hO=w240-h480-rw',
    url: 'https://play.google.com/store/apps/details?id=smartprinter.printdocuments.mobileprint.wirelessprinting',
  },
  {
    name: 'Universal TV Remote: Smart TV',
    downloads: '5K+',
    category: 'Utility · Smart TV',
    description:
      'Turns the phone into a remote for compatible smart TVs over Wi-Fi: navigation, volume and playback controls.',
    features: ['Wi-Fi device pairing', 'Remote controls', 'Volume & playback'],
    icon: 'https://play-lh.googleusercontent.com/xZ9WYY68EPqB6BMTV6GVs7nfbES0X9fFJezQGgCdOHOdWFdTvWHh5yYYft4lt9RwjlptB5hYU3831apCntAS=w240-h480-rw',
    url: 'https://play.google.com/store/apps/details?id=com.universal.tv.remote.control.cast.screen',
  },
  {
    name: '4K Wallpapers + HD Backgrounds',
    downloads: '5K+',
    category: 'Personalization',
    description:
      'A collection of 4K and HD wallpapers in many styles to set on the home screen, lock screen or both.',
    features: ['4K & HD wallpapers', 'Home & lock screen', 'Style categories'],
    icon: 'https://play-lh.googleusercontent.com/VqaRwy-U_BgAU5Hi80K6yO1RN5xpOWfqMVeSgxXT6G0Fs5zlVus3dSGLjsLU-ryko2FsJjOS5OjjrXKtkm1_fw=w240-h480-rw',
    url: 'https://play.google.com/store/apps/details?id=uhd.hdwallpapers.live.wallpaper4k.backgrounds',
  },
]

export const skills = [
  {
    group: 'Programming',
    icon: 'code',
    items: ['Kotlin', 'XML', 'JavaScript', 'Python', 'C++', 'SQL'],
  },
  {
    group: 'Android',
    icon: 'android',
    items: ['MVVM', 'Clean Architecture', 'Room', 'Coroutines/Flow', 'ViewBinding', 'WorkManager', 'Foreground Services'],
  },
  {
    group: 'Firebase & APIs',
    icon: 'cloud',
    items: ['Realtime Database', 'Remote Config', 'Crashlytics', 'AdMob', 'ML Kit', 'Gemini API', 'REST APIs'],
  },
  {
    group: 'AI-Assisted Development',
    icon: 'spark',
    items: ['Vibe Coding', 'Prompt Engineering', 'Cursor AI', 'Claude', 'Google Stitch', 'Google AI Studio'],
  },
  {
    group: 'Frontend',
    icon: 'layout',
    items: ['React', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design', 'Accessibility'],
  },
  {
    group: 'Tools',
    icon: 'tool',
    items: ['Android Studio', 'Git', 'GitHub', 'Bitbucket', 'VS Code', 'Chrome DevTools', 'Maestro'],
  },
]

export const languages = [
  { name: 'English', level: 'Fluent', pct: 90 },
  { name: 'Urdu', level: 'Native', pct: 100 },
  { name: 'Turkish', level: 'Basic', pct: 30 },
]

export const experience = [
  {
    role: 'Junior Android Developer',
    company: 'Trusted Technologies',
    place: 'Lahore',
    period: 'Feb 2026 – Present',
    current: true,
    points: [
      'Build production Android apps in Kotlin and XML across utility, productivity, and AI categories, owning features from R&D and UI to QA-ready builds under lead-developer review.',
      'Delivered key features for a printer & scanner app (WiFi/Bluetooth/USB discovery, IPP printing, eSCL scanning) and a family-safety app (live location, SOS, and chat on Firebase Realtime Database).',
      'Built an AI meeting transcriber with on-device speech-to-text, ML Kit translation, and Gemini API summaries; added AdMob, Crashlytics, and 18-language localization (incl. Arabic RTL) across apps.',
      'Leverage AI-assisted development (vibe coding) in Cursor AI with structured prompt engineering to generate, refactor, and debug code faster; designed a 46-screen app UI with Google Stitch prompts.',
    ],
    tags: ['Kotlin', 'XML', 'Firebase', 'ML Kit', 'Gemini API', 'AdMob', 'Crashlytics'],
  },
  {
    role: 'Freelance Front-End Developer',
    company: 'Remote',
    place: '',
    period: 'Freelance',
    points: [
      'Built responsive landing pages and websites using HTML, CSS, JavaScript, and Bootstrap.',
      'Ensured mobile-first layouts, cross-browser compatibility, and polished UI/UX.',
      'Managed version control and client delivery using Git and GitHub.',
    ],
    tags: ['HTML', 'CSS', 'JavaScript', 'Bootstrap', 'Git'],
  },
  {
    role: 'Part-Time Web Assistant',
    company: 'Local Community Organization',
    place: 'Lahore',
    period: '2023',
    points: [
      'Maintained website content, fixed frontend issues, and improved accessibility.',
      'Created event pages and forms; ran basic SEO and Lighthouse audits.',
    ],
    tags: ['Accessibility', 'SEO', 'Lighthouse'],
  },
]

export const projects = [
  {
    name: 'Family-Safety App',
    kind: 'Android · Trusted Technologies',
    year: '2026',
    description:
      'Live location, SOS and chat features built on Firebase Realtime Database.',
    tags: ['Kotlin', 'Firebase', 'Realtime Database', 'Location'],
    icon: 'shield',
  },
  {
    name: 'AI Meeting Transcriber',
    kind: 'Android · Trusted Technologies',
    year: '2026',
    description:
      'On-device speech-to-text, ML Kit translation and Gemini API summaries, with AdMob, Crashlytics and 18-language localization including Arabic RTL.',
    tags: ['Kotlin', 'ML Kit', 'Gemini API', 'Speech-to-Text'],
    icon: 'mic',
  },
  {
    name: 'SkinScan – AI Dermatology Assistant',
    kind: 'Final Year Project',
    year: '2024–2025',
    description:
      'AI-powered mobile and web platform for automated skin disease classification. Integrated image processing, deep learning models, and a user chatbot.',
    tags: ['Deep Learning', 'Image Processing', 'Chatbot', 'Mobile + Web'],
    icon: 'scan',
    featured: true,
  },
  {
    name: 'Car Rental System',
    kind: 'Web Application',
    year: '2022',
    description:
      'Responsive UI for vehicle listings, bookings, and an admin dashboard, integrated with a SQL-based REST API for CRUD operations.',
    tags: ['Responsive UI', 'REST API', 'SQL', 'CRUD'],
    icon: 'car',
  },
]

export const education = {
  degree: 'BS Computer Science',
  school: 'University of Management and Technology (UMT)',
  place: 'Lahore',
  period: '2021–2025',
  coursework: ['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Web Engineering'],
}

export const certifications = [
  { name: 'Social Services Certificate', issuer: 'UMT', date: '01/12/2023' },
]
