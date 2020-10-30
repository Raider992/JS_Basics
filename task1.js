'use strict';

// 1. С помощью цикла while вывести все простые числа в промежутке от 0 до 100.

// Определение простых чисел брал из википедии, там последовательность начинается с 2, а не с одного

let i = 2;
let nums = [];


while (i <= 100){
    nums.push(i++);
}
console.log('nums: ', nums);

const prime = nums.filter(val => {
    let i = 2;
    while(i < val){
        if (val % i++ === 0) {
            return false
        }
    }
    return true;
});

console.log('prime: ' + prime);
console.log('--------------------------------------------------------------------------------------------------------');


//То же, но на чистом while

    // let count = 2;
    // let prime = [];
    //
    // while (count <= 100) {
    //         let result = 2;
    //         let i = 2;
    //         while (count % i !== 0 ){
    //             i += 1;
    //             result +=1;
    //             }
    //         if (result === count) {
    //             prime.push(result);
    //         }
    //     count += 1;
    // }
    //
    // console.log(prime);
    // console.log('------------------------------------------------------------------------------------------------------');