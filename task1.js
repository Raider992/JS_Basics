'use strict';

// 1. Для практикума из занятия 7 продумать, где можно применить замыкания.

/*
* Как один из вариантов использования замыкания, можно было бы не создавать отдельный объект для конфига,
* а создать в объекте game метод конфиг, в котором с помощью замыкания верифицировать входные
* данные и раскидать их в объект settings, принадлежащий объекту game. Таким образом, присвоение
* настроек и их верификация исчезает из глобальной области видимости. Плюс, не будет необходимости
* каждый раз запрашивать конфиги поштучно отдельными геттерами, они будут храниться в самой игре, будут
* верифицированными и надёжными. Меняться чаще, чем раз в сессию, они не могут в любом случае, так что
* обновление настроек игры можно будет привязать помимо основного инита игры ещё и к кнопке "новая игра",
* то есть, методу reset.
*
* Пример кода:
*/

const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
    numberOfObstacles: 10,
    maxObstacleSize: 3,
    obstacleRefreshRate: 30
};

const game = {
    status: null,
    settings: {
        rowsCount: null,
        colsCount: null,
        speed: null,
        winFoodCount: null,
        numberOfObstacles: null,
        maxObstacleSize: null,
        obstacleRefreshRate: null
    },

    getSettings() {
        return settings;            // Возник вопрос. Если предположить, что у нас игра, в которую
    },                              // приходят настройки с бэкенда, что лучше: написать отдельный
                                    // метод-геттер для получения данных или прописать
    configure() {                   // запрос на сервер прямо внутри конфигуратора?
        const result = {
            isValid: true,
            errors: []
        }

        return () => {
            const inputSettings = this.getSettings();

            if (inputSettings.rowsCount < 10 || inputSettings.rowsCount > 30) {
                result.isValid = false;
                result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне от 10 до 30 включительно.');
            }

            if (inputSettings.colsCount < 10 || inputSettings.colsCount > 30) {
                result.isValid = false;
                result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне от 10 до 30 включительно.');
            }

            if (inputSettings.speed < 1 || inputSettings.speed > 10) {
                result.isValid = false;
                result.errors.push('Неверные настройки, значение speed должно быть в диапазоне от 1 до 10 включительно.');
            }

            if (inputSettings.winFoodCount < 1 || inputSettings.winFoodCount > 50) {
                result.isValid = false;
                result.errors.push('Неверные настройки, значение winFoodCount должно быть в диапазоне от 1 до 10 включительно.');
            }

            if (inputSettings.numberOfObstacles < 0 || inputSettings.numberOfObstacles > 10) {
                result.isValid = false;
                result.errors.push('Неверные настройки, значение numberOfObstacles должно быть в диапазоне от 0 до 10 включительно.');
            }

            if (inputSettings.obstacleRefreshRate <= 0) {
                result.isValid = false;
                result.errors.push('Неверные настройки, значение obstacleRefreshRate должно быть строго положительным числом.');
            }

            if (result.isValid) {
                this.settings.rowsCount = inputSettings.rowsCount;
                this.settings.colsCount = inputSettings.colsCount;
                this.settings.speed = inputSettings.speed;
                this.settings.winFoodCount = inputSettings.winFoodCount;
                this.settings.numberOfObstacles = inputSettings.numberOfObstacles;
                this.settings.obstacleRefreshRate = inputSettings.obstacleRefreshRate;
            } else {
                console.log(result.errors);
            }
        }
    },
    init(){
        this.configure();
    }
}

/*
* Второй вариант использования замыканий - можно было бы переписать код полностью через
* функции и приблизить его исполнение к ООП.
*
* Пример:
 */

// const status = {
//     condition: null,
//
//     setPlaying() {
//         this.condition = 'playing';
//     },
//
//     setStopped() {
//         this.condition = 'stopped';
//     },
//
//     setFinished() {
//         this.condition = 'finished';
//     },
//
//     isPlaying() {
//         return this.condition === 'playing';
//     },
//
//     isStopped() {
//         return this.condition === 'stopped';
//     },
// };

function Status() {

    this.condition = null;

    this.setPlaying = function () {this.condition = 'playing'};
    this.setStopped = function () {this.condition = 'stopped'};
    this.setFinished = function () {this.condition = 'finished'};
    this.isPlaying = function () {return this.condition === 'playing'};
    this.isStopped = function () {return this.condition === 'stopped'};
}


game.status = new Status();
game.status.setPlaying();
game.status.isPlaying;
game.status.setFinished();
game.status.setStopped();
game.status.isStopped();


/*
* Ещё один вопрос про замыкания вдогонку: всегда ли целесообразно использовать замыкания везде, где я увижу возможность
* это сделать? Для пущей изолированности кода, например. Или в какой-то момент это может помешать?
*/



// 2. Не выполняя кода, ответить, что выведет браузер и почему:
if (!("a" in window)) {
    var a = 1;
}
alert(a);

/*
* На вывод придёт undefined, и виновато будет всплытие(hoisting).
* Движок сначала выполнит создание переменной а, потом проверит, есть ли она(а
* она уже будет со значением undefined, ничего не сделает и выведет undefined
*/



var b = function a(x) {
    x && a(--x);
};
alert(a);

/*
* Выдаст ошибку, потому что обращение по внутреннему объявлению функции видно только изнутри.
*/

function a(x) {
    return x * 2;
}
var a;
alert(a);

/*
* Без проверки не додумался =) Вышел код функции, предполагаю, что при отсутствии у
* объявленной переменной значения, в неё присвоилась функция. Если же оба объявления
* были бы с объявлениями значений(например, шло бы а = 2;), то было бы то, что объявлено
* позже, то есть, находится ниже в коде.
 */

function b(x, y, a) {
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);

/*
* Выйдет 10, потому что сначала мы передаём в функцию три значения,
* а уже в самой функции меняем третье(счёт с 0) значение аргумента на 10 и выводим его.
 */

function a() {
    alert(this);
}
a.call(null);

/*
* В нестрогом режиме объект окна, а строгом null
 */
