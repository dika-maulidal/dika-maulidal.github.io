---
title: "Sam"
date: 2026-03-28T22:18:24+07:00
draft: false
type : docs
---

SAM (Security Account Manager) adalah registry hive yang sangat krusial dalam forensik Windows karena menyimpan database akun pengguna lokal. Hive ini mengelola kredensial keamanan, grup lokal, dan informasi login yang digunakan untuk autentikasi pada sistem lokal.

> [!TIP]
> Tips Akses: File SAM tidak dapat disalin langsung saat sistem berjalan karena dikunci oleh kernel. Gunakan tool seperti KAPE, FTK Imager, atau Velociraptor untuk mengambilnya dari jalur: C:\Windows\System32\config\SAM.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Windows\System32\config\SAM
</code></pre></td></tr><tr><td><strong>Loaded under</strong></td><td><code>HKEY_LOCAL_MACHINE\SAM</code></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan database akun pengguna lokal dan konfigurasi keanggotaan grup (privilese).</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>Users</strong>: Informasi detail tiap akun (RID, Last Login, Login Count).</li><li><strong>Aliases (Groups)</strong>: Daftar grup lokal seperti Administrators, Users, dan Guests.</li><li><strong>Password Hashes</strong>: Hash NTLM yang terenkripsi (membutuhkan hive SYSTEM untuk ekstraksi).</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; mengidentifikasi siapa saja pengguna sistem, kapan terakhir login, dan siapa yang memiliki hak akses administrator.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FsuzT3V6wgPUdCNfWddXh%2Fimage.png?alt=media&#x26;token=0391e804-187a-4150-9913-0b6cf48ee41e" alt=""></td></tr></tbody></table>

## Artefak dalam SAM

### Local User Accounts (Users)

Bagian ini menyimpan identitas unik untuk setiap pengguna lokal. Setiap pengguna diidentifikasi dengan RID (Relative Identifier), seperti RID 500 untuk Administrator default.

> [!IMPORTANT]
> **Nilai Forensik Utama**: Anda dapat melihat kapan sebuah akun dibuat, kapan terakhir kali login sukses, serta jumlah percobaan login yang gagal. Ini krusial untuk melacak aktivitas akun mencurigakan atau serangan brute-force.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>SAM\Domains\Account\Users
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan metadata detail terkait akun pengguna individu.</td></tr><tr><td><strong>Key Data</strong></td><td>Username, RID (500, 501, 1001, dsb), Last Login Timestamp, Password Last Set, dan Account Expiry.</td></tr><tr><td><strong>Forensic Value</strong></td><td>Menentukan garis waktu aktivitas pengguna dan status keaktifan akun.</td></tr><tr><td><strong>Notes</strong></td><td><ul><li><strong>Value 'F'</strong>: Berisi struktur biner untuk login timestamps dan status bendera akun (Account Flags).</li><li><strong>Value 'V'</strong>: Berisi informasi profil pengguna dan data kredensial terenkripsi.</li></ul></td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FpPO5gYSe4fNIryh6bKvM%2Fimage.png?alt=media&#x26;token=85a21024-4a3d-4d81-9a7a-4ad99608780c" alt=""></td></tr></tbody></table>

### Local Groups & Memberships (Aliases)

Bagian Aliases mencatat grup keamanan yang ada di sistem dan siapa saja anggota (SID/User) yang tergabung di dalamnya.

> [!CAUTION]
> **Eskalasi Hak Akses**: Selalu periksa grup Administrators (00000220). Jika Anda menemukan SID pengguna yang tidak dikenal di grup ini, itu adalah indikasi kuat adanya eskalasi hak akses atau akun backdoor.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>SAM\Domains\Builtin\Aliases
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Menentukan hak akses yang diberikan kepada pengguna melalui keanggotaan grup.</td></tr><tr><td><strong>Key Data</strong></td><td>Group Name (Administrators, Remote Desktop Users, dsb) dan daftar User SID yang menjadi anggotanya.</td></tr><tr><td><strong>Forensic Value</strong></td><td>Mengetahui pengguna mana yang memiliki kontrol penuh atas sistem.</td></tr><tr><td><strong>Notes</strong></td><td>Digunakan untuk mengidentifikasi akun yang memiliki kontrol penuh terhadap sistem dan berpotensi digunakan untuk eskalasi privilese.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F5FZvYfMaWnLgfFHqxB9A%2Fimage.png?alt=media&#x26;token=6ad664a9-e4fe-40d3-86da-ffd4d52d5ed8" alt=""></td></tr></tbody></table>

### Password Hashes (NTLM)

Meskipun SAM menyimpan kredensial, Windows tidak menyimpan password dalam bentuk teks polos (plain text), melainkan dalam bentuk hash NTLM.

> [!WARNING]
> **Penting (Dependency)**: Data hash dalam SAM dienkripsi menggunakan BootKey. Anda WAJIB memiliki file hive SYSTEM dari mesin yang sama untuk dapat mendekripsi dan mengekstrak hash ini.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Hash Type</strong></td><td>NTLM (MD4 based)</td></tr><tr><td><strong>Storage Location</strong></td><td><pre><code>SAM\Domains\Account\Users\[RID]\V
</code></pre></td></tr><tr><td><strong>Key Requirement</strong></td><td>Membutuhkan <strong>BootKey</strong> dari hive <code>SYSTEM</code> untuk dekripsi. (File <code>SAM</code> + File <code>SYSTEM)</code></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; Digunakan untuk mendeteksi penggunaan password yang sama (Password Reuse) atau audit keamanan.</td></tr><tr><td><strong>Encryption</strong></td><td>Dienkripsi menggunakan algoritma RC4 atau AES (pada versi Windows terbaru).</td></tr></tbody></table>

#### Ekstraksi Hive secara Live (Registry Dumping)

Dalam skenario investigasi, kita bisa mengambil salinan hive langsung dari sistem yang sedang berjalan dengan hak akses Administrator menggunakan perintah `reg save`.

> [!WARNING]
> **Noted**: Menjalankan perintah ini akan meninggalkan jejak di **Prefetch** dan **Event Logs**. Pastikan Anda mendokumentasikan aktivitas ini agar tidak disalahartikan sebagai aktivitas serangan (Credential Dumping).

#### Perintah Command Prompt (Admin)

Eksekusi perintah berikut untuk menduplikasi hive ke dalam file fisik di drive `C:\..\Dekstop`:

{{< tabs >}}

{{< tab name="Command" >}}

```cmd
# Mengambil database akun lokal (SAM)
reg save hklm\sam "%USERPROFILE%\Desktop\SAM"

# Mengambil SYSTEM hive (mengandung BootKey / SysKey)
reg save hklm\system "%USERPROFILE%\Desktop\SYSTEM"
```

{{< /tab >}}

{{< tab name="Explanation" >}}

* **reg save hklm\sam**  
  Mengekstrak hive **SAM** yang berisi database akun pengguna lokal Windows, termasuk metadata akun dan kredensial dalam bentuk hash terenkripsi.

* **reg save hklm\system**  
  Mengekstrak hive **SYSTEM** yang menyimpan **BootKey (SysKey)**, yaitu kunci yang diperlukan untuk mendekripsi data kredensial di dalam SAM.

* **Output Location**  
  File hasil ekstraksi disimpan di **Desktop user yang sedang login**, sehingga mudah dipindahkan untuk analisis offline.

{{< /tab >}}

{{< /tabs >}}

## Tools yang Direkomendasikan untuk Analisis SAM

> [!WARNING]
> “Gunakan tool yang memiliki fitur parsing otomatis agar tidak perlu membaca data biner secara manual atau Pun Dump Hash.”

| Tool                       | Deskripsi                                                                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Registry Explorer**      | Tool GUI terbaik untuk mem-parsing hive SAM secara otomatis ke dalam tab "User Accounts" yang mudah dibaca (seperti pada referensi gambar). |
| **SAMParser**              | Script spesifik untuk mengekstrak informasi detail pengguna dan grup ke dalam format laporan yang ringkas.                                  |
| **RECmd**                  | Versi command-line dari Registry Explorer yang berguna untuk pemrosesan file SAM dalam jumlah banyak secara otomatis secara massal.         |
| **Impacket (secretsdump)** | Tool Python terbaik untuk dumping hash secara offline.                                                                                      |
| **Mimikatz**               | Dapat mengekstrak hash langsung dari memori atau file hive.                                                                                 |
| **Hashcat / John**         | Tool untuk melakukan *cracking* (brute-force) pada hash.                                                                                    |

## Ringkasan Visual (Mindmap)

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FBtscDF36nrtHZfe7VgCw%2FUntitled%20diagram-2026-01-19-072018.png?alt=media&#x26;token=7be2b5b8-dad7-4269-b3b2-9885c5e093de" alt=""><figcaption></figcaption></figure>
