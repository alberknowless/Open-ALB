const levels = [
    {
        board: [
            ['S', '.', '.', 'B', '.'],
            ['#', '#', '.', '#', '.'],
            ['.', '.', '.', '#', '.'],
            ['B', '#', '.', '.', '.'],
            ['.', '.', '.', '#', 'G']
        ]
    },
    {
        board: [
            ['S', '.', '#', '.', 'B'],
            ['.', '.', '#', '.', '.'],
            ['#', '.', '#', '.', '#'],
            ['.', '.', '.', '.', '.'],
            ['B', '#', '.', 'G', '.']
        ]
    },
    {
        board: [
            ['S', '#', '.', '.', 'B'],
            ['.', '#', '.', '#', '.'],
            ['.', '.', '.', '#', '.'],
            ['#', '.', '#', '.', '.'],
            ['B', '.', '.', '#', 'G']
        ]
    },
    {
        board: [
            ['S', '.', '.', '#', '.'],
            ['.', '#', 'B', '#', '.'],
            ['.', '.', '.', '.', '.'],
            ['#', '.', '#', '.', 'B'],
            ['.', '.', '.', '#', 'G']
        ]
    },
    {
        board: [
            ['S', '#', '.', '.', '.'],
            ['.', '#', 'B', '#', '.'],
            ['.', '.', '.', '#', '.'],
            ['B', '#', '.', '.', '.'],
            ['.', '.', '.', '#', 'G']
        ]
    }
];

let currentLevel = 0;
let program = [];
let paintsToCollect = 0;
let painterPos = {x:0, y:0};
let painterDir = 'right';

function arrowFor(dir) {
    return {up:'▲', down:'▼', left:'◀', right:'▶'}[dir];
}

function createBoard(level) {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = '';
    const board = levels[level].board;
    paintsToCollect = 0;
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const value = board[y][x];
            if (value === 'S') {
                cell.classList.add('painter');
                painterPos = {x, y};
            } else if (value === 'G') {
                cell.classList.add('goal');
            } else if (value === 'B') {
                cell.classList.add('paint');
                paintsToCollect++;
            } else if (value === '#') {
                cell.classList.add('obstacle');
            }
            cell.setAttribute('data-x', x);
            cell.setAttribute('data-y', y);
            boardDiv.appendChild(cell);
        }
    }
    document.getElementById('level-num').textContent = (level + 1);
    painterDir = 'right';
    document.querySelector('.painter').textContent = arrowFor(painterDir);
}

function setupDrag() {
    document.querySelectorAll('.block').forEach(block => {
        block.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', block.dataset.cmd);
        });
    });
    const programDiv = document.getElementById('program');
    programDiv.addEventListener('dragover', e => e.preventDefault());
    programDiv.addEventListener('drop', e => {
        e.preventDefault();
        const cmd = e.dataTransfer.getData('text/plain');
        const node = document.createElement('div');
        node.className = 'block';
        node.textContent = e.target.textContent;
        node.dataset.cmd = cmd;
        node.textContent = {
            up:'Yukarı', down:'Aşağı', left:'Sola', right:'Sağa'
        }[cmd];
        programDiv.appendChild(node);
        program.push(cmd);
    });
}

function move(cmd) {
    const dxdy = {up:[0,-1], down:[0,1], left:[-1,0], right:[1,0]}[cmd];
    const x = painterPos.x + dxdy[0];
    const y = painterPos.y + dxdy[1];
    if (x < 0 || y < 0 || x >= 5 || y >=5) return false;
    const index = y*5+x;
    const cells = document.querySelectorAll('.cell');
    const next = cells[index];
    if (next.classList.contains('obstacle')) return false;
    const current = document.querySelector('.painter');
    current.classList.remove('painter');
    current.classList.add('visited');
    current.textContent = '';
    if (next.classList.contains('paint')) {
        next.classList.remove('paint');
        paintsToCollect--;
    }
    next.classList.add('painter');
    painterDir = cmd;
    next.textContent = arrowFor(painterDir);
    painterPos = {x,y};
    if (next.classList.contains('goal') && paintsToCollect === 0) {
        currentLevel++;
        if (currentLevel < levels.length) {
            alert('Tebrikler! Sonraki bölüme geçiliyor.');
            program = [];
            document.getElementById('program').innerHTML='';
            createBoard(currentLevel);
        } else {
            alert('Tüm bölümleri tamamladınız!');
        }
    }
    return true;
}

async function runProgram() {
    for (let cmd of program) {
        if (!move(cmd)) {
            await new Promise(r => setTimeout(r, 300));
            alert('Hatalı hareket!');
            break;
        }
        await new Promise(r => setTimeout(r, 300));
    }
    program = [];
    document.getElementById('program').innerHTML='';
}

window.onload = () => {
    createBoard(currentLevel);
    setupDrag();
    document.getElementById('run-btn').addEventListener('click', runProgram);
};
