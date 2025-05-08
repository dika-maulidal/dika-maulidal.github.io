---
author: Dika Maulidal
pubDatetime: 2024-12-4T09:10:53Z
title: Text Analytics pada Akun FUFUFAFA pada Platform KASKUS
slug: fufufafa
featured: false
tags:
  - text-analytics
  - text-mining
description:  text analytics untuk menganalisis akun FUFUFAFA di platform Kaskus Melalui pendekatan seperti sentiment analysis, word cloud, analisis bigram, time series, text network dan topic modelling.
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
![Word Cloud](https://i.imgur.com/lrm01x2.png)
Berdasarkan *word cloud* yang dianalisis, terlihat bahwa beberapa kata kunci muncul dengan frekuensi tinggi, menunjukkan tema utama diskusi akun *Fufufafa* di platform Kaskus. Kata-kata berikut menjadi pusat perhatian:

- **Nama tokoh politik:** Kata seperti *"Jokowi"* dan *"Prabowo"* mendominasi, mengindikasikan fokus pada diskusi politik dan tokoh pemimpin di Indonesia.
- **Kata emosional:** Kata seperti *"bodoh," "ngakak,"* dan *"panasbung"* muncul dengan intensitas tinggi. Hal ini menggambarkan nada percakapan yang cenderung emosional dan satir.
- **Istilah kontroversial:** Kata seperti *"kampret"* menunjukkan keberadaan istilah yang sering digunakan dalam perdebatan politik online.

Secara keseluruhan, *word cloud* ini mengindikasikan bahwa diskusi yang melibatkan akun ini kerap bersinggungan dengan isu politik nasional, sering disertai dengan nada yang emosional dan kadang-kadang sarkastik.


## 2. Bigram Analysis  
![Bigram](https://i.imgur.com/RQzScyr.png)  

Visualisasi bigram menunjukkan frasa dua kata yang paling sering muncul dalam postingan. **Bigram yang mendominasi adalah:**  
- **"hidup prabowo"**  
- **"om wowo"**  
- **"ts bodoh"**  
- **"jokowi jokowi"**  
- **"prabowo pemimpin"**  
- **"om ucril"**  
- **"tukang fitnah"**  
- **"macan asia"**  

### **Interpretasi**  
- Bigram seperti **"hidup prabowo"** dan **"prabowo pemimpin"** menunjukkan dukungan terhadap sosok tertentu dalam politik.  
- **"Om wowo"** dan **"jokowi jokowi"** mengindikasikan bahwa kedua nama tersebut sering disebut berulang kali dalam diskusi.  
- Bigram seperti **"ts bodoh"** dan **"tukang fitnah"** mencerminkan penggunaan bahasa yang cenderung emosional atau sarkastik dalam percakapan.  

Bigram yang muncul memperkuat temuan sebelumnya bahwa diskusi dalam dataset ini memiliki nuansa politik yang kuat dengan elemen dukungan, kritik, serta penggunaan bahasa yang ekspresif.  

### **3. Sentiment Analysis**  
![Sentiment Distribution](https://i.imgur.com/s6wvQsh.png)
Tahap ini menggunakan pendekatan *lexicon-based sentiment analysis* untuk menganalisis sentimen dari setiap postingan. Dengan memanfaatkan kamus sentimen dari [Repository GitHub](https://github.com/fajri91/InSet), setiap kata diberi bobot positif atau negatif berdasarkan makna emosionalnya.

Berikut adalah contoh hasil analisis sentimen untuk lima konten:  

| Contents                         | Sentiment  |
|----------------------------------|------------|
| Anjrit ngomong apa sih wkwkwkkw  | Negatif    |
| Kwkwkw kampret insaf   | Negatif    |
| Suruh jadi imam sholat dulu | Netral    |
| Gak pernah ngaca ya  | Positif    |
| Wowoland city of kamprets       | Netral    |

### **Word Cloud Sentimen**
Selain distribusi sentimen, *word cloud* membantu mengidentifikasi kata-kata yang paling sering muncul dalam masing-masing kategori sentimen.

- **Word Cloud Sentimen Negatif**  
  ![Word Cloud Negative](https://i.imgur.com/JyhTT4K.png)  

  Kata-kata yang dominan dalam kategori ini umumnya berkaitan dengan kritik, makian, atau sindiran yang kuat.

- **Word Cloud Sentimen Positif**  
  ![Word Cloud Positive](https://i.imgur.com/aqpZsW0.png)  

  Kata-kata di sini banyak berkaitan dengan ekspresi kebahagiaan, apresiasi, atau candaan ringan.

- **Word Cloud Sentimen Netral**  
  ![Word Cloud Neutral](https://i.imgur.com/c97ybEx.png)  

  Postingan dalam kategori ini sering kali mengandung informasi umum atau tidak menunjukkan emosi yang kuat.

Analisis sentimen ini memberikan gambaran tentang bagaimana emosi pengguna tercermin dalam postingan mereka. Pemahaman lebih lanjut dapat dilakukan dengan menggali konteks penggunaan kata dalam setiap kategori sentimen.

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

### **5. Text Network**  
![Text Network](https://i.imgur.com/9l0J2p9.png)

Visualisasi *Text Network* di atas menggambarkan hubungan antar kata dalam dataset yang dianalisis. Semakin besar ukuran node (*lingkaran*), semakin sering kata tersebut muncul dalam teks. Garis yang menghubungkan antar kata menunjukkan hubungan atau kemunculan kata-kata tersebut dalam satu konteks yang sama.

#### **Interpretasi:**
1. **Kata-kata utama**  
   Beberapa kata dengan node yang lebih besar, seperti *bodoh*, *prabowo*, *panasbung*, dan *jokowi*, menunjukkan bahwa kata-kata ini sering muncul dalam dataset dan memiliki keterkaitan tinggi dengan kata-kata lain.

2. **Hubungan antar kata**  
   - Kata *bodoh* memiliki banyak koneksi dengan berbagai kata lain, yang mengindikasikan sering digunakan dalam berbagai konteks.  
   - *Prabowo* dan *Jokowi* menunjukkan keterkaitan dengan kata-kata politik seperti *rakyat*, *presiden*, dan *kampret*.  
   - Kata *panasbung* (panasbunglon) juga memiliki koneksi yang cukup banyak, yang mungkin menunjukkan diskusi seputar opini politik.

3. **Polarisasi opini**  
   - Beberapa kata seperti *kampret*, *fitnah*, dan *najs* bisa menunjukkan adanya sentimen negatif atau ujaran sarkasme dalam diskusi.  
   - Sebaliknya, kata-kata seperti *orang*, *hidup*, dan *rakyat* mungkin lebih netral atau umum digunakan dalam berbagai diskusi.


### **6. Topic Modelling**  
![Topic Modelling](https://i.imgur.com/8AH6BSE.png)  

Pada tahap ini, dilakukan *Topic Modelling* menggunakan **BERTopic** untuk mengidentifikasi topik utama yang muncul dalam kumpulan teks. BERTopic bekerja dengan cara mengelompokkan teks berdasarkan representasi vektor dari kata-kata yang digunakan.

#### **Metode yang Digunakan**  
Dalam implementasi ini, model BERTopic dikonfigurasi dengan:  

- **Vectorizer Model: CountVectorizer**  
  Model menggunakan `CountVectorizer` dari `sklearn.feature_extraction.text` untuk mengubah teks menjadi representasi berbasis **Term Frequency (TF)**. Ini berarti model hanya menghitung frekuensi kemunculan kata dalam teks.  

- **Clustering: BERTopic Default**  
  BERTopic secara otomatis akan menerapkan teknik *dimensionality reduction* (**UMAP**) dan metode *clustering* (**HDBSCAN**) di latar belakang.

#### **Interpretasi:**
1. **Topic 0** *(Politik dan Tokoh Publik)*
   - Kata-kata seperti *prabowo*, *jokowi*, *panasbung*, *presiden*, dan *kampret* menunjukkan bahwa topik ini berkaitan dengan perbincangan politik, khususnya figur publik dan afiliasi politik mereka.

2. **Topic 1** *(Sentimen Negatif dan Opini Kasar)*
   - Kata-kata dominan seperti *bodoh*, *bodo*, *nasbung*, dan *salah* menunjukkan adanya opini negatif, kritik, atau sindiran terhadap suatu pihak dalam diskusi.

3. **Topic 2** *(Ekspresi dan Ungkapan Slang)*
   - Kata-kata seperti *mampus*, *please*, *god*, *jon*, dan *bocah* mengindikasikan percakapan yang lebih santai atau mungkin terkait dengan ujaran emosional dalam diskusi.

4. **Topic 3** *(Aksi Sosial dan Kampus)*
   - Kata-kata seperti *alumni*, *212*, *boikot*, *demo*, dan *kampusnya* menunjukkan topik yang berkaitan dengan gerakan sosial, aksi mahasiswa, atau peristiwa di lingkungan akademik.

Visualisasi ini membantu dalam memahami bagaimana percakapan dalam kumpulan data dapat dikelompokkan ke dalam beberapa topik utama.



### **7. NLP: Named Entity Recognition**  
![Trend Sentiment](https://i.imgur.com/wZ0FFNl.png)

Named Entity Recognition (NER) digunakan untuk mendeteksi nama tokoh yang sering muncul dalam teks. Model yang digunakan adalah `cahya/bert-base-indonesian-NER` dari Hugging Face.

### Hasil:

- **Prabowo** paling sering disebut, diikuti oleh **Jokowi**.
- **SBY** dan **Ahok** muncul lebih sedikit tetapi tetap signifikan.

---

## **Kesimpulan**  
Melalui analisis ini, dapat menemukan pola komunikasi yang dinamis dari akun Fufufafa di Kaskus. Aktivitas akun ini menunjukkan lonjakan besar pada pertengahan tahun 2014, yang kemungkinan terkait dengan peristiwa politik penting, dengan fokus pada diskusi tokoh politik tertentu seperti terlihat dari bigram dominan, misalnya "hidup prabowo" dan "prabowo pemimpin."

Sentimen yang muncul pada periode tersebut cenderung didominasi oleh sentimen negatif, meskipun sentimen netral juga signifikan. Hal ini menunjukkan bahwa diskusi pada saat itu kemungkinan besar melibatkan kritik atau debat yang intens terhadap isu-isu yang sedang hangat.

Pendekatan berbasis data ini memberikan wawasan objektif tentang pola komunikasi akun tersebut. Walaupun terdapat keterbatasan dalam analisis sentimen berbasis *lexicon-based sentiment analysis*, hasil ini tetap memberikan gambaran umum yang relevan.

Oleh karena itu, *text analytics* dapat dianggap sebagai alat yang efektif untuk memahami pola komunikasi dan tren di platform digital.

## Disclaimer

> ⚠️ Hasil analisis ini didasarkan pada kode yang mungkin masih memiliki keterbatasan atau kesalahan. Selain itu, sentiment analysis berbasis lexicon dapat kurang interpretatif dalam menangani sarkasme, ironi, atau konteks bahasa yang kompleks. Oleh karena itu, hasil ini sebaiknya digunakan sebagai wawasan awal dan tidak dianggap sebagai kesimpulan mutlak. 