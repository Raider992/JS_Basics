'use strict';

// 1. Доработать модуль корзины.
// a. Добавлять в объект корзины выбранные товары по клику на кнопке «Купить» без перезагрузки страницы
// b. Привязать к событию покупки товара пересчет корзины и обновление ее внешнего вида
// 2 *У товара может быть несколько изображений. Нужно:
// a. Реализовать функционал показа полноразмерных картинок товара в модальном окне
// b. Реализовать функционал перехода между картинками внутри модального окна ("листалка")


const workspace = document.querySelector('.workspace');

workspace.insertAdjacentHTML('beforeend', `<div class="catalogue"></div>`);

workspace.insertAdjacentHTML('beforeend', '<div class="cart"></div>');


workspace.insertAdjacentHTML('beforeend', '<button class="btn-erase">Очистить корзину</button>');


const itemPics = [
    ['pic/max/1/1.jpg', 'pic/max/1/2.jpg', 'pic/max/1/3.jpg', 'pic/max/1/4.jpg'],
    ['pic/max/2/2.jpg', 'pic/max/2/3.jpg', 'pic/max/2/4.jpg', 'pic/max/2/1.jpg'],
    ['pic/max/3/3.jpg', 'pic/max/3/4.jpg', 'pic/max/3/1.jpg', 'pic/max/3/2.jpg'],
    ['pic/max/4/4.jpg', 'pic/max/4/1.jpg', 'pic/max/4/2.jpg', 'pic/max/4/3.jpg']
];


const modal = {
    counter: 0,
    modalPics: [],


    getImages(id) {
        return itemPics[id - 1];
    },

    render(itm_link) {
        return `
            <div class="modalWrapper">
                <div class="modalWrapper__screen"></div>
                <img class="modalWrapper__close" src="pic/control/close.png" alt="pic">
                <img class="modalWrapper__right" src="pic/control/arrow_right.png" alt="pic">
                <img class="modalWrapper__left" src="pic/control/arrow_left.png" alt="pic">  
                <img class="modalWrapper__image" src="${itm_link}" alt="pic">              
            </div>
        `
    },

    arrowEventHandler(event) {
        if (event.target.className === "modalWrapper__right") {
            this.counter++;
            if (this.counter > 3) this.counter = 0;
        }

        if (event.target.className === "modalWrapper__left") {
            this.counter--;
            if (this.counter < 0) this.counter = 3;
        }

        document.querySelector('.modalWrapper').remove();
        workspace.insertAdjacentHTML('beforeend',(this.modalPics[this.counter]));
        this.addEventListeners();
    },

    addEventListeners() {
        document.querySelector('.modalWrapper__close').addEventListener('click', () => this.closeEventHandler());
        document.querySelector('.modalWrapper__left').addEventListener('click', e => this.arrowEventHandler(e));
        document.querySelector('.modalWrapper__right').addEventListener('click', e => this.arrowEventHandler(e));
    },

    closeEventHandler() {
        return document.querySelector('.modalWrapper').remove();
    },


    init(id) {
        this.counter = 0;
        const images = this.getImages(id);

        this.modalPics = images.map((el) => {
            return this.render(el);
        });
        workspace.insertAdjacentHTML('beforeend',(this.modalPics[this.counter]));
        this.addEventListeners();
    }

}


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
                    <div class="pic"><img src="pic/min/${item.id}.jpg" alt="pic" id="${item.id}"></div>
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
        this.catalogueContainer.addEventListener('click', e => {
            let id = e.target.id;
            +id;
            if (e.target.tagName === 'IMG') {
                modal.init(id);
            }
        });
    }

};


const cart = {
    goods: [],
    totalPrice: 0,
    itemCount: 0,
    eraseButton: null,
    cartContainer: null,
    textContainer: null,


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
                    <div class="pic"><img src="pic/min/${item.id}.jpg" alt="pic" id="${item.id}"></div>
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
            this.textContainer.innerText = `В корзине ${this.itemCount} товаров на общую сумму: ${this.totalPrice}`;
        } else {
            this.textContainer.innerHTML = `Корзина пуста`;
        }
    },
    clear() {
        this.goods.splice(0);
        this.render();
    },
    init() {
        document.querySelector(".cart").insertAdjacentHTML('beforeend', '<div class="goods_container"></div>');
        this.cartContainer = document.querySelector('.goods_container');
        document.querySelector(".cart").insertAdjacentHTML('beforeend', '<div class="text_container"></div>');
        this.textContainer = document.querySelector('.text_container');
        this.eraseButton = document.querySelector('.btn-erase');
        this.eraseButton.addEventListener('click', this.clear.bind(this));
        this.render();
        this.cartContainer.addEventListener('click', e => {
            let id = e.target.id;
            parseInt(id);
            if (e.target.tagName === 'IMG') {
                modal.init(id);
            }
        });
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

