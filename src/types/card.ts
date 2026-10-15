export type CardType =
  | "PROFILE"
  | "PROJECT"
  | "TECH_STACK"
  | "GITHUB_STATS"
  | "SOCIAL_LINKS"
  | "CUSTOM_NOTE";

export type CardSize = "1x1" | "2x1" | "1x2" | "2x2";

export interface CardLayout {
  x: number;
  y: number;
  w: number; // 1 or 2
  h: number; // 1 or 2
}

export interface ProfileContent {
  name: string;
  bio: string;
  status: "open" | "busy" | "custom";
  statusText?: string;
  avatarUrl?: string;
  location?: string;
}

export interface ProjectContent {
  title: string;
  description: string;
  bannerUrl?: string;
  projectUrl?: string;
  tags: string[];
}

export interface TechStackContent {
  skills: string[];
}

export interface GitHubStatsContent {
  username: string;
  stars?: number;
  repos?: number;
  followers?: number;
  contributions?: number;
}

export interface SocialLinksContent {
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  discord?: string;
  website?: string;
}

export interface CustomNoteContent {
  markdown: string;
  bgColor?: string;
}

export type CardContent =
  | ProfileContent
  | ProjectContent
  | TechStackContent
  | GitHubStatsContent
  | SocialLinksContent
  | CustomNoteContent;

export interface BentoCard {
  id: string;
  type: CardType;
  title?: string;
  layout: CardLayout;
  content: CardContent;
  order: number;
}

export type Theme = "dark" | "light";

export interface ThemeConfig {
  theme: Theme;
  preset: "swiss" | "industrial" | "brutalism" | "velvet";
  accent: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  themeConfig: ThemeConfig;
  isPublished: boolean;
  cards: BentoCard[];
}
