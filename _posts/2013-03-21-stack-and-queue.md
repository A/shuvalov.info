---

layout: post
title: "Стеки и очереди в JavaScript"
description: "Несколько примеров реализации стека и очереди в js"
keywords: ["очередь в javascript", "стек в javascript", "javascript", "стек", "очередь"]

---


Так получилось, что я только недавно узнал о _стеках_ и _очередях_. Точнее, раньше 
я знал, что они существуют, и думал, что это одно и то же. Сначала я узнал о том,
что _стек_ — _не очередь_, затем я узнал о реализации стека
с помощью "push" и "pop". А потом я захотел таких же простых методов, 
но для реализации _очереди на JavaScript_.

Итак...

## Стек в JavaScript

> _Стек_ (англ. stack — стопка) — структура данных, представляющая из себя список
элементов организованных по принципу LIFO (англ. last in — first out, «последним
пришёл — первым вышел»).
Чаще всего принцип работы стека сравнивают со стопкой тарелок: чтобы взять вторую
сверху, нужно снять верхнюю.

<div style="text-align:right;font-style:italic;">Википедия</div>

### Реализация стека в JavaScript

{% highlight javascript %}
var stack = [];        // []
stack.push( "first" ); // stack === ["first"]
stack.push( 10, 20 );  // stack === ["first", 10, 20]
var el = stack.pop();  // stack === ["first", 10] && el === 20
stack.push( 2 );       // stack === ["first", 10, 2]
el = stack.pop();      // stack === ["first", 10] && el === 2
el = stack.pop();      // stack === ["first"] el = 10
el = stack.pop();      // stack === [] && el === "first"
el = stack.pop();      // stack === [] && typeof el === "undefined"
{% endhighlight %}


# Очередь в JavaScript

> _Очередь_ — структура данных с дисциплиной доступа к элементам «первый пришёл — 
  первый вышел» (FIFO, First In — First Out). Добавление элемента (принято
  обозначать словом enqueue — поставить в очередь) возможно лишь в конец
  очереди, выборка — только из начала очереди (что принято называть словом
  dequeue — убрать из очереди), при этом выбранный элемент из очереди удаляется.

<div style="text-align:right;font-style:italic;">Википедия</div>

### Реализация очереди в JavaScript

{% highlight javascript %}
var queue = [];         // []
queue.push( "first" );  // queue === ["first"]
queue.push( 10, 20 );   // queue === ["first", 10, 20]
var el = queue.shift(); // queue === [10, 20] && el === "first"
queue.push( 2 );        // queue === [10, 20, 2]
el = queue.shift();     // queue === [20, 2] && el === 10
el = queue.shift();     // queue === [2] && el === 20
el = queue.shift();     // queue === [] && el === 2
el = queue.shift();     // queue === [] && typeof el === "undefined"
{% endhighlight %}

Так же **очередь в javascript** можно организовать с помощью `unshift` и `pop`,
получиться точно так же, только последний элемент окажется в начале, а первый
в конце, что немного не привычно.