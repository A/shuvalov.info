---
layout: post
title: "Jekyll REXML could not parse this XML/HTML"
description: ""
category: 
tags: []
---
{% include JB/setup %}

В Jekyll я столкнулся с проблемой. Вставил в текст поста iframe: 

`<iframe width="620px" height="400px" src="http://player.vimeo.com/video/55084406" frameborder="0" mozallowfullscreen allowFullScreen></iframe>` 

И получил вот такую такую ошибку: 
 
<pre class="markdown-html-error" style="border: solid 3px red; background-color: pink">REXML could not parse this XML/HTML: 
&lt;iframe width="620px" height="400px" src="http://player.vimeo.com/video/123" frameborder="0" allowFullScreen&gt;&lt;/iframe&gt;</pre>
 
Что бы избавиться от этой ошибки придется отказаться от использования `mozallowfullscreen`, `allowFullScreen`. В результате код должен выглядеть так: 

`<iframe width="620px" height="400px" src="http://player.vimeo.com/video/55084406" frameborder="0"></iframe>`
 
## PS 
Честно говоря, у меня весьма скверное представление о Jakyll и Ruby. Я уверен, что есть более адекватное решение. Но у меня получилось и так. Да и для того, что бы работать с видео было проще — я использую [плагин][форк] и вместо html-кода я вставляю `{ % vimeo 123 % }`, а исправления, о которых я написал выше, я внес в код плагина.

[плагин]: https://github.com/gummesson/jekyll-vimeo-plugin
[форк]: https://github.com/shuvalov-anton/jekyll-vimeo-plugin/blob/master/vimeo.rb