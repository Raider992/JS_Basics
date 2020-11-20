'use strict';

// 1. Доработать модуль корзины.
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида
// 2 *У товара может быть несколько изображений. Нужно:
// a. Реализовать функционал показа полноразмерных картинок товара в модальном окне
// b. Реализовать функционал перехода между картинками внутри модального окна ("листалка")


const workspace = document.querySelector('.workspace');

workspace.insertAdjacentHTML('beforeend', `<div class="catalogue"></div>`)

workspace.insertAdjacentHTML('beforeend', '<div class="cart">')

workspace.insertAdjacentHTML('beforeend', '<button class="btn-erase">Очистить корзину</button>')


const goods = [

    {
        id: 1,
        name: 'клавиатура',
        price: 1500,
    },
    {
        id: 2,
        name: 'компьютерная мышь',
        price: 1000,
    },
    {
        id: 3,
        name: 'монитор',
        price: 5500,
    },
    {
        id: 4,
        name: 'системный блок',
        price: 200000,
    }

];


const catalogue = {
    catalogueContainer: null,
    goods: [],

    renderItem(item) {
        return `<div class="item">
                    <div>Название: ${item.name}</div>
                    <div>Цена: ${item.price}</div>
                    <button class="btn-buy" id="${item.id}">Купить</button>
                </div>`
    },

    render() {
        this.catalogueContainer = document.querySelector('.catalogue');
        if (this.goods.length > 0) {
            this.goods.forEach((el) => {
                this.catalogueContainer.insertAdjacentHTML('beforeend', this.renderItem(el));
            });

        } else {
            this.catalogueContainer.textContent = 'Товаров нет'
        }

    },

    buyClickHandler(e) {
        if (e.target.tagName === 'BUTTON') {
            this.moveToCart(+e.target.id);
        }
    },

    moveToCart(id) {
        const item = this.goods.find((el) => {
            return el.id === id;
        });
        return cart.addItem(item);
    },

    init() {
        this.goods = goods;

        this.render();
        this.catalogueContainer.addEventListener('click', e => this.buyClickHandler(e));
    }

};


const cart = {
    goods: [],
    totalPrice: 0,
    itemCount: 0,
    eraseButton: null,
    cartContainer: null,


    addItem(item) {
        const itm = this.goods.find(e => e.id === item.id);
        if (itm) {
            itm.quantity++
        } else {
            item.quantity = 1;
            this.goods.push(item);
        }
        this.render();
    },


    renderItem(item) {

        return `<div class="item">
                    <div>Название: ${item.name}</div>
                    <div>Цена: ${item.price}</div>
                    <div>Количество: ${item.quantity}</div>
                    <div>Стоимость: ${item.quantity * item.price}</div>
                </div>`

    },


    render() {
        this.cartContainer.innerHTML = '';
        if (this.goods.length > 0) {
            this.goods.forEach((el) => {
                this.cartContainer.insertAdjacentHTML('beforeend', this.renderItem(el));
            });
            this.totalPrice = this.getTotalPrice();
            this.itemCount = this.getGoodsCount();
            this.cartContainer.insertAdjacentText('beforeend', `В корзине ${this.itemCount} товаров на общую сумму: ${this.totalPrice}`);
        } else {
            this.cartContainer.textContent = 'Корзина пуста';
        }
    },
    clear() {
        this.goods.splice(0);
        this.render();
    },
    init() {
        this.eraseButton = document.querySelector('.btn-erase');
        this.eraseButton.addEventListener('click', this.clear.bind(this));
        this.cartContainer = document.querySelector('.cart');
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

catalogue.init();
cart.init();