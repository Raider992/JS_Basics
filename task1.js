'use strict';

// 1. Создать функцию, генерирующую шахматную доску.
// При этом можно использовать любые html-теги по своему желанию.
// Доска должна быть разлинована соответствующим образом, т.е. чередовать
// черные и белые ячейки. Строки должны нумероваться числами от 1 до 8,
// столбцы – латинскими буквами A, B, C, D, E, F, G, H.

// 2*. Заполнить созданную таблицу буквами, отвечающими за шахматную фигуру,
// например К – король, Ф – ферзь и т.п.,

// const workspace = document.getElementsByClassName('workspace');

document.querySelector('.workspace').insertAdjacentHTML('beforeend', '<div class="chessboard"></div>');

const board = document.querySelector('.chessboard');

const chessGame = {
    // ranks: [8, 7, 6, 5, 4, 3, 2, 1],
    ranks: ['VIII', 'VII', 'VI', 'V', 'IV', 'III', 'II', 'I'],
    files: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    pieces: [
        {
            name: 'whiterook',
            link: 'merida/wr.svg'
        },
        {
            name: 'whiteknight',
            link: 'merida/wn.svg'
        },
        {
            name: 'whitebishop',
            link: 'merida/wb.svg'
        },
        {
            name: 'whiteking',
            link: 'merida/wk.svg'
        },
        {
            name: 'whitequeen',
            link: 'merida/wq.svg'
        },
        {
            name: 'whitepawn',
            link: 'merida/wp.svg'
        },
        {
            name: 'blackrook',
            link: 'merida/br.svg'
        },
        {
            name: 'blackknight',
            link: 'merida/bn.svg'
        },
        {
            name: 'blackbishop',
            link: 'merida/bb.svg'
        },
        {
            name: 'blackking',
            link: 'merida/bk.svg'
        },
        {
            name: 'blackqueen',
            link: 'merida/bq.svg'
        },
        {
            name: 'blackpawn',
            link: 'merida/bp.svg'
        }
    ],
    renderMainBoard() {
        board.insertAdjacentHTML('afterbegin', '<div class="horizontal-container"></div>');
        const innerBoard = document.createElement('div');
        innerBoard.classList.add('inner_board');
        document.querySelector('.horizontal-container').insertAdjacentElement('beforeend', innerBoard);

        for (let i = 0; i < 8; i++) {
            let row = document.createElement('div');
            let rowNumber = 8 - i;
            row.classList.add('row');
            row.style.flexDirection = i % 2 === 0 ? '' : 'row-reverse';
            for (let j = 0; j < 8; j++) {
                let square = document.createElement('DIV')
                square.classList.add('box');
                square.classList.add(j % 2 === 0 ? 'light' : 'dark');
                square.dataset.row_number = rowNumber;
                square.dataset.col_number = j + 1;
                row.appendChild(square);
            }
            innerBoard.appendChild(row);
        }
    },

    renderLabels() {
        const innerBoard = document.querySelector('.inner_board');
        const horizontalContainer = document.querySelector('.horizontal-container');

        const ranksContainer = document.createElement('div');
        ranksContainer.classList.add('ranks-container');
        this.ranks.forEach((el) => {
            const rank = document.createElement('div');
            rank.classList.add('box');
            rank.classList.add('label');
            rank.innerText = el;
            ranksContainer.appendChild(rank);
        });
        innerBoard.insertAdjacentElement('beforebegin', ranksContainer);
        innerBoard.insertAdjacentElement('afterend', ranksContainer.cloneNode(true));

        const filesContainer = document.createElement('div');
        filesContainer.classList.add('files-container');
        this.files.forEach((el) => {
            const file = document.createElement('div');
            file.classList.add('box');
            file.classList.add('label');
            file.innerText = el;
            filesContainer.appendChild(file);
        });
        horizontalContainer.insertAdjacentElement('beforebegin', filesContainer);
        horizontalContainer.insertAdjacentElement('afterend', filesContainer.cloneNode(true));
    },

    generatePiece(name) {

        const piece = this.pieces.find((el) => {
            return el.name === name;
        });

        const pieceElement = document.createElement('img');
        pieceElement.src = piece.link;
        pieceElement.alt = 'pic';


        return pieceElement;
    },


    renderPieces() {
        const initTemplate = [
            ['whiterook', 'whiteknight', 'whitebishop', 'whiteking', 'whitequeen', 'whitebishop', 'whiteknight', 'whiterook'],
            ['whitepawn', 'whitepawn', 'whitepawn', 'whitepawn', 'whitepawn', 'whitepawn', 'whitepawn', 'whitepawn'],
            ['blackrook', 'blackknight', 'blackbishop', 'blackqueen', 'blackking', 'blackbishop', 'blackknight', 'blackrook'],
            ['blackpawn', 'blackpawn', 'blackpawn', 'blackpawn', 'blackpawn', 'blackpawn', 'blackpawn', 'blackpawn']
        ];
        const innerBoard = document.querySelector('.inner_board');

        const whiteRow1 = innerBoard.querySelectorAll('[data-row_number="1"]');             //белые фигуры
        const whiteRow2 = innerBoard.querySelectorAll('[data-row_number="2"]');             //белые пешки
        const blackRow1 = innerBoard.querySelectorAll('[data-row_number="8"]');             //чёрные фигуры
        const blackRow2 = innerBoard.querySelectorAll('[data-row_number="7"]');             //чёрные пешки

        const squareTemplate = [whiteRow1, whiteRow2, blackRow1, blackRow2];

        for (let i = 0; i < 4; i++) {
            let pieces = initTemplate[i];
            let spots = squareTemplate[i];

            for(let j = 0; j < 8; j++) {
                let piece = this.generatePiece(pieces[j]);
                spots[j].insertAdjacentElement('afterbegin', piece);
            }
        }

    },

    init() {
        this.renderMainBoard();
        this.renderLabels();
        this.renderPieces();
    }
};

chessGame.init();


