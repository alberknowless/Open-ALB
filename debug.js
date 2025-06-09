// Hata ayıklama yardımcı fonksiyonları

// Konsola detaylı bilgi yazma fonksiyonu
function logDebug(message, data) {
    console.log('%c' + message, 'color: blue; font-weight: bold', data || '');
}

// DOM yüklendikten sonra çağrılacak başlatma fonksiyonu
document.addEventListener('DOMContentLoaded', function() {
    logDebug('Sayfa yüklendi');

    // Canvas elementlerini kontrol et
    const gameCanvas = document.getElementById('gameCanvas');
    if (gameCanvas) {
        logDebug('Game Canvas bulundu', gameCanvas);
    } else {
        logDebug('HATA: Game Canvas bulunamadı!');
    }

    // Tuş dinleyicisini manuel olarak ekle
    window.addEventListener('keydown', function(e) {
        logDebug('Tuş basıldı (global)', e.key);

        // Enter tuşuna basılırsa block_programming_visualizer.js'teki fonksiyonu manuel çağır
        if (e.key === 'Enter' && typeof window.x !== 'undefined' && typeof window.angle !== 'undefined') {
            logDebug('Enter tuşuna basıldı, hareket çağrılıyor');

            // x ve y değişkenlerini güncelle (block_programming_visualizer.js'den)
            for(let i=0; i<5; i++){
                window.x += Math.cos(window.angle) * 20;
                window.y += Math.sin(window.angle) * 20;
            }

            // Çizim fonksiyonunu çağır
            if (typeof window.draw === 'function') {
                window.draw();
            } else {
                logDebug('HATA: draw fonksiyonu bulunamadı!');
            }
        }
    });

    // Değişkenleri kontrol et ve konsola yaz
    setTimeout(function() {
        logDebug('Global değişken kontrolü:');
        logDebug('window.x:', window.x);
        logDebug('window.y:', window.y);
        logDebug('window.angle:', window.angle);
        logDebug('window.draw:', typeof window.draw === 'function' ? 'Tanımlı' : 'Tanımsız');
    }, 1000);
});

// Konsola hazır olduğumuzu bildir
console.log('%cHata ayıklama araçları hazır', 'color: green; font-weight: bold; font-size: 14px');
