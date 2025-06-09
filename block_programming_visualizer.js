(function() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        console.warn('block_programming_visualizer.js requires a browser environment.');
        return;
    }

    // Global değişkenler - diğer dosyalardan erişilebilmesi için window objesine ekle
    window.canvas = null;
    window.ctx = null;
    window.x = 0;
    window.y = 0;
    window.angle = 0;

// Path ve karakter başlangıç
const path = [
    {x:20, y:260}, {x:100, y:260}, {x:100, y:180},
    {x:200,y:180}, {x:200,y:100}, {x:350,y:100}
];

// Canvas'ı başlat
function initCanvas() {
    window.canvas = document.getElementById('gameCanvas');

    if (!window.canvas) {
        console.error('gameCanvas elementi bulunamadı!');
        // 100ms sonra tekrar dene
        setTimeout(initCanvas, 100);
        return;
    }

    window.ctx = window.canvas.getContext('2d');
    window.x = path[0].x;
    window.y = path[0].y;

    // Robot elementi oluştur
    createRobotElement();

    console.log('Canvas başarıyla başlatıldı:', window.canvas);
    window.draw(); // İlk çizimi yap
}

// Robot elementi oluştur
function createRobotElement() {
    // Eğer zaten varsa oluşturma
    if (document.querySelector('.robot-element')) {
        return;
    }

    const robotElement = document.createElement('div');
    robotElement.className = 'robot-element';
    robotElement.style.position = 'absolute';
    robotElement.style.width = '20px';
    robotElement.style.height = '20px';
    robotElement.style.backgroundColor = 'rgba(255,0,0,0.3)';
    robotElement.style.borderRadius = '50%';
    robotElement.style.pointerEvents = 'none';
    robotElement.style.zIndex = '100';
    robotElement.style.transition = 'all 0.3s';

    // Pozisyonu ayarla
    updateRobotElementPosition();

    // Canvas'ın bulunduğu konteyner'a ekle
    const gamePanel = document.querySelector('.game-panel');
    if (gamePanel) {
        gamePanel.style.position = 'relative';
        gamePanel.appendChild(robotElement);
        console.log('Robot elementi oluşturuldu');
    } else {
        console.error('Game panel bulunamadı, robot elementi oluşturulamadı');
    }
}

// Sayfa yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', initCanvas);

// Canvas zaten yüklendiyse hemen başlat
if (document.readyState === 'complete') {
    initCanvas();
}

// Rota çizimi
function drawPath(){
    window.ctx.save(); 
    window.ctx.strokeStyle='#2196f3'; 
    window.ctx.lineWidth=3;
    window.ctx.setLineDash([6,4]); 
    window.ctx.beginPath();
    window.ctx.moveTo(path[0].x+10, path[0].y+10);
    path.forEach(p=>window.ctx.lineTo(p.x+10, p.y+10));
    window.ctx.stroke(); 
    window.ctx.restore();
}

// Robot HTML elementinin pozisyonunu güncelle
function updateRobotElementPosition() {
    const robotElement = document.querySelector('.robot-element');
    if (!robotElement) return;

    // Canvas içindeki pozisyona göre robot elementini konumlandır
    const gridSize = 50; // Canvas ızgara boyutu
    const offsetX = window.canvas.offsetLeft;
    const offsetY = window.canvas.offsetTop;

    robotElement.style.left = `${offsetX + window.x + 10}px`;
    robotElement.style.top = `${offsetY + window.y + 10}px`;
    robotElement.style.transform = `rotate(${window.angle}rad)`;
}

// Ana çizim fonksiyonu - global scope için window'a bağla
window.draw = function() {
    if (!window.ctx) return;

    window.ctx.clearRect(0, 0, 400, 400); // Doğru canvas boyutlarını kullan
    drawPath();

    // Hedef
    const goal = path[path.length-1];
    window.ctx.strokeStyle='#4caf50'; 
    window.ctx.strokeRect(goal.x, goal.y, 20, 20);

    // Karakter
    window.ctx.save(); 
    window.ctx.translate(window.x+10, window.y+10); 
    window.ctx.rotate(window.angle);
    window.ctx.fillStyle='red'; 
    window.ctx.fillRect(-10, -10, 20, 20);
    window.ctx.restore();

    // Açı ve pozisyon durumunu görüntüle
    window.ctx.fillStyle = 'black';
    window.ctx.font = '12px Arial';
    window.ctx.fillText(`Pozisyon: x=${Math.round(window.x)}, y=${Math.round(window.y)}`, 10, 20);
    window.ctx.fillText(`Açı: ${(window.angle * 180 / Math.PI).toFixed(0)}°`, 10, 40);

    // Robot elementinin pozisyonunu güncelle
    updateRobotElementPosition();
}

// Bu dosyadaki tuş olaylarını kaldır ve keyboard_controls.js dosyasına bırak
// Basit hareket fonksiyonlarını window'a ekle (diğer dosyalar için)
window.moveForwardSimple = function() {
    window.x += Math.cos(window.angle) * 20;
    window.y += Math.sin(window.angle) * 20;
    window.draw();
};

window.turnRightSimple = function() {
    window.angle += Math.PI/2;
    window.draw();
};

window.turnLeftSimple = function() {
    window.angle -= Math.PI/2;
    window.draw();
};

// Başlatma işlevini çağır
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM yüklendi - Canvas başlatılıyor');
    initCanvas();
});

// Sayfa zaten yüklendiyse hemen başlat
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log('Sayfa zaten yüklü - Canvas hemen başlatılıyor');
    setTimeout(initCanvas, 100); // Kısa bir gecikme ile başlat
}

console.log('block_programming_visualizer.js yüklendi');
})();
