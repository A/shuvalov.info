---
layout: post
title: "First Comma"
description: "Текстовый тайловый менеджер для Linux и OS X"
keywords: ["shell", "osx"]
feature: false
draft: true
cover: /assets/articles-assets/features/null.jpg
---

## First Comma?

Не то, чтобы эта штука действительно полезна. Это скорее «ковбойская» тема.
Но я тут понял одну забавную вещь связанную с чейнингом, вместе с которой
first comma становится более осмысленной.

В чейнинге есть маленькая, но очень утомляющая штука — `;`. Как и в классической
ситуации с запятой за последним элементом массива, эта штука постоянно мешается!
Вот, скажем, нужно еще и сокеты запускать во время инициализации тегов:

{% highlight javascript %}
// …
initialize: function(options) {
  return this
    .parseOpts(options)
    .setElement($('.js-labels'))
    .tagsCollectionCreate()
    .tagsCollectionSavable()
    .renderSearch()
    .renderTags();
    .startSocket();
},
// …
{% endhighlight %}

Не будешь же из-за одной простой строчки лезть в браузер? Попишешь еще немного,
а потом или при сохранении линтер покажет ошибку, или в браузере сам увидишь.
А когда меняешь порядок вызовов в цепочке, `;` тоже не к месту все время приходится.

В процессе разработки такие штуки происходят сплошь и рядом. Обычно, когда
код уже с горем пополам работает, и его пора причесывать и всячески рефакторить.
Не то, чтобы это нельзя было бы пережить, но по 100 раз в день с таким сталкиваться
не очень-то круто.

И вот тут очень хорошо подходит идея о точке с запятой из first comma style:

{% highlight javascript %}
  return this
    .parseOpts(options)
    .setElement($('.js-labels'))
    .tagsCollectionCreate()
    .tagsCollectionSavable()
    .renderSearch()
    .renderTags()
    .startSocket()
  ;
{% endhighlight %}

Да не просто круто, а просто великолепно — у чейнинга есть небольшой недостаток —
он немного ломает «ёлочку» отступов:

{% highlight javascript %}
return Object.keys(items)
  .map(function(item) {
    return items[item];
  })
  .reduce(function(memo, item) {
    ~item.indexOf('ololo') && memo.push(item)
    return memo;
  }, []); // что ж с отступами-то?
{% endhighlight %}

Чем больше вложенность, тем меньше понятно, то ли кто-то разучился в «ёлочку»,
то ли так и надо. Разобраться, конечно, не так уж трудно — JS-разработчики
уже давно привыкли к callback hell, так что такие штуки — плёвое дело. Но осадок…

А как насчет такого:

{% highlight javascript %}
return Object.keys(items)
  .map(function(item) {
    return items[item];
  })
  .reduce(function(memo, item) {
    ~item.indexOf('ololo') && memo.push(item)
    return memo;
  }, [])
; // теперь понятно, что это после return точка с запятой…
{% endhighlight %}

Ну и на фоне этой идей first comma выгялядит вполне органично:

{% highlight javascript %}
var v1 = 'hello'
  , v2 = 'world'
  , v3 = 'bitch!'
;
{% endhighlight %}

Правда я обнаружил для себя небольшой недостаток.

Я не большой любитель отбивать
части кода пустыми строками. Ну знаете, с одной стороны, интерпретатору это
парсить, ну там, он лишний раз интерпретировать будет, устанет же. А с другой
стороны, отбил метод одним переводом, а конструктор сколькими переводами отобъешь?
А список зависимостей? А список переменных в методе тоже одним? А как же Лебедевское
«далеко-близко»? Очень много вопросов. Поэтому в JS я использую пустые строки
для отбивки только на самом низком уровне «ёлочки».
Так вот, если ставить точку с запятой на новой строке, то она дробит мои монолитные
методы, что немного непривычно выглядит:

{% highlight javascript %}
// …
initialize: function(options) {
  this
    .parseOpts(options)
    .setElement($('.js-labels'))
    .tagsCollectionCreate()
    .tagsCollectionSavable()
    .renderSearch()
    .renderTags()
  ;
  return app;
},
// …
{% endhighlight %}


### PS

Идея, которую я описал сейчас мне кажется очень разумной и, в принципе,
оправдывает небольшое отступление от классического стиля написания JS-кода.
Но есть и альтернативы. Скажем, можно вообще не писать `;`, зная исключения
из правил ASI.

Признаться, я не фанат first comma и меня вполне устраивает писать `var` для
отдельно каждой переменной. Просто я тут понял, как можно сделать чейнинг
немного удобнее, и эта штука сделала для меня более осмысленным first commas.

Но все эти штуки выглядят немного… Ммм… Джедайски. И нужно
отдавать себе в этом отчет. Скорее всего, даже не себе, а команде, с которой
вы работаете.
