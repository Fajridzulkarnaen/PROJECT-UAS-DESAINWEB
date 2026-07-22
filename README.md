<div align="center">
  <img src="assets/images/logo.png" alt="B.Collony Parfume Logo" width="180">

B.Collony Parfume

Leave Your Signature

Website katalog dan pemesanan parfum premium yang dikembangkan sebagai project Ujian Akhir Semester mata kuliah Desain Web.

Lihat Website

</div>

Tentang Project

B.Collony Parfume adalah website multi-page untuk menampilkan profil brand, koleksi parfum, produk unggulan, dan informasi kontak. Website dirancang dengan tampilan modern, elegan, responsif, dan interaktif untuk memberikan pengalaman eksplorasi produk yang nyaman pada perangkat desktop maupun mobile.

Pengunjung dapat mencari parfum, memfilter produk berdasarkan kategori, membuka detail aroma, menambahkan produk ke keranjang, mengatur jumlah pesanan, dan melanjutkan pemesanan melalui WhatsApp.

Fitur Utama

Tampilan responsif untuk desktop, tablet, dan mobile.

Navigasi multi-page dengan transisi halaman.

Katalog berisi 23 varian parfum.

Filter produk berdasarkan kategori Women, Men, dan Unisex.

Pencarian produk berdasarkan nama, kategori, atau karakter aroma.

Modal detail produk yang menampilkan harga, deskripsi, karakter, dan fragrance notes.

Shopping cart berbasis localStorage sehingga isi keranjang tetap tersimpan pada browser.

Pengaturan jumlah produk, penghapusan item, dan perhitungan total harga otomatis.

Checkout melalui WhatsApp dengan pesan dan rincian pesanan yang dibuat otomatis.

Pemesanan langsung melalui WhatsApp dari detail produk.

Halaman khusus produk best seller.

Form kontak dan newsletter pada antarmuka website.

Mobile navigation menu.

Scroll animation, parallax effect, 3D tilt, hover effect, dan back-to-top button.

Metadata halaman untuk membantu optimasi SEO dasar.

Dukungan prefers-reduced-motion untuk mengurangi animasi berdasarkan pengaturan perangkat pengguna.

Halaman Website

Halaman

File

Deskripsi

Home

index.html

Hero section, pengenalan brand, featured products, testimonial, dan call-to-action.

Our Story

story.html

Cerita, filosofi, perjalanan, dan nilai utama B.Collony.

Shop

shop.html

Katalog lengkap 23 produk dengan filter kategori.

Best Seller

bestseller.html

Detail produk Baccarat Rouge 540 dan rekomendasi produk terkait.

Contact

contact.html

Form kontak, lokasi, email, WhatsApp, dan media sosial.

Teknologi yang Digunakan

HTML5 untuk struktur halaman.

CSS3 untuk layout, responsive design, dan animasi.

Vanilla JavaScript untuk seluruh interaksi website.

Local Storage API untuk menyimpan isi keranjang.

WhatsApp Click to Chat untuk proses pemesanan.

Google Maps Link untuk mengarahkan pengunjung ke lokasi brand.

Project ini tidak menggunakan framework JavaScript maupun backend.

Struktur Project

PROJECT-UAS-DESAINWEB/
├── assets/
│   ├── images/
│   │   ├── bottle.png
│   │   ├── collection.jpg
│   │   ├── featured.jpg
│   │   ├── hero-bg.jpg
│   │   ├── logo.png
│   │   └── ...
│   ├── Botol.png
│   └── Logo.png
├── index.html
├── story.html
├── shop.html
├── bestseller.html
├── contact.html
├── products.js
├── script.js
├── style.css
└── README.md

Data Produk

Seluruh data produk disimpan pada file products.js. Informasi yang digunakan antara lain:

ID produk

Nama produk

Kategori

Harga

Gambar

Badge

Karakter aroma

Deskripsi

Top notes

Heart notes

Base notes

Pemisahan data produk dari struktur HTML membuat informasi produk lebih mudah dikelola dan digunakan kembali pada fitur pencarian, modal, dan shopping cart.

Cara Menjalankan Project

1. Menjalankan langsung

Clone repository:

git clone https://github.com/Fajridzulkarnaen/PROJECT-UAS-DESAINWEB.git

Masuk ke folder project:

cd PROJECT-UAS-DESAINWEB

Buka file berikut menggunakan browser:

index.html

2. Menggunakan Live Server

Untuk hasil yang lebih stabil, buka project melalui Visual Studio Code lalu jalankan ekstensi Live Server pada file index.html.

Project ini tidak memerlukan instalasi dependency, npm install, atau proses build.

Alur Pemesanan

Pengguna membuka halaman Shop.

Pengguna mencari atau memfilter produk.

Pengguna membuka detail produk atau langsung menambahkannya ke keranjang.

Pengguna mengatur jumlah produk pada shopping cart.

Website menghitung total harga secara otomatis.

Pengguna memilih Checkout via WhatsApp.

Website membuka WhatsApp dengan rincian pesanan yang sudah disusun otomatis.

Penyimpanan Keranjang

Data shopping cart disimpan di browser menggunakan key berikut:

bcollony_cart

Karena menggunakan localStorage, keranjang hanya tersimpan pada browser dan perangkat yang sama. Data tersebut tidak dikirim ke server.

Deployment

Website dapat di-deploy sebagai static website menggunakan:

cPanel hosting

GitHub Pages

Netlify

Vercel

Untuk deployment melalui cPanel, upload seluruh file project ke folder domain seperti public_html dan pastikan index.html berada di root folder tersebut.

Catatan

Website ini merupakan project front-end tanpa database dan backend.

Form kontak dan newsletter saat ini hanya menampilkan respons pada antarmuka dan belum mengirim data ke email atau server.

Isi keranjang disimpan secara lokal pada browser pengguna.

Checkout dan komunikasi pemesanan diarahkan melalui WhatsApp.

Gambar, logo, nama brand, dan konten produk digunakan sebagai bagian dari kebutuhan project akademik.

Tujuan Pengembangan

Project ini dibuat untuk menerapkan materi desain dan pengembangan web, meliputi:

Struktur website multi-page.

Semantic HTML.

Responsive web design.

Pengelolaan layout dan visual menggunakan CSS.

Manipulasi DOM dengan JavaScript.

Penyimpanan data sederhana menggunakan local storage.

Implementasi katalog, pencarian, filter, modal, dan shopping cart.

Deployment website ke hosting dan domain publik.

<div align="center">
  Dikembangkan sebagai project Ujian Akhir Semester Desain Web.
</div>
