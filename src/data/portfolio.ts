export interface Project {
  id: string;
  title: string;
  period: string;
  role?: string;
  description: string;
  technologies: string[];
  features: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics?: string;
  category: "Full Stack" | "Python & AI" | "Extensions & Tools" | "Interactive & Games";
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  highlights: string[];
  skills: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  period: string;
  score: string;
  location?: string;
}

export interface AchievementItem {
  id: string;
  category: "Certification" | "Competitive Programming";
  title: string;
  issuer: string;
  location?: string;
  description: string;
  date?: string;
  stats?: string;
}

export interface SkillNode {
  name: string;
  level: "Proficient" | "Advanced" | "Core";
  category: "languages" | "web" | "tools" | "coursework";
  description: string;
  highlight?: boolean;
}

export const portfolioData = {
  personal: {
    name: "Rajeev Kumar",
    tagline: "Building Modern, Resilient & High-Performance Web Architecture",
    title: "Full Stack Developer & Computer Science Engineer",
    summary:
      "Motivated Computer Science & Engineering student (graduating 2027) with a strong foundation in full-stack development and software engineering principles. Passionate about building responsive web applications and interactive frontends using HTML, CSS, JavaScript, and Node.js. Experienced in scripting with Python and implementing robust algorithms in C/C++. Detail-oriented developer with practical project experience in designing modular interfaces and resolving complex technical challenges.",
    email: "kumarprincekumar403@gmail.com",
    phone: "+91 9576533480",
    location: "Prayagraj / Bihar, India",
    graduationYear: 2027,
    status: "Available for Software Engineering Internships & Full-time Roles",
    githubUsername: "Rajeevkumar786",
    totalRepos: 35,
  },

  social: {
    github: "https://github.com/Rajeevkumar786",
    linkedin: "https://linkedin.com",
    email: "mailto:kumarprincekumar403@gmail.com",
    phone: "tel:+919576533480",
  },

  skills: {
    languages: [
      { name: "JavaScript", level: "Proficient", category: "languages", description: "Dynamic scripting, ES6+, event-driven UI, async patterns, DOM manipulation", highlight: true },
      { name: "Python", level: "Proficient", category: "languages", description: "Computer vision, OpenCV, Flask, OOP, algorithm design, automation", highlight: true },
      { name: "C++", level: "Proficient", category: "languages", description: "Data structures, problem solving, competitive programming (50+ DSA)", highlight: true },
      { name: "C", level: "Core", category: "languages", description: "Memory management, pointers, systems programming fundamentals", highlight: false },
    ] as SkillNode[],
    web: [
      { name: "React", level: "Proficient", category: "web", description: "Modern modular components, hooks, state orchestration, virtual DOM", highlight: true },
      { name: "Node.js", level: "Proficient", category: "web", description: "Server-side logic, Express RESTful APIs, routing architecture", highlight: true },
      { name: "MongoDB & Mongoose", level: "Proficient", category: "web", description: "NoSQL schema design, data modeling, database persistence", highlight: true },
      { name: "HTML5 & CSS3", level: "Proficient", category: "web", description: "Semantic markups, responsive layouts, Tailwind CSS, cross-device bug resolution", highlight: false },
      { name: "MERN Stack", level: "Certified", category: "web", description: "End-to-end full stack web architecture certified by IIIT Prayagraj", highlight: true },
    ] as SkillNode[],
    tools: [
      { name: "Git & GitHub", level: "Proficient", category: "tools", description: "Version control, branching, pull requests, repository management (35 repos)", highlight: true },
      { name: "Visual Studio Code", level: "Proficient", category: "tools", description: "Clean code environment, extensions, integrated debugging", highlight: false },
      { name: "OpenCV", level: "Core", category: "tools", description: "Computer vision, Haar cascade face engine, video stream processing", highlight: true },
    ] as SkillNode[],
    coursework: [
      { name: "Data Structures & Algorithms", level: "Advanced", category: "coursework", description: "Array, linked list, tree, graph, dynamic programming & optimization", highlight: true },
      { name: "Operating Systems", level: "Core", category: "coursework", description: "Process scheduling, concurrency, virtual memory, file systems", highlight: false },
      { name: "Computer Networks", level: "Core", category: "coursework", description: "OSI stack, TCP/IP, HTTP/HTTPS, REST communication protocols", highlight: false },
      { name: "OOP Principles", level: "Core", category: "coursework", description: "Encapsulation, inheritance, polymorphism, maintainable architecture", highlight: false },
    ] as SkillNode[],
  },

  experience: [
    {
      id: "exp-1",
      title: "Full Stack Developer Intern",
      company: "Code Technologies",
      location: "Remote",
      period: "2024 - Present",
      type: "Internship",
      skills: ["JavaScript", "HTML5", "CSS3", "Git", "VS Code", "Performance Optimization"],
      highlights: [
        "Collaborated in developing and enhancing responsive web pages using JavaScript, HTML5, and CSS3, resulting in highly accessible, user-friendly layouts.",
        "Designed front-end interfaces to scale legacy modules, optimizing client-side performance and multi-device compatibility.",
        "Utilized Git for version control and collaborated in VS Code following strict clean-coding standards.",
      ],
    },
    {
      id: "exp-2",
      title: "Python Developer Trainee",
      company: "United Institute of Technology",
      location: "Prayagraj, India",
      period: "July 2024 - Aug 2024",
      type: "Traineeship",
      skills: ["Python", "OpenCV", "Algorithms", "OOP", "Debugging", "Logic Building"],
      highlights: [
        "Gained practical expertise in Python scripting and algorithmic concepts through the implementation of 5+ mini-projects (including Smart Home Security with Facial Recognition).",
        "Strengthened debugging, logic building, and Object-Oriented Programming (OOP) principles to write maintainable and efficient code.",
      ],
    },
  ] as ExperienceItem[],

  projects: [
    {
      id: "proj-prescripto",
      title: "PRESCRIPTO",
      period: "2024",
      role: "Full Stack Lead Architect",
      category: "Full Stack",
      featured: true,
      description:
        "Doctor Appointment Booking Full Stack Platform engineered with React, Node.js, Express, and MongoDB, featuring authentication, role-based workflows, and image uploads via Cloudinary.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "Cloudinary"],
      features: [
        "Developed full-featured doctor appointment booking platform with dedicated patient, doctor, and admin management workflows.",
        "Architected secure RESTful APIs using Express, Mongoose, and JWT authentication with encrypted passwords via Bcrypt.",
        "Integrated Cloudinary with Multer for smooth profile and medical document image uploads.",
        "Engineered modern responsive frontend using React 19, Tailwind CSS, and React Router DOM.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/PRESCRIPTO",
      metrics: "Complete MERN Stack Architecture with JWT & Cloudinary",
    },
    {
      id: "proj-smart-home-security",
      title: "Smart Home Security System",
      period: "2024",
      role: "Python & Computer Vision Engineer",
      category: "Python & AI",
      featured: true,
      description:
        "Intelligent surveillance platform powered by Python, OpenCV, and Flask featuring real-time facial recognition, verification engine, and intruder detection alerting.",
      technologies: ["Python", "Flask", "OpenCV", "NumPy", "Gunicorn", "Face Recognition Engine"],
      features: [
        "Constructed a real-time computer vision surveillance engine (`face_engine.py`) using OpenCV for camera frame capture and facial landmark detection.",
        "Integrated a Flask web server and verification dashboard (`verify_system.py`) for live monitoring and automated security checks.",
        "Implemented robust algorithmic data persistence and model training for known face encodings.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/smart-home-security",
      metrics: "Real-time OpenCV Facial Recognition Engine",
    },
    {
      id: "proj-movie-search-app",
      title: "Movie Search App (Movie Mate)",
      period: "2024",
      role: "Backend & Frontend Engineer",
      category: "Full Stack",
      featured: true,
      description:
        "A responsive movie discovery web application leveraging JavaScript and dynamic API integration for instant content retrieval and custom modular UI components.",
      technologies: ["JavaScript", "Node.js", "REST APIs", "HTML5", "CSS3"],
      features: [
        "Engineered responsive movie discovery application retrieving dynamic movie catalog data, posters, and metadata via RESTful APIs.",
        "Constructed custom client-side routing and modular UI rendering components, ensuring sub-second response times.",
        "Implemented multi-device layout optimization resolving rendering bugs across phone, tablet, and desktop viewports.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/Movie-Search-App",
      metrics: "Sub-second API retrieval & responsive design",
    },
    {
      id: "proj-ads-blocker",
      title: "AdsBlocker Browser Extension",
      period: "2024",
      role: "Browser Systems Engineer",
      category: "Extensions & Tools",
      featured: true,
      description:
        "Lightweight Chrome extension designed with Manifest V3, content scripts, and DOM filtering rules to remove intrusive web ads and enhance browsing speed.",
      technologies: ["JavaScript", "Chrome Manifest V3", "WebExtensions API", "CSS", "DOM Mutation"],
      features: [
        "Built Manifest V3 compatible browser extension with background scripts and interactive popup controller (`popup.js`).",
        "Implemented declarative DOM selector filtering in `content.js` to automatically intercept and remove banner ads and video popups.",
        "Optimized page load speed by preventing unnecessary ad tracker scripts from executing.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/AdsBlockerExtension",
      metrics: "Manifest V3 Compliant & Zero Latency DOM Interception",
    },
    {
      id: "proj-ecommerce",
      title: "E-Commerce Web Platform",
      period: "2024",
      role: "Frontend Engineer",
      category: "Full Stack",
      featured: false,
      description:
        "Modular online storefront featuring dynamic product catalog rendering, cart state management, and responsive product filtering.",
      technologies: ["JavaScript", "HTML5", "CSS3", "State Management"],
      features: [
        "Engineered multi-item shopping catalog with instant cart addition, quantity updates, and subtotal calculation.",
        "Built responsive grid layouts with mobile-first CSS architecture.",
        "Implemented client-side search and category filtering logic with zero reload latency.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/E-Commerce-Website",
      metrics: "Dynamic Cart State & Product Grid",
    },
    {
      id: "proj-tic-tac-toe",
      title: "Tic Tac Toe (Deterministic Engine)",
      period: "2024",
      role: "Interactive UI Developer",
      category: "Interactive & Games",
      featured: true,
      description:
        "Interactive web-based game featuring dynamic UI states and automated win/draw determination logic with deterministic matrix checking.",
      technologies: ["JavaScript", "HTML5", "CSS3", "Game State Logic"],
      features: [
        "Engineered interactive web game featuring dynamic turn states and automated win/draw evaluation algorithms in JavaScript.",
        "Developed clean, modular scripts and styled pages using responsive CSS layouts, resolving cross-device UI rendering bugs.",
        "Implemented score tally tracking and instant reset state cycles.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/Tic-Tac-Toe",
      metrics: "Zero latency game matrix calculation",
    },
    {
      id: "proj-chatgpt",
      title: "ChatGPT AI Web Interface",
      period: "2024",
      role: "Frontend Engineer",
      category: "Interactive & Games",
      featured: false,
      description:
        "Interactive conversational AI assistant interface mimicking modern conversational patterns with smooth message bubbles and prompt dispatch.",
      technologies: ["JavaScript", "CSS3", "HTML5", "API Integration"],
      features: [
        "Designed clean dark-themed chat interface with automated message scrolling and typing indicators.",
        "Integrated prompt input handling and conversational history management in the browser.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/Chatgpt",
      metrics: "Modern Dark-Themed AI Chat UI",
    },
    {
      id: "proj-music-player",
      title: "Interactive Music Player",
      period: "2024",
      role: "Frontend Developer",
      category: "Interactive & Games",
      featured: false,
      description:
        "Audio playback application with song queue, dynamic progress seeking, play/pause controls, and volume orchestration.",
      technologies: ["JavaScript", "HTML5 Audio API", "CSS3"],
      features: [
        "Constructed custom audio player using HTML5 Audio API with real-time timecode updates and track progress seeking.",
        "Engineered playlist queueing with next/previous track skip capabilities.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/Music-Player",
      metrics: "Real-time HTML5 Audio Orchestration",
    },
    {
      id: "proj-github-finder",
      title: "GitHub Profile Finder",
      period: "2024",
      role: "API Integration Developer",
      category: "Extensions & Tools",
      featured: false,
      description:
        "Developer utility that connects to the GitHub REST API to search users, inspect repositories, follower stats, and account creation timeline.",
      technologies: ["JavaScript", "GitHub REST API", "CSS3", "Fetch API"],
      features: [
        "Communicates with GitHub public API endpoints for instantaneous profile card generation.",
        "Parses public repositories, follower counts, and account metadata with comprehensive error handling for non-existent users.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/Github-Profile-Finder",
      metrics: "Live GitHub API Integration",
    },
    {
      id: "proj-weather",
      title: "Weather Forecasting Web App",
      period: "2024",
      role: "Frontend Engineer",
      category: "Interactive & Games",
      featured: false,
      description:
        "Live weather forecast application delivering current temperature, wind speed, humidity, and weather conditions for any worldwide city.",
      technologies: ["JavaScript", "Weather API", "CSS3", "HTML5"],
      features: [
        "Integrated weather API to retrieve and display live climate parameters dynamically.",
        "Implemented visual condition icons and responsive weather card feedback.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/Wheather-App-",
      metrics: "Real-time Weather API Retrieval",
    },
    {
      id: "proj-typing-test",
      title: "Typing Speed Test Engine",
      period: "2024",
      role: "Interactive UI Developer",
      category: "Interactive & Games",
      featured: false,
      description:
        "Real-time words-per-minute (WPM) and typing accuracy measurement engine with live countdown timer and mistake tracking.",
      technologies: ["JavaScript", "DOM Events", "CSS3"],
      features: [
        "Tracks real-time keystroke accuracy, character matching, and elapsed time calculation.",
        "Calculates net Words Per Minute (WPM) and accuracy percentages upon test conclusion.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/Typing-Speed-Test",
      metrics: "Live Keystroke & WPM Analytics",
    },
    {
      id: "proj-notes-keeper",
      title: "Notes Keeper Application",
      period: "2024",
      role: "Frontend Developer",
      category: "Extensions & Tools",
      featured: false,
      description:
        "Productivity note-taking tool with local storage persistence, card creation, editing, and dynamic removal.",
      technologies: ["JavaScript", "LocalStorage API", "CSS3"],
      features: [
        "Instant note drafting, inline edits, and persistent storage via browser LocalStorage.",
        "Responsive masonry layout for viewing all organized notes.",
      ],
      githubUrl: "https://github.com/Rajeevkumar786/Notes-Keeper",
      metrics: "Persistent LocalStorage Architecture",
    },
  ] as Project[],

  education: [
    {
      id: "edu-btech",
      institution: "United Institute of Technology",
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      period: "2023 - Present (Graduating 2027)",
      score: "CGPA: 7.76 / 10.0",
      location: "Prayagraj",
    },
    {
      id: "edu-inter",
      institution: "Baldev High School, Kaupa",
      degree: "Intermediate (XII - BSEB)",
      period: "Aug 2021 - July 2023",
      score: "Percentage: 63.6%",
      location: "Bihar",
    },
    {
      id: "edu-matric",
      institution: "Senior Secondary High School",
      degree: "High School (X - BSEB)",
      period: "July 2018 - Aug 2020",
      score: "Percentage: 67.6%",
      location: "Karath, Bihar",
    },
  ] as EducationItem[],

  achievements: [
    {
      id: "ach-mern",
      category: "Certification",
      title: "MERN Stack Certification",
      issuer: "IIIT (Indian Institute of Information Technology)",
      location: "Prayagraj",
      description:
        "Comprehensive certification covering MongoDB, Express.js, React, and Node.js full-stack development patterns and modern API engineering, reflected in full-stack platforms like PRESCRIPTO.",
    },
    {
      id: "ach-webdev",
      category: "Certification",
      title: "Web Development Certification",
      issuer: "Creative Zone",
      location: "Prayagraj",
      description:
        "Professional certification in responsive frontend engineering, semantic web practices, and modern client-side scripting across 35+ projects.",
    },
    {
      id: "ach-cp",
      category: "Competitive Programming",
      title: "50+ DSA Problems Solved",
      issuer: "LeetCode & GeeksforGeeks",
      description:
        "Solved 50+ data structures and algorithms problems on online competitive programming platforms including LeetCode and GeeksforGeeks, strengthening algorithmic efficiency and logic building.",
      stats: "50+ Algorithmic Problems Solved",
    },
  ] as AchievementItem[],
};
