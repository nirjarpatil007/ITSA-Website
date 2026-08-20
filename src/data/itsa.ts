/**
 * Core ITSA facts, sourced from the official ITSA site (praxis2026.online).
 * Anything not published there is marked `PLACEHOLDER` so it is obvious
 * what still needs official confirmation.
 */

export const PLACEHOLDER = "PLACEHOLDER — awaiting official information";

export const itsa = {
  shortName: "ITSA",
  fullName: "Information Technology Students' Association",
  department: "Information Technology Department, PCCoE, Pune",
  tagline: "A student-run engine for technology, research and responsibility.",
  intro:
    "ITSA is the Information Technology Students' Association of the IT Department at PCCoE, Pune. It runs the department's technical, academic, cultural and social-responsibility activities together with the IEEE Student Branch, MLSC and GDGC chapters.",
  vision:
    "To develop competent, ethical, and socially responsible Information Technology professionals by promoting academic excellence, technological innovation, leadership, and holistic student development in line with national and global standards.",
  mission: [
    "Strengthen industry–academia interaction through professional chapters",
    "Support higher studies, research, and lifelong learning",
    "Encourage social responsibility through ISR and NSS activities",
    "Promote cultural, creative, and ethical values",
    "Ensure student welfare, inclusivity, and leadership development",
  ],
  presidentGoals: [
    "Effective leadership and strategic direction aligned with institutional objectives",
    "Innovation and research orientation through workshops and project-based learning",
    "Strengthen collaboration among IEEE, MLSC, and GDGC chapters",
    "Promote social responsibility through ISR and NSS activities",
    "Support higher studies and research aspirations with mentorship programs",
    "Ensure inclusive participation and maintain NAAC/NBA quality standards",
    "Committed to excellence in IT education and professional development",
  ],
  stats: [
    { value: 18, suffix: "+", label: "Events held" },
    { value: 66, suffix: "", label: "Active members" },
    { value: 41, suffix: "", label: "SY members" },
    { value: 25, suffix: "", label: "TY members" },
  ],
  achievementStats: [
    { value: 18, suffix: "+", label: "Awards" },
    { value: 8, suffix: "+", label: "Sports wins" },
    { value: 5000, suffix: "+", label: "USD funding" },
    { value: 150, suffix: "+", label: "Members reached" },
  ],
  leadership: [
    { name: "Dr. Jayashree Katti", role: "Head of Department" },
    { name: "Mrs. Tanuja Patankar", role: "SDW Coordinator" },
    { name: "Mrs. Shraddha Tawade", role: "ITSA Coordinator" },
  ],
  highlight: {
    name: "Innoveda 2026",
    date: "18th March 2026",
    detail: "Young Researcher Conference 2025-26",
  },
  contact: {
    email: "itsadept@college.edu",
    phone: "+91 9834330401",
    address: "Information Technology Department, PCCoE, Pune",
    social: PLACEHOLDER,
  },
} as const;

export const storyChapters = [
  {
    key: "who",
    kicker: "Who we are",
    title: "The students' association of the IT Department at PCCoE.",
    body: itsa.intro,
  },
  {
    key: "what",
    kicker: "What we do",
    title: "Competitions, workshops, research drives and community work.",
    body: "From BRUTEFORGE and WebCrafter to AI expert sessions, GATE/GRE guidance, NSS drives and Techroom training, ITSA runs the department's calendar end to end across 14 specialised teams.",
  },
  {
    key: "why",
    kicker: "Why we exist",
    title: "Competent, ethical and socially responsible IT professionals.",
    body: itsa.mission.join(" · "),
  },
  {
    key: "where",
    kicker: "Where we are going",
    title: "Research orientation, industry links and inclusive leadership.",
    body: itsa.presidentGoals.slice(0, 4).join(" · "),
  },
] as const;
