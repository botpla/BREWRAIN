# BrewRAIN – Order Form (React + Vite + Tailwind)

Single-file order form dengan WhatsApp share & print struk.

## Jalankan di laptop
1. Install Node.js LTS
2. Buka terminal di folder ini:
   ```bash
   npm install
   npm run dev
   ```
3. Buka URL yang muncul (biasanya `http://localhost:5173`).

## Deploy cepat (GitHub)
- Buat repo baru di GitHub > Upload semua file/folder proyek ini.
- Atau gunakan git:
  ```bash
  git init
  git add .
  git commit -m "init"
  git branch -M main
  git remote add origin https://github.com/<username>/brewrain-order-form.git
  git push -u origin main
  ```

## Catatan
- Komponen UI `button/input/textarea/card/badge` adalah stub minimal sehingga proyek jalan tanpa instalasi shadcn.
- Ubah daftar menu di `src/BrewRAINOrderForm.jsx` pada konstanta `PRODUCTS`.
- Set nomor WA seller di fungsi `openWA` jika perlu.

---

## Deploy ke GitHub Pages
1. Pastikan file `vite.config.js` punya `base: '/brewrain-order-form/'` (ganti sesuai nama repo).
2. Commit & push ke branch `main`.
3. Buka GitHub → Settings → Pages → **Build and deployment**: pilih **GitHub Actions**.
4. Workflow `Deploy to GitHub Pages` akan jalan otomatis. Setelah sukses, URL akan muncul di tab **Pages**: `https://<username>.github.io/brewrain-order-form/`

