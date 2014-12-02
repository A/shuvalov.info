---

layout: sketch
title: "SourceMap'ы для ES6-генераторов"
description: "Harmony Generators героинового наркомана и Harmony Generators нормального человека"
keywords: [""]

---

<style>
#content img {
  box-shadow: none;
  background-color: transparent;
}
#content .photo-author {
  margin-top: -3rem;
}
</style>

Поработав с [`Co`][1] и [`Koa`][2] я как-то проникся ES6-генераторами. Во многих случаях, особенно с `Co` получается
гораздо более ясный код. К сожалению, знакомый и любимый каждым JS-разработчиком callback hell остается не у дел, но
я смог это принять и жить дальше.

И вот, в какой-то момент я понял, что было бы очень здорово, так сказать, распространить метастазы новой спецификации и на рабочий проект. Сказано — сделано.

Всё было здорово, за исключением source maps. Из-за повышенной любви к модульности, Dependency Invertion и прочим громким заявлениям, у нас достаточно мутная логика сборки browserify-пакетов. Но это достаточно долгая история, так что вам придется поверить мне на слово :D

Если кратко, различные компоненты приложения вынесены в отдельные `rails-engines`, и об их существовании хост-система ничего не подозревает. Дальше, в зависимости от списка установленных компонентов `ruby` генерируют манифест со списком путей к js-директориям этих компонентов. Дальше за дело твердой рукой берется  `gulp`. На основе манифеста прямо в рантайме обновляется `NODE_PATH`, и, через `bundle.add(engineName)` индексный js-файл компонента инжектится в бандл. Кроме того. подмена `NODE_PATH` позволяет подключать файлы из других компонентов, к примеру, так — `require('lib/topics')`.

![{{ page.description }}]({{ site.production_url }}/assets/articles-assets/harmony-generators/after_math.png)

{:.photo-author}
Генераторы героинового наркомана

## `es6ify`

Я достаточно быстро научил `gulp` разбираться с генераторами, но source maps никак не поддавались. Весь последний месяц, я раз в неделю брался за своё, но они — ни в какую. Хотя, через месяц дебага таких генераторов, я уже научился их декомпилировать у себя в голове просто глядя на эти прекрасные `while`, `case` и `context$2$0`.

Вчера я решил сделать модель сборки, откинув в сторону все лишние детали. Так я [нашел баг в `es6ify`][3] (позже оказалось, что в `traceur`), который ломал сорсмепы. Ребята из `es6ify` предложили пока откатится до `es6ify@1.4.0`. 

## Подмена `NODE_PATH`

Перед этим я использовал `gulp-browserify`. Но этот модуль давно в блеклисте, и я решил перейти на чистый `browserify`. Тут тоже был сюрприз — `browserify` перестал понимать мой `NODE_PATH`. Покопавшись в сорцах node (кстати, там всё очень аккуратно написано) и порывшись на GitHub, я нашел способ сбросить закешированный при инициализации `NODE_PATH`:

{% highlight js %}
require('module').Module._initPaths();
{% endhighlight %}

Интересно, зачем Joyent добавили `_` в название `_initPaths`… Да и документации на него почему-то нет… В общем, поосторожнее с этой штукой, если решитесь её использовать… 

![{{ page.description }}]({{ site.production_url }}/assets/articles-assets/harmony-generators/before_meth.png)

{:.photo-author}
Генераторы нормального человека

## Код

Вот код, который сейчас собирает js: 

{% highlight js %}
'use strict';

// Dependencies
var path        = require('path');
var gulp        = require('gulp');
var jadeify     = require('jadeify');
var paths       = require('./gulp-rails');
var browserify = require('browserify');
var es6ify     = require('es6ify');
var fs         = require('fs');


gulp.task('default', ['js', 'css', 'watch']);
gulp.task('js', ['js:vendor', 'js:app']);


// set NODE_PATH
process.env.NODE_PATH = paths.engines
  .map(function(engine) { return path.resolve(engine.path); })
  .filter(function(i) { return i; }).join(path.delimiter);
// reinit require's paths
require('module').Module._initPaths(); // FUCK THIS SHIT! ☜(⌒▽⌒)☞


// compile application.js
gulp.task('js:app', function() {
  var engines = paths.engines.map(function(engine) {
    return require.resolve(engine.indexFile);
  });
  var b = browserify({ debug: true })
    .add(es6ify.runtime)
    .transform(es6ify)
    .transform(jadeify)
    .external('jquery')
    .external('backbone')
    .external('underscore')
    .add('./app/assets/javascripts/application.js')
    .add(engines)
    .bundle()
    .on('error', function (err) { console.error(err.message); })
    // TODO: gulp way, please
    .pipe(fs.createWriteStream(path.resolve('./public/javascripts/application.js')))
  ;
});

// compile vendor js
gulp.task('js:vendor', function() {
  var b = browserify({ debug: true })
    .require('jquery')
    .require('backbone')
    .require('underscore')
    .bundle()
    .on('error', function (err) { console.error(err.message); })
    // TODO: gulp way, please
    .pipe(fs.createWriteStream(path.resolve('./public/javascripts/vendor.js')))
  ;
});
{% endhighlight %}

[1]: https://github.com/tj/co
[2]: https://github.com/koajs/koa
[3]: https://github.com/thlorenz/es6ify/issues/68#issuecomment-65082814
