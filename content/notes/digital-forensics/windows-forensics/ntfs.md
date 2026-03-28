---
title: "Ntfs"
date: 2026-03-28T22:15:34+07:00
draft: false
type : docs
---

### Tabel Master File Table (MFT) System Files

MFT berisi rekaman khusus yang mendefinisikan struktur dan metadata dari volume NTFS itu sendiri. Rekaman ini biasanya ditandai dengan simbol $ di awal namanya.

| MFT Record # | Filename     | Description                                                                                        |
| ------------ | ------------ | -------------------------------------------------------------------------------------------------- |
| 0            | **$MFT**     | Master File Table - Database yang melacak setiap file dalam volume.                                |
| 1            | **$MFTMIRR** | Salinan cadangan (backup) dari empat rekaman pertama MFT.                                          |
| 2            | **$LOGFILE** | File log transaksional untuk pemulihan sistem file.                                                |
| 3            | **$VOLUME**  | Berisi nama volume, versi NTFS, dan status *dirty flag*.                                           |
| 4            | **$ATTRDEF** | Definisi atribut-atribut NTFS.                                                                     |
| 5            | **.**        | Direktori akar (Root directory) dari disk.                                                         |
| 6            | **$BITMAP**  | Melacak alokasi cluster (digunakan vs bebas) dalam volume.                                         |
| 7            | **$BOOT**    | Rekaman boot (Boot record) dari volume tersebut.                                                   |
| 8            | **$BADCLUS** | Digunakan untuk menandai cluster yang rusak agar tidak digunakan oleh NTFS.                        |
| 9            | **$SECURE**  | Melacak informasi keamanan (security descriptors) untuk file dalam volume.                         |
| 10           | **$UPCASE**  | Tabel karakter besar Unicode untuk membantu pengurutan nama file.                                  |
| 11           | **$EXTEND**  | Direktori yang berisi file sistem tambahan seperti `$ObjId`, `$Quota`, `$Reparse`, dan `$UsnJrnl`. |

{% hint style="info" %}
**Catatan Forensik**: Rekaman 0-11 adalah file sistem yang sangat penting. Investigator sering menganalisis $MFT untuk melihat histori penghapusan file dan $UsnJrnl untuk melacak perubahan file pada sistem secara kronologis.
{% endhint %}


