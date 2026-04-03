---
title: "Blackbird"
date: 2026-04-03T22:13:58+07:00
draft: false
type: docs
---

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2F6QFhY5YyPsQZH7yXFKh0%2Fimage.png?alt=media&#x26;token=de5fbef2-cd87-4853-aa79-f443a4433bdc" alt=""><figcaption><p>Blackbird Banner</p></figcaption></figure>

**Blackbird** adalah alat *Open Source Intelligence* (OSINT) yang dirancang khusus untuk melakukan pencarian cepat dan mendalam terhadap akun pengguna berdasarkan **username atau email** di berbagai platform daring (online).

Tools ini sangat berguna dalam proses:

* Investigasi digital
* Profiling pengguna
* Pengumpulan data dari sumber terbuka

## Getting Started

> [!NOTE]
> **Catatan:** Dibutuhkan Python 3.8 atau versi di atasnya.

### Persiapan Instalasi

#### **1. Kloning Repositori**

Unduh kode sumber Blackbird dari repositori resmi GitHub:

```bash
git clone https://github.com/p1ngul1n0/blackbird
cd blackbird
```

#### **2. Konfigurasi Virtual Environment (Disarankan)**

Gunakan lingkungan virtual agar *dependencies* tidak mengganggu pustaka sistem utama Anda:

**Windows :**&#x20;

```bash
python -m venv venv
source venv/Scripts/activate
```

**Linux / MacOS :**&#x20;

```bash
python3 -m venv venv
source venv/bin/activate
```

#### **3. Instalasi Modul yang Diperlukan**

Pasang semua pustaka Python yang dibutuhkan oleh alat ini:

```bash
pip install -r requirements.txt
```

**✅ Selesai!**

Sekarang Anda siap menjalankan Blackbird. Gunakan perintah berikut untuk melihat opsi bantuan:

```bash
$ python blackbird.py --help

usage: blackbird [-h] [-u [USERNAME ...]] [-uf USERNAME_FILE] [--permute]
                 [--permuteall] [-e [EMAIL ...]] [-ef EMAIL_FILE] [--csv]
                 [--pdf] [--json] [-v] [-ai] [--setup-ai] [--filter FILTER]
                 [--no-nsfw] [--dump] [--proxy PROXY] [--timeout TIMEOUT]
                 [--max-concurrent-requests MAX_CONCURRENT_REQUESTS]
                 [--no-update] [--about]

An OSINT tool to search for accounts by username in social networks.

options:
  -h, --help            show this help message and exit
  -u [USERNAME ...], --username [USERNAME ...]
                        One or more usernames to search.
  -uf USERNAME_FILE, --username-file USERNAME_FILE
                        The list of usernames to be searched.
  --permute             Permute usernames, ignoring single elements.
  --permuteall          Permute usernames, all elements.
  -e [EMAIL ...], --email [EMAIL ...]
                        One or more email to search.
  -ef EMAIL_FILE, --email-file EMAIL_FILE
                        The list of emails to be searched.
  --csv                 Generate a CSV with the results.
  --pdf                 Generate a PDF with the results.
  --json                Generate a JSON with the results.
  -v, --verbose         Show verbose output.
  -ai, --ai             Use AI features.
  --setup-ai            Configure the API key required for AI features.
  --filter FILTER       Filter sites to be searched by list property value.E.g
                        --filter "cat=social"
  --no-nsfw             Removes NSFW sites from the search.
  --dump                Dump HTML content for found accounts.
  --proxy PROXY         Proxy to send HTTP requests though.
  --timeout TIMEOUT     Timeout in seconds for each HTTP request (Default is
                        30).
  --max-concurrent-requests MAX_CONCURRENT_REQUESTS
                        Specify the maximum number of concurrent requests
                        allowed. Default is 30.
  --no-update           Don't update sites lists.
  --about               Show about information and exit.
```

## Penggunaan Dasar

> [!CAUTION]
> Blackbird dapat melakukan kesalahan dalam identifikasi. Selalu lakukan verifikasi ulang terhadap informasi yang ditemukan.

### Reverse Search

#### Username

Mencari satu username:
```bash
python blackbird.py --username username1
```

Mencari beberapa username sekaligus:
```bash
python blackbird.py --username username1 username2 username3
```

Menggunakan file list username:
```bash
python blackbird.py --username-file usernames.txt
```

---

#### Email

Mencari satu email:
```bash
python blackbird.py --email email1@email.com
```

Mencari beberapa email sekaligus:
```bash
python blackbird.py --email email1@email.com email2@email.com email3@email.com
```

Menggunakan file list email:
```bash
python blackbird.py --email-file emails.txt
```

#### Output Contoh

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FcB5RUFRBAurH4uAvrsFs%2Fimage.png?alt=media&#x26;token=586d4f5a-50be-4f59-9935-4d0bc68f526e" alt=""><figcaption><p>Email Output</p></figcaption></figure>

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FsKxvB0Gg3CEmQhEOmZOA%2Fimage.png?alt=media&#x26;token=e4655664-4d78-4b9d-9b55-6ca3538ced8f" alt=""><figcaption><p>Username Output</p></figcaption></figure>

### Export Data

Blackbird mendukung beberapa format export untuk kebutuhan analisis lanjutan.

> #### PDF
> ```bash
> python blackbird.py --username target_user --pdf
> ```

> #### CSV
> ```bash
> python blackbird.py --username username1 --csv
> ```

> #### JSON
> ```bash
> python blackbird.py --username username1 --json
> ```

<figure><img src="https://3379135436-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2F4pfT5vR8uE4ISAa7XuPV%2Fuploads%2FrQG7txC26lqESIALcUuf%2Fimage.png?alt=media&#x26;token=684da7d9-fcd0-4675-bcae-c50f17770d3a" alt=""><figcaption><p>Export PDF</p></figcaption></figure>

### DUMP (HTTP Response)

Digunakan untuk menyimpan seluruh response HTTP dari akun yang ditemukan.

```bash
python blackbird.py --username username1 --dump
```

## Advanced Usage

### Verbose

Mode verbose memberikan informasi yang lebih detail selama proses eksekusi.

```bash
python blackbird.py --username username1 --verbose
```

### Permute

Jika Anda mengalami kebuntuan dalam investigasi, gunakan `--permute` untuk menghasilkan variasi username.

```bash
python blackbird.py --username john 86 --permute
```

Perintah ini akan menghasilkan beberapa kombinasi username:

<details>

<summary><code>--permute</code> Combinations</summary>

```
john86
_john86
john86_
john_86
john-86
john.86
86john
_86john
86john_
86_john
86-john
86.john
```

</details>

### Permute All

Untuk variasi yang lebih luas, gunakan `--permuteall`.

<details>

<summary><code>--permuteall</code> Combinations</summary>

```
john
_john
john_
86
_86
86_
john86
_john86
john86_
john_86
john-86
john.86
86john
_86john
86john_
86_john
86-john
86.john
```

</details>

### No NSFW

Gunakan opsi ini untuk mengecualikan situs NSFW dari hasil pencarian.

```bash
python blackbird.py --username username1 --no-nsfw
```

## AI Analysis

Blackbird mendukung fitur analisis berbasis AI untuk menghasilkan insight perilaku berdasarkan platform tempat username atau email ditemukan.

### Setup

Untuk mengaktifkan fitur AI, lakukan langkah berikut:

#### 1. Generate API Key

```bash
python blackbird.py --setup-ai
```

API key akan disimpan secara lokal dalam file:

```
.ai_key.json
```

#### 2. Jalankan dengan AI

Gunakan flag `--ai` saat melakukan pencarian:

```bash
python blackbird.py --username johndoe --ai
```

### Export

Hasil analisis AI juga akan otomatis disertakan dalam laporan PDF.