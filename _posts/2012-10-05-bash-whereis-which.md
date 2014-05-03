---
layout: post
title: "BASH. Чем отличается which от whereis"
description: "Отличие похожих приложений bash — which и whereis"
keywords: ["bash", "which", "whereis", "terminal"]
---


<img class="img-center" src="http://31808.selcdn.ru/it-prm/pics/bash.png" alt="Чем отличается which от whereis">

В bash есть две утилиты для определения пути к программе, и я решил выяснить подробности использования обеих утилит. Как оказалось — не зря.

## Which

<p>Команда <code>which</code> ищет приложение в пользовательской директории. Например: <br />
<pre><code>which git
/usr/local/bin/git</code></pre>
</p>


#### Ключи 

*	`-a` — возвращает список путей ко всем найденным программам.
*	`-s` — возвращает `0` если хотя бы одна программа есть, и `1` если ничего нет.

## Whereis

Команда whereis ищет программы среди стандартных директорий и флагов не имеет. Пример:  
<pre><code>whereis git
/usr/bin/git</code></pre>
