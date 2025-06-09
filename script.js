// Oyun değişkenleri
let currentLevel = 1;
let unlockedLevels = 1; // Başlangıçta sadece 1. seviye açık
const levels = [
    {
        name: "Bölüm 1: İlk Adımlar",
        grid: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 3, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],
        start: {x: 1, y: 1},
        goal: {x: 5, y: 4},
        paints: [{x: 2, y: 4}],
        maxBlocks: 5
    },
    {
        name: "Bölüm 2: Engelleri Aşmak",
        grid: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 1, 0, 0],
            [0, 1, 1, 1, 0, 1, 0, 0],
            [0, 0, 0, 1, 0, 1, 0, 0],
            [0, 3, 1, 1, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],
        start: {x: 1, y: 1},
        goal: {x: 6, y: 5},
        paints: [{x: 1, y: 5}, {x: 3, y: 3}],
        maxBlocks: 8
    },
    {
        name: "Bölüm 3: Renk Macerası",
        grid: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 3, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],
        start: {x: 1, y: 1},
        goal: {x: 6, y: 5},
        paints: [{x: 5, y: 1}, {x: 3, y: 3}, {x: 3, y: 5}],
        maxBlocks: 10
    },
    {
        name: "Bölüm 4: Döngü Labirenti",
        grid: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 3, 3, 0, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 0, 0, 1, 0, 1, 0],
            [0, 1, 1, 1, 1, 3, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],
        start: {x: 1, y: 1},
        goal: {x: 6, y: 6},
        paints: [{x: 3, y: 3}, {x: 4, y: 3}, {x: 5, y: 6}],
        maxBlocks: 12
    },
    {
        name: "Bölüm 5: Sanat Galerisi",
        grid: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 0],
            [0, 1, 3, 1, 3, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 3, 1, 1, 1, 3, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],
        start: {x: 1, y: 1},
        goal: {x: 3, y: 6},
        paints: [{x: 2, y: 2}, {x: 4, y: 2}, {x: 1, y: 5}, {x: 5, y: 5}],
        maxBlocks: 15
    }
];

// Oyun durumu
let player = {x: 0, y: 0, direction: 0, paintCollected: 0};
let program = [];
let isRunning = false;
let collectedPaints = [];
let paintBrushes = [];

// Blok tipleri
const blockTypes = {
    moveForward: {
        name: 'İleri Git',
        color: '#FF6B6B',
        icon: 'arrow-up',
        action: () => {
            return new Promise((resolve) => {
                const dx = [0, 1, 0, -1]; // sağ, aşağı, sol, yukarı
                const dy = [-1, 0, 1, 0];

                const newX = player.x + dx[player.direction];
                const newY = player.y + dy[player.direction];

                // Robot hareket animasyonu için sınıf ekle
                const robotElement = document.querySelector('.robot-element');
                if (robotElement) {
                    robotElement.classList.add('robot-moving');
                }

                // Sınırlar içinde ve engel değilse hareket et
                if (isValidMove(newX, newY)) {
                    // Kare kare hareket için animasyon
                    animatePlayerMovement(player.x, player.y, newX, newY, () => {
                        player.x = newX;
                        player.y = newY;

                        // Boya kutusu kontrolü
                        checkPaintCollected();

                        // Animasyon sınıfını kaldır
                        if (robotElement) {
                            setTimeout(() => {
                                robotElement.classList.remove('robot-moving');
                            }, 300);
                        }

                        resolve();
                    });
                } else {
                    // Engel varsa hata animasyonu
                    if (robotElement) {
                        robotElement.classList.add('robot-blocked');
                        setTimeout(() => {
                            robotElement.classList.remove('robot-blocked');
                            robotElement.classList.remove('robot-moving');
                        }, 500);
                    }
                    setTimeout(resolve, 500);
                }
            });
        }
    },
    turnRight: {
        name: 'Sağa Dön',
        color: '#4ECDC4',
        icon: 'rotate-right',
        action: () => {
            return new Promise((resolve) => {
                // Dönüş animasyonu
                animatePlayerRotation(player.direction, (player.direction + 1) % 4, () => {
                    player.direction = (player.direction + 1) % 4;
                    resolve();
                });
            });
        }
    },
    turnLeft: {
        name: 'Sola Dön',
        color: '#FFE66D',
        icon: 'rotate-left',
        action: () => {
            return new Promise((resolve) => {
                // Dönüş animasyonu
                animatePlayerRotation(player.direction, (player.direction + 3) % 4, () => {
                    player.direction = (player.direction + 3) % 4;
                    resolve();
                });
            });
        }
    },
    loop: {
        name: 'Tekrarla (3)',
        color: '#1A535C',
        icon: 'repeat',
        loopCount: 3,
        isContainer: true
    },
    paintAction: {
        name: 'Boya Çiz',
        color: '#6C5B7B',
        icon: 'paint-brush',
        action: () => {
            return new Promise((resolve) => {
                if (player.paintCollected > 0) {
                    // Boyama işlemi animasyonu
                    const robotElement = document.querySelector('.robot-element');
                    if (robotElement) {
                        robotElement.classList.add('painting-animation');
                    }

                    setTimeout(() => {
                        // Boyama işlemi
                        paintBrushes.push({
                            x: player.x,
                            y: player.y,
                            color: collectedPaints[Math.floor(Math.random() * collectedPaints.length)].color
                        });
                        player.paintCollected--;
                        updateStats();
                        draw();

                        if (robotElement) {
                            robotElement.classList.remove('painting-animation');
                        }

                        resolve();
                    }, 500);
                } else {
                    // Boya yoksa hata göster
                    const robotElement = document.querySelector('.robot-element');
                    if (robotElement) {
                        robotElement.classList.add('robot-blocked');
                        setTimeout(() => {
                            robotElement.classList.remove('robot-blocked');
                        }, 500);
                    }
                    resolve();
                }
            });
        }
    }
};

// Hareket animasyonu
function animatePlayerMovement(startX, startY, endX, endY, callback) {
    const gridSize = 50;
    const animationDuration = 500; // ms
    const startTime = Date.now();

    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);

        // Hareket hesaplama
        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;

        // Geçici olarak oyuncunun konumunu ayarla (çizim için)
        const tempX = player.x;
        const tempY = player.y;
        player.x = currentX;
        player.y = currentY;

        // Çiz
        draw();

        // Orijinal konumu geri yükle
        player.x = tempX;
        player.y = tempY;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            if (callback) callback();
        }
    }

    animate();
}

// Dönüş animasyonu
function animatePlayerRotation(startDirection, endDirection, callback) {
    const animationDuration = 300; // ms
    const startTime = Date.now();

    // Dönüş yönünü belirle (saat yönünde veya tersine)
    let clockwise = (endDirection - startDirection + 4) % 4 === 1;

    function animate() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);

        // 90 derecelik dönüş
        let rotationAmount;
        if (clockwise) {
            rotationAmount = startDirection + progress;
        } else {
            rotationAmount = startDirection - progress + (startDirection < endDirection ? 4 : 0);
        }

        // Geçici olarak oyuncunun yönünü ayarla
        const tempDirection = player.direction;
        player.direction = rotationAmount % 4;

        // Çiz
        draw();

        // Orijinal yönü geri yükle
        player.direction = tempDirection;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            if (callback) callback();
        }
    }

    animate();
};

// Canvas ve context
let gameCanvas, gameCtx, paintCanvas, paintCtx;

// Oyun alanını oluştur
function initGame() {
    // Canvas elemanlarını al
    gameCanvas = document.getElementById('gameCanvas');
    gameCtx = gameCanvas.getContext('2d');
    paintCanvas = document.getElementById('paintCanvas');
    paintCtx = paintCanvas.getContext('2d');

    // Açılış sayfası ayarları
    setupWelcomeScreen();

    // Başlangıç ayarlamaları
    clearPaintCanvas();
    loadLevel(currentLevel);
    createBlocks();
    setupProgramArea();
    setupControls();
    draw();
    updateStats();
    updateLevelButtons();

    // Tuval üzerinde çizim için event listener'ları ekle
    setupPaintCanvas();
}

// Açılış sayfası ayarları
function setupWelcomeScreen() {
    // Başlangıçta ilk seviye haricinde tüm seviyeler kilitli
    updateWelcomeLevelButtons();

    // Oyuna başlama butonu
    document.getElementById('startGameBtn').addEventListener('click', () => {
        document.getElementById('welcomeScreen').style.display = 'none';
        document.querySelector('.game-container').style.display = 'block';
    });

    // Açılış sayfasındaki seviye butonları
    document.querySelectorAll('.welcome-level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = parseInt(btn.getAttribute('data-level'));
            if (level <= unlockedLevels) {
                currentLevel = level;
                document.getElementById('welcomeScreen').style.display = 'none';
                document.querySelector('.game-container').style.display = 'block';
                loadLevel(currentLevel);
            }
        });
    });
}

// Açılış sayfası seviye butonlarını güncelle
function updateWelcomeLevelButtons() {
    document.querySelectorAll('.welcome-level-btn').forEach(btn => {
        const level = parseInt(btn.getAttribute('data-level'));
        if (level <= unlockedLevels) {
            btn.classList.remove('locked');
            if (level === currentLevel) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        } else {
            btn.classList.add('locked');
            btn.classList.remove('active');
        }
    });
}

// Seviyeyi yükle
function loadLevel(levelNumber) {
    const level = levels[levelNumber - 1];
    player = {
        x: level.start.x,
        y: level.start.y,
        direction: 0,
        paintCollected: 0
    };

    collectedPaints = [];
    paintBrushes = [];
    program = [];

    document.getElementById('levelName').textContent = level.name;

    // Aktif seviye butonunu güncelle
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.level-btn[data-level="${levelNumber}"]`).classList.add('active');

    // Program alanını temizle
    document.getElementById('programContainer').innerHTML = '';

    // Seviye butonlarını güncelle
    updateLevelButtons();

    // Bölüm hedeflerini güncelle
    updateLevelObjectives(levelNumber);

    draw();
}

// Bölüm hedeflerini güncelle
function updateLevelObjectives(levelNumber) {
    const objectives = [
        "Bölüm 1: İleri git komutlarını kullanarak hedefe ulaş ve boya kutusunu topla!",
        "Bölüm 2: Dönüş komutlarını kullanarak engelleri aş ve tüm boyaları topla!",
        "Bölüm 3: Doğru sırada komutları kullanarak labirentte renkleri keşfet!",
        "Bölüm 4: Tekrarlama bloğunu kullanarak daha az komutla hedefe ulaş!",
        "Bölüm 5: Tüm öğrendiklerini kullanarak tüm boyaları topla ve sanat galerisini tamamla!"
    ];

    document.getElementById('currentObjective').textContent = objectives[levelNumber - 1];
    document.getElementById('levelInstructions').textContent = `Bölüm ${levelNumber}: Ressam Robot'u hedefe ulaştırmak için blokları program alanına sürükleyin.`;
}

// Seviye butonlarını güncelle
function updateLevelButtons() {
    document.querySelectorAll('.level-btn').forEach(btn => {
        const level = parseInt(btn.getAttribute('data-level'));
        if (level <= unlockedLevels) {
            btn.classList.remove('locked');
            btn.disabled = false;
        } else {
            btn.classList.add('locked');
            btn.disabled = true;
        }
    });
}

// İkon görüntüleri yerine metin kullan
function getIconText(iconName) {
    switch(iconName) {
        case 'arrow-up': return '↑';
        case 'rotate-right': return '↻';
        case 'rotate-left': return '↺';
        case 'repeat': return '⟳';
        case 'paint-brush': return '🖌️';
        default: return '?';
    }
}

// Blokları oluştur
function createBlocks() {
    const blocksContainer = document.getElementById('blocksContainer');
    blocksContainer.innerHTML = '';

    Object.entries(blockTypes).forEach(([type, block]) => {
        const blockElement = document.createElement('div');
        blockElement.className = `block ${type}-block`;

        const iconText = document.createElement('span');
        iconText.textContent = getIconText(block.icon);
        iconText.style.marginRight = '8px';
        iconText.style.fontSize = '1.2em';

        const textElement = document.createElement('span');
        textElement.textContent = block.name;

        blockElement.appendChild(iconText);
        blockElement.appendChild(textElement);
        blockElement.setAttribute('data-type', type);
        blockElement.draggable = true;

        blockElement.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', type);
        });

        blocksContainer.appendChild(blockElement);
    });
}

// Program alanını ayarla
function setupProgramArea() {
    const programContainer = document.getElementById('programContainer');

    programContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    programContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        if (isRunning) return;

        const type = e.dataTransfer.getData('text/plain');

        if (blockTypes[type]) {
            const level = levels[currentLevel - 1];

            // Maksimum blok sayısı kontrolü
            const currentBlockCount = programContainer.childElementCount;
            if (currentBlockCount >= level.maxBlocks) {
                alert(`Bu bölümde en fazla ${level.maxBlocks} blok kullanabilirsiniz!`);
                return;
            }

            const blockElement = document.createElement('div');
            blockElement.className = `block ${type}-block`;

            const iconText = document.createElement('span');
            iconText.textContent = getIconText(blockTypes[type].icon);
            iconText.style.marginRight = '8px';
            iconText.style.fontSize = '1.2em';

            const textElement = document.createElement('span');
            textElement.textContent = blockTypes[type].name;

            blockElement.appendChild(iconText);
            blockElement.appendChild(textElement);
            blockElement.setAttribute('data-type', type);

            // Kaldırma özelliği
            blockElement.addEventListener('click', () => {
                if (!isRunning) {
                    blockElement.remove();
                    updateProgram();
                }
            });

            if (blockTypes[type].isContainer) {
                const container = document.createElement('div');
                container.className = 'block-container';
                blockElement.appendChild(container);

                // İç içe sürükle bırak için
                container.addEventListener('dragover', (e) => {
                    e.preventDefault();
                });

                container.addEventListener('drop', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isRunning) return;

                    const nestedType = e.dataTransfer.getData('text/plain');

                    if (blockTypes[nestedType] && !blockTypes[nestedType].isContainer) {
                        const nestedBlock = document.createElement('div');
                        nestedBlock.className = `block nested-block ${nestedType}-block`;

                        const nestedIconText = document.createElement('span');
                        nestedIconText.textContent = getIconText(blockTypes[nestedType].icon);
                        nestedIconText.style.marginRight = '8px';
                        nestedIconText.style.fontSize = '1.2em';

                        const nestedTextElement = document.createElement('span');
                        nestedTextElement.textContent = blockTypes[nestedType].name;

                        nestedBlock.appendChild(nestedIconText);
                        nestedBlock.appendChild(nestedTextElement);
                        nestedBlock.setAttribute('data-type', nestedType);

                        // İç blokları kaldırma
                        nestedBlock.addEventListener('click', () => {
                            if (!isRunning) {
                                nestedBlock.remove();
                                updateProgram();
                            }
                        });

                        container.appendChild(nestedBlock);
                        updateProgram();
                    }
                });
            }

            programContainer.appendChild(blockElement);
            updateProgram();
        }
    });
}

// Kontrol butonlarını ayarla
function setupControls() {
    document.getElementById('runBtn').addEventListener('click', runProgram);
    document.getElementById('resetBtn').addEventListener('click', resetProgram);
    document.getElementById('clearCanvasBtn').addEventListener('click', clearPaintCanvas);
    document.getElementById('saveArtBtn').addEventListener('click', saveArtwork);

    // Seviye değiştirme butonları
    document.querySelectorAll('.level-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (!isRunning) {
                const level = parseInt(btn.getAttribute('data-level'));
                if (level <= unlockedLevels) {
                    loadLevel(level);
                    currentLevel = level;
                }
            }
        });
    });

    // Modal butonları
    document.getElementById('nextLevelBtn').addEventListener('click', () => {
        document.getElementById('levelCompleteModal').style.display = 'none';
        if (currentLevel < levels.length) {
            currentLevel++;
            if (currentLevel > unlockedLevels) {
                unlockedLevels = currentLevel;
                // Hem oyun içi hem de açılış sayfasındaki butonları güncelle
                updateLevelButtons();
                updateWelcomeLevelButtons();
                // Kullanıcı ilerlemesini localStorage'a kaydet
                saveProgress();
            }
            loadLevel(currentLevel);
        }
    });

    document.getElementById('paintNowBtn').addEventListener('click', () => {
        document.getElementById('levelCompleteModal').style.display = 'none';
        // Tuval kısmına odaklan
        document.querySelector('.canvas-panel').scrollIntoView({ behavior: 'smooth' });
    });
}

// Program dizisini güncelle
function updateProgram() {
    program = [];
    const programContainer = document.getElementById('programContainer');

    Array.from(programContainer.children).forEach(blockElement => {
        const type = blockElement.getAttribute('data-type');

        if (blockTypes[type].isContainer) {
            const container = blockElement.querySelector('.block-container');
            const nestedBlocks = [];

            Array.from(container.children).forEach(nestedBlock => {
                nestedBlocks.push(nestedBlock.getAttribute('data-type'));
            });

            program.push({
                type: type,
                loopCount: blockTypes[type].loopCount,
                blocks: nestedBlocks
            });
        } else {
            program.push({
                type: type
            });
        }
    });
}

// Programı çalıştır
function runProgram() {
    if (isRunning) return;

    const level = levels[currentLevel - 1];
    player = {
        x: level.start.x,
        y: level.start.y,
        direction: 0,
        paintCollected: 0
    };

    collectedPaints = [];
    paintBrushes = [];
    isRunning = true;

    // Çalıştırma sırasında kontrol butonlarını devre dışı bırak
    document.getElementById('runBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;

    // Bilgi panelinde durumu göster
    const infoPanel = document.getElementById('instructionPanel');
    const statusMsg = document.createElement('div');
    statusMsg.id = 'executionStatus';
    statusMsg.className = 'execution-status';
    statusMsg.textContent = 'Program çalışıyor...';
    statusMsg.style.backgroundColor = '#FFF3CD';
    statusMsg.style.color = '#856404';
    statusMsg.style.padding = '10px';
    statusMsg.style.borderRadius = '5px';
    statusMsg.style.margin = '10px 0';
    statusMsg.style.textAlign = 'center';
    statusMsg.style.fontWeight = 'bold';

    const existingStatus = document.getElementById('executionStatus');
    if (existingStatus) {
        infoPanel.removeChild(existingStatus);
    }

    infoPanel.appendChild(statusMsg);

    executeProgram(0).then(() => {
        // Program tamamlandığında durumu güncelle
        statusMsg.textContent = 'Program tamamlandı!';
        statusMsg.style.backgroundColor = '#D4EDDA';
        statusMsg.style.color = '#155724';

        setTimeout(() => {
            if (statusMsg.parentNode) {
                statusMsg.parentNode.removeChild(statusMsg);
            }
        }, 3000);
    });
}

// Programı adım adım çalıştır (asenkron)
async function executeProgram(step) {
    if (step >= program.length) {
        isRunning = false;
        document.getElementById('runBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;
        checkGoal();
        return;
    }

    const action = program[step];

    if (action.type === 'loop') {
        // Döngü bloğu (asenkron)
        for (let i = 0; i < action.loopCount; i++) {
            // Her blok için döngü etiketi göster
            const loopIndicator = document.createElement('div');
            loopIndicator.className = 'loop-indicator';
            loopIndicator.textContent = `Tekrar: ${i+1}/${action.loopCount}`;
            loopIndicator.style.position = 'absolute';
            loopIndicator.style.top = '10px';
            loopIndicator.style.right = '10px';
            loopIndicator.style.backgroundColor = 'rgba(26, 83, 92, 0.8)';
            loopIndicator.style.color = 'white';
            loopIndicator.style.padding = '5px 10px';
            loopIndicator.style.borderRadius = '5px';
            loopIndicator.style.zIndex = '100';
            gameCanvas.parentNode.appendChild(loopIndicator);

            for (const blockType of action.blocks) {
                if (blockTypes[blockType] && blockTypes[blockType].action) {
                    // Blok vurgulama
                    highlightCurrentBlock(blockType, true);
                    await blockTypes[blockType].action();
                    draw();
                    highlightCurrentBlock(blockType, false);
                }
            }

            gameCanvas.parentNode.removeChild(loopIndicator);
        }
        await executeProgram(step + 1);
    } else {
        // Normal blok (asenkron)
        if (blockTypes[action.type] && blockTypes[action.type].action) {
            // Blok vurgulama
            highlightCurrentBlock(action.type, true);
            await blockTypes[action.type].action();
            draw();
            highlightCurrentBlock(action.type, false);
        }
        await executeProgram(step + 1);
    }
}

// Şu an çalışan bloğu vurgula
function highlightCurrentBlock(blockType, highlight) {
    const programContainer = document.getElementById('programContainer');
    const blocks = programContainer.querySelectorAll(`[data-type="${blockType}"]`);

    blocks.forEach(block => {
        if (highlight) {
            block.style.boxShadow = '0 0 0 3px yellow';
            block.style.transform = 'scale(1.05)';
        } else {
            block.style.boxShadow = '';
            block.style.transform = '';
        }
    });
}

// Programı sıfırla
function resetProgram() {
    if (isRunning) return;

    const level = levels[currentLevel - 1];
    player = {
        x: level.start.x,
        y: level.start.y,
        direction: 0,
        paintCollected: 0
    };

    document.getElementById('programContainer').innerHTML = '';
    program = [];
    collectedPaints = [];
    paintBrushes = [];

    draw();
    updateStats();
}

// Oyun alanını çiz
function draw() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

    const level = levels[currentLevel - 1];
    const gridSize = 50;

    // Kareleri çiz
    for (let y = 0; y < level.grid.length; y++) {
        for (let x = 0; x < level.grid[y].length; x++) {
            const cellType = level.grid[y][x];

            if (cellType === 0) { // Boş hücre
                gameCtx.fillStyle = '#F5F5F5';
            } else if (cellType === 1) { // Yürünebilir yol
                gameCtx.fillStyle = '#FFFFFF';
            } else if (cellType === 2) { // Engel
                gameCtx.fillStyle = '#6C5B7B'; // Engel rengi
            } else if (cellType === 3) { // Boya kutusu
                gameCtx.fillStyle = '#FFFFFF';
            }

            gameCtx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
            gameCtx.strokeStyle = '#E0E0E0';
            gameCtx.strokeRect(x * gridSize, y * gridSize, gridSize, gridSize);
        }
    }

    // Boya kutularını çiz
    level.paints.forEach(paint => {
        // Toplanmış mı kontrol et
        if (!collectedPaints.some(p => p.x === paint.x && p.y === paint.y)) {
            const paintColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#6C5B7B', '#1A535C'];
            const randomColor = paintColors[Math.floor(Math.random() * paintColors.length)];

            gameCtx.fillStyle = randomColor;
            gameCtx.beginPath();
            gameCtx.arc(paint.x * gridSize + gridSize/2, paint.y * gridSize + gridSize/2, gridSize/4, 0, Math.PI * 2);
            gameCtx.fill();

            // Boya kutusu simgesi
            gameCtx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            gameCtx.fillRect(paint.x * gridSize + gridSize/4, paint.y * gridSize + gridSize/4, gridSize/2, gridSize/2);
            gameCtx.strokeStyle = randomColor;
            gameCtx.lineWidth = 2;
            gameCtx.strokeRect(paint.x * gridSize + gridSize/4, paint.y * gridSize + gridSize/4, gridSize/2, gridSize/2);
        }
    });

    // Hedefi çiz
    gameCtx.fillStyle = 'rgba(76, 175, 80, 0.3)';
    gameCtx.fillRect(level.goal.x * gridSize, level.goal.y * gridSize, gridSize, gridSize);
    gameCtx.strokeStyle = '#4CAF50';
    gameCtx.lineWidth = 3;
    gameCtx.strokeRect(level.goal.x * gridSize + 5, level.goal.y * gridSize + 5, gridSize - 10, gridSize - 10);

    // Oyuncu yönünü belirle
    const directions = [
        [0, -1], // yukarı
        [1, 0],  // sağ
        [0, 1],  // aşağı
        [-1, 0]  // sol
    ];

    // Oyuncuyu çiz (ressam robot)
    gameCtx.save();
    gameCtx.translate(player.x * gridSize + gridSize/2, player.y * gridSize + gridSize/2);
    gameCtx.rotate(player.direction * Math.PI/2);

    // Bir div elementi ekle (CSS animasyonları için)
    if (!document.querySelector('.robot-element')) {
        const robotElement = document.createElement('div');
        robotElement.className = 'robot-element';
        robotElement.style.position = 'absolute';
        robotElement.style.width = '0';
        robotElement.style.height = '0';
        robotElement.style.left = `${player.x * gridSize + gridSize/2}px`;
        robotElement.style.top = `${player.y * gridSize + gridSize/2}px`;
        gameCanvas.parentNode.appendChild(robotElement);
    } else {
        // Güncelle
        const robotElement = document.querySelector('.robot-element');
        robotElement.style.left = `${player.x * gridSize + gridSize/2}px`;
        robotElement.style.top = `${player.y * gridSize + gridSize/2}px`;
    }

    // Robot gövdesi
    gameCtx.fillStyle = '#FF6B6B';
    gameCtx.fillRect(-gridSize/3, -gridSize/3, gridSize*2/3, gridSize*2/3);

    // Robot başı
    gameCtx.fillStyle = '#FFE66D';
    gameCtx.beginPath();
    gameCtx.arc(0, -gridSize/3, gridSize/5, 0, Math.PI * 2);
    gameCtx.fill();

    // Robot gözleri
    gameCtx.fillStyle = '#1A535C';
    gameCtx.beginPath();
    gameCtx.arc(-gridSize/10, -gridSize/3, gridSize/15, 0, Math.PI * 2);
    gameCtx.arc(gridSize/10, -gridSize/3, gridSize/15, 0, Math.PI * 2);
    gameCtx.fill();

    // Robot fırçası
    gameCtx.fillStyle = '#4ECDC4';
    gameCtx.fillRect(gridSize/5, 0, gridSize/10, gridSize/3);

    gameCtx.restore();

    // Boya fırçaları
    paintBrushes.forEach(brush => {
        gameCtx.fillStyle = brush.color;
        gameCtx.beginPath();
        gameCtx.arc(brush.x * gridSize + gridSize/2, brush.y * gridSize + gridSize/2, gridSize/6, 0, Math.PI * 2);
        gameCtx.fill();
    });
}

// Resim tuvalini temizle
function clearPaintCanvas() {
    paintCtx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    paintCtx.fillStyle = 'white';
    paintCtx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);
}

// Resmi kaydet
function saveArtwork() {
    const link = document.createElement('a');
    link.download = `ressam-robot-${currentLevel}.png`;
    link.href = paintCanvas.toDataURL();
    link.click();
}

// İstatistikleri güncelle
function updateStats() {
    document.getElementById('paintCount').textContent = player.paintCollected;
}

// Geçerli hareket kontrolü
function isValidMove(x, y) {
    const level = levels[currentLevel - 1];

    // Sınırlar içinde mi?
    if (x < 0 || y < 0 || y >= level.grid.length || x >= level.grid[0].length) {
        return false;
    }

    // Engel var mı?
    const cellType = level.grid[y][x];
    return cellType !== 0 && cellType !== 2;
}

// Boya toplama kontrolü
function checkPaintCollected() {
    const level = levels[currentLevel - 1];

    level.paints.forEach(paint => {
        if (player.x === paint.x && player.y === paint.y) {
            // Daha önce toplanmış mı kontrol et
            if (!collectedPaints.some(p => p.x === paint.x && p.y === paint.y)) {
                const paintColors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#6C5B7B', '#1A535C'];
                const randomColor = paintColors[Math.floor(Math.random() * paintColors.length)];

                collectedPaints.push({
                    x: paint.x,
                    y: paint.y,
                    color: randomColor
                });

                player.paintCollected++;
                updateStats();
            }
        }
    });
}

// Hedefe ulaşma kontrolü
function checkGoal() {
    const level = levels[currentLevel - 1];

    if (player.x === level.goal.x && player.y === level.goal.y) {
        // Bölüm tamamlandı
        document.getElementById('collectedPaint').textContent = player.paintCollected;

        // Resim tuvali oluştur
        clearPaintCanvas();

        // Toplanan boyalarla basit bir resim oluştur
        if (collectedPaints.length > 0) {
            createRandomArtwork();
        }

        document.getElementById('levelCompleteModal').style.display = 'flex';
    }
}

// Rastgele sanat eseri oluştur
function createRandomArtwork() {
    clearPaintCanvas();

    const shapes = ['circle', 'rectangle', 'triangle', 'line'];

    // Arka plan
    paintCtx.fillStyle = 'white';
    paintCtx.fillRect(0, 0, paintCanvas.width, paintCanvas.height);

    // Her toplanan boya için bir şekil çiz
    collectedPaints.forEach(paint => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const x = Math.random() * paintCanvas.width;
        const y = Math.random() * paintCanvas.height;
        const size = 20 + Math.random() * 50;

        paintCtx.fillStyle = paint.color;

        switch (shape) {
            case 'circle':
                paintCtx.beginPath();
                paintCtx.arc(x, y, size/2, 0, Math.PI * 2);
                paintCtx.fill();
                break;
            case 'rectangle':
                paintCtx.fillRect(x, y, size, size);
                break;
            case 'triangle':
                paintCtx.beginPath();
                paintCtx.moveTo(x, y);
                paintCtx.lineTo(x + size/2, y - size);
                paintCtx.lineTo(x + size, y);
                paintCtx.closePath();
                paintCtx.fill();
                break;
            case 'line':
                paintCtx.strokeStyle = paint.color;
                paintCtx.lineWidth = 5;
                paintCtx.beginPath();
                paintCtx.moveTo(x, y);
                paintCtx.lineTo(x + size, y + size/2);
                paintCtx.stroke();
                break;
        }
    });

    // Resmi kaydetmek için
    document.getElementById('levelArtwork').src = paintCanvas.toDataURL();
}

// Resim tuvalinde çizim
function setupPaintCanvas() {
    let isPainting = false;
    let currentColor = '#FF6B6B';

    paintCanvas.addEventListener('mousedown', (e) => {
        isPainting = true;
        paint(e);
    });

    paintCanvas.addEventListener('mousemove', (e) => {
        if (isPainting) {
            paint(e);
        }
    });

    paintCanvas.addEventListener('mouseup', () => {
        isPainting = false;
        paintCtx.beginPath();
    });

    paintCanvas.addEventListener('mouseleave', () => {
        isPainting = false;
    });

    function paint(e) {
        if (!isPainting) return;

        // Boyamak için yeterli boya var mı?
        if (player.paintCollected <= 0 && collectedPaints.length === 0) {
            alert('Boyama yapmak için boya kutuları toplamalısın!');
            isPainting = false;
            return;
        }

        // Eğer toplanan boya varsa rastgele bir renk seç
        if (collectedPaints.length > 0) {
            currentColor = collectedPaints[Math.floor(Math.random() * collectedPaints.length)].color;
        }

        const rect = paintCanvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        paintCtx.lineWidth = 5;
        paintCtx.lineCap = 'round';
        paintCtx.strokeStyle = currentColor;

        paintCtx.lineTo(x, y);
        paintCtx.stroke();
        paintCtx.beginPath();
        paintCtx.moveTo(x, y);
    }
}

// Kullanıcı ilerlemesini kaydet
function saveProgress() {
    localStorage.setItem('ressamRobotProgress', JSON.stringify({
        unlockedLevels: unlockedLevels,
        currentLevel: currentLevel
    }));
}

// Kullanıcı ilerlemesini yükle
function loadProgress() {
    const savedProgress = localStorage.getItem('ressamRobotProgress');
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        unlockedLevels = progress.unlockedLevels;
        currentLevel = progress.currentLevel;
    }
}

// Oyunu başlat
window.addEventListener('load', () => {
    loadProgress();
    initGame();
});