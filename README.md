# Anargya Car Showcase

Situs web showcase mobil listrik dengan tampilan modern, animasi halus, efek glow hijau, dan halaman produk interaktif. Dibangun dengan Next.js (App Router), Tailwind CSS, dan Framer Motion.

## Fitur Utama
- Hero dengan teks glow “Always Energized” dan CTA responsif.
- Navigasi cepat: link “Showcase” di navbar menuju `/#showcase` dari halaman mana pun.
- Efek NOS Cursor (glow hijau mengikuti kursor) di seluruh halaman.
- Statistik dengan efek count-up (0 → target), animasi masuk, dan hover glow.
- Car Showcase dengan kartu animasi dan modal “View Details” (frontend-only, tanpa backend).
- Halaman Products:
  - Pencarian, filter kategori, sorting, pagination.
  - Penanganan aman tipe kategori (string/objek).
  - Kartu produk dengan border gradient, badge diskon/kategori, glow saat hover.
  - Spinner loading dengan glow.
  - CTA akhir untuk kembali ke Home atau Explore Showcase.

## Teknologi
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- TypeScript

## Prasyarat
- Node.js `>= 18`
- npm atau pnpm

## Menjalankan Secara Lokal
Install dependencies:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka `http://localhost:3000/`.

Build produksi:

```bash
npm run build
```

Jalankan hasil build:

```bash
npm start
```

Linting (opsional):

```bash
npx next lint
```

## Struktur Proyek (ringkas)
- `app/page.tsx` — Halaman Home: hero, stats, showcase, modal “View Details”, about, footer.
- `app/products/page.tsx` — Halaman Products: search/filter/sort/pagination, grid produk, CTA.
- `components/navbar.tsx` — Navbar dengan link `/#showcase`, `/#about`, glow logo.
- `components/NOSCursorEffect.tsx` — Efek NOS kursor (canvas overlay).
- `app/globals.css` — Style global termasuk utilitas `glow-text`.
- `public/images/` — Gambar dan aset.

## Cara Kustomisasi
- Mengubah data mobil:
  - Edit array `cars` di `app/page.tsx` (name, type, power, topSpeed, image).
- Mengubah warna glow:
  - Ubah kelas Tailwind `drop-shadow-[...]` atau `text-primary` di komponen terkait.
- Mematikan efek NOS:
  - Hapus `<NOSCursorEffect />` dari halaman yang tidak diinginkan.
- Menambah statistik:
  - Gunakan komponen `AnimatedStat` di `app/page.tsx` dengan `value` dan `label`.

## Perilaku Navigasi
- Navbar “Showcase” menggunakan `Link href="/#showcase"`, sehingga:
  - Saat di `/products`, klik “Showcase” langsung pindah ke Home dan scroll ke section Showcase.


## Catatan
- Modal “View Details” di Home sepenuhnya frontend-only (tanpa fetch/API).
- Halaman Products telah diperbarui agar menangani kategori bertipe `string[]` atau objek secara aman.
- Efek glow menggunakan Tailwind `filter drop-shadow-[...]` dan utilitas `glow-text`.


