// Bu dosya, olası hataları düzeltmek için ek düzeltmeler içerir

// Sayfa yüklendikten sonra çalış
document.addEventListener('DOMContentLoaded', function() {
    console.log('fix.js: Düzeltmeler uygulanıyor...');

    // 1. Canvas ve robot elementi için düzeltme
    setTimeout(function() {
        const gameCanvas = document.getElementById('gameCanvas');
        if (!gameCanvas) {
            console.error('GameCanvas bulunamadı!');
            return;
        }

        // Robot element oluştur (eğer yoksa)
        if (!document.querySelector('.robot-element')) {
            const robotElement = document.createElement('div');
            robotElement.className = 'robot-element';
            robotElement.style.position = 'absolute';
            robotElement.style.width = '20px';
            robotElement.style.height = '20px';
            robotElement.style.backgroundColor = 'rgba(255,0,0,0.3)';
            robotElement.style.borderRadius = '50%';
            robotElement.style.pointerEvents = 'none';
            robotElement.style.zIndex = '100';

            const gamePanel = document.querySelector('.game-panel');
            if (gamePanel) {
                gamePanel.style.position = 'relative';
                gamePanel.appendChild(robotElement);
                console.log('Robot elementi manuel olarak oluşturuldu');
            }
        }

        // Tuş olaylarını test et
        console.log('Tuş olaylarını test ediyorum...');
        window.moveForwardSimple = function() {
            console.log('moveForwardSimple çağrıldı');
            if (typeof window.x !== 'undefined' && typeof window.angle !== 'undefined') {
                window.x += Math.cos(window.angle) * 20;
                window.y += Math.sin(window.angle) * 20;
                if (typeof window.draw === 'function') {
                    window.draw();
                }
            } else {
                console.error('x, y veya angle değişkenleri bulunamadı');
                // Manuel olarak tanımla
                if (typeof window.x === 'undefined') window.x = 20;
                if (typeof window.y === 'undefined') window.y = 260;
                if (typeof window.angle === 'undefined') window.angle = 0;
            }
        };

        // Test amaçlı tuş dinleyicisi ekle
        document.addEventListener('keydown', function(e) {
            if (e.key === 'T') { // T tuşu ile test et
                console.log('Test hareketi yapılıyor...');
                if (typeof window.moveForwardSimple === 'function') {
                    window.moveForwardSimple();
                } else {
                    console.error('moveForwardSimple fonksiyonu bulunamadı');
                }
            }
        });

    }, 500);
});

// Sayfa yüklendiğinde mesaj göster
window.addEventListener('load', function() {
    console.log('Sayfa tamamen yüklendi - son düzeltmeler uygulanıyor');

    // Konsola yardımcı mesaj
    console.log('%cKlavye kontrolleri için:', 'color: green; font-weight: bold');
    console.log('↑ (Yukarı Ok): İleri Git');
    console.log('→ (Sağ Ok): Sağa Dön');
    console.log('← (Sol Ok): Sola Dön');
    console.log('Enter: Programı Çalıştır');
    console.log('ESC: Programı Sıfırla');
    console.log('T: Test hareketi');
});
