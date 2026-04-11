---
title: "Ntuser Dat"
date: 2026-03-28T22:18:14+07:00
draft: false
type : docs
---

**NTUSER.DAT** adalah registry hive per-user pada sistem Windows yang menyimpan konfigurasi lingkungan pengguna serta jejak aktivitas personal. Artefak ini memiliki nilai forensik tinggi karena merepresentasikan tindakan yang benar-benar dilakukan oleh akun pengguna tertentu.

> [!TIP]
> **Tips Akses:** File `NTUSER.DAT` pada sistem yang sedang berjalan (live) akan dikunci oleh Windows. Gunakan tool seperti **FTK Imager** atau **KAPE** untuk mengekstraknya dari disk image sebelum melakukan analisis offline.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Users&#x3C;username>\NTUSER.DAT
</code></pre></td></tr><tr><td><strong>Loaded under</strong></td><td><code>HKEY_CURRENT_USER</code> (saat user login) atau <code>HKEY_USERS\&#x3C;SID></code></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan konfigurasi lingkungan pengguna dan riwayat aktivitas personal.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>UserAssist</strong>: Melacak eksekusi program GUI dan file shortcut (.LNK).</li><li><strong>RunMRU</strong>: Daftar perintah yang diketik melalui kotak dialog Windows Run (Win+R).</li><li><strong>OpenSaveMRU</strong>: Melacak file yang dibuka atau disimpan melalui dialog Windows.</li><li><strong>OfficeMRU</strong>: Rekaman file yang terakhir digunakan pada aplikasi MS Office (Word, Excel, dsb).</li><li><strong>LastVisitedMRU</strong>: Mencatat aplikasi yang menggunakan dialog Open/Save beserta lokasi folder terakhirnya.</li><li><strong>RecentDocs</strong>: Melacak file dan folder yang baru-baru ini diakses oleh pengguna.</li><li><strong>WordWheelQuery</strong>: Daftar kata kunci pencarian yang dimasukkan ke Windows Explorer.</li><li><strong>TypedPaths</strong>: Path folder yang diketikkan langsung di bar alamat File Explorer.</li><li><strong>ShellBags</strong>: Melacak folder yang pernah dibuka, termasuk folder di network share atau USB.</li><li><strong>MountPoints2</strong>: Riwayat perangkat USB dan network share yang pernah terpasang.</li><li><strong>User-specific Apps</strong>: Daftar aplikasi yang diinstal khusus untuk user (bukan system-wide).</li><li><strong>User Autorun</strong>: Kunci persistensi seperti Run/RunOnce yang berjalan otomatis saat user login.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; membuktikan aktivitas spesifik yang dilakukan oleh akun pengguna tertentu.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FVr47Bvaf8vIAsPJTShkK%2Fimage.png?alt=media&#x26;token=1ae9664f-a5e0-4dfe-bd01-c4e4b62cad84" alt=""></td></tr></tbody></table>

## Artefak dalam NTUSER.DAT

### UserAssist

Melacak eksekusi program berbasis GUI atau file shortcut (.LNK) yang diluncurkan melalui antarmuka Windows.

> [!WARNING]
> **Dekripsi ROT13:** Nama entri di UserAssist disamarkan menggunakan algoritma ROT13. Gunakan **Registry Explorer** untuk secara otomatis menerjemahkan teks tersebut ke format yang dapat dibaca.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\CurrentVersion\Explorer\UserAssist
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Melacak eksekusi program berbasis GUI dan file shortcut (.LNK).</td></tr><tr><td><strong>Key Data</strong></td><td>Nama file (ROT13), jumlah eksekusi (Run Count), dan timestamp eksekusi terakhir.</td></tr><tr><td><strong>Forensic Value</strong></td><td>Membuktikan bahwa aplikasi tertentu benar-benar dijalankan oleh pengguna, bukan sekadar ada di disk.</td></tr><tr><td><strong>Notes</strong></td><td>Berisi sub-key GUID yang masing-masing melacak jenis eksekusi yang berbeda.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2Fs7I3GyFHjtw6HyaEPl8l%2Fimage.png?alt=media&#x26;token=e5af82cb-03f2-4694-b4a5-4f9ce076bb7c" alt=""></td></tr></tbody></table>

### RunMRU

Rekaman riwayat perintah atau path yang diketik secara manual oleh pengguna di kotak dialog Windows Run (Win+R).

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\CurrentVersion\Explorer\RunMRU
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan riwayat perintah yang diketikkan di kotak dialog "Run" (Win+R).</td></tr><tr><td><strong>Key Data</strong></td><td>Perintah teks (per entri ditandai huruf a, b, c) dan <code>MRUList</code> yang menentukan urutan eksekusi.</td></tr><tr><td><strong>Forensic Value</strong></td><td>Mengidentifikasi perintah manual, pembukaan aplikasi sistem (seperti <code>cmd</code>, <code>regedit</code>), atau eksekusi malware secara manual.</td></tr><tr><td><strong>Notes</strong></td><td>Entri pertama dalam <code>MRUList</code> adalah perintah yang paling baru dijalankan.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FgUQpd7wM0eH6skYDBDKG%2Fimage.png?alt=media&#x26;token=e39dd6c6-de8d-41ea-b36a-992867cbeeff" alt=""></td></tr></tbody></table>

### RecentDocs

Melacak file dan folder yang baru saja diakses atau dibuka untuk mengisi berbagai tabel "recent" di Windows.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\CurrentVersion\Explorer\RecentDocs
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Melacak file dan folder yang terakhir kali dibuka melalui Windows Explorer.</td></tr><tr><td><strong>Key Data</strong></td><td>Nama file, ekstensi file, dan urutan akses (MRU).</td></tr><tr><td><strong>Forensic Value</strong></td><td>Membuktikan akses file oleh pengguna. Key ini dipisahkan berdasarkan ekstensi file (misal: .pdf, .docx).</td></tr><tr><td><strong>Notes</strong></td><td>Berguna untuk menghubungkan aktivitas pengguna dengan dokumen spesifik dalam kasus pencurian data.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2Fsf9oz2Xv5pfsQTdePhTk%2Fimage.png?alt=media&#x26;token=9f255915-cbee-424d-9638-9fe06bc58588" alt=""></td></tr></tbody></table>

### TypedPaths

Daftar path folder atau alamat yang diketik langsung oleh pengguna ke dalam bar alamat (address bar) File Explorer.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\CurrentVersion\Explorer\TypedPaths
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan path folder yang diketik langsung di address bar File Explorer.</td></tr><tr><td><strong>Key Data</strong></td><td>Path lengkap (seperti <code>C:\Windows\System32</code> atau alamat network share).</td></tr><tr><td><strong>Forensic Value</strong></td><td>Menunjukkan niat pengguna untuk mengakses lokasi tertentu secara spesifik, termasuk folder tersembunyi.</td></tr><tr><td><strong>Notes</strong></td><td>Berbeda dengan navigasi klik, data di sini membuktikan input manual dari pengguna.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FAwWzkDm4JjzyPKYsqNlU%2Fimage.png?alt=media&#x26;token=4686f448-b019-4ffa-8d7c-e04525d476d1" alt=""></td></tr></tbody></table>

### WordWheelQuery

Urutan kata kunci pencarian yang dimasukkan pengguna ke dalam kotak pencarian di Windows File Explorer.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\CurrentVersion\Explorer\WordWheelQuery
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan kata kunci pencarian yang dimasukkan ke kotak pencarian Windows Explorer.</td></tr><tr><td><strong>Key Data</strong></td><td>String teks pencarian dalam format Unicode.</td></tr><tr><td><strong>Forensic Value</strong></td><td>Memberikan wawasan tentang apa yang sedang dicari oleh pengguna (misal: mencari file "password.txt" atau "confidential").</td></tr><tr><td><strong>Notes</strong></td><td>Urutan pencarian disimpan secara kronologis.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FmaocBIhEBZcKsPSnk0ya%2Fimage.png?alt=media&#x26;token=92ebd959-fa4e-4f03-96d6-83c2f5410223" alt=""></td></tr></tbody></table>

### OpenSaveMRU

Artefak ini melacak file yang dibuka atau disimpan oleh pengguna melalui kotak dialog standar Windows (Open/Save dialog).

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\OpenSavePidlMRU
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Mencatat riwayat file (berdasarkan ekstensi) yang diakses melalui dialog Open/Save .</td></tr><tr><td><strong>Key Data</strong></td><td>Path lengkap, urutan MRU, dan waktu akses terakhir untuk setiap ekstensi .</td></tr><tr><td><strong>Forensic Value</strong></td><td>Membuktikan interaksi spesifik pengguna dengan file tertentu, sangat berguna untuk kasus kebocoran data .</td></tr><tr><td><strong>Notes</strong></td><td>Merekam hingga 20 entri terakhir per ekstensi file.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FvZmHCNgsiLn51bFmtAZr%2Fimage.png?alt=media&#x26;token=ceffbaf5-d0c6-46e0-b46d-1e12cde5b1a4" alt=""></td></tr></tbody></table>

### LastVisitedMRU

Bekerja berdampingan dengan OpenSaveMRU, artefak ini melacak aplikasi mana yang digunakan untuk membuka file tersebut.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\CurrentVersion\Explorer\ComDlg32\LastVisitedPidlMRU
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Melacak nama aplikasi dan lokasi direktori terakhir yang diakses melalui dialog Windows .</td></tr><tr><td><strong>Key Data</strong></td><td>Nama file executable aplikasi dan path folder terakhir yang dibuka .</td></tr><tr><td><strong>Forensic Value</strong></td><td>Menghubungkan aplikasi tertentu dengan lokasi folder yang mencurigakan .</td></tr><tr><td><strong>Notes</strong></td><td>Data ini tersimpan dalam format biner yang memerlukan tool seperti Registry Explorer untuk interpretasi.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2Fxe3fx93EHWUwADw0Zgp0%2Fimage.png?alt=media&#x26;token=99401339-8faf-4c0b-9e4e-22b6cea3879c" alt=""></td></tr></tbody></table>

### OfficeMRU

Khusus melacak aktivitas pengguna pada produk Microsoft Office (Word, Excel, PowerPoint).

| Field               | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Location / Path** | <ul><li><code>Software\Microsoft\Office\<Version>\<App>\File MRU</code></li><li><code>Software\Microsoft\Office\<Version>\<App>\User MRU</code></li><li><code>Software\Microsoft\Office\<Version>\<App>\Place MRU</code></li></ul>                                                                                                                                                                                                                                                                                            |
| **Purpose**         | Memberikan bukti file yang diakses secara spesifik melalui produk Office .                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Key Data**        | Path lengkap file, aplikasi yang digunakan, dan waktu terakhir dibuka .                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Forensic Value**  | Sangat krusial untuk melacak dokumen sensitif yang diakses pengguna .                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Notes**           | <ul><li><strong>File MRU</strong> – Mencatat daftar file yang terakhir kali dibuka oleh pengguna melalui aplikasi Microsoft Office.</li><li><strong>Place MRU</strong> – Menyimpan daftar folder atau lokasi (local, network share, atau cloud) yang terakhir digunakan saat membuka atau menyimpan file.</li><li><strong>User MRU</strong> – Berisi entri file dan folder yang diakses ketika pengguna menggunakan akun Microsoft (online), biasanya direpresentasikan dalam bentuk identifier atau hash internal.</li></ul> |
| **Example**         | ![](https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FEVpUi1orXqBhEvptRkYH%2Fimage.png?alt=media\&token=9e1ae47d-f43f-45d1-a554-cf689e32b09d)                                                                                                                                                                                                                                                                                                           |

### ShellBags

Salah satu artefak paling kuat untuk membuktikan navigasi folder oleh pengguna.

> [!NOTE]
>Nilai Forensik: ShellBags tetap menyimpan informasi folder meskipun folder tersebut telah dihapus atau berada di drive eksternal yang sudah dicabut.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\Shell\Bags
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Merekam keberadaan folder dan kapan folder tersebut diakses oleh pengguna .</td></tr><tr><td><strong>Key Data</strong></td><td>Path lengkap, MAC timestamps folder, dan waktu akses pertama/terakhir .</td></tr><tr><td><strong>Forensic Value</strong></td><td>Membuktikan navigasi pengguna ke dalam struktur folder tertentu, termasuk network shares .</td></tr><tr><td><strong>Notes</strong></td><td>ShellBags di NTUSER.DAT biasanya mencatat akses folder jaringan (UNC path), sementara akses lokal lebih banyak di UserClass.dat.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FolFv3PHBLZvwTpCKqEgH%2Fimage.png?alt=media&#x26;token=6ffd3671-dde8-42ab-b7e0-a787d217c598" alt=""></td></tr></tbody></table>

### MountPoints2

Melacak interaksi pengguna dengan media penyimpanan eksternal dan koneksi jaringan.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\CurrentVersion\Explorer\MountPoints2
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Mencatat perangkat USB dan network shares yang pernah diakses oleh pengguna .</td></tr><tr><td><strong>Key Data</strong></td><td>Path network share (UNC) atau Volume GUID perangkat .</td></tr><tr><td><strong>Forensic Value</strong></td><td>Mengidentifikasi koneksi ke server remote atau penggunaan flash drive ilegal .</td></tr><tr><td><strong>Notes</strong></td><td>Dapat menunjukkan path UNC lengkap seperti \\Server\Share.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FyqBMQTI62eWQf6cxyQ0H%2Fimage.png?alt=media&#x26;token=eb3ffa15-3964-4e5e-8a48-b5082962d2e9" alt=""></td></tr></tbody></table>

### **Terminal Server**

Melacak riwayat koneksi RDP (Remote Desktop Protocol) keluar yang dilakukan oleh pengguna ke sistem lain.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Terminal Server Client\Servers
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Mencatat koneksi RDP keluar (<em>outbound</em>).</td></tr><tr><td><strong>Key Data</strong></td><td>Nama host atau alamat IP tujuan koneksi serta petunjuk nama pengguna (<em>username hint</em>).</td></tr><tr><td><strong>Forensic Value</strong></td><td>Mengidentifikasi upaya pergerakan lateral (<em>lateral movement</em>) oleh aktor ancaman ke mesin lain dalam jaringan.</td></tr><tr><td><strong>Notes</strong></td><td>Tidak mencatat password atau status keberhasilan koneksi.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FXzTl3dF5lhxKgZSS327i%2Fimage.png?alt=media&#x26;token=385ecaa1-06f6-4118-a3ec-97d0b015fc14" alt=""></td></tr></tbody></table>

### **Installed Apps (User Specific)**

Daftar aplikasi yang diinstal khusus untuk pengguna tertentu, bukan untuk seluruh sistem.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>Software\Microsoft\Windows\CurrentVersion\Uninstall
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Memahami aplikasi apa saja yang diinstal oleh pengguna secara personal.</td></tr><tr><td><strong>Key Data</strong></td><td>Nama aplikasi, versi, tanggal instalasi, dan direktori instalasi.</td></tr><tr><td><strong>Forensic Value</strong></td><td>Mengungkap penggunaan alat akses jarak jauh (RMM) atau alat eksfiltrasi data yang diinstal tanpa hak admin.</td></tr><tr><td><strong>Notes</strong></td><td>Direktori instalasi aplikasi ini biasanya berada di dalam folder <code>AppData\Local</code> milik pengguna.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FBuoVFVUGRjWnO6rTJULY%2Fimage.png?alt=media&#x26;token=5b926fca-1029-4381-a0b8-5d6f151906ce" alt=""></td></tr></tbody></table>

### **Run and RunOnce Keys**

Mekanisme persistensi yang memungkinkan program berjalan secara otomatis setiap kali pengguna melakukan login.

> [!CAUTION]
> Kunci ini sering disalahgunakan oleh malware untuk mempertahankan persistensi.

| Field               | Value                                                                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Location / Path** | <ul><li><code>Software\Microsoft\Windows\CurrentVersion\Run</code></li><li><code>Software\Microsoft\Windows\CurrentVersion\RunOnce</code></li></ul>                                                                    |
| **Purpose**         | Mencatat daftar program yang diatur untuk berjalan otomatis saat user logon.                                                                                                                                           |
| **Key Data**        | Perintah (*command*) dan argumen yang dieksekusi saat login.                                                                                                                                                           |
| **Forensic Value**  | Titik utama untuk menemukan malware yang mencoba mempertahankan keberadaannya (*persistence*) di bawah konteks pengguna.                                                                                               |
| **Notes**           | <ul><li><code>Run</code> → dijalankan setiap login</li><li><code>RunOnce</code> → dijalankan sekali lalu dihapus</li></ul>                                                                                             |
| **Example**         | ![Run](https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FKUa0oSDyHQTdZULPvCGb%2Fimage.png?alt=media\&token=2011411d-f70b-4681-b688-9159db2a8451) |

## Tools yang Direkomendasikan untuk NTUSER.DAT

> [!WARNING]
> “Gunakan lebih dari satu tool dan pahami keterbatasannya untuk validasi.”

| Tool                  | Deskripsi                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| **Registry Explorer** | Tool GUI terbaik untuk eksplorasi manual dengan plugin otomatis untuk parsing UserAssist, dll. |
| **RECmd**             | Alat baris perintah (CLI) untuk mengekstrak data registry secara massal ke CSV/JSON.           |
| **RegRipper**         | Tool klasik untuk ekstraksi cepat data spesifik menggunakan plugin (rip).                      |
| **Cyber Triage**      | Mengotomatiskan identifikasi anomali dan aktivitas mencurigakan di dalam NTUSER.DAT.           |
| **Autopsy**           | Suite forensik lengkap dengan dukungan penguraian Registri.                                    |

## Ringkasan Visual (Mindmap)

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FO8134jODGHXZFAyZRMED%2FNTUSER.DAT%20Reg%20Activity%20Flow-2026-01-16-075826.png?alt=media&#x26;token=a6390edc-a7f7-439a-a6d6-748d96d0a264" alt=""><figcaption></figcaption></figure>
