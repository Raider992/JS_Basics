'use strict';
 //2. С этого урока начинаем работать с функционалом интернет-магазина. Предположим, есть сущность корзины. Нужно реализовать функционал подсчета стоимости корзины в зависимости от находящихся в ней товаров.
//    Товары в корзине хранятся в массиве. Задачи:
// a) Организовать такой массив для хранения товаров в корзине;
// b) Организовать функцию countBasketPrice, которая будет считать стоимость корзины.

const item1 = {
    id: 1,
    name: 'монитор',
    price: 100
}

const item2 = {
    id: 2,
    name: 'системный блок',
    price: 200
}

const item3 = {
    id: 3,
    name: 'клавиатура',
    price: 20
}

const basket = [];

basket.push(item1);
basket.push(item2);
basket.push(item3);

console.log(basket)

const countBasketPrice = (basket) => {
    return basket.reduce((res, val) => {
        return res + val.price;
    }, 0);
}

const total = countBasketPrice(basket);
console.log(total);

console.log('----------------------------------------------------------------------------------------------------------');
