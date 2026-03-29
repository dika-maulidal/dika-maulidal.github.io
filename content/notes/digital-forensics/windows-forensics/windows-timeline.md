---
title: "Windows Timeline"
date: 2026-03-28T22:16:00+07:00
type: docs
draft : false
---

**Windows 10 Timeline** (Activity History) diperkenalkan pada Windows 10 Build 1803 (April 2018 Update). Secara visual, fitur ini dapat diakses oleh pengguna melalui ikon **Task View** di Taskbar atau dengan menekan kombinasi tombol `Windows + Tab`.

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F762mf6HuD05xTckcp3T2%2Fimage.png?alt=media&#x26;token=e0585355-ff1b-4dd4-b8ec-63eda6e93906" alt=""><figcaption><p>Windows Task View</p></figcaption></figure>

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FFcZr6tI6KdnuxKyPpah4%2Fimage.png?alt=media&#x26;token=c0734510-25c3-4322-b839-189e56e7f5f5" alt="" width="375"><figcaption><p>Windows + Tab</p></figcaption></figure>

Fitur ini bertindak sebagai "mesin waktu" yang memungkinkan pengguna melihat kembali dokumen, aplikasi, atau situs web yang pernah diakses sebelumnya. Jika pengguna masuk dengan Akun Microsoft, aktivitas ini bahkan disinkronkan antar perangkat (Cross-Device).

## Rentang Waktu & Retensi Data

Timeline tidak menyimpan data selamanya. Ada batasan waktu yang berlaku tergantung pada konfigurasi sinkronisasi:

* **Penyimpanan Lokal (Offline):** Secara default, Windows menyimpan riwayat aktivitas selama **3 hingga 4 hari** terakhir di perangkat lokal.
* **Penyimpanan Cloud (Synced):** Jika pengguna mengaktifkan fitur *"Let Windows sync my activities from this PC to the cloud"* dan masuk dengan akun Microsoft 365, Timeline dapat melacak aktivitas hingga **30 hari** ke belakang.

> [!NOTE]
> **Tips Akses:** File ini merupakan database SQLite yang sering terkunci saat sistem aktif. Gunakan tool ekstraksi seperti **KAPE** atau **FTK Imager** untuk mengambilnya dari jalur: `C:\Users\<username>\AppData\Local\ConnectedDevicesPlatform\L.<profile_id>\ActivitiesCache.db`.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Users&#x3C;username>\AppData\Local\ConnectedDevicesPlatform\L.&#x3C;profile_id>\ActivitiesCache.db
</code></pre></td></tr><tr><td><strong>Format</strong></td><td>SQLite Database (v3)</td></tr><tr><td><strong>Associated Files</strong></td><td><code>ActivitiesCache.db-shm</code>, <code>ActivitiesCache.db-wal</code> (Log transaksi)</td></tr><tr><td><strong>Data Retention</strong></td><td>Default: 3-4 hari (Offline) / Up to 30 hari (jika Sync Cloud aktif)</td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; rekonstruksi aktivitas pengguna, pembuktian pembukaan file (bahkan yang sudah dihapus), dan durasi penggunaan aplikasi.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FE4Kqmk9Lzl8CasbcAYUa%2Fimage.png?alt=media&#x26;token=551dff6f-144d-4253-bbe6-acfad0a1fa7b" alt="" data-size="original"></td></tr></tbody></table>

## Identifikasi Akun & Folder

Nama folder yang menampung `ActivitiesCache.db` bervariasi tergantung pada metode autentikasi pengguna. Jika terdapat beberapa akun, maka akan ada beberapa file database:

* **Akun Lokal Tradisional:** Folder dimulai dengan `L.<username>`
* **Akun Microsoft (Cloud):** Folder berupa Account ID (Contoh: `e8765a5d8c3193f2`)
* **Azure Active Directory (AAD):** Folder dimulai dengan `AAD.<Id>`

> [!TIP]
> **Tips Forensik:** Akun Microsoft Cloud dapat direferensikan silang ke nama akun (email) melalui kunci registry: `NTUSER.DAT\Software\Microsoft\IdentityCRL\UserExtendedProperties`

## Struktur & Tabel Utama

`ActivitiesCache.db` adalah database SQLite yang terdiri dari beberapa tabel:

* `Activity`
* `ActivityOperation`
* `Activity_PackageId`
* `AppSettings`
* `DataEncryptionKeys`
* `ManualSequence`
* `Metadata`

> [!NOTE]
> **Prioritas Analisis:** Tidak semua tabel di atas memiliki nilai investigatif yang sama. Fokus utama dalam forensik biasanya tertuju pada tabel **`Activity`** dan **`ActivityOperation`**.

## Tabel Activity

Tabel ini merupakan inti dari artefak Timeline, menyimpan detail setiap interaksi pengguna dengan aplikasi, file, atau sistem.

| Kolom Penting           | Deskripsi                                                                                                                                                                                                                                                  |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **AppId**               | Berisi path aplikasi, jenis platform (Win32, UWP, dll), dan nama executable.                                                                                                                                                                               |
| **ActivityType**        | Kode angka yang menentukan jenis aktivitas (lihat detail di bawah).                                                                                                                                                                                        |
| **Payload**             | Data dalam format JSON yang berisi `displaytext` (nama file/URL), `description` (full path), dan `activeDurationSeconds`.                                                                                                                                  |
| **StartTime / EndTime** | Timestamp kapan aktivitas dimulai dan berakhir (dalam format Epoch/Unix).                                                                                                                                                                                  |
| **PlatformDeviceId**    | ID unik perangkat. Dapat dikorelasikan dengan jenis perangkat (Desktop, Mobile, Laptop).                                                                                                                                                                   |
| **Example**             | <img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FdWdWZkHYoBFrx9YEQWS2%2Fimage.png?alt=media&#x26;token=26b29582-c021-496d-88b8-728c570b8941" alt="" data-size="original"> |

### Detail ActivityType (Kode Aktivitas)

Memahami `ActivityType` sangat krusial untuk menginterpretasikan perilaku pengguna:

| Type             | Nama Aktivitas | Deskripsi                                                |
| ---------------- | -------------- | -------------------------------------------------------- |
| **2**            | Notification   | Notifikasi sistem atau aplikasi yang muncul.             |
| **3**            | Auth/Backup    | Azure authentication atau mobile device backup.          |
| **5**            | Execute/Open   | Pengguna membuka Aplikasi, File, atau Webpage.           |
| **6**            | In-Focus       | Aplikasi sedang digunakan/menjadi jendela aktif (Focus). |
| **10**           | Clipboard Text | Teks yang disalin ke clipboard (berlaku selama 12 jam).  |
| **16**           | Copy/Paste     | Operasi salin/tempel (terlihat pada field *Group*).      |
| **11, 12, 15**   | System Ops     | Operasi internal Windows (Credentials, WiFi, Language).  |
| **0, 1, 4, 7-9** | Unknown        | Belum terdefinisi secara publik.                         |

### Korelasi Perangkat (PlatformDeviceId)

ID perangkat yang ditemukan dalam tabel Activity dapat dikorelasikan dengan Registry Windows untuk mengidentifikasi jenis hardware spesifik yang digunakan oleh pengguna saat melakukan aktivitas tersebut.

> [!NOTE]
> Lokasi Registry: `HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\TaskFlow\DeviceCache`

### Tabel Referensi DeviceType

Gunakan tabel di bawah ini untuk menentukan jenis perangkat berdasarkan nilai integer yang ditemukan pada kunci registry `DeviceType`:

| Value  | Jenis Perangkat    | Keterangan                       |
| ------ | ------------------ | -------------------------------- |
| **1**  | Xbox One           | Konsol Game                      |
| **6**  | Apple iPhone       | Smartphone iOS                   |
| **7**  | Apple iPad         | Tablet iOS                       |
| **8**  | Android Device     | Smartphone/Tablet Android        |
| **9**  | Windows 10 Desktop | PC Desktop                       |
| **11** | Windows 10 Phone   | Mobile Device Windows            |
| **12** | Linux Device       | Perangkat berbasis Linux         |
| **13** | Windows IoT        | Perangkat Internet of Things     |
| **14** | Surface Hub        | Perangkat kolaborasi layar besar |
| **15** | Windows 10 Laptop  | Perangkat Laptop (Observed)      |
| **16** | Microsoft Surface  | Tablet/Laptop Surface (Observed) |

### Contoh Korelasi Registry

Tabel berikut menunjukkan bagaimana menghubungkan data dari database ke Registry untuk memvalidasi asal aktivitas.

| Field                | Value / Deskripsi                                                                                                                                                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Registry Path**    | `...\TaskFlow\DeviceCache\<Device_GUID>`                                                                                                                                                                                                                   |
| **Key Value**        | `DeviceType`                                                                                                                                                                                                                                               |
| **Forensic Purpose** | Membuktikan sumber perangkat (misal: membedakan aktivitas dari laptop kantor vs ponsel pribadi).                                                                                                                                                           |
| **Example**          | <img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F2bNLWyD7TftqD1AkMfc3%2Fimage.png?alt=media&#x26;token=b06f61af-d99a-40b0-8e6b-f6f333b713e2" alt="" data-size="original"> |


> [!TIP]
> **Insight Forensik**: Kemampuan sinkronisasi cloud pada Windows Timeline berarti satu file ActivitiesCache.db bisa berisi riwayat dari banyak perangkat berbeda. Mengidentifikasi PlatformDeviceId adalah langkah krusial untuk membuktikan possession (kepemilikan) dan access (akses) pada perangkat tertentu dalam lingkungan multi-device.


## Prosedur Ekstraksi & Analisis

Cara termudah untuk menganalisis artefak ini adalah menggunakan tool parser dari Eric Zimmerman.

1. **Ekstraksi:** Gunakan FTK Imager untuk mengambil file `ActivitiesCache.db` (pastikan file `-wal` dan `-shm` juga terbawa).
2. **Parsing dengan WxTCmd:** Jalankan tool via Command Line untuk menghasilkan output CSV.

   ```cmd
   WxTCmd.exe -f "C:\Path\To\ActivitiesCache.db" --csv "C:\Output\Folder"
   ```
3. **Review:** Gunakan **Timeline Explorer** untuk membuka hasil CSV. Fokus pada kolom `Payload` dan `Focus Duration` (untuk Type 6) guna menentukan berapa lama pengguna berinteraksi dengan aplikasi tersebut.

## Tools yang Direkomendasikan

| Tool                        | Deskripsi                                                                                                 |
| --------------------------- | --------------------------------------------------------------------------------------------------------- |
| **WxTCmd**                  | Tool CLI terbaik untuk mem-parsing ActivitiesCache.db secara massal ke CSV.                               |
| **Timeline Explorer**       | Viewer untuk membuka hasil CSV dengan fitur filtering yang sangat memudahkan analisis.                    |
| **DB Browser for SQLite**   | Untuk inspeksi manual langsung ke dalam tabel database.                                                   |
| **Windows Timeline Parser** | Tool GUI (Kacos2000) yang memudahkan visualisasi riwayat aktivitas secara hierarkis tanpa baris perintah. |
