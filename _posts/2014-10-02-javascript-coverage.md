---
layout: post
title: "Анализ покрытия JavaScript-кода тестами"
description: "Вместе с нашими друзьями: Mocha, JSCoverage, Coveralls и Travis"
keywords: ["JavaScript", "tесты", "tdd", "bdd", "travis", "mocha", "jscoverage", "coverage", "coveralls"]
feature: false
cover: /assets/articles-assets/features/null.jpg
---

[![Build Status](https://travis-ci.org/shuvalov-anton/microlog.svg)](https://travis-ci.org/shuvalov-anton/microlog)
[![Code Climate](https://codeclimate.com/github/shuvalov-anton/microlog/badges/gpa.svg)](https://codeclimate.com/github/shuvalov-anton/microlog)
[![Coverage Status](https://coveralls.io/repos/shuvalov-anton/microlog/badge.png?branch=master)](https://coveralls.io/r/shuvalov-anton/microlog?branch=master)

Я попробую совсем коротко рассказать о том, как измерять покрытие NodeJS-проектов на GitHub с бейджами и тревисом.
В принципе, это применимо и к модулям для браузера, ведь ничего не мешает тестировать их под NodeJS с JSDom.

И сразу дисклеймер — утилит для инструментирования и тестирования, ровно как и облачных сервисов
очень много. Я использую [mocha][1] для тестов, [jscoverage][10] для инструментирования и [Coveralls][3]
прикрученный к [Travis][4] как CI-сервис для анализа покрытия. Просто потому что я так привык.


## Зачем знать процент покрытия тестами?

Нельзя улучшить то, что не нельзя измерить. Это утверждение подходит и для тестов.
Хотя, писать тесты уже само по себе хорошо, но это только первый шаг. Следующая ступень — измерять
процент покрытия кода.

Как и любая объективная метрика — процент покрития влияет на качество.
Просто потому что это наглядно, понятно, ну и из-за классных зёленых бейджей — они-то
уж точно всё делают лучше!

Без анализа покрытия, надежность тестов очень размыта. Хотя, не стоит
считать это серебрянной пулей — программы для анализа тоже могут ошибаться.

## Инструментирование и анализ кода

[![javascript coverage]({{ site.production_url }}/assets/articles-assets/coverage/coverage.png)]({{ site.production_url }}/assets/articles-assets/coverage/coverage.html)

### Если файл  один…

Инструментируем модуль:

{% highlight shell %}
cd my-project
jscoverage index.js index-cov.js
{% endhighlight %}

Затем при тестировании покрытия нужно подключить специально подготовленную `cov`-версию эту версию вместо настоящей библиотеки.
Для этого логичнее всего использовать переменную окружения. Советуют называть эту переменную `MYPROJECT_COV`.
Некоторые библиотеки используют просто `COV`, но у меня возникли конфликты где-то в `jscoverage`, так что
лучше добавлять префиксом название проекта.

{% highlight js %}
/* test/index.js */
var myProject = process.env.MYPROJECT_COV
  ? require('../index-cov')
  : require('../index');
{% endhighlight %}

Теперь остается  запустить тесты и сгенерировать отчет о покрытии. Делается это так:

{% highlight js %}
MYPROJECT_COV=1 ./node_modules/.bin/mocha -R html-cov > coverage.html
{% endhighlight %}

Файлы `coverage.html` и `index-cov.js` стоит добавить в `.gitignore`, чтобы не закоммитить  случайно.

### Если файлов много…

Если в проекте много JS-файлов, которые скрываются за index.js, то обычно все эти штуки убираются в `lib/`,
который инструментируется в `lib-cov/`:

{% highlight shell %}
cd my-project
jscoverage lib lib-cov
{% endhighlight %}

В `index.js` остается только код, который, в зависимости от переменной окружения подключает `lib/` или `lib-cov/`:

{% highlight js %}
/* index.js */
module.exports = process.env.MYPROJECT_COV
  ? require('../lib-cov')
  : require('../lib');
{% endhighlight %}

Ну и в `tests/` проверять переменную окружения уже не нужно — так что там не остается ничего необычного.
Не забудте добавить `lib-cov/` в `.gitignore`.


## Coveralls

Окей, Google. Теперь мы знаем насколько наш модуль покрыт тестами — можно смотреть в `coverage.html`, улучшать
покрытие тестами, и всячески делать этот мир лучше.

Но вот беда — `coverage.html` есть только локально, да и при каждой генерации
отчета о покрытии он перезаписывается, не оставляя никакой истории, и, соответственно,
возможности наблюдать прогресс. Если вы разрабатываете небольшой модуль — наверное, в этом нет ничего страшного.
Но если вы пишете что-то посложнее, то, скорее всего, вам хотелось бы знать, какое покрытие кода
в разных бранчах, пулл-реквестах, иметь возможность заглянуть в историю. А как насчет
клёвого бейджа —
[![Coverage Status](https://coveralls.io/repos/shuvalov-anton/microlog/badge.png?branch=master)](https://coveralls.io/r/shuvalov-anton/microlog?branch=master)
в `readme.md`?

Насколько я знаю, таких сервисов не мало. К примеру, [code climate][2] может следить за покрытием кода. Я же пока остановился
(хотя, конечно, я только начал :D) на [Coveralls][3]. Coveralls интегрируется с [Travis CI][4]. В `.travis` нужно будет добавить несколько
скриптов, которые после завершения обычного тестирования будут запустят тесты на покрытие и отправят результаты на сервер
Coveralls.

{% highlight yml %}
after_success:
  - ./node_modules/.bin/jscoverage lib lib-cov
  - MYPROJECT_COV=1 ./node_modules/.bin/mocha test -R mocha-lcov-reporter | ./node_modules/coveralls/bin/coveralls.js
{% endhighlight %}

## package.json

Для работы Coveralls понадобится парочка модулей:

- [`mocha-lcov-reporter`][5], который адаптирует данные о покрытии кода в `lcov`-формат, с которым работает Coveralls,
- [`coveralls`][6] — CLI-реализация API coveralls.

Кстати, ничего не мешает вынести вынести генерацию `coverage.html` в `package.json` — не писать же руками каждый раз:

{% highlight js %}
// package.json
"scripts": {
  "test": "mocha",
  "test-cov": "jscoverage lib lib-cov; MS_COV=1 ./node_modules/.bin/mocha -R html-cov > coverage.html",
  // ...
}
{% endhighlight %}

Теперь можно просто писать `npm run test-cov` и не вспоминать нужные команды каждый раз. Осталось
только бейдж из coverals в `readme.md` добавить.

## Примеры

В примерах можно посмотреть `.travis.yml`, `package.json` и покликать на бейджи:

- [ms-to][7] — небольшая утилита для работы с миллисекундами в JS.
- [page.js][8] — роутер в духе ExpressJS только для браузера.
- [microlog][9] — небольшой и удобный логгер для NodeJS приложений.

![{{ page.description }}]({{ site.production_url }}/assets/articles-assets/footer/trooper-11.jpg)


{:.photo-author}
_фото: [Cyril Bosselut](https://www.flickr.com/photos/bossone/)_

_Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar).
Всем добра и штурмовиков_.

[1]: https://www.npmjs.org/package/mocha
[2]: https://codeclimate.com/
[3]: https://coveralls.io/
[4]: https://travis-ci.org
[5]: https://www.npmjs.org/package/mocha-lcov-reporter
[6]: https://www.npmjs.org/package/coveralls
[7]: https://github.com/shuvalov-anton/to-ms
[8]: https://github.com/visionmedia/page.js
[9]: https://github.com/shuvalov-anton/microlog
[10]: https://www.npmjs.org/package/jscoverage
