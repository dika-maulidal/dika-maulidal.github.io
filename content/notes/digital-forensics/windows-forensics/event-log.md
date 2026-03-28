---
title: "Event Log"
date: 2026-03-28T22:15:48+07:00
draft: false
type: docs
---

Dokumen ini berisi daftar Event ID penting untuk analisis forensik dan monitoring keamanan pada sistem operasi Windows.

***

### 🛡️ Security Event IDs

Daftar Event ID yang tercatat pada log **Security**.

| Event ID | Deskripsi                                                                             |
| -------- | ------------------------------------------------------------------------------------- |
| **4624** | Akun berhasil login. (Lihat Kode Tipe Logon)                                          |
| **4625** | Akun gagal login.                                                                     |
| **4634** | Akun telah logoff.                                                                    |
| **4647** | User memulai logoff. (Menggantikan 4634 untuk login Interaktif dan RemoteInteractive) |
| **4648** | Upaya login menggunakan kredensial eksplisit (RunAs).                                 |
| **4672** | Hak istimewa khusus (Special privileges) diberikan pada login baru (Login Admin).     |
| **4776** | Domain Controller (DC) mencoba memvalidasi kredensial untuk sebuah akun.              |
| **4768** | Permintaan tiket otentikasi Kerberos (TGT).                                           |
| **4769** | Permintaan tiket layanan Kerberos.                                                    |
| **4771** | Pra-otentikasi Kerberos gagal.                                                        |
| **4720** | Akun pengguna dibuat.                                                                 |
| **4722** | Akun pengguna diaktifkan.                                                             |
| **4688** | Proses baru telah dibuat.                                                             |
| **4698** | Scheduled task (tugas terjadwal) dibuat.                                              |
| **4798** | Enumerasi keanggotaan grup lokal pengguna.                                            |
| **4799** | Enumerasi keanggotaan grup lokal yang mendukung keamanan.                             |
| **5140** | Objek network share diakses.                                                          |
| **5145** | Pemeriksaan objek network share untuk melihat apakah klien dapat diberikan akses.     |
| **1102** | Log Audit telah dihapus/dibersihkan (Security Log).                                   |

***

### 🔑 Kode Tipe Logon (Logon Type Codes)

Digunakan untuk mengidentifikasi bagaimana cara pengguna melakukan login pada Event ID 4624.&#x20;

| Tipe   | Deskripsi                                  |
| ------ | ------------------------------------------ |
| **2**  | Console (Fisik)                            |
| **3**  | Network (Jaringan)                         |
| **4**  | Batch (Scheduled Tasks)                    |
| **5**  | Windows Services                           |
| **7**  | Screen Lock / Unlock                       |
| **8**  | Network (Cleartext Logon)                  |
| **9**  | Alternate Credentials Specified (RunAs)    |
| **10** | Remote Interactive (RDP)                   |
| **11** | Cached Credentials (misal: DC Offline)     |
| **12** | Cached Remote Interactive (Serupa tipe 10) |
| **13** | Cached Unlock (Serupa tipe 7)              |

***

### ⚙️ System, Application, & ESENT

Log yang berkaitan dengan stabilitas sistem dan aplikasi.

#### System Event IDs

| Event ID | Deskripsi                                                        |
| -------- | ---------------------------------------------------------------- |
| **7045** | Layanan (service) baru dipasang di sistem.                       |
| **7034** | Layanan berhenti secara tidak terduga.                           |
| **7009** | Waktu tunggu (timeout) tercapai saat menunggu layanan terhubung. |
| **104**  | File log dibersihkan (System, Application, dll).                 |

#### Application Event IDs

| Event ID | Deskripsi                               |
| -------- | --------------------------------------- |
| **1000** | Application Error (Error Aplikasi).     |
| **1002** | Application Hang (Aplikasi Hang/Macet). |

{% hint style="success" %}
**Catatan:** Perangkat lunak pihak ketiga (seperti Antivirus) juga dapat menulis ke log ini.
{% endhint %}

#### ESENT (Database Engine)

| Event ID | Deskripsi                                      |
| -------- | ---------------------------------------------- |
| **216**  | Deteksi perubahan lokasi database.             |
| **325**  | Database engine membuat database baru.         |
| **326**  | Database engine melampirkan (attach) database. |
| **327**  | Database engine melepas (detach) database.     |

***

### 💻 PowerShell & Task Scheduler

#### PowerShell

| Event ID | Deskripsi                                         |
| -------- | ------------------------------------------------- |
| **400**  | Perubahan state engine dari None ke Available.    |
| **600**  | Provider "x" dimulai.                             |
| **4104** | Pembuatan teks Scriptblock (Scriptblock Logging). |

{% hint style="info" %}
Event 4104 aktif secara default di PowerShell v5+ untuk skrip berbahaya (log sebagai peringatan).
{% endhint %}

#### Task Scheduler

| Event ID | Deskripsi                                   |
| -------- | ------------------------------------------- |
| **106**  | Pengguna mendaftarkan task baru.            |
| **141**  | Pengguna menghapus task.                    |
| **100**  | Task Scheduler memulai instansi task.       |
| **102**  | Task Scheduler berhasil menyelesaikan task. |

***

### 🛡️ Windows Defender

| Event ID | Deskripsi                                                  |
| -------- | ---------------------------------------------------------- |
| **1116** | Antimalware mendeteksi malware atau software mencurigakan. |
| **1117** | Antimalware melakukan tindakan perlindungan sistem.        |

***

### 🌐 Remote Desktop Services (RDP)

#### Local Session Manager & Remote Connection Manager

| Event ID | Deskripsi                                                            |
| -------- | -------------------------------------------------------------------- |
| **21**   | RDP: Logon sesi berhasil.                                            |
| **22**   | RDP: Notifikasi Shell start diterima.                                |
| **23**   | RDP: Logoff sesi berhasil.                                           |
| **24**   | RDP: Sesi telah terputus (disconnected).                             |
| **25**   | RDP: Rekoneksi sesi berhasil.                                        |
| **1149** | \[cite\_start]Otentikasi pengguna berhasil (Network Authentication). |
| **261**  | Listener RDP-Tcp menerima koneksi.                                   |

#### RDP Client (Source Computer)

| Event ID | Deskripsi                                               |
| -------- | ------------------------------------------------------- |
| **1029** | Berisi Hash dari username yang digunakan untuk koneksi. |

### References

1. **13Cubed — Event Log Training**\
   <https://training.13cubed.com>

