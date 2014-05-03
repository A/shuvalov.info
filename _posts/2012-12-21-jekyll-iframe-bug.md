---
layout: post
title: "Jekyll REXML could not parse this XML/HTML"
description: "Что делать с ошибкой REXML could not parse this XML/HTML в Jekyll?"
keywords: ["jekyll", "REXML", "ошибка"]
---


![](http://31808.selcdn.ru/it-prm/pics/jekyll.png)
<br><br>


В Jekyll я столкнулся с проблемой. Вставил в текст поста iframe: 
<pre><code>&lt;iframe width="620px" height="400px" src="http://player.vimeo.com/video/55084406" frameborder="0" mozallowfullscreen allowFullScreen&gt;&lt;/iframe&gt;</code></pre>

И получил вот такую такую ошибку: 
 
<pre class="markdown-html-error" style="border: solid 3px red; background-color: pink">REXML could not parse this XML/HTML: 
&lt;iframe width="620px" height="400px" src="http://player.vimeo.com/video/123" frameborder="0" allowFullScreen&gt;&lt;/iframe&gt;</pre>
 
Что бы избавиться от этой ошибки придется отказаться от использования `mozallowfullscreen`, `allowFullScreen`. В результате код должен выглядеть так: 

<pre><code>&lt;iframe width="620px" height="400px" src="http://player.vimeo.com/video/55084406" frameborder="0"&gt;&lt;/iframe&gt;</code></pre>
 
## Плагин для vimeo в jekyll

Для того, что бы упростить себе жизнь я использую [плагин для видео из vimeo][]{: rel="nofollow"} — этот плагин учитывает проблему с парсингом HTML и содержит стили для того, что бы видео корректно меняло свой размер для мобильных устройств. Работает плагин просто — достаточно вставить в тело записи `{ % vimeo 55084406 % }` подставив нужный id.

[плагин для видео из vimeo]: https://gist.github.com/4414183