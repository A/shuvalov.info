---
layout: post
title: "Загрузка JavaScript-приложения (Yandex)"
description: "Конспект доклада Михаила Давыдова об оптимизации загрузки JavaScript"
keywords: "javascript, оптимизация, загрузка, AMD, LMD"
tags: [javascript]
---
{% include JB/setup %}


<img src="http://31808.selcdn.ru/it-prm/pics/dump.png" class="img-center">
[ссылка на презентацию](http://www.slideshare.net/azproduction/dumpit-javascript){: rel="nofollow" }

*Проблема*: Слишком большое время загрузки страницы в условиях плохого ( мобильного ) интернета.

JS становится все более популярным языком программирования. Средний размер сценариев на сайте растет. 
Так же это имеет негативные стороны, так для отправки одного твита необходимо [загрузить 1.653Мб кода](http://mike.teczno.com/notes/bandwidth.html){: rel="nofollow" }. В медленном мобильном вебе проблема выражена особенно ярко - загрузка JS может достигать нескольких минут. 

Даже если мы будем загружать все js-файлы ассинхнонно `<script src="main.js async">` - интерпретация JS будет происходить последовательно, блокируя работу до загрузки всех файлов. Это не даст нам никакой выгоды при рендеринге страницы

*Существующие решения*:

Автор отталкивается от того, что объем используемого кода на каждой странице сайта составляет ~40% от всего кода, следовательно решение лежит в использовании ленивости при загрузке JS (грузится только то, что используется)

*	[YUI Compressor](http://developer.yahoo.com/yui/compressor/){: rel="nofollow" } - написаный на java js-minifier. Заменяет переменные их сокращенными (обычно до 1 символа) вериантами. Требует JAVA на серверe. 
*	[CACHE MANIFEST](http://www.html5rocks.com/ru/tutorials/appcache/beginner/){: rel="nofollow" } - это специальным образом сформированый текстовый файл, содержащий ссылки на файлы, которые браузеру нужно кэшировать. `<html manifest="example.appcache">`. Должен передаваться с MIME-типом "text/cache-manifest". Объем кэшированных данных для сайтов не может превышать 5 МБ. Позволяет работать с сайтом в offline( на основе кэшированной версии )

	
	
*	[AMD](http://requirejs.org/){: rel="nofollow" } - асинхронная декларация модулей. Подгружает модули в зависимости от зависимостей, которые явно указываются в коде: `define(['dep1', 'dep2']`
*	[LMD](https://github.com/azproduction/lmd){: rel="nofollow" } - ленивая декларация модулей похожа на AMD, но отличается тем, что не требует явного объявления зависимостей. Все зависимости определяются при запуске кода. 

*Вывод*:

1. **appCache**  ( см. [Использование appCache (mdn)](https://developer.mozilla.org/en/Using_Application_Cache){: rel="nofollow" }, [confess](https://github.com/jamesgpearce/confess){: rel="nofollow" })
2. [**yuicompressor**](http://developer.yahoo.com/yui/compressor/){: rel="nofollow" }
3. [**lmd**](https://github.com/azproduction){: rel="nofollow" }/[**amd**](http://requirejs.org/){: rel="nofollow" }