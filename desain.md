## Design System: Neo-Brutalist & Tech Grid Guidelines

### 1. Filosofi Desain (Anti-AI Aesthetic)
* **Karakter Utama**: Utilitarian, presisi, berani, dan mekanis.
* **Banned Patterns**: 
  * Dilarang menggunakan gradien ungu/biru neon (*purple AI glow*).
  * Dilarang menggunakan *soft blurred drop shadow* (`shadow-lg`, `shadow-xl`).
  * Dilarang menggunakan *pill shape* melengkung ekstrem pada kartu kontainer.
* **Prinsip Utama**:
  * **Hard Edge / Micro Radius**: Sudut kartu tegas (`rounded-none` atau maksimal `rounded-md` 4px-6px).
  * **Solid Outlines**: Border tegas hitam solid 2px atau 3px di seluruh kartu dan tombol.
  * **Offset Hard Shadow**: Bayangan mati tanpa blur dengan sudut proyeksi 45 derajat.

---

### 2. Aturan Tipografi
* **Display & Heading**: Sans-serif geometris tebal dan padat.
  * Pilihan: `Space Grotesk`, `Syne`, atau `Archivo Black`.
  * Styling: Huruf kapital untuk judul modul (`uppercase font-bold tracking-tight`).
* **Body & Paragraf**: Sans-serif bersih dengan keterbacaan tinggi.
  * Pilihan: `Inter`, `Geist Sans`, atau `Plus Jakarta Sans`.
* **Metadata & Label Teknis**: Monospace murni untuk status, counter, dan tag.
  * Pilihan: `JetBrains Mono` atau `Space Mono`.
  * Format teks: Menggunakan prefix teknis (misal `[SEC_01]`, `SYS_STATUS // ONLINE`, `POS: 0,0`).

---

### 3. Palet Warna & Token Visual

| Token | Nilai Hex | Penggunaan |
| :--- | :--- | :--- |
| **Canvas Light** | `#F4F4F0` / `#ECEAE2` | Latar belakang dasar kanvas (krem kertas koran/kapur) |
| **Canvas Dark** | `#121316` | Latar kanvas mode gelap (charcoal aspal) |
| **Card Surface** | `#FFFFFF` (Light) / `#1A1C23` (Dark) | Warna latar modul kartu bento |
| **Hard Border** | `#000000` (Light) / `#FFFFFF` (Dark) | Garis tepi solid 2px-3px di semua modul |
| **Accent Primary** | `#FFDE59` (Electric Yellow) | Aksen tombol aksi, highlight tag, badge utama |
| **Accent Secondary**| `#FF5722` (Safety Orange) | Status peringatan, alert, toggle aktif |
| **Accent Terminal** | `#25D366` (Phosphor Lime) | Status LED "Available for hire", indikator live |

---

### 4. Detail Border & Hard Shadow (Spesifikasi CSS)

```css
/* Card Container Base */
.bento-card {
  border: 2px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  border-radius: 4px;
  background-color: #ffffff;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

/* Hover State */
.bento-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000000;
}

/* Dragging / Active State */
.bento-card:active,
.bento-card.is-dragging {
  cursor: grabbing;
  transform: translate(2px, 2px);
  box-shadow: 2px 2px 0px #000000;
}
5. Detail Teknis & Elemen Dekorasi Fisik
Corner Crosshairs: Tanda aksen + kecil di sudut luar grid atau kartu untuk kesan blueprint arsitektural.

Baris Status Monospace: Setiap kartu memiliki header mini berisi metadata nomor seri kartu, contoh: ID: CRD_08 // TYPE: PROJECT.

Empty State: Ketika kartu kosong, tampilkan garis batas putus-putus tebal (border-2 border-dashed border-black/40) dengan watermark tipografi mono berukuran besar, bukan ilustrasi kartun.

Button Style: Tombol berbentuk persegi panjang kaku dengan border 2px hitam dan shadow hitam 3px yang menekan ke dalam saat diklik (active:translate-x-[2px] active:translate-y-[2px] active:shadow-none).


<ElicitationsGroup message="Pilih langkah lanjutan untuk melengkapi implementasi brutalist ini:">
  <Elicitation label="Konfigurasi tailwind.config.ts brutalist" query="Buatkan tailwind.config.ts lengkap yang sudah mendefinisikan warna aksen, hard shadow kustom, dan font brutalist di atas."/>
  <Elicitation label="Komponen React Bento Card Brutalist" query="Tolong buatkan contoh kode komponen React Bento Card tipe Project dan Profile dengan styling brutalist ini."/>
</ElicitationsGroup>