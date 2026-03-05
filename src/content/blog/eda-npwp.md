---
author: Dika Maulidal
pubDatetime: 2024-12-24T11:00:53Z
title: Exploration Data Analysis Sample Data Breach NPWP
slug: NPWP
featured: false
tags:
  - data-analysis
  - data-breach
description: Exploration Data Analysis menggunakan Metabase dan Google BigQuery
---

Pada bulan September tanggal 18 2024, publik dihebohkan dengan dugaan kebocoran data terkait Nomor Pokok Wajib Pajak (NPWP) yang mencuat setelah seorang pengguna anonim di forum Breachforum.st membagikan informasi tentang data tersebut. Pengguna dengan nama samaran "bjorka" di forum tersebut mengklaim memiliki data pribadi yang mencakup 6 Juta entri.

![header](https://naval-csirt.tnial.mil.id/wp-content/uploads/2024/09/Bjorka1.webp)

Sebagai bukti klaimnya, pelaku membagikan sampel data sebanyak 10 ribu entri secara gratis. Tidak hanya itu, pelaku juga menawarkan penjualan data lengkap dengan harga sekitar US$10 ribu atau sekitar Rp150 juta yang harus dibayar menggunakan mata uang kripto. Kebocoran ini memicu keprihatinan terkait keamanan data di Indonesia, terutama mengingat pentingnya data NPWP dalam administrasi perpajakan.

## Table of Contents

## Leak Data Details
Data pribadi yang diperjualbelikan tersebut diantaranya, NIK, nomor handphone, NPWP, KLU, email dan lain-lain. Penjual memberikan sampel 10K data dalam format csv untuk meyakinkan pembeli sehingga dapat melakukan pengecekan apakah data yang diperjual belikan tersebut valid atau tidak.

## Data Processing  

Dalam proses analisis data ini akan menggunakan beberapa alat bantu utama, yaitu:  

- **Google BigQuery** sebagai platform penyimpanan dan pengolahan data. BigQuery mempermudah pengelolaan dan analisis data dalam jumlah besar dengan dukungan kueri berbasis SQL.  
- **Metabase** sebagai alat visualisasi data. Metabase memudahkan pembuatan laporan dan eksplorasi data melalui antarmuka yang sederhana dan intuitif.  

Data sampel yang diberikan oleh penjual berjumlah 10 ribu entri dan telah diunggah ke Google BigQuery untuk pengolahan lebih lanjut. Proses analisis dilakukan untuk memahami pola dan informasi yang terkandung dalam data tersebut. Metabase digunakan untuk membuat visualisasi data seperti grafik dan tabel, sehingga mempermudah interpretasi dan eksplorasi berbagai dimensi data yang tersedia.  


---

## Data Analysis and Vizualisation
**Total Emails :**
![Total Emails](https://i.imgur.com/1r8FJBG.png)
Dari total 10.015 entri data, terdapat 9.963 entri yang memiliki alamat email. Distribusi domain email tersebut dapat dilihat pada tabel berikut. Mayoritas entri menggunakan domain **gmail.com** (79.7%), diikuti oleh **yahoo.com** (11.6%), dan **yahoo.co.id** (3.8%). Sementara itu, sisanya tersebar di beberapa domain lain seperti **yopmail.com**, **ymail.com**, dan domain lainnya.  
| Email Domain       | Jumlah | Persentase |
|--------------------|--------|------------|
| gmail.com          | 7962   | 79.7%      |
| yahoo.com          | 1160   | 11.6%      |
| yahoo.co.id        | 376    | 3.8%       |
| yopmail.com        | 121    | 1.2%       |
| ymail.com          | 84     | 0.8%       |
| mailnesia.com      | 66     | 0.7%       |
| rocketmail.com     | 35     | 0.4%       |
| Other              | 191    | 1.9%       |


**Total TELP :**
![Total Telp](https://i.imgur.com/wweckDN.png)
Dari total 10.015 entri data, hanya terdapat 3.586 entri yang memiliki nomor telepon yang valid.

**Kantor Wilayah :**

Dari total **10.015 entri**, **KANTOR WILAYAH DJP JAWA TENGAH I** menempati posisi tertinggi dengan **857 entri** atau **8.56%** dari total keseluruhan. Posisi ini diikuti oleh **KANTOR WILAYAH DJP D.I. YOGYAKARTA** dengan **796 entri (7.95%)** dan **KANTOR WILAYAH DJP JAWA BARAT I** dengan **722 entri (7.21%)**. 

Selain itu, terdapat kontribusi signifikan dari:
- **KANTOR WILAYAH DJP JAWA BARAT II**: **697 entri (6.96%)**
- **KANTOR WILAYAH DJP JAWA TENGAH II**: **684 entri (6.83%)**

Beberapa kantor wilayah lainnya memberikan kontribusi sebagai berikut:
- **KANTOR WILAYAH DJP JAWA TIMUR I**: **5.65%**
- **KANTOR WILAYAH DJP BALI**: **5.16%**
- **KANTOR WILAYAH DJP JAKARTA TIMUR**: **4.92%**

Sementara itu, sebanyak **24.11%** atau **2.415 entri** berasal dari kategori **“other,”** yang merepresentasikan data yang tidak terklasifikasikan secara spesifik ke kantor wilayah tertentu.

![Pie Kanwil](https://i.imgur.com/aPiTYxd.png)
![Tabel Kanwil](https://i.imgur.com/Xmbat90.png)
**Klasifikasi Lapangan Usaha :**

Mayoritas data menunjukkan bahwa **65.51% entri adalah pegawai swasta**, diikuti oleh **22.82% pegawai negeri**, **2.88% aktivitas praktik dokter**, dan sisanya sebesar **8.80% termasuk kategori lainnya**. 

Visualisasi distribusi ini memberikan **gambaran penting** tentang jenis pekerjaan yang tercatat dalam data sampel.
![Pie Klu](https://i.imgur.com/B2Wsa9v.png)
![Pie Kode Klu](https://i.imgur.com/aQJ79hm.png)
**Kota :**

Distribusi data berdasarkan kota menunjukkan bahwa **Kota Semarang memiliki kontribusi sebesar 5.81%** dari total entri. **Kota Administrasi Jakarta Timur berada di urutan kedua dengan 4.95%**, diikuti oleh **Kota Surabaya dengan 4.52%**. 

Selanjutnya:
- **Kota Administrasi Jakarta Selatan mencatatkan kontribusi sebesar 4.05%**
- **Sleman sebesar 3.75%**
- **Kota Administrasi Jakarta Barat menyumbang 3.57%**
- **Kota Bandung dengan 3.00%**
- **Kabupaten Gresik sebesar 2.95%**

Sementara itu, **67.39% entri lainnya** berasal dari berbagai daerah lain di Indonesia yang dikelompokkan dalam kategori **“other.”**
![Pie Kota](https://i.imgur.com/192igTG.png)
**Provinsi :**

Distribusi data berdasarkan provinsi menunjukkan bahwa **DKI Jakarta menjadi provinsi dengan kontribusi tertinggi, mencapai 16.22%** dari total data, diikuti oleh **Jawa Tengah sebesar 15.41%**, dan **Jawa Barat sebesar 15.28%**. 

Provinsi lainnya dengan kontribusi signifikan:
- **Jawa Timur mencatatkan kontribusi sebesar 11.44%**
- **Daerah Istimewa Yogyakarta berkontribusi sebesar 7.94%**
- **Provinsi Bali menyumbang 5.16%**
- **Banten sebesar 3.82%**
- **Kalimantan Selatan sebesar 3.61%**
- **Sumatera Utara mencatatkan kontribusi sebesar 2.53%**

Sementara itu, **18.59%** berasal dari berbagai provinsi lain di Indonesia yang dikelompokkan dalam kategori **“Other.”**

Visualisasi ini memberikan **gambaran penting** tentang penyebaran data berdasarkan wilayah geografis, memperlihatkan bahwa **sebagian besar data berasal dari pulau Jawa, dengan DKI Jakarta sebagai penyumbang terbesar.**
![Provinsi](https://i.imgur.com/5f2xNqf.png)


## Full Dashboard
![dashboard](https://i.imgur.com/06RQG4R.png)

## Kesimpulan
Analisis data menggunakan Google BigQuery dan Metabase menunjukkan distribusi menarik dalam data sampel yang meliputi email, nomor telepon, kantor wilayah, klasifikasi lapangan usaha, serta lokasi geografis. Mayoritas entri menggunakan domain email gmail.com dan yahoo.com, sementara data berdasarkan kantor wilayah memperlihatkan sebaran yang cukup merata dengan kontribusi terbesar dari wilayah Jawa. Selain itu, analisis mengenai klasifikasi lapangan usaha mengungkapkan dominasi pegawai swasta sebagai jenis pekerjaan terbanyak. Visualisasi ini memberikan wawasan yang berguna untuk memahami pola dan karakteristik distribusi data yang lebih luas di Indonesia.
