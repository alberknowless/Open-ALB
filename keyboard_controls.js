// Klavye kontrolleri için özel yardımcı dosya

// Durumları takip etmek için değişkenler
let keyboardControlsActive = true;
let movementInProgress = false;

// Klavye olaylarını dinle
function initKeyboardControls() {
    console.log('Klavye kontrolleri başlatılıyor...');

    document.addEventListener('keydown', handleKeyPress);

    // Test mesajı
    console.log('Klavye kontrolleri aktif. Tuşlar:');
    console.log('- Yukarı Ok: İleri git');
    console.log('- Sağ Ok: Sağa dön');
    console.log('- Sol Ok: Sola dön');
    console.log('- Enter: Tüm komutları çalıştır');
}

// Tuş basımlarını işle
function handleKeyPress(event) {
    // Eğer oyun çalışıyorsa ve tuş kontrolleri aktifse
    if (!keyboardControlsActive || movementInProgress) {
        console.log('Klavye kontrolleri şu anda devre dışı');
        return;
    }

    console.log('Tuş basıldı:', event.key);

    // Eğer block_programming_visualizer.js'den değişkenler tanımlı değilse
    if (typeof window.x === 'undefined' || typeof window.y === 'undefined' || 
        typeof window.angle === 'undefined' || typeof window.draw !== 'function') {
        console.error('Gerekli değişkenler veya fonksiyonlar tanımlanmamış!');
        console.log('window.x:', window.x);
        console.log('window.y:', window.y);
        console.log('window.angle:', window.angle);
        console.log('window.draw:', window.draw);
        return;
    }

    switch(event.key) {
        case 'ArrowUp':
            console.log('İleri hareket ediliyor');
            moveForward();
            break;

        case 'ArrowRight':
            console.log('Sağa dönülüyor');
            turnRight();
            break;

        case 'ArrowLeft':
            console.log('Sola dönülüyor');
            turnLeft();
            break;

        case 'Enter':
            console.log('Program çalıştırılıyor');
            if (typeof runProgram === 'function') {
                runProgram();
            } else {
                console.error('runProgram fonksiyonu bulunamadı!');
            }
            break;

        case 'Escape':
            console.log('Program sıfırlanıyor');
            if (typeof resetProgram === 'function') {
                resetProgram();
            } else {
                console.error('resetProgram fonksiyonu bulunamadı!');
            }
            break;
    }
}

// İleri hareket fonksiyonu
function moveForward() {
    movementInProgress = true;

    // Hareket animasyonu için sınıf ekle
    const robotElement = document.querySelector('.robot-element');
    if (robotElement) {
        robotElement.classList.add('robot-moving');
    }

    // Yeni konumu hesapla
    const dx = Math.cos(window.angle) * 20;
    const dy = Math.sin(window.angle) * 20;
    const newX = window.x + dx;
    const newY = window.y + dy;

    console.log(`Hareket: (${window.x.toFixed(2)},${window.y.toFixed(2)}) -> (${newX.toFixed(2)},${newY.toFixed(2)})`);

    // Hareketi güncelle ve çiz
    window.x = newX;
    window.y = newY;
    window.draw();

    // Hareket animasyonunu kaldır
    setTimeout(() => {
        if (robotElement) {
            robotElement.classList.remove('robot-moving');
        }
        movementInProgress = false;
    }, 300);
}

// Sağa dönme fonksiyonu
function turnRight() {
    movementInProgress = true;

    // Dönüş animasyonu için sınıf ekle
    const robotElement = document.querySelector('.robot-element');
    if (robotElement) {
        robotElement.classList.add('robot-turning');
    }

    // Açıyı güncelle
    window.angle += Math.PI/2;
    console.log(`Sağa dönüş: ${((window.angle * 180 / Math.PI) % 360).toFixed(0)}°`);

    // Çizimi güncelle
    window.draw();

    // Animasyonu kaldır
    setTimeout(() => {
        if (robotElement) {
            robotElement.classList.remove('robot-turning');
        }
        movementInProgress = false;
    }, 300);
}

// Sola dönme fonksiyonu
function turnLeft() {
    movementInProgress = true;

    // Dönüş animasyonu için sınıf ekle
    const robotElement = document.querySelector('.robot-element');
    if (robotElement) {
        robotElement.classList.add('robot-turning');
    }

    // Açıyı güncelle
    window.angle -= Math.PI/2;
    console.log(`Sola dönüş: ${((window.angle * 180 / Math.PI) % 360).toFixed(0)}°`);

    // Çizimi güncelle
    window.draw();

    // Animasyonu kaldır
    setTimeout(() => {
        if (robotElement) {
            robotElement.classList.remove('robot-turning');
        }
        movementInProgress = false;
    }, 300);
}

// Sayfa yüklendiğinde klavye kontrollerini başlat
document.addEventListener('DOMContentLoaded', initKeyboardControls);

// Console'da hazır olduğunu bildir
console.log('Klavye kontrolleri dosyası yüklendi');
