'use strict';

//2. Для игры, реализованной на уроке, добавить ограничения,
// чтобы игрок не выходил за пределы поля

/* Реализовал ограничение проверкой в методе move(), если следующим
 ходом игрок должен будет выйти за поле, координата сбрасывается на
 противоположную. */

const config = {
    rowCount: 10,
    colCount: 10,
    startPositionX: 0,
    startPositionY: 0
};

const player = {
    x: null,
    y: null,

    init (startX,startY) {
        this.x = startX;
        this.y = startY;
    },

    move (direction) {
        switch (direction) {
            case 2:
                this.y++;
                break;
            case 4:
                this.x--;
                break;
            case 6:
                this.x++;
                break;
            case 8:
                this.y--;
                break;
        }
        if (this.x >= config.rowCount) this.x = 0;
        if (this.y >= config.colCount) this.y = 0;
        if (this.x < 0) this.x = config.rowCount - 1;
        if (this.y < 0) this.y = config.colCount - 1;
    },
};

const game ={
    settigs: config,
    player,

    run(){
        this.player.init(this.settigs.startPositionX, this.settigs.startPositionY);

        while (true) {
            this.render();

            const direction = this.getDirection();

            if (direction === -1) {
                return alert('До свидания!');
            }
            this.player.move(direction);
        }
    },

    render(){
        let map = '';

        for (let row = 0; row < this.settigs.rowCount; row++){
            for (let col = 0; col < this.settigs.colCount; col++) {
                if(this.player.y === row && this.player.x === col) {
                    map += 'O ';
                } else {
                    map += 'X ';
                }
            }
            map += '\n';
        }
        console.clear();
        console.log(map);
    },

    getDirection () {
        const availableDirections = [-1, 2, 4, 6, 8];

        while (true) {
            const direction = +prompt('Введите направление перемещения игрока либо -1 для выхода');
            try {
                if (!availableDirections.includes(direction)) throw new Error(`'Для перемещения необходимо ввести одно из чисел ${availableDirections.join(', ')}'`);
            }
            catch (e) {
                console.log(e.message);
                continue;
            }
            return direction;
        }
    },
};

game.run();