---
title: "Usrclass Dat"
date: 2026-03-28T22:18:18+07:00
draft: false
type : docs
---

**UsrClass.dat** adalah registry hive tambahan milik pengguna yang diperkenalkan sejak Windows Vista. Hive ini menyimpan konfigurasi shell yang spesifik untuk pengguna, pemetaan asosiasi file, dan yang paling penting, data **ShellBags** untuk folder lokal serta rekaman **MUICache**.

> [!TIP]
> **Tips Akses:** Sama seperti `NTUSER.DAT`, file ini terkunci saat user aktif. Lokasinya berada di folder tersembunyi `AppData`. Gunakan tool ekstraksi seperti **KAPE** atau **FTK Imager** untuk mengambil file ini dari jalur: `C:\Users\<username>\AppData\Local\Microsoft\Windows\UsrClass.dat`.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Users&#x3C;username>\AppData\Local\Microsoft\Windows\UsrClass.dat
</code></pre></td></tr><tr><td><strong>Loaded under</strong></td><td><code>HKEY_CURRENT_USER\Software\Classes</code> atau <code>HKEY_USERS\&#x3C;SID>_Classes</code></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan asosiasi file (COM mapping) dan pengaturan UI spesifik pengguna.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>ShellBags</strong>: Melacak folder lokal, folder terkompresi (.zip), dan kontrol panel yang pernah dibuka.</li><li><strong>MUICache</strong>: Daftar aplikasi (termasuk aplikasi portable) yang pernah dijalankan oleh pengguna.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; menyediakan bukti navigasi folder lokal yang seringkali tidak tercatat di NTUSER.DAT.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FhRJQRisuoQ9wppoEpu0K%2Fimage.png?alt=media&#x26;token=84e354ed-6866-4638-b104-a239b3754789" alt=""></td></tr></tbody></table>

## Artefak dalam UsrClass.dat

### ShellBags

Berbeda dengan `NTUSER.DAT` yang lebih banyak mencatat folder jaringan (UNC), `UsrClass.dat` adalah komponen utama untuk melacak navigasi folder di drive lokal (C:, D:, dsb) dan file di dalam archive (.zip).

> [!NOTE]
> **Nilai Forensik Utama:** ShellBags tetap menyimpan rekaman folder meskipun folder tersebut sudah **dihapus** dari sistem atau berasal dari **USB Drive** yang sudah dicabut. Ini membuktikan bahwa pengguna pernah mengetahui dan mengakses folder tersebut.

> [!TIP]
> **Data Persistence:** Perlu diingat bahwa `UsrClass.dat` lebih dominan mencatat akses folder pada **drive lokal** dan **file .zip**, sedangkan `NTUSER.DAT` lebih dominan pada **Network Shares (UNC Path)**. Selalu analisis keduanya secara bersamaan.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Local Settings\Software\Microsoft\Windows\Shell\Bags
Local Settings\Software\Microsoft\Windows\Shell\BagMRU
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Merekam preferensi tampilan folder dan riwayat akses folder oleh pengguna.</td></tr><tr><td><strong>Key Data</strong></td><td>Path folder, MAC timestamps folder, dan waktu terakhir folder tersebut dibuka/dilihat.</td></tr><tr><td><strong>Forensic Value</strong></td><td>Membuktikan keberadaan folder (bahkan jika sudah dihapus) dan interaksi pengguna terhadap struktur direktori lokal.</td></tr><tr><td><strong>Notes</strong></td><td><ul><li><strong>Bags</strong>: Menyimpan pengaturan tampilan (view settings) spesifik untuk setiap folder, seperti ukuran ikon, posisi jendela, dan mode pengurutan (sort order).</li><li><strong>BagMRU:</strong> Menyimpan struktur hirarki folder (tree structure). Bagian inilah yang mencatat <em>path</em> lengkap direktori dan urutan folder yang diakses oleh pengguna berdasarkan waktu (<em>Most Recently Used</em>).</li></ul></td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FPq2VZBeUL3l2d5cvj0Gk%2Fimage.png?alt=media&#x26;token=36be0afa-f475-40d8-9a65-3a473e52f1e9" alt=""></td></tr></tbody></table>

### MUICache (Multilingual User Interface)

Mencatat nama aplikasi dan deskripsinya saat pertama kali dijalankan untuk mengisi cache antarmuka pengguna.

> [!CAUTION]
> **Eksekusi Portable:** MUICache adalah tempat terbaik untuk mencari jejak aplikasi yang tidak "diinstal" secara resmi (seperti tool hacking portable atau aplikasi dari folder `Downloads`), karena Registry ini mencatat path lengkap saat aplikasi pertama kali memanggil dialog GUI.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Local Settings\Software\Microsoft\Windows\Shell\MuiCache
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan nama tampilan aplikasi yang pernah dieksekusi.</td></tr><tr><td><strong>Key Data</strong></td><td>Full path ke file executable (.exe) dan nama aplikasi terkait.</td></tr><tr><td><strong>Forensic Value</strong></td><td>Sangat berguna untuk melacak penggunaan <strong>Aplikasi Portable</strong> atau malware yang dijalankan dari folder sementara.</td></tr><tr><td><strong>Notes</strong></td><td>Meskipun aplikasi sudah dihapus, entri di MUICache seringkali tetap tersimpan sebagai jejak eksekusi historis.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FyVLXJM98TKvZrIlyyTEI%2Fimage.png?alt=media&#x26;token=42ba5b30-7397-4053-8d56-f4c90bf8584a" alt=""></td></tr></tbody></table>

## Tools yang Direkomendasikan untuk UsrClass.dat / ShellBags

> [!WARNING]
> “Gunakan lebih dari satu tool dan pahami keterbatasannya untuk validasi.”

| Tool                   | Deskripsi                                                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Registry Explorer**  | Tool GUI terbaik untuk eksplorasi manual; mendukung pemuatan hive secara otomatis dan memiliki plugin internal untuk mem-parsing data biner menjadi format yang mudah dibaca. |
| **SBECmd**             | Alat berbasis CLI dari Eric Zimmerman yang berfungsi untuk mengekstrak dan mem-parsing data ShellBags secara massal ke dalam format CSV, JSON, atau XML.                      |
| **Shellbags Explorer** | Tool GUI khusus untuk menganalisis data ShellBags; mampu merekonstruksi hirarki folder yang pernah diakses pengguna secara visual, termasuk folder yang sudah dihapus.        |

## Ringkasan Visual (Mindmap)

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FvTDctNTsRFMYpfA5lOS8%2FUntitled%20diagram-2026-01-16-132449.png?alt=media&#x26;token=1a9a6169-348b-49a3-82d5-130351f46499" alt=""><figcaption></figcaption></figure>


