---
title: "Thumbcache"
date: 2026-03-28T22:15:45+07:00
draft: true
type: docs
---

**ThumbCache** ThumbCache adalah fitur pada sistem operasi Windows (dimulai sejak Windows Vista) yang digunakan untuk menyimpan cache gambar thumbnail dari file agar tampilan Windows Explorer lebih cepat. Saat pengguna membuka folder dalam tampilan thumbnail, sistem tidak perlu memproses ulang file aslinya, melainkan cukup mengambil gambar kecil yang sudah tersimpan di database terpusat ini.

> [!NOTE]
> **Tips Akses**: Berbeda dengan sistem lama (XP) yang menyimpan thumbs.db di setiap folder, sistem modern menyimpan ThumbCache secara terpusat di direktori profil pengguna. Gunakan tool forensik untuk mengekstraknya dari jalur: `C:\Users\[Username]\AppData\Local\Microsoft\Windows\Explorer`.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Users[Username]\AppData\Local\Microsoft\Windows\Explorer
</code></pre></td></tr><tr><td><strong>Format</strong></td><td>Binary Database (<code>.db</code>)</td></tr><tr><td><strong>OS Version</strong></td><td>Windows Vista, 7, 8, 10, 11</td></tr><tr><td><strong>Key Files</strong></td><td><code>thumbcache_*.db</code> dan <code>thumbcache_idx.db</code> (Index)</td></tr><tr><td><strong>Forensic Value</strong></td><td>Membuktikan eksistensi file (terutama gambar/video) meskipun file asli telah dihapus dari disk.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FyAw5gYq3PD75ZLv8stz2%2Fimage.png?alt=media&#x26;token=9fc335c6-a8a2-4dd4-b0ae-67369550e7d8" alt="" data-size="original"></td></tr></tbody></table>

### Digital Forensics Value

Thumbnail cache adalah "harta karun" bagi investigator, terutama dalam kasus yang melibatkan konten ilegal atau penghapusan bukti. Investigator dapat:

* **Pemulihan Bukti yang Dihapus**: Meskipun pengguna telah menghapus file gambar atau video, thumbnail-nya sering kali tetap tersisa di dalam database cache.
* I**dentifikasi Metadata**: Analisis ThumbCache menghasilkan informasi seperti metadata file asli, Cache ID, checksum header, tipe data, dan ukuran data.
* **Bukti Pengetahuan (Knowledge)**: Menunjukkan bahwa file tersebut memang pernah ada di sistem dan pernah dilihat oleh pengguna melalui Windows Explorer.

### Struktur & Ukuran ThumbCache

Windows menyimpan thumbnail dalam berbagai ukuran piksel untuk mendukung berbagai mode tampilan (Small, Medium, Large, Extra Large icons).

* Windows 7: Memiliki maksimal 4 ukuran utama (32x32, 96x96, 256x256, dan 1024x1024).
* Windows 10/11: Memiliki rentang lebih luas, mulai dari 16 piksel hingga 2560 piksel.
* Index File: `thumbcache_idx.db` berfungsi sebagai navigasi yang berisi *pointers* ke lokasi sub-rekaman di dalam file database utama.

#### Komponen Rekaman (Record)

Setiap entri di dalam file `.db` mengandung:

* Cache Record ID: Identitas unik rekaman.
* Data Type: Format file asal (JPEG, BMP, PDF, DOCX, dll).
* Data Checksum: Digunakan untuk validasi integritas data.
* Data Offset & Size: Lokasi dan ukuran gambar thumbnail di dalam database.

### Prosedur Ekstraksi & Analisis

#### 1. Ekstraksi dengan KAPE atau FTK Imager

Karena file ini berada di dalam profil pengguna, pastikan Anda mengambil seluruh isi folder Explorer untuk mendapatkan database dan indeksnya:

1. Targetkan direktori: `AppData\Local\Microsoft\Windows\Explorer`

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2Fg3No6GbM6rhtw9ANEfyg%2Fimage.png?alt=media&#x26;token=ef2c7dec-6652-437a-b7bb-20b92b8c5870" alt="" width="375"><figcaption></figcaption></figure>

1. Ambil semua file dengan awalan `thumbcache_*.db`.

#### 2. Analisis Menggunakan ThumbCache Viewer

Gunakan tool khusus untuk melihat isi gambar di dalam database:

* Buka ThumbCache Viewer.
* Pilih `File` > `Open` dan arahkan ke salah satu file database (contoh: `thumbcache_1280.db`).

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2Fr7cMTEBylMo8qFtpxiY8%2Fimage.png?alt=media&#x26;token=61ff0495-54b1-4ac3-be1e-29734f64efac" alt="" width="375"><figcaption></figcaption></figure>

* Tool akan menampilkan daftar gambar yang tersimpan beserta metadata aslinya.

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FfkjTxRnxBo2k4XNQz8YG%2Fimage.png?alt=media&#x26;token=9ae9564c-7c4a-4724-89bd-a4c35ff53ccd" alt="" width="375"><figcaption></figcaption></figure>

### Tools yang Direkomendasikan

| Tool                  | Deskripsi                                                                 |
| --------------------- | ------------------------------------------------------------------------- |
| **ThumbCache Viewer** | Tool GUI terbaik untuk mengekstrak dan melihat gambar dari file database. |
| **Thumbs Viewer**     | Digunakan khusus untuk membedah file `thumbs.db` versi lama.              |
| **NirSoft ThumbNet**  | Tool alternatif untuk melihat riwayat thumbnail.                          |

