const container = document.querySelector('.container');
const blackModeBtn = document.getElementById('black-mode');
const colorModeBtn = document.getElementById('color-mode');
const eraserBtn = document.getElementById('eraser');
const clearBtn = document.getElementById('clear');
const resizeBtn = document.getElementById('resize');

let currentMode = 'black';       // Modo padrão: preto
let autoDrawing = false;         // Controle do modo automático

// Cria a grade inicial (16x16 por padrão)
createGrid(16);

// Adiciona event listeners para os botões
blackModeBtn.addEventListener('click', () => setMode('black'));
colorModeBtn.addEventListener('click', () => setMode('color'));
eraserBtn.addEventListener('click', () => setMode('eraser'));
clearBtn.addEventListener('click', clearGrid);
resizeBtn.addEventListener('click', resizeGrid);

// Controle do modo automático
container.addEventListener('click', () => {
    autoDrawing = !autoDrawing;  // Alterna entre true e false a cada clique
    console.log(`Modo automático: ${autoDrawing ? 'Ativado' : 'Desativado'}`);
});

function createGrid(size) {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const square = document.createElement('div');
        square.classList.add('grid-square');
        square.style.backgroundColor = '#fff';
        square.addEventListener('mouseover', changeColor); // Muda a cor ao passar o mouse
        container.appendChild(square);
    }
}

// Função que muda a cor dos quadrados
function changeColor(e) {
    if (!autoDrawing) return; // Se o modo automático estiver desligado, não pinta

    const square = e.target;
    if (currentMode === 'black') {
        square.style.backgroundColor = 'black';
    } else if (currentMode === 'color') {
        const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        square.style.backgroundColor = randomColor;
    } else if (currentMode === 'eraser') {
        square.style.backgroundColor = '#fff';
    }
}

// Define o modo atual
function setMode(mode) {
    currentMode = mode;
}

// Limpa a grade
function clearGrid() {
    const squares = document.querySelectorAll('.grid-square');
    squares.forEach(square => (square.style.backgroundColor = '#fff'));
}

// Redimensiona a grade
function resizeGrid() {
    let newSize = parseInt(prompt('Insira o novo tamanho da grade (1-100):'));
    if (newSize && newSize > 0 && newSize <= 100) {
        createGrid(newSize);
    } else {
        alert('Por favor, insira um número entre 1 e 100.');
    }
}
