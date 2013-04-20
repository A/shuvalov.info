---
layout: post
title: "О мире, где браузерам не нужна кнопка refresh"
description: ""
keywords: "HTML, CSS, javascript, browser, livereload"
tags: [javascript, верстка]
---
{% include JB/setup %}

Я сделал шаблон на `grunt` который обновляет страницу браузера как только что-то меняется в исходниках.

Работает просто.

	git clone https://github.com/shuvalov-anton/livereload-template.git
	cd livereload-template
	npm install
	
Исходники должны лежать в папке `www`. Запускаем `grunt` с `livereload` сервером на борту

	grunt

Теперь подключаемся к серверу и видим свой `index.html` — [0.0.0.0:9001](http://0.0.0.0:9001). При изменении любого файла, сервер будет автоматически обновлять страницу в браузере.