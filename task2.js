'use strict';

//3. Сделать генерацию корзины динамической: верстка корзины не должна находиться в HTML-структуре.
// Там должен быть только div, в который будет вставляться корзина, сгенерированная на базе JS:
// 3.1. Пустая корзина должна выводить строку «Корзина пуста»;
// 3.2. Наполненная должна выводить «В корзине: n товаров на сумму m рублей».


const workspace = document.querySelector('.workspace');

workspace.insertAdjacentHTML('beforeend', '<div class="separator" style="height: 1vh; background-color: black; margin: 3vh 0;">')

workspace.insertAdjacentHTML('beforeend', '<div class="cart">')

workspace.insertAdjacentHTML('beforeend', '<button class="btn-erase">Очистить корзину</button>')


const goods = [
    {
        id: 1,
        name: 'клавиатура',
        price: 1500,
        quantity: 1
    },
    {
        id: 2,
        name: 'компьютерная мышь',
        price: 1000,
        quantity: 1
    },
    {
        id: 3,
        name: 'монитор',
        price: 5500,
        quantity: 2
    },
    {
        id: 4,
        name: 'системный блок',
        price: 200000,
        quantity: 1
    }
];

const cart = {
    goods: [],
    totalPrice: null,
    itemCount: null,
    eraseButton: null,

    renderItem(item) {
        return `<div class="item">
                    <div>Название: ${item.name}</div>
                    <div>Цена: ${item.price}</div>
                    <div>Количество: ${item.quantity}</div>
                    <div>Стоимость: ${item.quantity * item.price}</div>
                </div>`

    },

    render() {
        const cartWindow = document.querySelector('.cart');

        if (this.goods.length > 0) {
            this.goods.forEach((el) => {
                cartWindow.insertAdjacentHTML('beforeend', this.renderItem(el));
            });
            cartWindow.insertAdjacentText('beforeend', `В корзине ${this.itemCount} товаров на общую сумму: ${this.totalPrice}`);
        } else {
            cartWindow.textContent = 'Корзина пуста';
        }
    },
    clear() {
        this.goods.splice(0);
        this.render();
    },
    init() {
        this.goods = goods;
        this.totalPrice = this.getTotalPrice();
        this.itemCount = this.getGoodsCount();
        this.eraseButton = document.querySelector('.btn-erase');
        this.eraseButton.addEventListener('click', this.clear.bind(this));
        this.render();
    },
    getTotalPrice() {
        return this.goods.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    },
    getGoodsCount() {
        return this.goods.reduce(function (total, item) {
            return total + item.quantity;
        }, 0);
    }
};
console.log(cart.getGoodsCount());
console.log(cart.getTotalPrice());
cart.init();