import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  personal: {
    name: 'Nangyal Khan',
    title: 'Creative Technologist & Digital Builder',
    headline: 'Nangyal Khan',
    supportingHeadline: 'Building Digital Experiences That Stand Out.',
    bioIntroduction:
      'Creative technologist focused on building modern digital experiences, exploring technology, and turning ambitious ideas into polished products.',
    email: 'nangyalkhan0988@gmail.com',
    whatsappNumber: '+923000000000',
    location: 'Remote / Global',
    availabilityStatus: 'Available for new opportunities',
    isAvailableForWork: true,
    avatarUrl: '/images/profile.jpg',
    aboutSections: [
      {
        title: 'Background & Evolution',
        subtitle: 'Where curiosity meets modern web craft',
        content:
          '[Editable Placeholder] Driven by a passion for clean code, intuitive interfaces, and high-performance digital experiences. Constantly refining development workflows, exploring cutting-edge web tools, and transforming conceptual ideas into reality.',
      },
      {
        title: 'Current Focus & Core Philosophy',
        subtitle: 'Engineering with precision and intent',
        content:
          '[Editable Placeholder] Focused on modern frontend architectures, component systems, smooth motion design, and accessible interfaces that deliver lightning-fast performance across all modern screens.',
      },
      {
        title: 'Goals & Future Ambitions',
        subtitle: 'Building the next generation of digital products',
        content:
          '[Editable Placeholder] Aiming to collaborate with forward-thinking teams, solve complex technical challenges, and build products that bring genuine value, delight, and utility to users worldwide.',
      },
    ],
    strengths: [
      'Modern Component Architecture',
      'High-Fidelity UI/UX Prototyping',
      'Performance & Web Optimization',
      'Clean & Scalable Codebases',
      'Responsive Cross-Platform Layouts',
      'Creative Interaction & Motion',
    ],
    passions: [
      'Interactive Web Experiences',
      'Design Systems & Tokens',
      'Open Source Tooling',
      'Modern Frontend Paradigms',
      'Typography & Spatial Layouts',
    ],
  },
  stats: [
    {
      value: 'XX+',
      label: 'Projects Built',
      description: 'Editable placeholder for total applications and prototypes crafted.',
      isPlaceholder: true,
    },
    {
      value: 'XX',
      label: 'Technologies',
      description: 'Languages, frameworks, and modern developer tools in workflow.',
      isPlaceholder: true,
    },
    {
      value: 'XX',
      label: 'Years Learning',
      description: 'Dedicated journey of continuous engineering and digital design.',
      isPlaceholder: true,
    },
    {
      value: '100%',
      label: 'Craft & Precision',
      description: 'Uncompromising commitment to code quality and user experience.',
      isPlaceholder: false,
    },
  ],
  skillCategories: [
    {
      name: 'Development',
      description: 'Modern languages, libraries, and frameworks powering robust web interfaces.',
      skills: [
        {
          name: 'React 19',
          level: 'Core Focus',
          tag: 'UI Library',
          description: 'Server & client components, hooks architecture, and state orchestration.',
        },
        {
          name: 'Next.js',
          level: 'Core Focus',
          tag: 'Fullstack Framework',
          description: 'App router, server rendering, routing architectures, and static optimization.',
        },
        {
          name: 'TypeScript',
          level: 'Core Focus',
          tag: 'Type Safety',
          description: 'Strict type modeling, generic interfaces, and self-documenting codebases.',
        },
        {
          name: 'JavaScript (ES6+)',
          level: 'Core Focus',
          tag: 'Core Language',
          description: 'Async workflows, functional idioms, DOM performance, and modern standards.',
        },
        {
          name: 'HTML5 & Semantics',
          level: 'Core Focus',
          tag: 'Structure',
          description: 'Accessible structures, ARIA standards, and search-optimized semantic markup.',
        },
        {
          name: 'CSS3 & Tailwind CSS',
          level: 'Core Focus',
          tag: 'Styling Engine',
          description: 'Design tokens, dynamic utility grids, fluid layouts, and keyframe animations.',
        },
      ],
    },
    {
      name: 'Design',
      description: 'Spatial layout, aesthetic visual hierarchy, design tokens, and user journeys.',
      skills: [
        {
          name: 'UI/UX Design',
          level: 'Core Focus',
          tag: 'Product Design',
          description: 'Human-centric user journeys, high-contrast layouts, and clean visual rhythm.',
        },
        {
          name: 'Responsive Design',
          level: 'Core Focus',
          tag: 'Adaptability',
          description: 'Fluid scaling across mobile, tablet, desktop, and ultra-wide displays.',
        },
        {
          name: 'Design Systems',
          level: 'Proficient',
          tag: 'Consistency',
          description: 'Reusable atomic components, spacing scales, color palettes, and typography.',
        },
        {
          name: 'Prototyping & Motion',
          level: 'Proficient',
          tag: 'Interaction',
          description: 'Micro-interactions, smooth state transitions, and interactive wireframes.',
        },
      ],
    },
    {
      name: 'Technology & Tooling',
      description: 'Developer workflows, version control, modern APIs, and hosting infrastructure.',
      skills: [
        {
          name: 'Git & GitHub',
          level: 'Core Focus',
          tag: 'Version Control',
          description: 'Branch management, pull requests, CI/CD actions, and collaboration.',
        },
        {
          name: 'REST & Modern APIs',
          level: 'Core Focus',
          tag: 'Data Layer',
          description: 'Integration of RESTful endpoints, asynchronous queries, and data sanitization.',
        },
        {
          name: 'Linux & Terminal',
          level: 'Proficient',
          tag: 'Environment',
          description: 'Shell scripting, file management, build toolchains, and container environments.',
        },
        {
          name: 'Cloud & Deployment',
          level: 'Proficient',
          tag: 'Infrastructure',
          description: 'Vercel, Cloud Run, edge networks, DNS routing, and static asset distribution.',
        },
      ],
    },
  ],
  projects: [
    {
      id: 'project-nexus',
      title: 'Aura UI — Design System & Component Library',
      tagline: 'Modern accessible design system and components with dark futuristic aesthetic',
      category: 'UI/UX & Concepts',
      description:
        '[Editable Sample Project] A comprehensive design system featuring micro-interactions, accessible contrast tokens, and responsive layout primitives.',
      longDescription:
        'A high-performance component library engineered to accelerate frontend development. Includes dark luxury visual themes, token-based spacing systems, keyboard navigation primitives, and smooth physics-driven motion transitions.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      demoUrl: 'https://example.com/demo-aura',
      githubUrl: 'https://github.com/example/aura-ui',
      highlights: [
        'Accessible color contrast architecture meeting WCAG AAA specifications',
        'Over 35+ production-ready interactive components with zero runtime overhead',
        'Fluid fluid typography and spacing tokens engineered for ultra-high-resolution displays',
      ],
      metrics: [
        { label: 'Bundle Size', value: '< 12kB' },
        { label: 'Accessibility Score', value: '100/100' },
      ],
      isPlaceholder: true,
    },
    {
      id: 'project-horizon',
      title: 'Horizon Studio — Interactive Analytics Dashboard',
      tagline: 'Real-time telemetry and data visualization platform for digital products',
      category: 'Web App',
      description:
        '[Editable Sample Project] A sleek telemetry and data visualization cockpit with real-time stream graphs, custom metrics, and responsive views.',
      longDescription:
        'Designed for high-throughput operational monitoring. Features client-side data filters, SVG-based responsive data charts, dark/light theme switching, and instant data export capabilities.',
      tags: ['Next.js', 'TypeScript', 'D3.js', 'Tailwind CSS'],
      image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      demoUrl: 'https://example.com/demo-horizon',
      githubUrl: 'https://github.com/example/horizon-studio',
      highlights: [
        'Real-time streaming charts with smooth 60fps canvas and SVG rendering',
        'Customizable widgets with drag-and-drop dashboard composition',
        'Optimized client-side aggregation pipelines for large time-series datasets',
      ],
      metrics: [
        { label: 'Render Latency', value: '16ms' },
        { label: 'Lighthouse Rating', value: '98/100' },
      ],
      isPlaceholder: true,
    },
    {
      id: 'project-synth',
      title: 'Synthetix — Generative Sound & Canvas Lab',
      tagline: 'Audio-reactive WebGL canvas experiment with spatial ambient soundscapes',
      category: 'Creative Tech',
      description:
        '[Editable Sample Project] An experimental creative coding project blending Web Audio synthesis, interactive particle physics, and mathematical geometry.',
      longDescription:
        'An exploratory web experiment testing the boundaries of browser-based creative technology. Leverages modern Web Audio API oscillators and Canvas 2D math algorithms to turn user inputs into generative art.',
      tags: ['Web Audio API', 'Canvas API', 'TypeScript', 'CSS Math'],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      demoUrl: 'https://example.com/demo-synthetix',
      githubUrl: 'https://github.com/example/synthetix-lab',
      highlights: [
        'Interactive harmonic frequency synthesizer with custom delay and reverb nodes',
        'Physics-driven particle field responsive to cursor velocity and microphone input',
        'Optimized requestAnimationFrame loop sustaining smooth frame rates on mobile',
      ],
      metrics: [
        { label: 'Audio Engine', value: 'Web Audio' },
        { label: 'Frame Rate', value: '60 FPS' },
      ],
      isPlaceholder: true,
    },
    {
      id: 'project-chronos',
      title: 'Chronos — Developer Workspace & Task Engine',
      tagline: 'Keyboard-first productivity suite with offline persistence and markdown notes',
      category: 'Web App',
      description:
        'Minimalist productivity workspace featuring command-palette navigation, markdown live editor, and local persistence.',
      longDescription:
        'A keyboard-first digital notebook and task organizer. Built with zero bloat, instant search indexing, local storage synchronization, and customizable hotkeys.',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'LocalStorage'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
      featured: false,
      demoUrl: 'https://example.com/demo-chronos',
      githubUrl: 'https://github.com/example/chronos-engine',
      highlights: [
        'Global command palette (Cmd+K) supporting rapid keyboard navigation and quick actions',
        'Instantaneous full-text search across all personal tasks and formatted markdown documents',
        'Offline-first architecture with automatic sync and export capabilities',
      ],
      metrics: [
        { label: 'Cold Boot Time', value: '< 100ms' },
        { label: 'Storage', value: 'Local First' },
      ],
      isPlaceholder: true,
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Creative Technologist / Frontend Engineer [Editable Placeholder]',
      company: 'Digital Studio / Independent Practice',
      location: 'Remote',
      period: '2025 — Present',
      type: 'Full-time',
      description:
        '[Editable Placeholder] Conceptualizing and implementing high-end digital web interfaces, interactive prototypes, and component architectures for modern web applications.',
      achievements: [
        'Architected clean, accessible component hierarchies in TypeScript and React',
        'Optimized frontend performance metrics, achieving sub-second first contentful paint',
        'Collaborated on responsive design systems with seamless motion and spatial aesthetics',
      ],
      skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'UI/UX'],
      isPlaceholder: true,
    },
    {
      id: 'exp-2',
      role: 'Frontend Developer & UI Explorer [Editable Placeholder]',
      company: 'Technology Lab / Projects',
      location: 'Remote',
      period: '2024 — 2025',
      type: 'Self-Directed',
      description:
        '[Editable Placeholder] Dedicated to deep technical skill acquisition, building fullstack prototypes, exploring open-source tooling, and mastering modern web standards.',
      achievements: [
        'Authored reusable UI patterns and responsive landing page architectures',
        'Integrated modern RESTful and GraphQL endpoints with client state caching',
        'Refined code quality and maintainability through rigorous static typing and linting',
      ],
      skills: ['JavaScript', 'HTML5/CSS3', 'Git', 'REST APIs', 'Linux'],
      isPlaceholder: true,
    },
    {
      id: 'exp-3',
      role: 'Computer Science & Software Development [Editable Placeholder]',
      company: 'Academic & Self-Taught Journey',
      location: 'Online / Institution',
      period: '2023 — 2024',
      type: 'Education',
      description:
        '[Editable Placeholder] Foundational studies in algorithms, data structures, software engineering methodologies, web protocols, and modern user interface principles.',
      achievements: [
        'Completed coursework in computer science principles and software engineering',
        'Participated in coding challenges and open-source software explorations',
        'Developed foundational competencies in problem solving and computational thinking',
      ],
      skills: ['Algorithms', 'Data Structures', 'Web Fundamentals', 'Object-Oriented Design'],
      isPlaceholder: true,
    },
  ],
  services: [
    {
      id: 'srv-web-dev',
      title: 'Modern Web Development',
      tagline: 'High-performance, scalable, and responsive web applications',
      description:
        'Building lightning-fast web applications with clean TypeScript, modern React paradigms, and scalable component structures designed for long-term maintainability.',
      deliverables: [
        'Full-stack or SPA React & Next.js builds',
        'Clean TypeScript codebases with zero bloat',
        'Strict SEO optimization & OpenGraph setup',
        'Robust performance & Lighthouse optimization',
      ],
      icon: 'Code2',
      highlightTech: ['React', 'TypeScript', 'Next.js', 'Vite'],
    },
    {
      id: 'srv-ui-ux',
      title: 'UI/UX & Interaction Design',
      tagline: 'Aesthetic, intuitive, and conversion-focused digital interfaces',
      description:
        'Designing digital products with intentional typographic hierarchy, balanced negative space, intuitive navigation flows, and fluid micro-interactions.',
      deliverables: [
        'High-fidelity interactive prototypes',
        'Design systems & reusable token libraries',
        'Dark/Light mode color palettes & theme tokens',
        'WCAG AA/AAA compliant accessible layouts',
      ],
      icon: 'Palette',
      highlightTech: ['Figma to Code', 'Design Tokens', 'Motion', 'Tailwind'],
    },
    {
      id: 'srv-portfolio',
      title: 'Portfolio & Brand Websites',
      tagline: 'World-class online presence tailored for creators & leaders',
      description:
        'Creating bespoke personal brand and showcase platforms that capture attention, showcase projects with impact, and communicate professional authority.',
      deliverables: [
        'Cinematic hero sections & custom typography',
        'Interactive project showcases & modals',
        'Integrated contact forms & social hubs',
        'Instant mobile & retina display readiness',
      ],
      icon: 'Sparkles',
      highlightTech: ['Creative Coding', 'Micro-Interactions', 'SEO', 'Speed'],
    },
    {
      id: 'srv-landing',
      title: 'High-Converting Landing Pages',
      tagline: 'Engaging, fast-loading product launch & campaign pages',
      description:
        'Crafting marketing and product launch pages designed to convert visitors with compelling visual rhythm, crisp messaging structure, and rapid load times.',
      deliverables: [
        'Sub-second page loading speed',
        'Responsive layouts tested across all devices',
        'Call-to-action optimization & flow design',
        'Analytics & tracking integration ready',
      ],
      icon: 'Layers',
      highlightTech: ['Conversion UX', 'Performance', 'Modern CSS', 'Animations'],
    },
  ],
  socials: [
    {
      platform: 'GitHub',
      url: 'https://github.com',
      handle: '@nangyalkhan (Placeholder)',
      icon: 'Github',
    },
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com',
      handle: 'Nangyal Khan (Placeholder)',
      icon: 'Linkedin',
    },
    {
      platform: 'X / Twitter',
      url: 'https://x.com',
      handle: '@nangyalkhan (Placeholder)',
      icon: 'Twitter',
    },
    {
      platform: 'Email',
      url: 'mailto:nangyalkhan0988@gmail.com',
      handle: 'nangyalkhan0988@gmail.com',
      icon: 'Mail',
    },
  ],
};
