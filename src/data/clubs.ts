import { PLACEHOLDER } from "./itsa";

/**
 * Chapters and wings operating under ITSA. Only officially published facts
 * are stated; unavailable fields are set to PLACEHOLDER so they can be
 * filled in later without touching the UI.
 */
export type Club = {
  id: string;
  name: string;
  short: string;
  domain: string;
  description: string;
  activities: string[];
  facultyCoordinator: string;
  studentCoordinator: string;
  code: string;
};

export const clubs: Club[] = [
  {
    id: "itsa",
    name: "Information Technology Students' Association",
    short: "ITSA",
    domain: "Department-wide student body",
    description:
      "The parent association coordinating all technical, academic, cultural and social activities of the IT Department through 14 specialised teams.",
    activities: [
      "Technical competitions and workshops",
      "Induction and Tech Pulse",
      "Higher studies and CDPC guidance",
      "Art Circle, Sports and publicity drives",
    ],
    facultyCoordinator: "Mrs. Shraddha Tawade (ITSA Coordinator)",
    studentCoordinator: "Bhagyseh Mali (President)",
    code: "ITSA//CORE",
  },
  {
    id: "ieee",
    name: "IEEE Student Branch",
    short: "IEEE",
    domain: "Professional chapter · research & industry",
    description:
      "The IEEE Student Branch connects students to global technical communities, research exposure and industry networks, and runs awareness and membership drives in the department.",
    activities: [
      "IEEE Awareness & Membership Drive",
      "Expert and society sessions",
      "IEEE Computer Society TCSE D&I grant project (CodeBhoomi)",
      "InventPitch and IEEE Pune Section competitions",
    ],
    facultyCoordinator: PLACEHOLDER,
    studentCoordinator: "Saloni Khandelwal (Chair) · Ishan Toraskar (Co-Chair)",
    code: "ITSA//IEEE",
  },
  {
    id: "mlsc",
    name: "Microsoft Learn Student Chapter",
    short: "MLSC",
    domain: "Cloud, developer tooling & training",
    description:
      "MLSC partners with ITSA on hands-on technical training, most recently the Techroom 2.0 launch and its follow-up training sessions.",
    activities: ["Techroom 2.0 launch", "Hands-on technical training sessions"],
    facultyCoordinator: PLACEHOLDER,
    studentCoordinator: PLACEHOLDER,
    code: "ITSA//MLSC",
  },
  {
    id: "gdgc",
    name: "Google Developer Groups on Campus",
    short: "GDGC",
    domain: "Developer community",
    description:
      "GDGC is one of the professional chapters ITSA collaborates with, named in the association's mission to strengthen industry–academia interaction.",
    activities: ["Joint departmental celebrations and chapter collaborations"],
    facultyCoordinator: PLACEHOLDER,
    studentCoordinator: PLACEHOLDER,
    code: "ITSA//GDGC",
  },
  {
    id: "nss",
    name: "ISR & NSS Unit (IT)",
    short: "NSS",
    domain: "Social responsibility",
    description:
      "The ISR & NSS wing runs the department's community work — cleanliness drives, school awareness programmes and plantation initiatives.",
    activities: [
      "Tree Plantation Drive (300 saplings, Durga Tekdi)",
      "Ganesh Visarjan cleanliness drive",
      "Z.P. School Newale Wasti awareness drive",
    ],
    facultyCoordinator: "Prof. Rohit Tate (NSS Coordinator)",
    studentCoordinator: PLACEHOLDER,
    code: "ITSA//NSS",
  },
  {
    id: "art-circle",
    name: "Art Circle",
    short: "ART",
    domain: "Creative & cultural",
    description:
      "The creative wing of ITSA, behind cultural celebrations and craft workshops such as the Diya Painting Workshop.",
    activities: ["Diya Painting Workshop", "Cultural celebrations"],
    facultyCoordinator: PLACEHOLDER,
    studentCoordinator: PLACEHOLDER,
    code: "ITSA//ART",
  },
];
