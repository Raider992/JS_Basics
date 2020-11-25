'use strict';

//3.Продолжить работу с интернет-магазином:
// 3.1. В прошлом домашнем задании вы реализовали корзину на базе
// массивов. Какими объектами можно заменить их элементы?
// 3.2. Реализуйте такие объекты.
// 3.3. Перенести функционал подсчета корзины на объектно-ориентированную базу.

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

const basket = {
    items: [],
    totalPrice: 0,

    addItem(item) {
        return this.items.push(item);
    },

    deleteItemByName(name) {
        return this.items.forEach((el, i) => {
            if (el.name === name) this.items.splice(i,1);
        });
    },

    clearBasket() {
        this.items.splice(0);
    },

    countTotalPrice() {
        return this.totalPrice = this.items.reduce((res, val) => {
            return res + val.price;
        }, 0);
    }
};

basket.addItem(item1);
basket.addItem(item2);
basket.addItem(item3);

console.log(basket.items);

basket.countTotalPrice();
console.log(basket.totalPrice);

basket.deleteItemByName('системный блок');

console.log(basket.items);

basket.countTotalPrice();
console.log(basket.totalPrice);