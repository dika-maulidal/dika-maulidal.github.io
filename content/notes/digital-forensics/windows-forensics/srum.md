---
title: "Srum"
date: 2026-03-28T22:15:56+07:00
type: docs
draft: false
---

**System Resource Usage Monitor (SRUM)** diperkenalkan sejak Windows 8. SRUM mencatat riwayat penggunaan sumber daya sistem selama 30 hingga 60 hari , mencakup penggunaan aplikasi terperinci, konsumsi energi, konektivitas jaringan, dan notifikasi push. Data ini juga merupakan sumber informasi bagi tab App History di Task Manager.

> [!NOTE]
> Tips Akses: Karena file ini selalu digunakan oleh sistem, mengambilnya secara langsung mungkin akan menghasilkan status "dirty". Gunakan tool ekstraksi seperti FTK Imager atau KAPE untuk mengambilnya dari jalur: C:\Windows\System32\SRU\SRUDB.dat.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Windows\System32\SRU\SRUDB.dat
</code></pre></td></tr><tr><td><strong>Format</strong></td><td>Extensible Storage Engine (ESE) / JetBlue Database</td></tr><tr><td><strong>Registry Reference</strong></td><td><code>SOFTWARE\Microsoft\Windows NT\Current Version\SRUM\Extensions</code></td></tr><tr><td><strong>Data Retention</strong></td><td>30 - 60 Hari</td></tr><tr><td><strong>Forensic Value</strong></td><td>mencatat aktivitas eksekusi bahkan jika file sumber telah dihapus.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FmTUfrLAgKCfa9EStMCBs%2Fimage.png?alt=media&#x26;token=26cb3522-43d8-4da4-ac0a-0138ed8fc850" alt=""></td></tr><tr><td><strong>Example Registry Refrence</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F3UFwvqMAC9eWKvbWNnmU%2Fimage.png?alt=media&#x26;token=e01cfe02-0b66-4512-9c30-7f7cfaa12034" alt=""></td></tr></tbody></table>

## Digital Forensics Value

SRUM melampaui sekadar bukti eksekusi program. Dengan artefak ini, investigator dapat:

* **Analisis Aktivitas**: Mengetahui berapa lama aplikasi menjadi jendela aktif (*foreground*) dibandingkan saat berjalan di latar belakang (*background*).
* **Eksfiltrasi Data**: Mengidentifikasi aplikasi mana yang mengirimkan data keluar melalui statistik *Bytes Sent/Received*.
* **Riwayat Koneksi**: Mendapatkan SSID dan nama jaringan nirkabel yang pernah terhubung dengan bantuan hive Registry.

## SRUM Providers (Extension GUID)

SRUM menyimpan data dalam bentuk database **ESE (Extensible Storage Engine)** yang terdiri dari beberapa *provider* atau *extension*.\
Setiap provider direpresentasikan oleh **GUID** yang terdaftar pada Registry dan masing-masing bertanggung jawab mencatat jenis aktivitas sistem tertentu.

### File Location

* **SRUM Database**\
  `C:\Windows\System32\SRU\SRUDB.dat`
* **Registry Reference**\
  `SOFTWARE\Microsoft\Windows NT\Current Version\SRUM\Extensions`

Provider berikut merupakan komponen utama yang sering digunakan dalam analisis digital forensik:

| Extension GUID                           | Provider                            | Deskripsi                                                                                                                                                                                                                          |
| ---------------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `{973F5D5C-1D90-4944-BE8E-24B94231A174}` | Network Data Usage Monitor          | Mencatat penggunaan jaringan kabel dan nirkabel, termasuk **SSID** jaringan Wi-Fi yang pernah terhubung. Artefak ini sangat berguna untuk membuktikan aktivitas koneksi jaringan pada waktu tertentu.                              |
| `{D10CA2FE-6FCF-4F6D-848E-B2E99266FA86}` | Push Notification Provider          | Mencatat aktivitas notifikasi yang ditampilkan kepada pengguna. Secara praktis, provider ini jarang memiliki nilai forensik yang signifikan.                                                                                       |
| `{D10CA2FE-6FCF-4F6D-848E-B2E99266FA89}` | Application Resource Usage Provider | Mencatat **setiap file executable (.exe)** yang dijalankan di sistem, termasuk aplikasi yang sudah dihapus. Jika aplikasi pernah dieksekusi, maka jejaknya *seharusnya* tercatat di sini.                                          |
| `{DD6636C4-8929-4683-974E-22C046A43763}` | Network Connectivity Usage Monitor  | Mencatat waktu mulai koneksi, jenis antarmuka jaringan (Ethernet atau Wireless), serta durasi koneksi. Data ini dapat dikorelasikan dengan artefak lokasi untuk mendukung bukti aktivitas jaringan pada waktu dan tempat tertentu. |
| `{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}` | Energy Usage Provider               | Mencatat statistik penggunaan daya dan status baterai/perangkat, berguna dalam analisis aktivitas perangkat mobile atau laptop.                                                                                                    |

> [!NOTE]
> Setiap provider memiliki tabel tersendiri di dalam **SRUDB.dat**.\
Tool seperti **SrumECmd** akan mengonversi tabel-tabel ini menjadi file CSV berdasarkan masing-masing provider.

## Prosedur Ekstraksi & Analisis

### 1. Ekstraksi dengan FTK Imager

Untuk hasil analisis maksimal, ambil folder SRU secara utuh beserta hive Registry pendukung:

1. Buka FTK Imager > Add Evidence Item > Physical Drive.
2. Ekspor folder: `C:\Windows\System32\SRU\` (Berisi `SRUDB.dat` dan log transaksi).

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FcoApc1yfLr4FxzSwohhP%2Fimage.png?alt=media&#x26;token=bb4ece9c-0fb3-4396-a0f3-ae35d3458951" alt="" width="375"><figcaption></figcaption></figure>

3. Ekspor hive Registry: `C:\Windows\System32\config\SOFTWARE`.

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FjMS3WsPIMQDhrO3bP6cO%2Fimage.png?alt=media&#x26;token=ee246d6a-195c-448e-8e61-d81afaddc81c" alt="" width="375"><figcaption></figcaption></figure>

> [!TIP]
> Penting: **Mengambil hive SOFTWARE memungkinkan tool parser untuk menyelesaikan (resolve) nama** profil jaringan dan SSID.

### 2. Parsing Menggunakan SrumECmd

Gunakan tool dari Eric Zimmerman untuk mengubah database ESE menjadi file CSV yang mudah dibaca:

```cmd
# Contoh perintah untuk mem-parsing direktori hasil ekstraksi
SrumECmd.exe -d "C:\Users\USER\Desktop\sru" --csv "C:\Users\USER\Desktop\Output"
```

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FHQnmiCorbFoDZl39jaLa%2Fimage.png?alt=media&#x26;token=455c8e50-f268-4730-84b7-51a98c6fb498" alt="" width="375"><figcaption><p>Output: SrumECmd.exe</p></figcaption></figure>

> [!NOTE]
> Tool ini secara otomatis akan mencari `SRUDB.dat` dan hive `SOFTWARE` di dalam direktori tersebut.

## Artefak Utama dalam SRUM

### App Resource Use Info (Eksekusi & Sumber Daya)

Tabel ini adalah inti dari SRUM untuk melacak perilaku aplikasi. Artefak ini mencatat statistik penggunaan CPU, disk I/O, dan durasi interaksi pengguna yang dibagi menjadi aktivitas Foreground (aktif) dan Background (latar belakang).

<table><thead><tr><th>Field</th><th>Value / Description</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Windows\System32\SRU\SRUDB.dat (Table: AppResourceUseInfo)
</code></pre></td></tr><tr><td><strong>Provider</strong></td><td><strong>Application Resource Usage Provider</strong><br>(<code>{D10CA2FE-6FCF-4F6D-848E-B2E99266FA89})</code><br></td></tr><tr><td><strong>Exe Info / AppId</strong></td><td>Menunjukkan path lengkap dari file executable yang dijalankan (contoh: <code>\Device\HarddiskVolume4...\ffmpeg.exe</code>).</td></tr><tr><td><strong>User Name / SID</strong></td><td>Identitas akun pengguna yang bertanggung jawab atas eksekusi aplikasi tersebut.</td></tr><tr><td><strong>FaceTime</strong></td><td>Durasi total (dalam milidetik) aplikasi berada di jendela aktif (interaksi langsung user).</td></tr><tr><td><strong>Data I/O</strong></td><td>Mencatat <strong>ForegroundBytesRead/Written</strong> (saat aktif) dan <strong>BackgroundBytesRead/Written</strong> (saat di latar belakang).</td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; menyediakan bukti durasi penggunaan aplikasi dan volume transfer data yang dilakukan.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F61QQEhG87Z8NIGJoyT7N%2Fimage.png?alt=media&#x26;token=075e7ae9-abff-419a-9e5d-c5b812f0af51" alt=""></td></tr></tbody></table>

> [!TIP]
> **Tips Forensik**: Selalu bandingkan UserId di SRUM dengan SID di Registry SOFTWARE untuk memastikan nama profil pengguna yang melakukan aktivitas tersebut.

### SRUM Energy Usage (Long Term)

Artefak **SRUM Energy Usage (Long Term)** mencatat informasi konsumsi daya jangka panjang pada perangkat Windows. Artefak ini berasal dari **Energy Usage Provider** dan sangat relevan dalam analisis forensik perangkat laptop atau mobile, khususnya untuk mengaitkan aktivitas aplikasi dengan kondisi daya dan siklus baterai.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Windows\System32\SRU\SRUDB.dat
(Table: EnergyUsage or EnergyUsageLongTerm)
</code></pre></td></tr><tr><td><strong>Provider</strong></td><td><strong>Energy Usage Provider</strong> (<code>{FEE4E14F-02A9-4550-B5CE-5FA2DA202E37}</code>)</td></tr><tr><td><strong>Purpose</strong></td><td>Mencatat statistik konsumsi daya aplikasi dan sistem dalam jangka panjang.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>Active AC Time</strong> – Durasi aplikasi aktif saat terhubung ke daya listrik.</li><li><strong>Active DC Time</strong> – Durasi aplikasi aktif saat menggunakan baterai.</li><li><strong>Active Discharge Time</strong> – Waktu pelepasan daya baterai saat aplikasi aktif.</li><li><strong>Active Energy</strong> – Total konsumsi energi aplikasi.</li><li><strong>CS AC/DC Time</strong> – Aktivitas aplikasi dalam mode Connected Standby.</li><li><strong>Cycle Count</strong> – Jumlah siklus baterai sepanjang masa hidup perangkat.</li><li><strong>Designed Capacity</strong> – Kapasitas baterai awal dari pabrikan.</li><li><strong>Full Charged Capacity</strong> – Kapasitas baterai aktual saat terisi penuh.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Tinggi</mark>; memungkinkan korelasi antara <strong>aktivitas aplikasi</strong>, <strong>waktu kejadian</strong>, dan <strong>kondisi daya perangkat</strong>.</td></tr><tr><td><strong>Notes</strong></td><td><ul><li>Artefak ini sangat berguna pada analisis <strong>laptop</strong> dan <strong>perangkat mobile</strong>.</li><li>Dapat dikorelasikan dengan <em>App Resource Use</em> untuk mengetahui aplikasi yang aktif saat baterai digunakan.</li><li>Nilai <strong>Cycle Count</strong> dan <strong>Full Charged Capacity</strong> dapat membantu menilai kondisi baterai secara historis.</li></ul></td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FAAgt3MSRFpR4eufjQAmN%2Fimage.png?alt=media&#x26;token=ec51bcea-2d21-4c8e-8868-f21b59eb38a7" alt="" data-size="original"></td></tr></tbody></table>

> [!NOTE]
Data ini dihasilkan oleh **Energy Usage Provider** dan akan diekstraksi secara otomatis saat menggunakan **SrumECmd**.

### SRUM Network Connections

Artefak **SRUM Network Connections** mencatat informasi jaringan yang pernah terhubung dengan perangkat Windows beserta durasi koneksinya. Artefak ini berasal dari **Network Connectivity Usage Monitor** dan sangat berguna untuk membangun **timeline konektivitas jaringan** dalam investigasi digital forensik.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Windows\System32\SRU\SRUDB.dat
(Table: NetworkConnectivityUsageMonitor)
</code></pre></td></tr><tr><td><strong>Provider</strong></td><td>Network Connectivity Usage Monitor (<code>{DD6636C4-8929-4683-974E-22C046A43763}</code>)</td></tr><tr><td><strong>Purpose</strong></td><td>Mencatat riwayat koneksi jaringan dan durasi koneksi perangkat.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>ConnectedTime</strong> – Durasi perangkat terhubung ke jaringan (dalam detik).</li><li><strong>ConnectStartTime</strong> – Waktu mulai koneksi jaringan.</li><li><strong>InterfaceType</strong> – Jenis antarmuka jaringan (Wireless / Ethernet).</li><li><strong>ProfileName</strong> – Nama profil jaringan (SSID untuk Wi-Fi).</li><li><strong>InterfaceLuid</strong> – Identifier unik antarmuka jaringan.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; memungkinkan investigator membuktikan <strong>waktu, jenis koneksi jaringan</strong>, dan <strong>durasi aktivitas jaringan</strong>.</td></tr><tr><td><strong>Notes</strong></td><td><ul><li>Dapat dikorelasikan dengan artefak <strong>Network Data Usage</strong> untuk mengetahui volume transfer data.</li><li>InterfaceType <code>IF_TYPE_IEEE80211</code> menunjukkan koneksi Wi-Fi, sedangkan <code>IF_TYPE_ETHERNET_CSMACD</code> menunjukkan koneksi kabel.</li><li>Nama SSID dapat di-resolve lebih lengkap dengan bantuan hive Registry <code>SOFTWARE</code>.</li></ul></td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FFDUA4cadS8jctDy9FL5x%2Fimage.png?alt=media&#x26;token=5b78859f-68fe-44b1-8645-6d73242d7e24" alt="" data-size="original"></td></tr></tbody></table>

> [!NOTE]
> Artefak ini sangat efektif untuk membangun **timeline aktivitas jaringan** dan dapat dikorelasikan dengan artefak lokasi, log VPN, atau data browser.

### SRUM Network Usage

Artefak **SRUM Network Usage** mencatat aktivitas penggunaan jaringan oleh aplikasi pada sistem Windows. Artefak ini berasal dari **Network Data Usage Monitor** dan memungkinkan investigator mengidentifikasi **aplikasi apa yang melakukan komunikasi jaringan**, serta **berapa banyak data yang dikirim dan diterima**.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Windows\System32\SRU\SRUDB.dat
(Table: NetworkUsage)
</code></pre></td></tr><tr><td><strong>Provider</strong></td><td>Network Data Usage Monitor (<code>{973F5D5C-1D90-4944-BE8E-24B94231A174}</code>)</td></tr><tr><td><strong>Purpose</strong></td><td>Mencatat penggunaan jaringan oleh aplikasi, termasuk volume data yang dikirim dan diterima.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>ExeInfo</strong> – Path lengkap file executable aplikasi.</li><li><strong>AppId</strong> – Identifier unik aplikasi.</li><li><strong>BytesReceived</strong> – Total data yang diterima aplikasi.</li><li><strong>BytesSent</strong> – Total data yang dikirim aplikasi.</li><li><strong>InterfaceType</strong> – Jenis antarmuka jaringan (Wi-Fi atau Ethernet).</li><li><strong>User SID / User ID</strong> – Identitas pengguna yang menjalankan aplikasi.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; menyediakan bukti kuat aktivitas komunikasi jaringan oleh aplikasi tertentu, termasuk potensi <strong>eksfiltrasi data</strong>.</td></tr><tr><td><strong>Notes</strong></td><td><ul><li>Aplikasi yang sudah dihapus tetap dapat muncul jika pernah melakukan aktivitas jaringan.</li><li>Entri dengan <code>S-1-5-18 (LocalSystem)</code> menunjukkan aktivitas jaringan oleh service sistem.</li><li>Dapat dikorelasikan dengan artefak <strong>Network Connections</strong> untuk menentukan konteks waktu koneksi.</li></ul></td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FUk14fITWaoZwr99ZFngR%2Fimage.png?alt=media&#x26;token=7a72e1dd-8cc3-4b83-98ab-ea75b2d3eb57" alt="" data-size="original"></td></tr></tbody></table>

> [!NOTE]
> Artefak ini sangat efektif untuk mengidentifikasi **aplikasi yang melakukan komunikasi jaringan**, termasuk service sistem dan aplikasi yang sudah dihapus.

### SRUM Push Notification Data

Artefak **SRUM Push Notification Data** mencatat aktivitas notifikasi *push* pada sistem Windows. Artefak ini berasal dari **Push Notification Provider** dan merekam informasi dasar mengenai aplikasi yang memicu notifikasi serta konteks jaringan saat notifikasi tersebut terjadi.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Windows\System32\SRU\SRUDB.dat
(Table: PushNotificationData)
</code></pre></td></tr><tr><td><strong>Provider</strong></td><td>Push Notification Provider (<code>{D10CA2FE-6FCF-4F6D-848E-B2E99266FA86}</code>)</td></tr><tr><td><strong>Purpose</strong></td><td>Mencatat aktivitas notifikasi *push* yang dihasilkan oleh aplikasi Windows.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>ExeInfo</strong> – Path lengkap atau identitas aplikasi yang menghasilkan notifikasi.</li><li><strong>AppId</strong> – Identifier unik aplikasi.</li><li><strong>NetworkType</strong> – Jenis jaringan saat notifikasi dikirim.</li><li><strong>NotificationType</strong> – Jenis notifikasi jaringan.</li><li><strong>PayloadSize</strong> – Ukuran data notifikasi yang dikirim.</li><li><strong>User SID / User ID</strong> – Identitas pengguna terkait.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:orange;">Rendah – Menengah</mark>; umumnya digunakan sebagai artefak pendukung untuk menguatkan **timeline aktivitas aplikasi**.</td></tr><tr><td><strong>Notes</strong></td><td><ul><li>Artefak ini jarang digunakan sebagai bukti utama.</li><li>Berguna untuk menguatkan korelasi waktu antara aplikasi dan aktivitas jaringan.</li><li>Sering muncul pada aplikasi UWP dan aplikasi Microsoft Office.</li></ul></td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FJkWu1kDDuWZ1r7Bu6hEe%2Fimage.png?alt=media&#x26;token=2370c6b1-5fef-4d86-aefb-b457ac8094ff" alt="" data-size="original"></td></tr></tbody></table>

> [!NOTE]
> Artefak ini paling efektif digunakan sebagai **pendukung timeline**, bukan sebagai bukti tunggal dalam investigasi.

## Tools yang Direkomendasikan untuk SRUM

| Tool                  | Deskripsi                                                                        |
| --------------------- | -------------------------------------------------------------------------------- |
| **SrumECmd**          | Tool CLI terbaik untuk parsing massal ke CSV.                                    |
| **Timeline Explorer** | Viewer terbaik untuk membuka hasil CSV SRUM dalam format tabulasi yang rapi.     |
| **FTK Imager**        | Digunakan untuk ekstraksi file dari sistem yang sedang berjalan (*Live System*). |


