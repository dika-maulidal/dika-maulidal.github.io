---
title: "System"
date: 2026-03-28T22:18:20+07:00
draft: false
type : docs
---

**SYSTEM** adalah registry hive inti Windows yang menyimpan konfigurasi **hardware**, **driver**, **service**, **network**, serta histori **perangkat eksternal (USB)**. Hive ini bersifat **system-wide** (bukan per-user) dan sangat penting dalam investigasi forensik karena merekam interaksi antara sistem operasi dan perangkat keras.

> [!TIP]
> **Tips Akses**: Hive ini terletak di level sistem dan selalu terkunci saat Windows aktif. Gunakan tool ekstraksi seperti KAPE atau FTK Imager untuk mengambil file dari jalur: C:\Windows\System32\Config\SYSTEM. Catatan: Dalam registry viewer, carilah folder ControlSet001 (yang biasanya dipetakan sebagai CurrentControlSet saat sistem berjalan).

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>C:\Windows\System32\Config\SYSTEM
</code></pre></td></tr><tr><td><strong>Loaded under</strong></td><td><code>HKEY_LOCAL_MACHINE\SYSTEM</code></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan konfigurasi hardware, kontrol layanan (services), dan pengaturan sistem global.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>ShimCache (AppCompatCache)</strong>: Digunakan untuk melacak informasi kompatibilitas aplikasi; dapat membuktikan keberadaan file dan dalam kondisi tertentu mengindikasikan eksekusi aplikasi.</li><li><strong>Activity Moderator (BAM)</strong>: Digunakan untuk melacak aplikasi yang berjalan di background atau digunakan dalam skenario low-power; menyediakan bukti kuat eksekusi aplikasi.</li><li><strong>Windows Services</strong> : Berisi informasi seluruh layanan Windows dan driver sistem, termasuk startup type dan path binary.</li><li><strong>MountedDevices</strong>: Digunakan untuk memetakan drive letter (mis. E:, F:) ke perangkat atau volume yang pernah terhubung.</li><li><strong>Enum USB / USBSTOR</strong>: Mencatat histori perangkat USB yang pernah terhubung, termasuk Vendor ID, Product ID, Serial Number, serta waktu pertama dan terakhir terpasang.</li><li><strong>TCP/IP Interfaces</strong>: Menyimpan detail konfigurasi network interface seperti IP address, DNS server, default gateway, dan DHCP lease time.</li><li><strong>System Configuration Details</strong>: Informasi konfigurasi sistem seperti time zone, computer name, last shutdown time, network interfaces, dan network history.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; esensial untuk membuktikan koneksi hardware eksternal, konfigurasi jaringan, dan timeline aktivitas sistem.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FamirXmgDMOML2w2HLbbY%2Fgambar.png?alt=media&#x26;token=b6faa41c-9cb8-420b-a1ec-004ae9906c76" alt=""></td></tr></tbody></table>

## Artefak dalam Hive System <a href="#artefak-dalam-usrclass.dat" id="artefak-dalam-usrclass.dat"></a>

### ShimCache (AppCompatCache)

ShimCache, juga dikenal sebagai AppCompatCache, adalah fitur Windows yang dirancang untuk menjaga kompatibilitas aplikasi lama pada sistem operasi yang lebih baru. Dari perspektif forensik, artefak ini sangat krusial karena mencatat daftar file executable yang pernah ada di sistem, baik yang dieksekusi maupun yang hanya sekadar "terlihat" oleh sistem.

> [!WARNING]
> **Data Persistence**: ShimCache disimpan di dalam memori (RAM) saat sistem berjalan dan hanya akan ditulis ke Registry (file SYSTEM) saat sistem melakukan shutdown atau reboot secara normal. Jika sistem mati mendadak (crash/power off), data terbaru mungkin tidak tersimpan di registry.

> [!TIP]
> **Analisis Offline**: Pada sistem yang sedang berjalan (*live*), path berada di `CurrentControlSet`. Namun, jika menganalisis file hive secara offline, Anda harus mencari di folder `ControlSet00x`. Periksa kunci `SYSTEM\Select\Current` untuk mengetahui `ControlSet` mana yang aktif (misalnya jika nilainya `1`, maka gunakan `ControlSet001`).

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>SYSTEM\CurrentControlSet\Control\Session Manager\AppCompatCache
</code></pre></td></tr><tr><td><strong>Registry Hive</strong></td><td><code>SYSTEM</code></td></tr><tr><td><strong>Purpose</strong></td><td>Mengidentifikasi masalah kompatibilitas aplikasi dan melacak keberadaan file executable di disk.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>File Full Path</strong>: Jalur lengkap file (termasuk dari USB, Network Share, atau folder Temp).</li><li><strong>Timestamps</strong>: Berisi <strong>Last Modification Time</strong> dari biner (bukan waktu eksekusi).</li><li><strong>Cache Entry Position</strong>: Urutan entri (0 adalah yang terbaru) yang membantu menyusun kronologi akses file.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; Digunakan untuk membuktikan keberadaan file (<em>existence</em>) di masa lalu, meskipun file tersebut sudah dihapus dari sistem.</td></tr><tr><td><strong>Example Hive</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FC5VEXEWItXhpezkznIXn%2FSimCache.png?alt=media&#x26;token=4e21b295-0f0f-4309-825b-46f42afd8b4e" alt=""></td></tr><tr><td><strong>Example Parser (AppCompatCache)</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F2eNZPvOAmzsT9AfMDcYF%2Fimage.png?alt=media&#x26;token=9180ed7c-e5fc-463c-be4f-3f32e5f6d65b" alt=""></td></tr></tbody></table>

### BAM (Background Activity Moderator)

Background Activity Moderator (BAM) adalah layanan Windows yang diperkenalkan pada Windows 10 (versi 1709) untuk mengontrol aktivitas aplikasi di latar belakang. Dari sisi forensik, BAM sangat reliabel karena mencatat path lengkap eksekusi dan waktu eksekusi terakhir, berbeda dengan ShimCache yang hanya mencatat waktu modifikasi file.

> [!TIP]
> **Analisis Offline**: Karena BAM berada di hive SYSTEM, Anda harus memeriksa kunci SYSTEM\Select\Current terlebih dahulu untuk menentukan ControlSet00x mana yang sedang aktif agar data yang dianalisis adalah data terbaru.

> [!WARNING]
> **Limitasi Artefak**: BAM umumnya hanya mencatat aplikasi yang dijalankan secara lokal (lokal disk). Aplikasi dari network shares atau aplikasi berbasis konsol (CLI) tertentu seringkali tidak tercatat. Selain itu, entri akan dihapus jika file asli dihapus atau jika entri sudah lebih dari 7 hari saat proses boot.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>SYSTEM\ControlSet00x\Services\bam\State\UserSettings{SID}
</code></pre></td></tr><tr><td><strong>Registry Hive</strong></td><td><code>SYSTEM</code></td></tr><tr><td><strong>Purpose</strong></td><td>Mengatur penggunaan daya dan aktivitas background aplikasi Windows.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>Full Path</strong>: Menggunakan format <em>device path</em> (contoh: <code>\Device\HarddiskVolume4...</code>).</li><li><strong>Execution Time</strong>: Data biner (REG_BINARY) yang berisi timestamp <strong>FILETIME</strong> eksekusi terakhir.</li><li><strong>User SID</strong>: Mengaitkan aktivitas eksekusi ke pengguna spesifik (misal: <code>S-1-5-21-...</code>).</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td>Memberikan bukti kuat eksekusi aplikasi beserta waktu eksekusi terakhir yang spesifik untuk tiap <em>user</em>.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FcNr1Guuw7KDMQR8A3pg2%2Fimage.png?alt=media&#x26;token=b904fcc0-eb09-4169-9183-93c679e0bef3" alt=""></td></tr></tbody></table>

### Windows Services

Windows Services adalah program yang berjalan di latar bfelakang (background) tanpa interaksi pengguna langsung. Dalam analisis forensik, memeriksa daftar layanan sangat penting untuk mengidentifikasi teknik persistence (tahan lama) yang digunakan oleh malware, seperti mendaftarkan diri sebagai layanan baru atau memodifikasi layanan sistem yang sah.

> [!TIP]
> Tips Analisis: Kunci Services berisi ratusan entri. Fokuslah pada layanan yang memiliki Start Mode bernilai 0 (Boot) atau 2 (Automatic), karena layanan inilah yang akan langsung berjalan saat sistem aktif.

> [!WARNING]
> Identifikasi Malware: Perhatikan kolom Image Path. Malware sering menyamar dengan nama layanan yang mirip dengan sistem (misalnya svchost.exe tapi berada di folder yang salah seperti Temp atau Downloads).

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>SYSTEM\ControlSet00x\Services
</code></pre></td></tr><tr><td><strong>Registry Hive</strong></td><td><code>SYSTEM</code></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan konfigurasi seluruh layanan dan driver perangkat keras pada sistem.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>Service Name</strong>: Nama unik layanan (Subkey).</li><li><strong>Image Path</strong>: Jalur lengkap ke file biner (executable/driver) yang dijalankan.</li><li><strong>Start Mode</strong>: Menentukan bagaimana layanan dimulai (0:Boot, 1:System, 2:Auto, 3:Manual, 4:Disabled).</li><li><strong>Service DLL</strong>: Jika layanan berjalan via <code>svchost.exe</code>, path DLL aslinya ada di subkey <code>Parameters</code>.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; Esensial untuk mendeteksi mekanisme persistence, instalasi driver mencurigakan, atau perubahan konfigurasi sistem.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FbpnubVql2YG5igAjhUg2%2Fimage.png?alt=media&#x26;token=fa49e98e-43d6-474e-ae9d-baf059a4a11a" alt=""></td></tr></tbody></table>

### MountedDevices

MountedDevices adalah artefak penting yang digunakan Windows untuk memetakan volume penyimpanan ke drive letter (seperti C:, D:, E:) atau volume GUID. Dalam forensik, kunci ini sangat berguna untuk mengidentifikasi perangkat penyimpanan eksternal (seperti USB Flash Drive atau HDD Eksternal) yang pernah terhubung ke sistem dan menentukan drive letter mana yang diberikan kepadanya.

> [!TIP]
> **Tips Analisis**: Cari entri yang dimulai dengan \DosDevices\ untuk melihat pemetaan drive letter saat ini. Entri yang dimulai dengan ??\Volume mewakili GUID unik untuk setiap volume yang pernah dikenali oleh sistem.

> [!WARNING]
> **Identifikasi Perangkat**: Data dalam kolom Device Data sering kali mengandung informasi biner. Namun, untuk perangkat USB, Anda dapat melihat string teks seperti \_USBSTOR#Disk\&Ven\_TOSHIBA... yang secara langsung mengidentifikasi vendor dan jenis perangkat.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>SYSTEM\MountedDevices
</code></pre></td></tr><tr><td><strong>Registry Hive</strong></td><td><code>SYSTEM</code></td></tr><tr><td><strong>Purpose</strong></td><td>Memetakan volume sistem, partisi, dan perangkat eksternal ke <em>drive letter</em> atau <em>mount point</em>.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>Device Name</strong>: Berisi <em>drive letter</em> (DosDevices) atau Volume GUID unik.</li><li><strong>Device Data</strong>: Informasi biner yang menghubungkan volume tersebut ke <em>hardware serial number</em> atau signature disk.</li><li><strong>USBSTOR Reference</strong>: Bukti koneksi perangkat USB spesifik yang pernah mendapatkan mount point.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Tinggi</mark>; Memungkinkan investigator untuk menghubungkan aktivitas file pada drive tertentu (misal drive <code>E:</code>) ke perangkat fisik tertentu yang pernah dicolokkan.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FOutMsWmuFh3ug4fF3jve%2Fimage.png?alt=media&#x26;token=417fdd71-ff10-4ed2-ac73-f4eb6e607aac" alt=""></td></tr></tbody></table>

### USB (Universal Serial Bus)

Kunci USB adalah artefak pada hive SYSTEM yang mencatat seluruh perangkat USB yang pernah terdeteksi oleh sistem, mulai dari periferal (Mouse/Keyboard), perangkat mobile, hingga media penyimpanan massal. Artefak ini sangat krusial karena mencatat riwayat koneksi fisik lengkap, termasuk waktu pertama kali perangkat terhubung hingga terakhir kali dilepaskan.

> [!TIP]
> Identifikasi Perangkat: Nama subkey di bawah USB menggunakan format VID\_XXXX\&PID\_YYYY. Anda dapat melakukan pencarian kode ini secara daring (misal di devicehunt.com) untuk mengetahui merk dan jenis perangkat secara pasti.

> [!WARNING]
> Serial Number: Di bawah subkey VID/PID, terdapat folder yang merupakan Serial Number perangkat. Jika karakter kedua adalah & (contoh: 5&2b1d7621...), artinya perangkat tersebut tidak memiliki nomor seri unik dari pabrik dan Windows memberikan ID sementara berdasarkan port yang digunakan.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>SYSTEM\ControlSet00x\Enum\USB
</code></pre></td></tr><tr><td><strong>Registry Hive</strong></td><td><code>SYSTEM</code></td></tr><tr><td><strong>Purpose</strong></td><td>Mencatat enumerasi fisik dan riwayat koneksi seluruh perangkat USB yang terdeteksi oleh sistem.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>VID &#x26; PID</strong>: Identitas vendor dan produk perangkat keras.</li><li><strong>Device Desc / Friendly Name</strong>: Deskripsi perangkat (contoh: <code>realme narzo 30A</code> atau <code>USB Mass Storage Device</code>).</li><li><strong>Timestamps</strong>: Mencatat waktu <strong>Install</strong>, <strong>First Install</strong>, <strong>Last Connected</strong>, dan <strong>Last Removed</strong>.</li><li><strong>Service</strong>: Layanan driver yang digunakan (contoh: <code>USBSTOR</code>, <code>WinUSB</code>, atau <code>hidusb</code>).</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; Memberikan bukti kronologis yang presisi mengenai kapan sebuah perangkat eksternal dicolokkan dan dicabut dari sistem.</td></tr><tr><td><strong>Example</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FCBp3b2cr0onjCFunWk0k%2Fimage.png?alt=media&#x26;token=92cba458-7b11-498b-900d-35ebef623f86" alt=""></td></tr></tbody></table>

### TCP/IP Interfaces

Artefak TCP/IP Interfaces menyimpan konfigurasi jaringan untuk setiap adaptor (Ethernet, Wi-Fi, VPN) yang pernah digunakan oleh sistem. Dalam investigasi forensik, kunci ini sangat krusial untuk memetakan lokasi fisik atau lingkungan jaringan di mana perangkat tersebut pernah beroperasi melalui alamat IP dan riwayat koneksi DHCP.

> [!TIP]
> Tips Analisis: Setiap adaptor jaringan diidentifikasi melalui GUID unik. Anda dapat mencocokkan GUID ini dengan kunci NetworkCards di hive SOFTWARE untuk mengetahui nama perangkat adaptor yang sebenarnya (misal: "Intel(R) Wi-Fi 6").

> [!WARNING]
> Identifikasi Lokasi: Melalui tab DHCPNetworkHints, investigator dapat melihat nama SSID Wi-Fi (Network Hint) yang pernah terhubung, seperti "Bonnito", "TelU-Connect", atau "ZAMZAM HOTEL". Ini memberikan bukti riwayat lokasi geografis perangkat.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Location / Path</strong></td><td><pre><code>SYSTEM\ControlSet00x\Services\Tcpip\Parameters\Interfaces{GUID}
</code></pre></td></tr><tr><td><strong>Registry Hive</strong></td><td><code>SYSTEM</code></td></tr><tr><td><strong>Purpose</strong></td><td>Menyimpan detail konfigurasi IP, DNS, dan riwayat penyewaan (lease) DHCP untuk setiap adaptor jaringan.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>IPAddress / DhcpIPAddress</strong>: Alamat IP yang digunakan oleh perangkat.</li><li><strong>DhcpServer</strong>: Alamat IP router atau server yang memberikan akses internet.</li><li><strong>Lease Obtained/Terminates</strong>: Waktu kapan perangkat mulai dan berhenti mendapatkan koneksi di jaringan tersebut.</li><li><strong>Network Hint (SSID)</strong>: Nama jaringan Wi-Fi yang pernah dikoneksikan.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; Esensial untuk membuktikan riwayat koneksi jaringan, alamat IP yang digunakan saat kejadian, dan mobilitas perangkat.</td></tr><tr><td><strong>Example Netwok Settings</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FicgR9BUOTjEgIxjqCBzm%2Fimage.png?alt=media&#x26;token=4769a5f3-ad2a-4957-854c-cc50f85c8b85" alt=""></td></tr><tr><td><strong>Example DHCPNetwork</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FLwex7Y0S2NylJuXLcpTU%2Fimage.png?alt=media&#x26;token=53e7fa01-0a1d-4b90-aaf0-945fa62aea30" alt=""></td></tr></tbody></table>

### System Configuration Details

Selain artefak aktivitas, hive SYSTEM menyimpan identitas dasar dan konfigurasi waktu perangkat. Informasi ini sangat krusial sebagai fondasi investigasi untuk memastikan sinkronisasi timeline dan identifikasi identitas komputer yang sedang dianalisis.

> [!CAUTION]
> Pentingnya Time Zone: Selalu periksa kunci TimeZoneInformation. Tanpa mengetahui zona waktu yang disetel pada sistem asli, investigator berisiko salah menginterpretasikan kronologi kejadian saat membandingkan log dari berbagai sumber.

> [!TIP]
> Last Shutdown Time: Nilai ini hanya diperbarui jika sistem melakukan proses shutdown secara normal. Jika komputer mati mendadak (putus daya), waktu yang tercatat mungkin merupakan waktu dari sesi sebelumnya.

<table><thead><tr><th>Field</th><th>Value</th></tr></thead><tbody><tr><td><strong>Computer Name</strong></td><td><pre><code>SYSTEM\ControlSet00x\Control\ComputerName\ComputerName
</code></pre></td></tr><tr><td><strong>Time Zone Info</strong></td><td><pre><code>SYSTEM\ControlSet00x\Control\TimeZoneInformation
</code></pre></td></tr><tr><td><strong>Last Shutdown Time</strong></td><td><pre><code>SYSTEM\ControlSet00x\Control\Windows\ShutdownTime
</code></pre></td></tr><tr><td><strong>Purpose</strong></td><td>Menentukan identitas perangkat (hostname), referensi waktu (UTC offset), dan jejak terakhir sistem aktif.</td></tr><tr><td><strong>Key Data</strong></td><td><ul><li><strong>ComputerName</strong>: Nama host yang terlihat di jaringan.</li><li><strong>TimeZoneKeyName</strong>: Nama zona waktu (misal: "SE Asia Standard Time").</li><li><strong>ActiveTimeBias</strong>: Selisih waktu sistem dengan UTC (dalam menit).</li><li><strong>ShutdownTime</strong>: Data biner 8-byte (FILETIME) waktu terakhir sistem dimatikan.</li></ul></td></tr><tr><td><strong>Forensic Value</strong></td><td><mark style="color:red;">Sangat Tinggi</mark>; Menghindari kesalahan interpretasi waktu dan memastikan bukti berasal dari mesin yang benar (hostname matching).</td></tr><tr><td><strong>Example Computer Name</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FMpWcfZlVPsEzkpLrSmvX%2Fimage.png?alt=media&#x26;token=6652e5e5-5d46-41c3-866b-9415369df58b" alt=""></td></tr><tr><td><strong>Example Timezone</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FYAc2JW17TNjcgQNFnH2p%2Fimage.png?alt=media&#x26;token=1438dac5-8cc8-41a9-a66b-46e6b4eec45a" alt=""></td></tr><tr><td><strong>Example Last Shutdown</strong></td><td><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FnsF1RQzZ1w9KLoahTpjs%2Fimage.png?alt=media&#x26;token=473cba49-4d31-4642-bb7d-e449f64a1f26" alt=""></td></tr></tbody></table>

## Tools Rekomendasi untuk Analisis Hive SYSTEM

> [!WARNING]
> **Validasi Temuan:** "Selalu gunakan lebih dari satu tool untuk memvalidasi temuan Anda, terutama saat menentukan bukti eksekusi (ShimCache vs BAM)."

| Tool                     | Fungsi Utama           | Keunggulan                                                                                             |
| ------------------------ | ---------------------- | ------------------------------------------------------------------------------------------------------ |
| **Registry Explorer**    | Eksplorasi Hive Manual | Memiliki plugin otomatis untuk mem-parsing data biner ShimCache dan BAM langsung di dalam GUI.         |
| **AppCompatCacheParser** | Parsing ShimCache      | Tool CLI buatan Eric Zimmerman yang sangat cepat untuk mengekstrak 1024 entri ShimCache ke format CSV. |
| **BAMParser**            | Parsing Data BAM       | Secara otomatis mengonversi data biner 8-byte pada kunci BAM menjadi timestamp yang mudah dibaca.      |
| **KAPE**                 | Akuisisi Artefak       | Tool terbaik untuk mengambil file SYSTEM secara cepat dari sistem yang sedang berjalan (live triage).  |
| **Volatility 3**         | Analisis Memory        | Digunakan untuk mengekstrak data ShimCache yang masih berada di RAM (sebelum ditulis ke disk/hive).    |

## Ringkasan Visual (Mindmap SYSTEM Hive)

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FNS7rkWeO3qquUBoZnV7P%2FSYSTEM%20Hive%20BAM%20Flow-2026-01-18-084722.png?alt=media&#x26;token=295d3c46-f99e-42ad-b143-4dd63bb79dbb" alt=""><figcaption></figcaption></figure>

