---
title: "Lnk Files"
date: 2026-03-28T22:15:39+07:00
draft: true
type : docs
---


**LNK Files (atau Windows Shortcut)** adalah file biner yang berfungsi sebagai penunjuk (pointer) ke file, folder, atau aplikasi lain dalam sistem operasi Windows. Meskipun sering dibuat secara manual oleh pengguna untuk akses cepat di desktop, Windows juga secara otomatis membuat file-file ini di latar belakang setiap kali pengguna berinteraksi dengan sebuah file.

> [!NOTE]
> **Perspektif Forensik**: LNK file adalah artefak "Shell Item" yang sangat berharga karena menyimpan metadata kaya tentang file target, bahkan jika file asli tersebut sudah dihapus dari sistem.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Recent
</code></pre></td></tr><tr><td><strong>Format</strong></td><td>Binary (Shell Item)</td></tr><tr><td><strong>Header Signature</strong></td><td><code>4C 00 00 00 01 14 02 00</code> (Hex)</td></tr><tr><td><strong>Purpose</strong></td><td>Menyediakan akses cepat ke file/folder dan melacak aktivitas akses pengguna secara otomatis.</td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; membuktikan keberadaan file historis, waktu akses pertama/terakhir, dan informasi perangkat asal.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FPUIz3fPE1jzzV11G4bjI%2Fimage.png?alt=media&#x26;token=52e04316-602b-4df5-9f56-bb7cf382bfb8" alt="" data-size="original"></td></tr></tbody></table>

## Lokasi LNK Files

Selain di folder `Recent` standar, investigator dapat menemukan LNK files di beberapa lokasi strategis berikut:

* Recent Items Utama: `C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Recent`.
* Microsoft Office Recent: `C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Office\Recent\` (khusus untuk dokumen Office).
* Folder Unduhan: `C:\Users\%USERNAME%\Downloads` (sering berisi shortcut yang dikirim via email).
* Startup Folder: `C:\Users\%USERNAME%\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup` (lokasi kritis untuk persistensi malware).
* Windows XP (Legacy): `C:\Documents and Settings\%USERNAME%\Recent`.

## Anatomi & Metadata LNK Files

Sebuah LNK file bukan sekadar jalan pintas; ia menyimpan salinan metadata dari file targetnya pada saat shortcut tersebut dibuat atau diperbarui.

### Metadata Utama yang Disimpan:

* Target Path: Jalur lengkap ke file asli (misal: `D:\Data\Rahasia.docx`).
* Timestamps (MAC): Waktu pembuatan, akses, dan modifikasi dari file target (bukan hanya shortcut-nya).
* Volume Information: Nama volume, serial number drive, dan tipe drive (Fixed, Removable, Network Share).
* Perangkat Asal: Alamat MAC (*MAC Address*) dari mesin tempat shortcut tersebut pertama kali dibuat.
* File Size: Ukuran asli dari file target dalam satuan bytes.

> [!CAUTION]
>Peringatan Volatilitas: Folder Recent biasanya dibatasi hingga 149 entri (atau 20 per ekstensi pada Windows 10+). Setelah mencapai batas ini, entri lama akan tertimpa oleh aktivitas baru. Selalu lakukan imaging atau triage segera untuk mencegah kehilangan data.

## Prosedur Analisis dengan LECmd (Eric Zimmerman)

LECmd adalah tool berbasis CLI yang sangat powerful untuk melakukan parsing data biner dari LNK file ke dalam format yang manusiawi (human-readable) seperti CSV atau XML. Tool ini sangat krusial untuk membuat timeline aktivitas pengguna secara massal.

### 1. Perintah Dasar Ekstraksi

Untuk menganalisis seluruh LNK file dalam satu direktori (misalnya folder `Recent`), gunakan perintah berikut:

```bash
# Analisis satu file spesifik
LECmd.exe -f "C:\Path\To\File.lnk"

# Analisis satu folder dan ekspor ke CSV
LECmd.exe -d "C:\Users\USER\AppData\Roaming\Microsoft\Windows\Recent" --csv "C:\Output"
```

**Penjelasan Parameter:**

* `-d`: Menentukan direktori sumber (directory) yang berisi kumpulan LNK files.
* `-f`: (Alternatif) Digunakan jika Anda hanya ingin menganalisis satu file spesifik.
* `--csv`: Menentukan lokasi folder output hasil analisis.
* `--csvf`: Memberikan nama file spesifik untuk laporan dalam format CSV. (opsional)

### 2. Memahami Output Penting LECmd

Setelah menjalankan tool, Lihat output yang dihasilkan. Fokuslah pada kolom-kolom kritis berikut:

| Value                  | Deskripsi Investigatif                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------- |
| **SourceCreated**      | Waktu pertama kali LNK file dibuat (indikasi akses pertama pengguna).                   |
| **SourceModified**     | Waktu terakhir kali LNK file diperbarui (indikasi akses terakhir pengguna).             |
| **TargetCreated**      | Waktu pembuatan file asli/target di sistem.                                             |
| **LocalPath**          | Jalur lengkap (Full Path) ke file target.                                               |
| **VolumeSerialNumber** | Serial number dari drive tempat file target berada (penting untuk USB/Drive Eksternal). |
| **MacAddress**         | Alamat fisik perangkat tempat LNK tersebut dibuat.                                      |

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FdJ174D74GASKEkkn2ML3%2Fimage.png?alt=media&#x26;token=711feb63-842d-44d9-8eee-9fd10d19f7a8" alt=""><figcaption><p>LEcmd.exe</p></figcaption></figure>

### Tools yang Direkomendasikan

| Tool                       | Deskripsi                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| **LECmd (Eric Zimmerman)** | Tool CLI standar industri untuk mem-parsing LNK file secara massal ke format CSV/JSON.           |
| **Belkasoft X**            | Suite DFIR yang secara otomatis mengekstrak, mem-parsing, dan memulihkan LNK file yang terhapus. |
| **EXIFTool**               | Berguna untuk melihat metadata dasar LNK file secara cepat di lingkungan Linux/WSL.              |

> [!TIP]
> **Catatan:** LNK files adalah bagian dari ekosistem **Shell Items** bersama dengan **Jump Lists** dan **ShellBags**. Untuk investigasi yang komprehensif, ketiga artefak ini harus dianalisis secara bersamaan untuk merekonstruksi aktivitas pengguna secara utuh.


