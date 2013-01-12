---
layout: post
title: "JavaScript и jQuery"
description: "Повествование о том, что использование jQuery порой является совершенно не нужным"
tags: [javascript, jquery]
---
{% include JB/setup %}


Последнее время стараюсь не использовать jQuery без серьезной необходимости. Я часто занимаюсь разработкой небольших интерактивных элементов для книг, созданных в Adobe InDesign и iBooks Author.  Здесь вполне можно обойтись с помощью natiive JS. 

Основные средства, которые я использую — это CSS и нативный JavaScript. [CSS3 Transition][] и [CSS3 Animations][] решают практически все задачи связанные с анимацией. [HTML5 Audio][] идеально подходит для звука.

32KB jQuery за бортом моей шлюпки. Я не напишу свой код более компактно с jQuery. Я вполне обойдусь без [sizzle][]. Вряд ли есть какой-то смысл использовать jQuery, если код проекта в сумме занимает меньше места, чем код jQuery. 

Я написал для себя 3 функции, которых мне достаточно для небольших проектов:
<pre><code class="javascript">function $( id ) {
	return document.getElementById( id )
}</code></pre>

<pre><code class="javascript">function addClass(el, className) {
	el.setAttribute( "class",  el.getAttribute( "class" ) + " " + className )
}</code></pre>

<pre><code class="javascript">function removeClass( el, className ) {
	var classes = el.getAttribute( "class" )
	classes = classes.replace( className, "" )
	classes = classes.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
	el.setAttribute( "class", classes )
}</code></pre>
 
Первая функция получает DOM-элемент по его ID. Для JS я использую ID, для CSS я использую классы. Как минимум потому, что ID [имеет вес, который в 255 раз больше, чем вес класса][id and classes], и его использование для стилей может нарушить тонкий баланс силы. Пример:
<pre><code class="javascript">var el = $('js-id');</code></pre>


Вторая функция добавляет элементу класс. 
<pre><code class="javascript">addClass( el, 'my-class' )</code></pre>

Третья функция удаляет класс у элемента. 
<pre><code class="javascript">removeClass( el, 'my-class' )</code></pre>

С помощью этих трех функций я вполне обхожусь без jQuery в большинстве виджетов, которые мне приходилось программировать, что положительно сказывается на предсказуемости и скорости работы.


[CSS3 Transition]: http://www.w3.org/TR/css3-transitions/
[CSS3 Animations]: http://www.w3.org/TR/css3-animations/
[HTML5 Audio]: http://www.w3.org/TR/html-markup/audio.html
[sizzle]: http://sizzlejs.com/
[id and classes]: http://codepen.io/chriscoyier/pen/lzjqh