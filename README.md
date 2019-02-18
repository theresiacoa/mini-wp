# mini-wp

#API Documentation

| Title      | URL | Method | Request Body | Request Header | Response Success | Response Error |
| ---------- | --- | ------ | ------------ | -------------- | ---------------- | -------------- |
| user register | /user/register | POST | username(string)<br>email(string)<br>password(string) | none |username(string)<br>email(string)<br>password(string) | **internal server error (500)** |
| user login | /user/login | POST | email(string)<br>password(string) | none | email(string)<br>password(string) | **internal server error (500)** |
|google login / signup | /user/googleSignIn | POST | token(string) | none | username(string)<br>email(string)<br>password(string) | **internal server error (500)** |
| display articles | /articles | GET | none | none | Array of object<br>title(string)<br>content(string)<br>created_at(date)<br>author(string)<br>featured_image(string)<br>UserId(number)<br>tags(array) | **internal server error (500)** |
| create new article | /articles | POST | title(string)<br>content(string)<br>created_at(date)<br>author(string)<br>featured_image(string)<br>UserId(string) | token |  title(string)<br>content(string)<br>created_at(date)<br>author(string)<br>featured_image(string)<br>UserId(string) | **internal server error (500)** |
| get all my stories | /articles/stories | GET | none | token | array of obj article | **internal server error (500)** |
| read article | /articles/:articleId | GET | none | token | article details<br>title(string)<br>content(string)<br>created_at(date)<br>author(string)<br>featured_image(string)<br>UserId(string) | **internal server error (500)** |
| update article | /articles/:articleId | POST | title(string)<br>content<br>featured_image<br> | userid, token | updated data<br>title(string)<br>content<br>featured_image<br> | **internal server error (500)** |
| delete article | /articles/:articleId | DELETE | none | token, userid | deleted data<br>title(string)<br>content(string)<br>created_at(date)<br>author(string)<br>featured_image(string)<br>UserId(string) | **internal server error (500)** |


##Mini WordPress
Buatlah content management system sederhana menggunakan Client-server model dengan spesifikasi sebagai berikut:

**API Documentation** 
yang meliputi : URLs, HTTP method, request, response (success dan error case)

**CRUD endpoints**
untuk Article (title, content, created_at, author, featured_image)
Boleh menambahkan attribute lain, misal: slug

**Upload featured_image**
untuk setiap article

**Register**

**Login** 
menggunakan email & password (menggunakan JWT)

**Sign in with 3rd APIs** (Google/Twitter/Facebook/GitHub)
Validasi sehingga hanya authenticated user yang bisa melakukan CRUD Article, baik dari sisi client maupun server

**NO alert();!**



**EXTRAS** 
(Wajib untuk anak ngulang):

Article bisa memiliki tags untuk mempermudah pencarian.
tags bisa lebih dari 1, misal: Technology, JavaScript, Machine Learning.
Implementasikan fitur untuk mencari article berdasarkan tag, misal: Saat klik tag JavaScript maka akan menampilkan semua article yang memiliki tag JavaScript.


#Kompetensi Backend:

##API Documentation

Authentication

MongoDB + Mongoose

Upload to Google Cloud Storage

##Kompetensi Client:

Vue.js (Components/Single File Components)

SPA (Single Page Application)

##Deadline:

Week 3 - Senin 09:00

##Submission:

Fork dari organization, lalu open pull request dengan title NAMA LENGKAP KAMU (ex: Dimitri Wahyudiputra) jika sudah selesai. Tambahkan comment yang berisi environment variables yang dipakai (beserta valuenya), link deploy, fitur uniknya apa dan kendala saat mengerjakan.

Collapse