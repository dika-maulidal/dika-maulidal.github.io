---
author: Dika Maulidal
pubDatetime: 2025-03-25T19:32:53+07:00
title: OSINT Investigasi Digital dengan Maigret
slug: maigret
featured: False
draft: false
tags:
  - osint
  - privacy
description: Panduan singkat menggunakan Maigret untuk investigasi OSINT berbasis username.
---

![maigret](https://raw.githubusercontent.com/soxoj/maigret/main/static/maigret.png)

## Apa Itu Maigret?
**Maigret** adalah alat OSINT (Open Source Intelligence) yang dirancang untuk melakukan pencarian informasi berdasarkan nama pengguna (username) di berbagai layanan online. Alat ini dapat membantu dalam investigasi digital dengan mengumpulkan data yang tersedia secara publik dari berbagai situs web.

## Persiapan Sebelum Instalasi
Sebelum menginstal Maigret, pastikan sistem Anda telah memiliki **Python**.  
Cek versi Python dengan perintah berikut:

```bash
python3 --version
```
atau  
```bash
python --version
```
Jika Python belum terinstall, unduh dan instal dari situs resmi:  
[https://www.python.org/downloads/](https://www.python.org/downloads/)

## Fitur Utama Maigret
- Mencari informasi berdasarkan username  
- Memeriksa keberadaan akun di ratusan situs  
- Menyimpan hasil investigasi dalam berbagai format (PDF, HTML, XMIND)  
- Memiliki antarmuka web untuk memudahkan penggunaan  

## Persiapan dan Instalasi
Ikuti langkah-langkah berikut untuk menginstal dan menjalankan Maigret di sistem Anda.

### 1. Clone Repository
Pertama, clone repository Maigret dari GitHub dengan perintah berikut:  
```bash
git clone https://github.com/soxoj/maigret.git
```

### 2. Masuk ke Direktori Maigret
```bash
cd maigret
```

### 3. Buat Virtual Environment
Untuk menjaga kebersihan sistem, disarankan untuk menggunakan virtual environment:
```bash
python -m venv env
source env/bin/activate  # Untuk Linux/macOS
env\Scripts\activate     # Untuk Windows
```

### 4. Install Dependensi
Setelah virtual environment aktif, instal dependensi yang diperlukan:
```bash
pip install .
```

## Menampilkan Bantuan
Jika ingin melihat opsi perintah yang tersedia, jalankan:
```bash
maigret --help
```
Output yang muncul akan seperti berikut:
```
usage: maigret [-h] [--version] [--timeout TIMEOUT] [--retries RETRIES]
               [-n CONNECTIONS] [--no-recursion] [--no-extracting]
               [--id-type {username,yandex_public_id,gaia_id,vk_id,ok_id,wikimapia_uid,steam_id,uidme_uguid,yelp_userid}]
               [--permute] [--db DB_FILE] [--cookies-jar-file COOKIE_FILE]
               [--ignore-ids IGNORED_IDS] [--folderoutput PATH]
               [--proxy PROXY_URL] [--tor-proxy TOR_PROXY_URL]
               [--i2p-proxy I2P_PROXY_URL] [--with-domains] [-a]
               [--top-sites N] [--tags TAGS] [--site SITE_NAME]
               [--use-disabled-sites] [--parse URL] [--submit URL]
               [--self-check] [--stats] [--web [PORT]] [--print-not-found]
               [--print-errors] [--verbose] [--info] [--debug] [--no-color]
               [--no-progressbar] [-T] [-C] [-H] [-X] [-P] [-G] [-J TYPE]
               [--reports-sorting {default,data}]
               [USERNAMES ...]
```

## Menjalankan Maigret untuk Investigasi
Untuk mencari informasi mengenai username tertentu, jalankan:
```bash
maigret username
```
Gantilah `username` dengan username target yang ingin dicari.

### Contoh Output di Terminal
![maigret](https://i.imgur.com/vxpiiJX.png)  
_(Output Maigret saat mencari username di terminal)_

## Menjalankan Maigret dengan Antarmuka Web
Maigret dapat dijalankan dalam mode web dengan port **5000**:
```bash
maigret --web 5000
```
Kemudian, buka browser dan akses:
```
http://127.0.0.1:5000
```

### Tampilan Antarmuka Web Maigret
![maigret](https://i.imgur.com/5oXZ7BJ.png)  
_(Tampilan antarmuka web Maigret saat dijalankan dalam mode web)_

### Contoh Output dari Web Maigret
![output](https://i.imgur.com/SoTSrkC.png)  
_(Output dari web Maigret setelah memasukkan username)_

## Menyimpan Hasil Investigasi dalam Berbagai Format
Jika ingin menyimpan hasil investigasi, gunakan salah satu perintah berikut:
```bash
maigret user --html   # Menyimpan dalam format HTML
maigret user --pdf    # Menyimpan dalam format PDF
maigret user --xmind  # Menyimpan dalam format XMIND
```
Gantilah `user` dengan username yang ingin dicari.

## Kesimpulan
Maigret adalah alat OSINT yang berguna untuk melakukan investigasi berbasis username. Dengan fitur antarmuka web dan dukungan penyimpanan berbagai format, Maigret dapat digunakan oleh profesional keamanan siber, peneliti OSINT, dan siapa saja yang tertarik dalam investigasi digital.

## Disclaimer

> ⚠️ Ini hanya untuk catatan pribadi saya saja 