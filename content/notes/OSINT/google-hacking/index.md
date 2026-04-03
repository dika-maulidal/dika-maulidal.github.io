---
title: "Google Hacking"
date: 2026-04-03T22:13:53+07:00
draft: false
type: docs
---

## Google Dorking Commands

| Operator       | Contoh                            | Deskripsi                                                        |
| -------------- | --------------------------------- | ---------------------------------------------------------------- |
| OR             | Emily OR Olivia                   | Mengembalikan hasil yang mengandung salah satu kata kunci.       |
| AND            | Sophia AND Olivia                 | Mengembalikan hasil yang mengandung semua kata kunci.            |
| "X"            | "Hello World"                     | Mencari frase persis (urutan dan kata).                          |
| site:          | Olivia site:facebook.com          | Memfilter hasil hanya dari domain/situs tertentu.                |
| `-` (minus)    | Olivia -site:facebook.com         | Mengecualikan hasil yang mengandung kata/host berikut.           |
| `*` (wildcard) | Username\*com                     | Pengganti kelompok kata/tanda (wildcard di dalam frase).         |
| filetype:      | "Sophia Olivia" filetype:pdf      | Batasi hasil ke tipe file tertentu (pdf, xls, docx, pptx, txt).  |
| cache:         | cache:facebook.com                | Menampilkan versi cache dari halaman (Google).                   |
| inurl:         | inurl:resume "sophia olivia"      | Cari kata di URL.                                                |
| intext:        | intext:resume "sophia olivia"     | Cari kata di isi halaman (body text).                            |
| intitle:       | intitle:resume "sophia olivia"    | Cari kata di judul halaman.                                      |
| allinurl:      | allinurl: admin login             | Semua kata pencarian harus muncul di URL.                        |
| allintitle:    | allintitle:term1 term2            | Semua kata harus muncul di judul.                                |
| allintext:     | allintext:private password config | Semua kata harus ada di body teks.                               |
| related:       | related:example.com               | Menemukan situs serupa/terkait.                                  |
| link:          | link:example.com                  | Menemukan halaman yang menautkan ke URL                          |
| after:         | site:google.com after:2025-01-01  | Batasi hasil setelah (>=) tanggal tertentu. Format: `YYYY-MM-DD` |
| before:        | site:google.com before:2025-06-30 | Batasi hasil sebelum (<=) tanggal tertentu.                      |

## Informational Dorks

| Operator | Example          | Deskripsi                                 |
| -------- | ---------------- | ----------------------------------------- |
| define:  | define:osint     | Mengembalikan definisi kata atau frasa    |
| stocks:  | stocks:GOTO      | Periksa aktivitas keuangan saham tertentu |
| weather: | weather:surabaya | Dapatkan cuaca di lokasi yang diberikan   |

## Creepy Dorks

| Operator                                                                 | Deskripsi                                                                                 |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- |
| "Not for Public Release" + "Confidential" ext:pdf \| ext:doc \| ext:xlsx | Dapatkan tautan ke dokumen yang dimaksudkan untuk di rahasiakan.                          |
| ”index of” inurl:ftp secret                                              | Dapatkan server FTP                                                                       |
| inurl:zoom.us/j intext:scheduled                                         | Dapatkan tautan ke rapat Zoom yang dibagikan secara publik yang mungkin ingin Anda akses. |
| intitle:"index of" "database.sql.zip"                                    | Dapatkan dump SQL yang tidak aman.                                                        |
| intitle:"webcamxp" "Flash JPEG Stream"                                   | Mendeteksi halaman yang dibuat oleh **WebcamXP** menampilkan *Flash/JPEG stream*          |

## References

> \[1] GHDB. <https://www.exploit-db.com/google-hacking-database>
>
> \[2] STATIONX : <https://www.stationx.net/google-dorks-cheat-sheet/>

