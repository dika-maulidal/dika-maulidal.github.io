---
title: "Prefetch"
date: 2026-03-28T22:15:37+07:00
draft: true
type: docs
---

## Forensik Windows Artifact: Prefetch

### Pengantar dan Tujuan Prefetch

#### Latar Belakang

* Artifact forensik di Windows (termasuk Prefetch) pada awalnya **tidak dibuat untuk tujuan forensik**.
* Prefetch adalah fitur yang diterapkan untuk **meningkatkan pengalaman pengguna** (performa).

#### Tujuan Utama Prefetch

* Mempercepat **peluncuran aplikasi berikutnya** pada sistem Windows.
* Dilakukan dengan memantau program yang dieksekusi untuk *pre-cache* file dan sumber daya yang berinteraksi dengannya.
* Berlaku untuk **program GUI dan&#x20;*****command line***.

***

### Lokasi File dan Konvensi Penamaan

#### Direktori Kunci

* File Prefetch disimpan di **file system**, bukan di Registry (walaupun konfigurasi on/off ada di Registry).
* Lokasi Default: `%SystemRoot%\Prefetch` (Hampir selalu `C:\Windows\Prefetch`).

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FushizwJbrlDFj6mVUKpA%2Fpre.png?alt=media&#x26;token=fa3affe1-4dda-4680-bb3e-d9c62e19de1b" alt=""><figcaption></figcaption></figure>

#### Konvensi Penamaan File

* Format: `NAMA_EXECUTABLE-HASH.pf` (misalnya: `CMD.EXE-8E7B5BB.pf`).
  * **Nama Executable:** Dalam huruf kapital.
  * **Hash (8 Karakter Heksadesimal):** Bukan MD5/SHA, melainkan algoritma *proprietary* Windows.
    * Hash ini utamanya didasarkan pada ***full path*** (lokasi lengkap) di mana executable berada (misalnya: `c:\temp\evil.exe`).
    * Dalam beberapa kasus (seperti `svchost.exe`, `dllhost.exe`, `rundll32.exe`, `mmc.exe`), **parameter&#x20;*****command line*** juga diperhitungkan dalam hash.

#### Implikasi Forensik dari Hash

* Jika ditemukan **dua file `.pf` dengan nama executable yang sama tetapi&#x20;*****hash*****&#x20;berbeda**, itu berarti executable tersebut telah dijalankan dari **dua lokasi fisik yang berbeda** di sistem.
  * *Contoh:* Membandingkan `cmd.exe` dari `System32` vs. `SysWOW64`.

***

### Batasan Penyimpanan File

| Versi Windows             | Batasan File Maksimal | Status Default pada Server |
| ------------------------- | --------------------- | -------------------------- |
| **XP hingga 7**           | 128 file              | Tidak Diaktifkan           |
| **8 dan yang lebih baru** | 1024 file             | Tidak Diaktifkan           |

* File terlama akan dihapus secara otomatis ketika batas (1024 atau 128) tercapai.
* Prefetch dapat diaktifkan pada **Sistem Operasi Server** melalui Registry.

***

### Analisis Timestamp (Waktu Eksekusi)

Prefetch menyediakan bukti eksekusi dan waktu yang kuat melalui dua sumber:

#### 1. Dari File System (MACB Timestamps)

* Kita dapat menggunakan *Modification* (M) dan *Creation* (B) timestamp dari file `.pf`.
  * **Waktu Creation (B):** Dapat dipetakan ke **Waktu Eksekusi PERTAMA**.
  * **Waktu Modification (M):** Dapat dipetakan ke **Waktu Eksekusi TERAKHIR**.
* **Delta Koreksi (Aturan Umum):** Karena file `.pf` dibuat/dimodifikasi *setelah* proses pemantauan selesai (sekitar 10 detik setelah eksekusi dimulai), kurangi perkiraan **10 detik** dari timestamp Creation/Modification untuk mendekati waktu mulai eksekusi yang sebenarnya.

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F5VSFx48R1ZkPl1XPf63i%2Fpre.png?alt=media&#x26;token=b7075787-4d22-4f71-a983-d6dddbe8735b" alt=""><figcaption></figcaption></figure>

{% hint style="warning" %}
*Catatan:* Delta waktu bisa kurang dari 10 detik (misalnya 1 detik untuk `cmd.exe`).
{% endhint %}

{% hint style="info" %}
**Indikator Eksekusi Ganda:** Jika ada perbedaan antara timestamp Creation dan Modification, program tersebut telah berjalan **setidaknya dua kali**.
{% endhint %}

#### 2. Dari Isi File `.pf` (dengan Parser)

* Dengan *parsing* file `.pf`, kita dapat memperoleh:
  * **Total Run Count:** Jumlah total program dieksekusi.
  * **8 Waktu Eksekusi Terakhir (Windows 8 ke atas):** Timestamp dari delapan kali terakhir program dijalankan.
  * **Waktu Eksekusi ke-1 (Creation):** Waktu ini juga tercantum.

***

### Alat dan Data Penting dalam Parsing

#### Alat Rekomendasi

* **PECmd.exe** (dari Eric Zimmerman's Tools).
  * Sangat mudah digunakan: `-f` untuk satu file, `-d` untuk direktori.
  * Output bisa berupa CSV, JSON, atau HTML.
  * Mendukung analisis *Volume Shadow Copies* (VSS) untuk mendapatkan Prefetch yang lebih lama.

#### Data Forensik yang Diperoleh

Selain *Run Count* dan *Timestamps*, *parsing* file Prefetch juga mengungkap:

* **Direktori yang Direferensikan:** Daftar direktori yang diakses oleh program.
* **File yang Direferensikan:** Daftar file DLL, konfigurasi, dan data lain yang berinteraksi dengan executable.
  * **Kasus Kunci:** Untuk utilitas kompresi (seperti WinRAR), bagian ini dapat menunjukkan **file-file yang sebenarnya dikompresi** oleh utilitas tersebut.
* **Volume Serial Number**.
* **Ukuran File Asli (Original File Size)**.

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F93dMpa7kHo4AulyH7BZC%2Fprefetch%202.png?alt=media&#x26;token=1ef06cb9-3453-4c71-a06c-719188094211" alt=""><figcaption></figcaption></figure>

***

### Anti-Forensik Prefetch

* **Menghapus File Prefetch:** File `.pf` **dapat dihapus dengan mudah** tanpa menyebabkan *crash* sistem operasi.
* **Dampak Penghapusan:** Jika sebuah file `.pf` dihapus, maka:
  1. Bukti eksekusi sebelumnya hilang.
  2. Saat program dijalankan kembali, file Prefetch **baru akan dibuat**.
  3. File baru ini akan menampilkan waktu eksekusi terbaru sebagai **"Waktu Eksekusi Pertama"**, yang dapat menyesatkan penyidik.


