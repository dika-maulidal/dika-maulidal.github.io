---
author: Dika Maulidal
pubDatetime: 2026-02-01T04:58:53Z
title: Manual File Carving (Recovery Data Lewat Hex)
slug: file-carving
featured: false
draft: false
tags:
  - recovery
  - forensics
description: Panduan praktis melakukan manual file carving menggunakan Hex Editor.
---

Pernah kepikiran nggak kalau file yang kita hapus pakai **Shift + Delete** itu sebenarnya nggak benar-benar hilang? Di lab ini akan ditunjukkan bagaimana cara mengambil data tersebut kembali secara manual lewat Hex Editor. Prosesnya dilakukan tanpa menggunakan tools otomatis, tapi dengan langsung menganalisis isi mentah (raw data) dari disk.

### Apa itu File Carving?

Simpelnya, **file carving** adalah teknik mencari dan mengambil file berdasarkan isi filenya sendiri (byte demi byte), bukan lewat daftar isi folder (metadata). Teknik ini sangat ampuh kalau tabel index sistem file sudah rusak atau sengaja dihapus.

### 1. Persiapan Lab

- **File Image:** Saya menggunakan file `usb_fat_carving.001` (Raw image dari USB). Kamu bisa ambil bahannya di sini:
  `wget https://github.com/frankwxu/digital-forensics-lab/raw/main/Basic_Computer_Skills_for_Forensics/file_carving/usb_image/120M.7z`
- **Tools:** HxD (Hex Editor).
- **Referensi Signature:** Untuk tahu kode awal dan akhir file (Header/Trailer), saya pantau di sini: [FileSig Database](https://filesig.search.org/).

---

### 2. Langkah-Langkah Carving di HxD

Tujuan kita kali ini adalah menyelamatkan file gambar **JPG**. Kuncinya ada di dua titik: **Header** (awal) dan **Trailer** (akhir).

#### Langkah A: Mencari Header (Titik Awal File)

Setiap file JPG pasti punya kode "awal" yang sama atau disebut Magic Number.

1. Buka file `usb_fat_carving.001` kamu di HxD.
   ![Membuka file image di HxD](/images/1-file-carving.png)
2. Tekan **Ctrl + F**, pilih tab **Hex-values**, masukkan kode: `FF D8 FF E0`.
   ![Input hex signature JPG di pencarian](/images/2-file-carving.png)
3. Kalau ketemu, klik pada byte `FF` pertama dan catat angka **Offset**-nya (misal: `52000`). Ini adalah titik _Start_ file kita.
   ![Menemukan offset awal file](/images/3-file-carving.png)

> **Note:** Biasanya akan ditemukan beberapa header JPG dalam satu disk image, namun untuk lab ini saya memilih yang pertama kali ditemukan.

#### Langkah B: Mencari Trailer (Titik Akhir File)

File JPG nggak akan bisa dibuka kalau tidak memiliki kode penutup yang lengkap, yaitu `FF D9`.

1. Masih di HxD, lakukan pencarian (**Ctrl + F**) untuk kode hex `FF D9`.
   ![Mencari trailer hex FF D9](/images/4-file-carving.png)
2. **Tips:** Karena kode `FF D9` sering muncul di tengah data sebagai kode warna, pastikan kamu mencari yang posisinya paling logis—biasanya tepat sebelum blok data kosong (`00 00` atau `FF FF`).
3. Gunakan fitur search **Forward** dari posisi header. Setelah ketemu yang diyakini sebagai akhir file, catat offset-nya.

![Melihat posisi offset trailer](/images/5-file-carving.png)

> **Note:** Berdasarkan praktikum saya, offset akhirnya terletak pada `66C34`.

#### Langkah C: Ekstraksi Data (The Carving)

1. Gunakan fitur **Select Block** (**Ctrl + E**).
2. Masukkan alamat **Start Offset** (dari Langkah A) dan **End Offset** (dari Langkah B).
3. **Penting:** Tambahkan 1 byte pada End Offset di kolom pencarian agar karakter terakhir (`D9`) ikut terbawa sepenuhnya.
   ![Dialog Select Block di HxD](/images/6-file-carving.png)
4. Kalau data sudah terblok (berwarna biru), tekan **Copy (Ctrl + C)**.
   ![Menyalin blok hex yang dipilih](/images/8-file-carving.png)
5. Bikin tab baru di HxD (**Ctrl + N**), lalu **Paste (Ctrl + V)**.
6. Simpan filenya lewat **File > Save As**, beri nama `hasil_recovery.jpg`.

---

### 3. Hasil Praktikum

Setelah file disimpan, saya mencoba membukanya secara normal. Hasilnya, file gambar berhasil dibuka dengan normal dan menampilkan gambar kucing tanpa kerusakan.

![Hasil foto yang berhasil di-recover](/images/hasil-recover.png)

### Kesimpulan

Manual file carving membantu memahami bagaimana data disimpan di dalam disk pada level biner. Dengan mengetahui header dan trailer suatu file, kita bisa mengambil kembali data yang sudah terhapus meskipun informasi dari file system-nya sudah tidak tersedia. Selama data tersebut belum tertimpa dan masih tersimpan secara berurutan, proses recovery masih bisa dilakukan menggunakan hex editor tanpa bantuan tools otomatis.
