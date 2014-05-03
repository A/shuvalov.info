---

layout: post
title: "Плагины для Sublime Text 3"
description: "Мой скромный workflow"
keywords: ["Sublime Text", "Plugins", "Саблайм", "Настройка Sublime Text"]

---

!["Sublime Text 3"](/assets/articles-assets/sublime.jpg)

Еще несколько лет назад я был фанатом TextMate. Следуя заветам [Томаса и Ханта][15],
в этом редакторе я делал практически все, включая даже [чтение манов][14]. В то время
**Sublime Text** лишь набирал популярность, и, в какой-то момент, я решил его
попробовать. В те времена с TextMate 2 творились странные вещи — эта версия,
в течение нескольких лет все еще была в альфе, и, похоже, не собиралась оттуда
выходить. Позднее, правда, TextMate стал опенсорсным, и разработка какое-то
время шла более активно, но я уже был далеко.

С тех пор мои интересы немного изменились, и экспериментам с воркфлоу я начал
предпочитать написание кода. Воркфлоу, соответствующим образом скатился
в сторону здорового функционализма. В последнее время активных изменений там
практически не происходит — в основном, обновления касаются сниппетов и
подсветки языков. Остальное, видимо, мне в самый раз приходится.

И так…

## Запуск Sublime Text из консоли

В Mac OS открыть любой файл или директорию из консоли в sublime можно так:

{% highlight bash %}
open -a "Sublime Text" .
sudo open -a "Sublime Text" /etc/hosts
{% endhighlight %}

Для большего комфорта лучше использовать консольную утилиту, которая идет вкупе
с _Sublime Text_. Устанавливается она так:

{% highlight bash %}
ln -s "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl" /usr/local/bin/sublime
{% endhighlight %}

Кроме того, я сразу добавляю пару строк в `.zshrc`:
{% highlight bash %}
alias s='sublime' # теперь можно набирать `s .` вместо `sublime .`
export EDITOR='subl -w' # а так git commit будет открывать sublime вместо vi
{% endhighlight %}

## Тема

Практически во всех редакторах, с которыми я работаю, я использую тему 
[Birds of Paradise][3]. _Sublime_ не стал исключением, благо он умеет
импортировать темы из TextMate.


## Линтинг

Для линтинга JavaScript я использую [jshint][16]. Для того, чтобы заставить
его работать в _sublime text 3_, я использую комбинацию из двух плагинов:

1. [SublimeLinter][1] — движок для большого количества различных линтеров;
2. [SublimeLinter-jshint][2] — собственно, сам линтер.

Мой `.jshintrc` выглядит так _(в основном я пишу под nodejs)_:

{% highlight javascript %}
{
  "browser": false,
  "curly": true,
  "expr": true,
  "indent": false,
  "jquery": false,
  "laxcomma": true,
  "laxbreak": true,
  "maxcomplexity": 10,
  "maxdepth": 3,
  "maxparams": 4,
  "node": true,
  "trailing": true,
  "quotmark": "single",
  "strict": true,
  "undef": true
}
{% endhighlight %}

Описание опций можно узнать [здесь][17].

Кроме jshint-линтера можно присмотреться и к паре других: [jscs][19] и [csslint][20].

## CSScomb

[CSScomb][5] — утилита для сортировки CSS-правил в селекторах не по алфавиту,
но по здравому смыслу, объединяя правила в логические группы. Последние полгода
я пишу на stylus, поэтому черной завистью завидую тем, кто может пользоваться
CSScomb и [жду, жду, жду, жду…][18] 

## Git

Для интеграции с git мне хватает [GitGutter][8] — этот плагин отмечает еще
незакомиченные изменения в файле соответствующими значками на полях.

Для всего остального я использую консоль и пайпы. К примеру, посмотреть `diff`
всего коммита можно, набрав в терминале `git diff | s`, так что мне вполне
хватает такой минималистичной интеграции.

## Emmet

[Emmet][7] — набор удобных сниппетов для html и css. Так, к примеру, лаконичное
`html:5>ul>li.item-$*5>span.title+span.author` легким нажатием на `tab` превращается в…

{% highlight html %}
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <ul>
    <li class="item-1"><span class="title"></span><span class="author"></span></li>
    <li class="item-2"><span class="title"></span><span class="author"></span></li>
    <li class="item-3"><span class="title"></span><span class="author"></span></li>
    <li class="item-4"><span class="title"></span><span class="author"></span></li>
    <li class="item-5"><span class="title"></span><span class="author"></span></li>
  </ul>
</body>
</html>
{% endhighlight %}

## TodoReview

Я часто пишу todo-комментарии в коде, вроде такого: `/* TODO: переписать на промисы */`.
[TodoReview][14] умеет находить все подобные коментарии в проекте и выводить их
в виде списка, чтобы можно было избавляться от технического долга систематически,
а не просто в очередной раз случайно наткнувшисть на оставленное замечание.

## SideBarEnhancements

[SideBarEnhancements][13] учит не особенно-то и сговорчивый сайдбар sublime text'а
адекватному взаимодействию с файлами: копированию, вставке, удалению, и тд.

## Разное

- [WordCount][12] — счетчик слов и символов в документе. Меленькая полезная
  штука для оценки размера переводов и статей.
- [autoFilename][4] — удобный автокомплит путей к файлам.
- [sublime-node-require][10] — удобная утилита для написания
  `require()`-конструкций в NodeJS. Предлагает список из всех установленных
  в проекте модулей, автоматически подставляя правильные пути к ним.
- Ну и куча всяких библиотек сниппетов и подсветок: _stylus, mocha, jade, html5, less, 
  handlebars, ect…_ Ссылки давать не буду, потому что они элементарно находятся
  поиском.

_На этом, кажется, все. Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar).
Всем добра и штурмовиков_.

![](/assets/articles-assets/footer/trooper-2.jpg)

{:style="text-align:right"}
_фото: [jdhancock](https://www.flickr.com/photos/jdhancock/)_

[1]: http://www.sublimelinter.com/en/latest/
[2]: https://github.com/SublimeLinter/SublimeLinter-jshint
[3]: http://joebergantine.com/projects/color-schemes/birds-of-paradise/
[4]: https://github.com/BoundInCode/AutoFileName
[5]: http://csscomb.com/
[6]: https://github.com/kemayo/sublime-text-git
[7]: http://emmet.io/
[8]: http://www.jisaacks.com/gitgutter
[9]: https://github.com/SublimeText/WordCount
[10]: https://github.com/jfromaniello/sublime-node-require
[11]: https://github.com/SublimeText/SideBarGit
[12]: https://github.com/SublimeText/WordCount
[13]: https://github.com/titoBouzout/SideBarEnhancements
[14]: /2012/06/23/Reading-mans-in-TextMate2/
[15]: http://www.ozon.ru/context/detail/id/24895168/
[16]: http://www.jshint.com/
[17]: http://www.jshint.com/docs/options/
[18]: https://github.com/csscomb/csscomb.js/issues/159
[19]: https://github.com/SublimeLinter/SublimeLinter-jscs
[20]: https://github.com/SublimeLinter/SublimeLinter-csslint