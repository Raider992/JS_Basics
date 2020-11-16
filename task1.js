'use strict';

//1. Написать функцию, преобразующую число в объект.
// Передавая на вход число от 0 до 999, мы должны
// получить на выходе объект, в котором в соответствующих
// свойствах описаны единицы, десятки и сотни. Например,
// для числа 245 мы должны получить следующий
// объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}.
// Если число превышает 999, необходимо выдать соответствующее
// сообщение с помощью console.log и вернуть пустой объект.


const numToObj = (num, limit = 3) => {

    const digits = [];
    const res = {}
    const values = ['единицы', 'десятки', 'сотни', 'тысячи', 'десятки_тысяч', 'сотни_тысяч', 'миллионы']

    const decompose = (n) => {
        if (Math.trunc(n / 10) === 0) {
            digits.push(n);
        } else {
            digits.push(n % 10);
            return decompose(Math.trunc(n / 10))
        }
    };

    decompose(num);

    if (digits.length > limit) return console.log('Число превышает заданный предел')

    for(let i = 0; i < digits.length; i++){
        res[values[i]] = digits[i];
    }

    return res;
};

const runScript = () => {
    const n = +prompt('Введите число от 0 до 999')
    if(isNaN(n)) {
        console.log('Введённый аргумент не является числом');
        return runScript();
    }
    const res = numToObj(n);
    return console.log(res);
};

runScript();