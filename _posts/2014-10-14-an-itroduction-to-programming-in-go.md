---
layout: post
title: "«An introducing to programming in Go», Caleb Doxsey"
description: "Прочитал. Попробовал. Понравилось."
keywords: ["Programming", "Golang", "Книги", "Книга", "заметки"]
feature: false
cover: /assets/articles-assets/features/cook.jpg
---

{:class="book-cover"}
![{{page.title}}]({{site.production_url}}/assets/articles-assets/go-book.png)

Недавно я отправился в славное путешествие в Пермь. Как раз перед самой поездкой
я наткнулся на бесплатную книгу о Go [«An introducing to programming in Go»][0]
от Caleb Doxsey.

Книга небольшая — я прочитал ее в дороге часа за 4-5. Большая часть совсем для начинающих:
системы счисления, редакторы, базовые типы. С другой стороны, в там есть
много интересного о типах, которых нет в моем любимом JS: `pointers`, `maps`, `slices`,
о структурах, интерфейсах, тестах, синтаксисе, пакетах, которые идут с языком.

Когда я открывал книгу, я хотел научиться писать на Go утилиты,
и инструменты, которые я сейчас пишу на NodeJS. В этом книга полностью
себя оправдала. Я закрыл последнюю страницу, и решил написать на Go CLI для поиска документации
в браузере прямо из терминала с возможностью хранить в `~/.search` список сайтов
для поиска. Я писал эту штуку последние пару дней [на NodeJS][1], и вот что
получилось [на Golang][2]. Правда, и там, и там код требует рефакторинга,
так что не судите слишком строго! :D

## The Pretty Wagon to Go

После NodeJS, Go выглядит чертовски круто ( ⚆ _ ⚆ ) Теперь я понял и могу согласиться
с тем, о чем писал TJ Holowaychuk в своем посте «[Farewell Node.JS][3]».

Строгая типизация, проверка типов, синтаксиса и забытых переменных во время
написания кода — это потрясающе! В JS я чувствую себя уверенно только с линтером,
[написав достаточно unit-тестов][4]. В Go я начинаю думать, что успешный билд —
это уже тест. Строгая типизация тоже выглядит потрясающе. Правда я еще не чувствую
себя уверенно с некоторыми типами, вроде `pointers`, `slices` или `maps`. Возможно,
структуры лучше подходят для тех вещий, где я пытаюсь использовать эти типы.

## Документация в Golang

Мне очень понравилась идея документации — просто пишешь комментарии над методами.
`godoc` сделает остальное сам:

{% highlight golang %}
// Finds the average of a series of numbers
func Average(xs []float64) float64 {}
{% endhighlight %}


{% highlight golang %}
godoc golang-book/chapter11/math Average
{% endhighlight %}

## Gorutines

Многопоточность в Go очень приятна. Есть `gorutine`s в которых запускаются
подпрограммы, есть `channel`s, которые обеспечивают транспорт между `gorutine`s.
По-моему, это выглядит гораздо проще, чем `EventEmmiter`'ы в NodeJS и` WebWorker`'ы.

{% highlight go %}
func pinger(c chan<- string)
func printer(c <-chan string)
{% endhighlight %}

## Еще раз о книге

Книга клёвая — и определенно стоит 4 часов чтения. У меня вот получилось что-то
написать на Go практически сразу, после того, как я закончил ее читать, так что
это отличный способ начать. Вообще в книге, очень много совсем элементарных вещей
в программировании, так что, наверное, ее могут читать даже те самые «юноши бледные
со взором горячим». Но если вы уже работаете с Go,
то, как мне кажется, ничего нового вы там не найдете. Книгу можно [скачать в PDF][0]
бесплатно, или [читать прямо на сайте][0], так что… А почему бы и нет? :D

![{{ page.description }}]({{ site.production_url }}/assets/articles-assets/go.jpg)

{:.photo-author}
_фото: [Martin Fisch](https://www.flickr.com/photos/marfis75/)_

_Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar)_.

[0]: http://www.golang-book.com/
[1]: https://github.com/shuvalov-anton/node-search-me
[2]: https://github.com/shuvalov-anton/go-search-me
[3]: https://medium.com/code-adventures/farewell-node-js-4ba9e7f3e52b
[4]: /2014/10/02/javascript-coverage/
