'use strict';

// 1. Дан код:

// var a = 1, b = 1, c, d;
// 1) c = ++a; alert(c);           // 2
// 2) d = b++; alert(d);           // 1
// 3) c = (2+ ++a); alert(c);      // 5
// 4) d = (2+ b++); alert(d);      // 4
// 5) alert(a);                    // 3
// 6) alert(b);                    // 3

// Почему код даёт именно такие результаты?

// 1) Сначала к а применяется инкремент, потом с присваивается увеличенное на 1 а, потом выводится с.
// 2) Противоположная предыдущей ситуация. Значение переменной b сначала присваивается переменной d, а
// потом к ней применяется инкремент.
// 3) и 4) аналогично, в 3 сначала а увеличивается на 1, складывается с 2 и присваивается с, в 4 к 2
// добавляется текущее значение b(равное 2), после чего b увеличивается на 1.
// 5) и 6) И к переменной а, и к переменной b за всё время дважды применялся оператор инкремента.
// Так как нигде не прописан возврат переменных к изначальным значениям после проведения
// с ними операций, их значения дважды увеличились на один и стали равны трём.


// 2.Чему будет равен x в примере ниже?

// var a = 2;
// var x = 1 + (a *= 2);

// Код примера равноценен следующему:

// var a = 2;
// a = a * 2;
// var x = 1 + a;

//Соответственно, х будет равен 5.


// 7. Сравнить null и 0. Попробуйте объяснить результат.

//null == 0
// false
//null === 0
// false
//null > 0
// false
//null >= 0
// true

//В js null - это обозначение отсутствия какого-либо значения, 0 же - вполне определённое нулевое.
//Поэтому при проверках на равенство между 0 и null выдаётся false. Однако при сравнении null
//конвертируется в число и считается как 0, поэтому строгое неравенство выдаёт false(так как, по такой
//логике, они должны быть равны), а нестрогое даёт истину, поскольку как раз допускает равенство
//аргументов.

