---

layout: post
title: "Стеки и очереди в JS"

---


Так получилось, что я только недавно узнал о стеках и очередях. Точнее, раньше 
я знал, что они существуют, думал, что это одно и то же.  Сначала я узнал о том,
что стек — это не очередь, затем я узнал о реализации стека в JavaScript
с помощью "push" и "pop". А потом я захотел таких же простых методов, 
но для реализации очереди.

И так...

## Стек в JavaScript

> Стек (англ. stack — стопка) — структура данных, представляющая из себя список
элементов организованных по принципу LIFO (англ. last in — first out, «последним
пришёл — первым вышел»).
Чаще всего принцип работы стека сравнивают со стопкой тарелок: чтобы взять вторую
сверху, нужно снять верхнюю.

<div style="text-align:right;font-style:italic;">Википедия</div>

### Реализация

{:.language-js}
    var stack = [];        // []
    stack.push( "first" ); // stack === ["first"]
    stack.push( 10, 20 );  // stack === ["first", 10, 20]
    var el = stack.pop();  // stack === ["first", 10] && el === 20
    stack.push( 2 );       // stack === ["first", 10, 2]
    el = stack.pop();      // stack === ["first", 10] && el === 2
    el = stack.pop();      // stack === ["first"] el = 10
    el = stack.pop();      // stack === [] && el === "first"
    el = stack.pop();      // stack === [] && typeof el === "undefined"



## Очередь в JavaScript

> О́чередь — структура данных с дисциплиной доступа к элементам «первый пришёл — 
  первый вышел» (FIFO, First In — First Out). Добавление элемента (принято
  обозначать словом enqueue — поставить в очередь) возможно лишь в конец
  очереди, выборка — только из начала очереди (что принято называть словом
  dequeue — убрать из очереди), при этом выбранный элемент из очереди удаляется.

<div style="text-align:right;font-style:italic;">Википедия</div>

### Реализация

{:.language-js}
    var queue = [];         // []
    queue.push( "first" );  // queue === ["first"]
    queue.push( 10, 20 );   // queue === ["first", 10, 20]
    var el = queue.shift(); // queue === [10, 20] && el === "first"
    queue.push( 2 );        // queue === [10, 20, 2]
    el = queue.shift();     // queue === [20, 2] && el === 10
    el = queue.shift();     // queue === [2] && el === 20
    el = queue.shift();     // queue === [] && el === 2
    el = queue.shift();     // queue === [] && typeof el === "undefined"

Так же очередь можно организовать с помощью `unshift` и `pop`, получиться точно
так же, только последний элемент окажется в начале, а первый в конце, что
немного не привычно.