---
layout: post
title: "JavaScript без jQuery"
description: "Использование jQuery порой является совершенно не нужным"
keywords: "jquery, javascript, упрощение"
tags: [javascript, jquery]
---



Последнее время стараюсь не использовать jQuery без серьезной необходимости. 
Я часто занимаюсь разработкой небольших интерактивных элементов для книг,
созданных в Adobe InDesign и iBooks Author.  Здесь вполне можно обойтись 
с помощью native javascript. 

Основные средства, которые я использую — это CSS и нативный JavaScript. 
[CSS3 Transition][]{: rel="nofollow"} и [CSS3 Animations][]
решают практически все задачи связанные с анимацией. [HTML5 Audio][] 
идеально подходит для звука.

32KB jQuery за бортом моей шлюпки. Я не напишу свой код более компактно с jQuery.
Я вполне обойдусь без [sizzle][]{: rel="nofollow"}. Вряд ли есть какой-то смысл
использовать jQuery, если код проекта в сумме занимает меньше места, чем код
jQuery. 

Я написал для себя 3 функции, которых мне достаточно для небольших проектов:

{:.language-js}
    function $( id ) {
      return document.getElementById( id )
    }

    function addClass(el, className) {
      el.setAttribute( "class",  el.getAttribute( "class" ) + " " + className )
    }

    function removeClass( el, className ) {
      var classes = el.getAttribute( "class" )
      classes = classes.replace( className, "" )
      classes = classes.replace(/^\s\s*/, '').replace(/\s\s*$/, '')
      el.setAttribute( "class", classes )
    }
 
Первая функция получает DOM-элемент по его ID. Для JS я использую ID, для CSS
я использую классы. Как минимум потому, что ID
[имеет вес, который в 255 раз больше, чем вес класса][id and classes], и 
его использование для стилей может нарушить тонкий баланс силы. Пример:

{:.language-js}
    var el = $('js-id');

Вторая функция добавляет элементу класс. 
{:.language-js}
    addClass( el, 'my-class' )

Третья функция удаляет класс у элемента. 

{:.language-js}
    removeClass( el, 'my-class' )

С помощью этих трех функций я вполне обхожусь без jQuery в большинстве виджетов,
которые мне приходилось программировать, что положительно сказывается
на предсказуемости и скорости работы. Так, что использование jQuery порой
является совершенно не нужным.


[CSS3 Transition]: http://www.w3.org/TR/css3-transitions/
[CSS3 Animations]: http://www.w3.org/TR/css3-animations/
[HTML5 Audio]: http://www.w3.org/TR/html-markup/audio.html
[sizzle]: http://sizzlejs.com/
[id and classes]: http://codepen.io/chriscoyier/pen/lzjqh