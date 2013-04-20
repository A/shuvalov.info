---
layout: post
title: "Установка Grunt.js"
description: "Установка Grunt.js в Mac OS X"
keywords: "JavaScript, Gruntjs, MAC OS X, JS"
tags: [javascript, nodejs]
---
{% include JB/setup %}

![](http://31808.selcdn.ru/it-prm/pics/grunt-logo.png){: class="img-center"}<br>

1. Удалить предыдущую версию  
	<pre><code class="bash">sudo npm uninstall -g grunt </code></pre> 
2. Установить `grunt` вместе с command line interface (CLI).  
	<pre><code class="bash">sudo npm install -g grunt-cli</code></pre>
3. Добавить в переменную окружения `$PATH` путь к приложениям nodejs. Я добавил в файл `~/.profiles` строчку 
	<pre><code class="bash">export PATH="/usr/local/share/npm/bin/:$PATH"</code></pre>
4. ...
5. Profit