'use strict';

// 5.  Реализовать основные 4 арифметические операции в виде
// функций с двумя параметрами. Обязательно использовать оператор return.

// 6.  Реализовать функцию с тремя параметрами:
// function mathOperation(arg1, arg2, operation),
// где arg1, arg2 – значения аргументов, operation – строка
// с названием операции. В зависимости от переданного значения
// операции выполнить одну из арифметических операций (использовать
// функции из пункта 3) и вернуть полученное значение (использовать switch).

const summ = (a,b) => {
    return +a + +b;
};

const subt = (a,b) => {
    return +a - +b;
};

const mult = (a,b) => {
    return +a * +b;
};

const divs = (a,b) => {
    return +a / +b;
};

const mathOperation = (arg1, arg2, operation) =>{
    switch (operation) {
        case 'сумма':
            return summ(arg1, arg2);
        case 'разность':
            return subt(arg1, arg2);
        case 'произведение':
            return mult(arg1, arg2);
        case 'деление':
            return divs(arg1, arg2);
        default:
            return 'Операция может быть только "сумма", "разность", "произведение", "деление"';
    }
};

let a, b, ops;

a = +prompt('Введите первое число');
b = +prompt('Введите второе число');
ops = prompt('Введите операцию').toLowerCase();

const res = mathOperation(a,b,ops);

console.log(`Первое число = %d \nВторое число = %d\nОперация: %s\nРезультат: %d`, a, b, ops, res);