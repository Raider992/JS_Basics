'use strict';

// 8. С помощью рекурсии организовать функцию возведения числа в степень.
// Формат: function power(val, pow), где val – заданное число, pow – степень.

const power = (num, pow) => {
    if (pow <= 0){
        return alert("Степень должна быть больше или равна 1");
    }
    if (pow !== 1) {
        return num * power(num, pow - 1);
    } else {
        return num;
    }
};

let num, pow, res;

num = +prompt('Введите число: ');

if (num < 0) -num;

pow = +prompt('Введите степень числа: ')

res = power(num, pow)

console.log(`Число: %d \nСтепень: %s\nРезультат: %d`, num, pow, res);