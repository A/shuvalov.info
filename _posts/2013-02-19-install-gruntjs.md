---
layout: post
title: "Установка Grunt.js"
description: "Установка Grunt.js в Mac OS X"
keywords: "JavaScript, Gruntjs, MAC OS X, JS"
tags: [javascript, nodejs]
---

1. Удалить предыдущую версию  

{:.highlight-bash}
    sudo npm uninstall -g grunt 


2. Установить `grunt` вместе с command line interface (CLI).

{:.highlight-bash}
    sudo npm install -g grunt-cli


3. Добавить в переменную окружения `$PATH` путь к приложениям nodejs. Я добавил
в файл `~/.profiles` строчку:

{:.highlight-bash}
    export PATH="/usr/local/share/npm/bin/:$PATH"


4. ...


5. Profit