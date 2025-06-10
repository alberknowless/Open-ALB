# Open-ALB

Bu depo, çocuklar için hazırlanmış basit bir blok tabanlı kodlama oyununu içerir. Karakterimiz ressam olup engelleri aşarak ve boya kutularını toplayarak hedefe ulaşır. Oyun HTML, CSS, JavaScript ve örnek bir C kodu barındırır. İlk sürümde 5 bölüm bulunmaktadır.

## Dosyalar
- `index.html` – oyun arayüzü
- `styles.css` – basit çocuk dostu tasarım
- `script.js` – oyun mantığı ve seviyeler
- `path_solver.c` – örnek yol bulma algoritması (opsiyonel)

Oyun sırasında ressamın geçtiği kareler `visited` sınıfı ile renklendirilerek
oyuncunun izlediği yol görsel olarak takip edilebilir. Ressamın bulunduğu
karede yönünü gösteren bir ok bulunur. Ayrıca üst kısımda ne yapmanız
gerektiğini hatırlatan küçük bir baloncuk vardır.

Oyun tarayıcıda çalıştırılabilir. `script.js` dosyası tarayıcıya özgü API’leri
kullandığından `node script.js` komutu hata verir. Çalıştırmak için
`index.html` dosyasını bir web tarayıcısında açın. `path_solver.c` dosyası
isteğe bağlı olarak derlenip kullanılabilir.
