---
author: Dika Maulidal
pubDatetime: 2024-12-4T09:10:53Z
title: Text Analytics pada Akun FUFUFAFA pada Platform KASKUS
slug: fufufafa
featured: true
tags:
  - text analytics
  - text mining
description:  text analytics untuk menganalisis akun FUFUFAFA di platform Kaskus Melalui pendekatan seperti sentiment analysis, word cloud, analisis bigram, dan time series.
---

Di tengah hiruk pikuk media sosial, munculnya kontroversi seputar akun Fufufafa di platform Kaskus telah menarik perhatian publik Indonesia. Tanpa bermaksud mengungkap identitas pemilik akun, artikel ini akan fokus pada analisis konten tekstual dari postingan-postingan yang dibuat.

## Table of Contents

## **Pengumpulan Data**  
Artikel ini menggunakan teknik *web scraping* untuk mengumpulkan data dari postingan akun *Fufufafa* di *Kaskus*. Proses ini dilakukan dengan skrip otomatis yang secara sistematis mengekstraksi teks, tanggal, dan metadata lainnya dari setiap postingan. Total dataset yang terkumpul mencakup 1.900 postingan dalam rentang waktu 2013 hingga 2019.
Dari hasil *scraping*, berikut adalah contoh data yang diperoleh:

| Date       | Replied To     | Thread Title             | Post Content                    |
|------------|----------------|--------------------------|----------------------------------|
| 14-11-2019 09:54 | beritafilistin    | Perekam Wanita di Kamar Ganti Baju Mall Kerap Ceramah Agama di Medsos            | Dia pasti alumni 212 |
| 1/10/2019  5:38:00 PM | ibelindua  | Gubernur Anies Sampaikan Ancaman Penggantian Ideologi Pancasila Dengan Komunis    | Gak pernah ngaca ya  |
| 28-09-2019 10:56 | matadewa909       | Kecewa Ponakan Prabowo Batal Baca Doa, Gerindra WO dari MPR      | Alumni 212 mana suaranya |
| 17-09-2019 12:41 | SENORITA88   | Pria India Bikin Helm Pakai AC, Kepala Dingin Saat Macet  | Malah masuk angin ntar |
| 28-08-2019 13:45 | matthysse76    | Jokograd & Mandalanusa, Usulan Nama Ibu Kota Baru Indonesia Menurut Warganet  | Wowoland city of kamprets      |

---

## **Text Analytics ?**  
*Text analytics* adalah proses mengolah data tekstual tidak terstruktur menjadi informasi bermakna yang dapat dianalisis. Teknik ini digunakan untuk menemukan pola, tren, dan wawasan dari data dalam skala besar. 

Berikut adalah hasil analisis berdasarkan dataset yang tersedia:

### **1. Word Cloud Analysis**  
![Word Cloud](https://i.imgur.com/7tuo3fc.png)
Berdasarkan *word cloud* yang dianalisis, terlihat bahwa beberapa kata kunci muncul dengan frekuensi tinggi, menunjukkan tema utama diskusi akun *Fufufafa* di platform Kaskus. Kata-kata berikut menjadi pusat perhatian:

- **Nama tokoh politik:** Kata seperti *"Jokowi"* dan *"Prabowo"* mendominasi, mengindikasikan fokus pada diskusi politik dan tokoh pemimpin di Indonesia.
- **Kata emosional:** Kata seperti *"bodoh," "ngakak,"* dan *"panasbung"* muncul dengan intensitas tinggi. Hal ini menggambarkan nada percakapan yang cenderung emosional dan satir.
- **Istilah kontroversial:** Kata seperti *"kampret"* menunjukkan keberadaan istilah yang sering digunakan dalam perdebatan politik online.

Secara keseluruhan, *word cloud* ini mengindikasikan bahwa diskusi yang melibatkan akun ini kerap bersinggungan dengan isu politik nasional, sering disertai dengan nada yang emosional dan kadang-kadang sarkastik.



### **2. Bigram Analysis**  
![Bigram](https://i.imgur.com/LOBGsCq.png)
Visualisasi bigram menunjukkan frasa dua kata yang paling sering muncul dalam postingan. Bigram yang mendominasi adalah:
- **"hidup prabowo"**
- **"om wowo"**
- **"ts bodoh"**
- **"tidak gentar"**

Bigram seperti **"hidup prabowo"** dan **"om wowo"** mencerminkan dukungan terhadap tokoh tertentu, sedangkan frasa seperti **"ts bodoh"** dan **"tidak gentar"** mengindikasikan opini atau reaksi emosional dari pengguna.

### **3. Sentiment Analysis**  
![Sentiment Distribution](https://i.imgur.com/qkoPmuK.png)
Tahap ini menggunakan pendekatan *lexicon-based sentiment analysis* untuk menganalisis sentimen dari setiap postingan. Dengan memanfaatkan kamus sentimen dari [Repository GitHub](https://github.com/fajri91/InSet), setiap kata diberi bobot positif atau negatif berdasarkan makna emosionalnya.

Berikut adalah contoh hasil analisis sentimen untuk lima konten:  

| Contents                         | Sentiment  |
|----------------------------------|------------|
| Anjrit ngomong apa sih wkwkwkkw  | Negatif    |
| Kwkwkw kampret insaf   | Negatif    |
| Suruh jadi imam sholat dulu | Netral    |
| Gak pernah ngaca ya  | Positif    |
| Wowoland city of kamprets       | Netral    |

---

### **4. Time Series Analysis**  
Analisis ini dilakukan dalam dua bagian:  
1. **Time Series Berdasarkan Postingan:**  
![Trend Posting](https://i.imgur.com/31IDspO.png)
   Aktivitas posting mencapai puncaknya pada tahun **2014** bulan **mei**, bertepatan dengan menjelangnya peristiwa pemilu di Indonesia.

2. **Time Series Berdasarkan Sentimen:**  
![Trend Sentiment](https://i.imgur.com/29n1nIZ.png)
- **Sentimen negatif** memiliki frekuensi tertinggi selama periode puncak, mengindikasikan bahwa akun ini banyak memberikan kritik atau pandangan negatif pada periode tersebut.
- **Sentimen netral** berada di posisi kedua, menunjukkan adanya diskusi informatif atau opini yang tidak terlalu polar.
- **Sentimen positif** meskipun lebih sedikit, tetap menunjukkan bahwa akun ini juga memberikan pandangan yang mendukung atau optimis pada beberapa kesempatan.

Kesimpulannya, aktivitas akun **fufufafa** di Kaskus sangat dipengaruhi oleh momen-momen tertentu, terutama terkait politik, dengan kecenderungan dominasi sentimen negatif selama puncak aktivitas.

---

## **Kesimpulan**  
Melalui analisis ini, dapat menemukan pola komunikasi yang dinamis dari akun Fufufafa di Kaskus. Aktivitas akun ini menunjukkan lonjakan besar pada pertengahan tahun 2014, yang kemungkinan terkait dengan peristiwa politik penting, dengan fokus pada diskusi tokoh politik tertentu seperti terlihat dari bigram dominan, misalnya "hidup prabowo" dan "prabowo pemimpin."

Sentimen yang muncul pada periode tersebut cenderung didominasi oleh sentimen negatif, meskipun sentimen netral juga signifikan. Hal ini menunjukkan bahwa diskusi pada saat itu kemungkinan besar melibatkan kritik atau debat yang intens terhadap isu-isu yang sedang hangat.

Pendekatan berbasis data ini memberikan wawasan objektif tentang pola komunikasi akun tersebut. Walaupun terdapat keterbatasan dalam analisis sentimen berbasis *lexicon-based sentiment analysis*, hasil ini tetap memberikan gambaran umum yang relevan.

Oleh karena itu, *text analytics* dapat dianggap sebagai alat yang efektif untuk memahami pola komunikasi dan tren di platform digital.
