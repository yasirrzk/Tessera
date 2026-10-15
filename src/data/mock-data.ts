import { BentoCard, UserProfile } from "@/types/card";

export const MOCK_CARDS: BentoCard[] = [
  {
    id: "card-1",
    type: "PROFILE",
    layout: { x: 0, y: 0, w: 2, h: 2 },
    content: {
      name: "Yasir Eka",
      bio: "Software Engineer crafting elegant interfaces & robust systems. Currently exploring AI-native product design.",
      status: "open",
      statusText: "Open to Work",
      avatarUrl: "",
      location: "Jakarta, Indonesia",
    },
    order: 0,
  },
  {
    id: "card-2",
    type: "SOCIAL_LINKS",
    layout: { x: 2, y: 0, w: 1, h: 1 },
    content: {
      github: "https://github.com/yasiru",
      linkedin: "https://linkedin.com/in/yasiru",
      twitter: "https://x.com/yasiru",
      email: "hello@yasiru.dev",
    },
    order: 1,
  },
  {
    id: "card-3",
    type: "TECH_STACK",
    layout: { x: 2, y: 1, w: 2, h: 1 },
    content: {
      skills: [
        "TypeScript", "React", "Next.js", "Node.js",
        "Tailwind CSS", "PostgreSQL", "Prisma", "Docker",
        "Figma", "Go"
      ],
    },
    order: 2,
  },
  {
    id: "card-4",
    type: "PROJECT",
    layout: { x: 3, y: 0, w: 1, h: 1 },
    content: {
      title: "BentoGrid Maker",
      description: "A no-code portfolio builder with drag-and-drop bento layout.",
      projectUrl: "https://bentogrid.app",
      tags: ["Next.js", "Tailwind", "TypeScript"],
    },
    order: 3,
  },
  {
    id: "card-5",
    type: "GITHUB_STATS",
    layout: { x: 0, y: 2, w: 2, h: 1 },
    content: {
      username: "yasiru",
      stars: 214,
      repos: 48,
      followers: 312,
      contributions: 1847,
    },
    order: 4,
  },
  {
    id: "card-6",
    type: "CUSTOM_NOTE",
    layout: { x: 2, y: 2, w: 2, h: 1 },
    content: {
      markdown: "Currently building **BentoGrid Maker** — a no-code portfolio builder. \n\nAvailable for freelance & full-time roles starting **Q1 2025**.",
    },
    order: 5,
  },
];

export const MOCK_USER: UserProfile = {
  id: "user-1",
  username: "yasiru",
  name: "Yasir Eka",
  bio: "Software Engineer & Builder",
  themeConfig: {
    theme: "dark",
    preset: "velvet",
    accent: "#1d4ed8",
  },
  isPublished: true,
  cards: MOCK_CARDS,
};
