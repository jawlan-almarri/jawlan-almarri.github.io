/**
 * ─────────────────────────────────────────────────────────────────────────
 *  Portfolio content — single source of truth
 * ─────────────────────────────────────────────────────────────────────────
 *  Every piece of copy, every list, and every section heading lives here so
 *  that:
 *    • UI components stay purely presentational (they render data, nothing more)
 *    • Updating the site is a one-file change
 *    • The shape below could be swapped for a CMS/JSON API with no UI rewrite
 *
 *  Conventions
 *    • `id` fields must match the section DOM ids used for scroll-spy + nav.
 *    • Arrays preserve display order (top → bottom, strongest → least).
 * ─────────────────────────────────────────────────────────────────────────
 */

// Project cover art — custom SVG, designed to match the site's visual identity.
import coverMedia from "@/assets/projects/cover-media.svg";
import coverBrain from "@/assets/projects/cover-brain.svg";
import coverFace from "@/assets/projects/cover-face.svg";

// Lightweight WebP previews (page 1 of each certificate). The card links to the
// live INE verification page, so the heavy source PDFs are intentionally NOT
// bundled — they remain under assets/certs/ only as the source for these thumbs.
import thumbECDFP from "@/assets/certs/thumbs/eCDFP.webp";
import thumbEJPT from "@/assets/certs/thumbs/eJPT.webp";
import thumbEMAPT from "@/assets/certs/thumbs/eMAPT.webp";

// Company logos (transparent WebP) shown on the experience cards.
import logoMarafiq from "@/assets/logos/marafiq.webp";
import logoRoyalCommission from "@/assets/logos/royal-commission.webp";

/* ── Identity ────────────────────────────────────────────────────────────── */

/** Name + role, defined once and reused by the navbar, hero, and footer. */
export const IDENTITY = {
  name: "Jawlan Almarri",
  /** Rendered with separators; the first item is visually emphasised. */
  roles: ["Software Developer", "Cybersecurity"],
};

/** Pre-joined tagline for compact places (navbar subtitle, footer, metadata). */
export const TAGLINE = IDENTITY.roles.join(" · ");

/** Primary contact channels surfaced across the UI. */
export const LINKS = {
  email: "jawlan.almarri@gmail.com",
  linkedin: "https://linkedin.com/in/jawlan-almarri",
  /** CV is served from /public; BASE_URL keeps it correct on subpath hosting. */
  cv: "Jawlan_Almarri_CV.pdf",
};

/* ── Navigation ──────────────────────────────────────────────────────────── */

/** Order here drives the nav menu, the scroll-spy, and the on-page sequence. */
export const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "publications", label: "Publications" },
  { id: "certifications", label: "Certifications" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "activities", label: "Activities" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

/** Referentially-stable id list for the scroll-spy hook. */
export const SECTION_IDS = NAV_ITEMS.map((n) => n.id);

/**
 * Section headings + descriptions.
 * Keeping these beside the content (rather than hard-coded in each component)
 * means copy edits never require touching JSX.
 */
export const SECTIONS = {
  experience: {
    title: "Experience",
    description: "Hands-on roles across software development and enterprise systems.",
  },
  education: {
    title: "Education",
    description: "My academic background in computer science.",
  },
  publications: {
    title: "Publications",
    description: "Peer-reviewed research, with verifiable links to the publisher.",
  },
  certifications: {
    title: "Certifications",
    description: "Verified certifications issued by INE.",
  },
  skills: {
    title: "Skills",
    description: "Core technical strengths and collaboration skills.",
  },
  projects: {
    title: "Projects",
    description: "Selected projects across web systems, deep learning, and real-time computer vision.",
  },
  activities: {
    title: "Cybersecurity Awareness Activities",
    description: "Workshops and initiatives focused on practical security awareness and hands-on learning.",
  },
  achievements: {
    title: "Achievements",
    description: "Recognitions and competition results that highlight my focus on cybersecurity and problem-solving.",
  },
  contact: {
    title: "Contact",
    description: "I'm open to opportunities and collaborations — let's connect.",
  },
};

/* ── Hero ────────────────────────────────────────────────────────────────── */

export const HERO = {
  availability: "Open to opportunities",
  greeting: "Hello, I'm",
  summary:
    "Full-Stack Software Developer with experience building modern web applications using contemporary technologies. Passionate about creating scalable, user-focused solutions with a strong foundation in cybersecurity and secure software development.",
};

/* ── Experience ──────────────────────────────────────────────────────────── */

export const EXPERIENCE = [
  {
    role: "Software Developer — Tamheer Trainee",
    org: "Marafiq — Power & Water Utility Company for Jubail and Yanbu",
    logo: logoMarafiq,
    logoAlt: "Marafiq logo",
    period: "04/2026 – Present",
    location: "Jubail, Saudi Arabia",
    bullets: [
      "Conducted QA testing for Marafiq CRM, validating business processes and ensuring application quality.",
      "Acquired hands-on knowledge of SAP systems and enterprise business workflows.",
      "Worked with Google Cloud Platform (GCP) and integration technologies to understand enterprise application connectivity.",
      "Developed a GIS-based interactive map covering all districts of Jubail Industrial City using Google Maps and GeoJSON.",
      "Built modern web applications using the Frappe Framework and Next.js.",
    ],
  },
  {
    role: "Full-Stack Developer — Coop Trainee",
    org: "Royal Commission for Jubail and Yanbu",
    logo: logoRoyalCommission,
    logoAlt: "Royal Commission for Jubail and Yanbu logo",
    period: "01/2025 – 05/2025",
    location: "Jubail, Saudi Arabia",
    bullets: [
      "Authored multiple Business Requirement Documents (BRDs) and designed user interfaces tailored to business needs.",
      "Developed a web application using .NET technologies, ensuring functionality and user-friendly design.",
      "Gained hands-on experience with Azure DevOps, testing, task management, and cloud deployment.",
    ],
  },
];

/* ── Education ───────────────────────────────────────────────────────────── */

export const EDUCATION = {
  degree: "Bachelor of Computer Science",
  school: "Jubail Industrial College",
  date: "2025",
  location: "Jubail, Saudi Arabia",
};

/* ── Publications ────────────────────────────────────────────────────────── */

/**
 * `authors` is an array so the owner's name can be highlighted without fragile
 * string matching. `points` are the at-a-glance contributions of the work.
 */
export const PUBLICATIONS = [
  {
    type: "Journal Article",
    status: "Published – Open Access",
    year: "2026",
    title:
      "An Interpretable CNN Framework for Multi-Class Brain Tumor Classification with Visual Explanation in MRI Scans",
    authors: [
      { name: "H. AlShehri" },
      { name: "L. Almogbil" },
      { name: "J. Alrajhi" },
      { name: "L. Alosaimi" },
      { name: "J. Almarri", me: true },
    ],
    venue: "Systems and Soft Computing (Elsevier)",
    points: [
      "Lightweight deployment-oriented deep learning framework.",
      "Four-class brain tumor classification.",
      "99.54% accuracy.",
      "Grad-CAM visual explanations.",
      "Offline desktop application.",
    ],
    doi: "https://doi.org/10.1016/j.sasc.2026.200493",
    url: "https://www.sciencedirect.com/science/article/pii/S2772941926000566",
  },
];

/* ── Certifications ──────────────────────────────────────────────────────── */

export const CERTIFICATIONS = [
  {
    title: "Digital Forensics Professional (eCDFP)",
    issuer: "INE",
    thumb: thumbECDFP,
    url: "https://certs.ine.com/7a6c0301-a414-4253-8720-e610c1253acc#acc.gWPLNaod",
  },
  {
    title: "Junior Penetration Tester (eJPT)",
    issuer: "INE",
    thumb: thumbEJPT,
    url: "https://certs.ine.com/8776210c-e0dd-40f0-9855-c685fe6a8b91#acc.P7f4MqTW",
  },
  {
    title: "Mobile Application Penetration Tester (eMAPT)",
    issuer: "INE",
    thumb: thumbEMAPT,
    url: "https://certs.ine.com/8a639902-8964-4de9-89f9-2f3ebfd78ef6#acc.PnmA41cg",
  },
];

/* ── Skills ──────────────────────────────────────────────────────────────── */

/**
 * Skills grouped into bento-friendly categories. `id` drives the icon lookup
 * in SkillsSection; the same underlying skills as before, just regrouped —
 * no new items were added.
 */
export const SKILLS = [
  {
    id: "languages",
    title: "Languages",
    items: ["Python", "C#", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "frameworks",
    title: "Frameworks",
    items: ["ASP.NET", "Frappe", "React.js", "Next.js"],
  },
  {
    id: "frontend-data",
    title: "Frontend & Data",
    items: ["HTML", "CSS", "Tailwind", "Bootstrap", "SQL Server"],
  },
  {
    id: "interpersonal",
    title: "Interpersonal",
    items: [
      "Leadership",
      "Team Collaboration",
      "Problem Solving",
      "Critical Thinking",
      "Effective Communication",
    ],
  },
];

/* ── Projects ────────────────────────────────────────────────────────────── */

export const PROJECTS = [
  {
    title: "Media Request Management System",
    cover: coverMedia,
    tags: ["ASP.NET Core MVC", "EF Core", "RBAC", "Repository Pattern"],
    desc:
      "Professional web-based workflow system for managing governmental media service requests with role-based access, request tracking, audit history, and scalable architecture.",
    details: [
      "Implemented RBAC, request lifecycle tracking, and detailed history logs for auditing.",
      "Built dashboards, notifications, dynamic forms, and task assignments using the repository pattern.",
    ],
  },
  {
    title: "Brain Tumor Classification (MRI)",
    featured: true,
    cover: coverBrain,
    tags: ["Python", "CNN", "TensorFlow", "Keras", "Grad-CAM"],
    desc:
      "Deep learning desktop application that classifies brain MRI scans into four tumor categories with 99.54% accuracy and Grad-CAM visual explanations. The research behind this project is published in Elsevier's Systems and Soft Computing.",
    details: [
      "Awarded 1st place at PROJECTS Expo 2024 among COIT & MIS graduation projects.",
      "Integrated Grad-CAM heatmaps so predictions stay transparent and clinically verifiable.",
    ],
    links: [
      {
        label: "Read the paper",
        url: "https://www.sciencedirect.com/science/article/pii/S2772941926000566",
      },
    ],
  },
  {
    title: "Face Recognition",
    cover: coverFace,
    tags: ["Python", "YOLO", "Real-time", "Deep Learning"],
    desc:
      "Real-time face detection and recognition system built with Python and YOLO (You Only Look Once).",
    details: [
      "Designed a detection + recognition pipeline optimized for low-latency streams.",
      "Structured the codebase for clarity, reuse, and easy future model upgrades.",
    ],
  },
];

/* ── Activities ──────────────────────────────────────────────────────────── */

export const ACTIVITIES = [
  {
    year: "2025",
    title: "Initiative: Cybersecurity Awareness",
    bullets: [
      "Led the “Cybersecurity Awareness Hour” initiative at Jubail Industrial College.",
      "Enhanced students' cybersecurity mindset and adoption of best practices.",
    ],
  },
  {
    year: "2024",
    title: "Workshop: Introduction to Cybersecurity",
    bullets: [
      "Delivered a week-long workshop covering Cryptography, Web Exploitation, Network Security, and GRC.",
      "Partnered with SAFCSP to create hands-on CTF challenges.",
    ],
  },
];

/* ── Achievements ────────────────────────────────────────────────────────── */

/**
 * `tier` drives the icon + accent colour (see AchievementsSection), which keeps
 * styling decisions in data rather than parsing the title string at render time.
 *   "gold" → 1st place   ·   "rank" → leaderboard placement
 */
export const ACHIEVEMENTS = [
  {
    year: "2024",
    tier: "gold",
    title: "1st Place — PROJECTS EXPO 2024",
    desc: "Awarded 1st place at Expo 2024 among COIT & MIS graduation projects.",
  },
  {
    year: "2024",
    tier: "gold",
    title: "1st Place — CyberHub Club (Jubail College)",
    desc: "Achieved 1st place in CyberHub club and ranked 4th among Saudi universities.",
  },
  {
    year: "2024",
    tier: "gold",
    title: "1st Place — Capture the Flag (CTF), Jubail College",
    desc: "Won 1st place in the college CTF competition.",
  },
  {
    year: "2024",
    tier: "rank",
    title: "85th Place — Black Hat MEA 2024 CTF",
    desc: "Ranked 85th in the Middle East & Africa and qualified among the top 250 teams in the finals.",
  },
];
