'use strict';

// 4.  Присвоить переменной а значение в промежутке [0..15].
// С помощью оператора switch организовать вывод чисел от a до 15.

const rndGen = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

let a = rndGen(0,15);

console.log(`a = %d`, a);

const func = (a) => {
    const res = [];
    switch (a) {
        case 1:
            res.push(1);
        case 2:
            res.push(2);
        case 3:
            res.push(3);
        case 4:
            res.push(4);
        case 5:
            res.push(5);
        case 6:
            res.push(6);
        case 7:
            res.push(7);
        case 8:
            res.push(8);
        case 9:
            res.push(9);
        case 10:
            res.push(10);
        case 11:
            res.push(11);
        case 12:
            res.push(12);
        case 13:
            res.push(13);
        case 14:
            res.push(14);
        case 15:
            res.push(15);
    }
    return res;
};

console.log(func(a));