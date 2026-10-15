Product Requirement Document (PRD): BentoGrid Maker
1. Project Overview & Objective
Nama Produk: BentoGrid Maker

Deskripsi: Web app no-code/low-code berbasis kanvas drag-and-drop untuk membuat halaman profil portofolio bergaya modular Bento Grid secara instan.

Target Pengguna: Software Engineer, UI/UX Designer, Tech Enthusiast, dan Content Creator yang membutuhkan link-in-bio / portofolio interaktif tanpa repot coding dari nol.

Tujuan Utama (MVP):

Mengizinkan user mengelola layout kartu modular (1x1, 1x2, 2x1, 2x2).

Menyediakan widget bawaan (Profil, Tech Stack, Proyek, GitHub stats, Kontak).

Menghasilkan URL publik (/p/:username) yang ringan, responsif, dan teroptimasi SEO.

2. Technical Stack & Architecture
Frontend: Next.js (App Router), TypeScript, Tailwind CSS, Lucide React (ikon).

Drag-and-Drop Engine: @dnd-kit/core + @dnd-kit/sortable (atau react-grid-layout).

Backend & API: Next.js Route Handlers / Node.js Express.

ORM & Database: Prisma ORM dengan PostgreSQL (dukungan field Json/JSONB).

Authentication: NextAuth.js / Supabase Auth (OAuth GitHub & Google).

Storage: Supabase Storage / Cloudinary (upload avatar & thumbnail project).

3. Database Schema (Prisma Data Model)
Cuplikan kode


datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  ADMIN
}

enum CardType {
  PROFILE
  PROJECT
  TECH_STACK
  GITHUB_STATS
  SOCIAL_LINKS
  CUSTOM_NOTE
}

model User {
  id          String   @id @default(uuid())
  email       String   @unique
  username    String   @unique
  name        String
  avatarUrl   String?
  bio         String?
  themeConfig Json     @default("{\"theme\": \"dark\", \"radius\": \"rounded-2xl\", \"font\": \"inter\"}")
  isPublished Boolean  @default(false)
  cards       Card[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([username])
}

model Card {
  id        String   @id @default(uuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  type      CardType
  title     String?
  // Layout data: { x: number, y: number, w: number, h: number }
  layout    Json
  // Content data: fleksibel per tipe widget
  // e.g. PROJECT: { link, description, bannerUrl, tags: [] }
  // e.g. TECH_STACK: { skills: ["React", "TypeScript", "Tailwind"] }
  content   Json
  order     Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt @updatedAt

  @@index([userId])
}
4. API Endpoints Specification
Authentication & User
POST /api/auth/[...nextauth] - OAuth login (GitHub/Google).

GET /api/user/me - Ambil data profil, preferensi tema, dan daftar kartu user saat ini.

PATCH /api/user/settings - Update username, bio, dan themeConfig.

Canvas & Card Management
GET /api/cards - Ambil seluruh kartu milik user aktif terurut berdasarkan koordinat/urutan.

POST /api/cards - Buat widget kartu baru:

Body: { type: CardType, layout: { x, y, w, h }, content: Record<string, any> }

PATCH /api/cards/:id - Edit data konten atau ukuran spesifik dari sebuah kartu.

DELETE /api/cards/:id - Hapus kartu dari kanvas.

PUT /api/cards/sync-layout - Batch update koordinat seluruh kartu setelah aksi drag-and-drop:

Body: { layouts: [{ id: string, layout: { x, y, w, h }, order: number }] }

Public Portfolio View
GET /api/public/:username - Ambil profil publik dan kartu (hanya jika isPublished: true). Caching dengan revalidate / ISR.

5. Functional Requirements (User Stories)
5.1 Onboarding & Setup
User masuk menggunakan akun GitHub atau Google.

User memilih username unik untuk URL portofolionya (misal: [domain.com/p/yasir](https://domain.com/p/yasir)).

Secara default, sistem membuatkan 3 kartu starter (Kartu Profil, Tech Stack dummy, dan Social Link).

5.2 Canvas & Editor
Interactive Grid: Kanvas berbasis 4-kolom (desktop) dan 1-kolom/2-kolom (mobile/tablet).

Modular Resizing: User dapat memilih preset ukuran kartu:

1x1 (Small Square - Cocok untuk Social Link / Ikon).

2x1 (Wide Rectangle - Cocok untuk Tech Stack / Github stats).

1x2 (Tall Rectangle - Cocok untuk Project Showcase vertikal).

2x2 (Big Square - Cocok untuk Kartu Profil Utama).

Collision / Reordering: Kartu otomatis bergeser secara mulus (smooth transition) saat kartu lain digeser melewati posisinya.

Widget Config Modal: Mengklik kartu membuka side drawer atau modal untuk mengedit teks, upload gambar, atau ganti icon.

5.3 Widget Catalog (MVP Types)
Profile Card: Menampilkan nama, bio singkat, status badge ("Open to Work" / "Busy"), dan foto profil.

Project Card: Menampilkan judul proyek, thumbnail/banner, tags stack, dan CTA button "Visit Project".

Tech Stack: Badges kumpulan teknologi yang didukung dengan auto-icon detection.

Social Links: Grid tombol cepat ke GitHub, LinkedIn, X, Email, Discord.

5.4 Theming & Publish
Theme Presets: Minimalist Light, Dark Stealth, Cyber Neon, Retro Monochrome.

Publish Toggle: Tombol switch "Publish". Jika aktif, halaman /p/:username dapat diakses oleh publik.

6. Non-Functional Requirements & Performance
Layout Shift Zero (CLS): Skeleton loading saat data kartu dimuat pertama kali di halaman publik.

Page Speed: Waktu First Contentful Paint (FCP) di halaman publik harus < 1.2s.

State Debounce: Sync batch layout via API diberi debounce 600ms setelah drag selesai agar tidak membebani database.

Responsive Breakpoints:

Desktop (≥ 1024px): 4 Kolom.

Tablet (768px - 1023px): 2 Kolom.

Mobile (< 768px): 1 Kolom berurutan berdasarkan nilai order.

7. Scope Boundaries (Out of Scope for MVP)
Custom domain mapping (CNAME kustom per user).

Integrasi payment gateway / monetisasi langganan berbayar.

Analitik traffic detail (pageview counter mini diperbolehkan, tapi analitik mendalam ditunda).