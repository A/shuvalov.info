---
layout: post
title: "Интерлиньяж в TextMate2"
description: "Инструкция о том, как увеличить интерлиньяж в популярном текстовом редакторе textmate 2"
category: 
tags: [textmate, wtf]
---
{% include JB/setup %}

<img src="http://31808.selcdn.ru/it-prm/pics/textmate2LH.jpg" class="img-center" /> 

Долгое время не мог понять что не так со шрифтами в TextMate2. Сейчас определился — мне не нравится line-height в редакторе. Изменить высоту строк достаточно просто. Для этого в терминал я ввел следующие комманды: 

<pre><code>defaults write com.macromates.TextMate.preview fontAscentDelta -float 0
defaults write com.macromates.TextMate.preview fontLeadingDelta -float 0</code></pre>
  
По-умолчанию параметры используются со значением `1`, так что вернуть все как было можно, набрав:

<pre><code>defaults write com.macromates.TextMate.preview fontAscentDelta -float 1
defaults write com.macromates.TextMate.preview fontLeadingDelta -float 1</code></pre>

[Источник][]

[Источник]: https://github.com/textmate/textmate/issues/373