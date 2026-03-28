---
title: "Jump Lists"
date: 2026-03-28T22:15:42+07:00
draft: false
type : docs
---

**Jump Lists** adalah artefak Windows (diperkenalkan sejak Windows 7) yang merekam interaksi pengguna dengan aplikasi dan file. Secara visual, fitur ini memberikan akses cepat ke file yang baru saja digunakan (Recent) atau sering diakses (Frequent) melalui menu Start atau dengan melakukan klik kanan pada ikon aplikasi di Taskbar.

<figure><img src="https://www.cybertriage.com/wp-content/uploads/2025/01/Screen-Shot-2025-01-14-at-2.38.58-PM-768x664.png" alt="" width="375"><figcaption><p>Visualisasi Jump Lists pada Taskbar (Klik Kanan)</p></figcaption></figure>

<figure><img src="https://belkasoft.com/images/articles/analyzing_jump_lists_with_belkasoft_evidence_center/001.png" alt=""><figcaption><p>Jump Lists pada Start Menu</p></figcaption></figure>

Bagi investigator DFIR, Jump Lists berfungsi untuk memahami perilaku pengguna, terutama dalam kasus pencurian data (data exfiltration) atau serangan ransomware, karena artefak ini mencatat file apa saja yang dibuka dan aplikasi apa yang meluncurkannya.

## Mengapa Forensik Jump Lists Penting?

Jump Lists membantu investigator dalam beberapa hal krusial:

* **Identifikasi Akses File**: Mengetahui file mana yang dibuka beserta timestamp akses terakhirnya.
* **Aplikasi yang Digunakan**: Menentukan aplikasi spesifik (termasuk aplikasi portable) yang digunakan untuk membuka file.
* **Frekuensi Akses**: Menunjukkan seberapa sering pengguna berinteraksi dengan file tertentu.
* **Bukti File yang Dihapus**: Meskipun file asli sudah dihapus, record di Jump List seringkali tetap tersisa sebagai bukti historis.

> [!NOTE]
> **Tips Akses**: File ini tersimpan dalam folder tersembunyi di profil pengguna. Gunakan tool ekstraksi untuk mengambil file dari jalur: `C:\Users\<user>\AppData\Roaming\Microsoft\Windows\Recent\`.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>...\Recent\AutomaticDestinations 
...\Recent\CustomDestinations
</code></pre></td></tr><tr><td><strong>Format</strong></td><td>OLE Compound File (CFB) atau Sequential LNK Files</td></tr><tr><td><strong>File Extension</strong></td><td><code>.automaticDestinations-ms</code> / <code>.customDestinations-ms</code></td></tr><tr><td><strong>Identification</strong></td><td>Nama file diawali dengan <strong>AppID</strong> (16 karakter hex)</td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; membuktikan <em>User Intent</em> (niat pengguna) dan akses ke sumber daya sistem.</td></tr><tr><td><strong>Example .automaticDestinations-ms</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FKxNysAvL3xHf4FVtQw9I%2Fimage.png?alt=media&#x26;token=23005613-ea50-4f81-8eac-39f5c92a242a" alt="" data-size="original"></td></tr><tr><td><strong>Example .customDestinations-ms</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2Fs2wfQLwGq1B0yEsAa5xk%2Fimage.png?alt=media&#x26;token=7e9c4c04-4a0b-4d99-8532-bdeec9c1eea1" alt="" data-size="original"></td></tr></tbody></table>

## Struktur & Jenis Jump Lists

Windows membagi Jump Lists menjadi dua kategori utama yang disimpan di folder berbeda:

### Automatic Destinations

Dibuat secara otomatis oleh sistem operasi saat pengguna membuka file. Isinya melacak file yang baru saja digunakan (*Recent*) dan sering digunakan (*Frequent*).

<table><thead><tr><th>Komponen</th><th>Deskripsi</th></tr></thead><tbody><tr><td><strong>Path Storage</strong></td><td><pre><code>...\Microsoft\Windows\Recent\AutomaticDestinations
</code></pre></td></tr><tr><td><strong>Struktur</strong></td><td>Berupa kontainer OLE yang berisi beberapa entri LNK file.</td></tr><tr><td><strong>Data Kunci</strong></td><td>Path file, Timestamps (Last Modified), <strong>Interaction Count</strong>, dan MRU (Most Recently Used).</td></tr></tbody></table>

### Custom Destinations

Dibuat oleh aplikasi itu sendiri atau berdasarkan tindakan manual pengguna (seperti melakukan *Pin* pada folder tertentu).

<table><thead><tr><th>Komponen</th><th>Deskripsi</th></tr></thead><tbody><tr><td><strong>Path Storage</strong></td><td><pre><code>...\Microsoft\Windows\Recent\CustomDestinations
</code></pre></td></tr><tr><td><strong>Struktur</strong></td><td>Sekumpulan file LNK yang disusun secara berurutan (<em>sequential</em>).</td></tr><tr><td><strong>Data Kunci</strong></td><td>Mencatat kategori khusus seperti "Pinned", "Tasks", atau folder favorit.</td></tr></tbody></table>

## Memahami AppIDs (Application Identifiers)

Nama file di dalam direktori Jump List (contoh: 1bc392b8e104a00e.automaticDestinations-ms) ditentukan oleh AppID. AppID ini adalah representasi unik dari aplikasi tertentu.

> [!TIP]
> Insight Forensik: AppID bersifat statis untuk aplikasi yang sama di berbagai host. Contohnya, AppID 1bc392b8e104a00e selalu merepresentasikan Microsoft Remote Desktop (mstsc.exe).

> [!TIP]
> **Database Lengkap**: Untuk daftar AppID yang lebih komprehensif (mencakup ratusan aplikasi pihak ketiga), Anda dapat melihat referensi resmi dari Eric Zimmerman di sini: [Eric Zimmerman's AppIDs Database](https://github.com/EricZimmerman/JumpList/blob/master/JumpList/Resources/AppIDs.txt)


## Metadata Forensik dalam Jump Lists

Setiap entri di dalam Jump List sebenarnya adalah LNK File yang membawa metadata yang sangat kaya:

| Kolom Metadata    | Nilai Investigatif                                                                                                                                                                                                                                         |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kolom Metadata    | Lokasi lengkap file yang diakses (misal: `D:\Rahasia\Data_Lama.zip`).                                                                                                                                                                                      |
| Target Path       | Waktu pembuatan (*Creation*) dan modifikasi (*Modification*) file target.                                                                                                                                                                                  |
| Timestamps        | Membuktikan pola kebiasaan pengguna (file mana yang paling sering diakses).                                                                                                                                                                                |
| Interaction Count | Membuktikan pola kebiasaan pengguna (file mana yang paling sering diakses).                                                                                                                                                                                |
| Volume Info       | Nama volume, serial number disk, dan bahkan MAC Address jika file berada di network share.                                                                                                                                                                 |
| Example           | <img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FtXSdQtTkagHck6SjqsAk%2Fimage.png?alt=media&#x26;token=69d6a5e0-1cba-47ea-826d-7089fb0bb909" alt="" data-size="original"> |

> [!CAUTION]
> Eksekusi Malware: Periksa Jump Lists untuk aplikasi seperti cmd.exe atau powershell.exe. Jika terdapat entri yang mengarah ke skrip di folder Temp, itu adalah indikasi kuat aktivitas berbahaya.

## Prosedur Ekstraksi & Analisis

Untuk hasil terbaik, gunakan tool spesialis dari Eric Zimmerman atau suite forensik seperti Belkasoft/Autopsy.

1. Ekstraksi: Ambil seluruh isi folder `AutomaticDestinations` dan `CustomDestinations` menggunakan FTK Imager.
2. Parsing dengan JLECmd: Gunakan perintah berikut untuk mengubah data biner menjadi CSV:

   ```
   JLECmd.exe -f "C:\Users\USER\AppData\Roaming\Microsoft\Windows\Recent\AutomaticDestinations\<AppIDs>.automaticDestinations-ms"
   ```
3. Review Output :&#x20;

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F0RoxaPx8oFi55ajkiP3A%2Fimage.png?alt=media&#x26;token=7757d60a-a575-4ccb-9049-224d25216931" alt="" width="375"><figcaption></figcaption></figure>

## Tools yang Direkomendasikan

| Tool              | Deskripsi                                                                  |
| ----------------- | -------------------------------------------------------------------------- |
| **JLECmd**        | Parser terbaik untuk mendapatkan detail forensik terdalam dari Jump Lists. |
| **JumpListView**  | Tool ringan dari NirSoft untuk melihat isi Jump List secara cepat.         |
| **Autopsy**       | Mengintegrasikan data Jump List ke dalam timeline kasus secara otomatis.   |
| **Belkasoft BEC** | Memiliki viewer registry dan jump list bawaan yang sangat intuitif.        |
| **Cyber Triage**  | DFIR Software otomatis yang mengumpulkan dan menganalisis data Jump List.  |


