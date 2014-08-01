---

layout: post
title: "Как yield изменит Node.js"
description: "Будущее за генераторами"
keywords: ["JavaScript", "JS", "ES6", "generators", "генераторы"]
translation:
  author: "Alex Maccaw"
  title: "How yield will transform Node.js"
  link: "http://blog.alexmaccaw.com/how-yield-will-transform-node"

---

!['Как yield изменит Node.js'](/assets/articles-assets/nodejs_logo_green.jpg)

С выходом версии v0.11.2 Node.js обзавелся поддержкой [v8-генераторов][1].
Генераторы не легки для понимания, но, в общем, это что-то вроде оберток над
функциями, которые могут выполняться множество раз, продолжая выполнение
в различных местах функции.

На практике это позволяет нам избавиться от лапши из коллбеков, опутавшей
node-приложения, и писать в синхронном стиле код, который, фактически,
будет выполняться асинхронно.

### Использование yield

Пример кода заменяет тысячу слов, так что давайте смотреть.
Нам понадобится Node v.0.11.2, которую легко установить с помощью [nvm][2]
(_прим. переводчика: мне больше нравится [n][3]_).


{% highlight bash %}
nvm install 0.11.2
{% endhighlight %}

Мы будем использовать основанный на промисах сервер под названием [mach][4],
и библиотеку для работы с промисами — [Q][5]. Вам нужно установить оба модуля
через npm, если вы это еще не сделали.

Затем, так как мы используем новейшие фичи из v8, нам нужно указать флаг
`--harmony` при запуске Node.

{% highlight bash %}
node --harmony ./generators.js
{% endhighlight %}

Давайте создадим функцию `sleep()`, которая принимает время ожидания
в миллисекундах и возвращает промис, который разрешится по истечению времени.


{% highlight javascript %}
function sleep(millis) {
  var deferredResult = Q.defer();
  setTimeout(function() {
    deferredResult.resolve();
  }, millis);
  return deferredResult.promise;
};
{% endhighlight %}

Типичный сервер на основе коллбеков будет использовать чейнинг промиса,
примерно так:


{% highlight javascript %}
var mach = require('../lib');
var app  = mach.stack();
var Q    = require('q');

app.run(function(request) {
  return sleep(2000).then(function(){
    return 'Good day to you sir';
  });
});

mach.serve(app, 3333);
{% endhighlight %}


А теперь сделаем то же самое, но с генераторами. Определим функцию-генератор
через нотацию со знаком `*`. Внутри такой функции мы можем использовать `yield`,
передав ему `sleep()`-промис.


{% highlight javascript %}
app.run(Q.async(function *(request) {
  yield sleep(2000);
  return 'Good day to you sir';
}));
{% endhighlight %}

Как только `yield` будет вызван, выполнение функции остановится и перейдет
обратно к `Q.async()`. Когда промис будет разрешен, Q обеспечит возврат
к выполнению генератора. В нашем случае, это произойдет как только сработает
таймаут. `Q.async()`, в свою очередь, так же возвращает промис в mach,
который обрабатывает запросы к node-серверу.

###  yield деле

Пример со `sleep()` может показаться бесполезным, так что давайте посмотрим
что-нибудь получше. Скажем, доступ к обработанному содержимому запроса. Mach
возвращает его в виде промиса с помощью метода `request.parseContent()`. Так
как это промис, мы можем передать его прямо в `yield`:


{% highlight javascript %}
app.run(Q.async(function *(request) {
  var body = yield request.parseContent();
  return JSON.stringify(body);
}));
{% endhighlight %}

С использованием `yield` ваши обработчики становятся проще. Еще один пример
с сохранением модели.


{% highlight javascript %}
app.post('/users', Q.async(function *(request) {
  var user = new User(request.params);

  if (yield user.save()) {
    return JSON.stringify(user);
  } else {
    return 422;
  }
}));
{% endhighlight %}


### Развитие yield

Мне приятно думать, что `yield` способен изменить написанные в традиционном
спагетти-стиле node-приложения, сделав их чище. Я просто не могу дождаться
поддержки браузеров, хотя, пожалуй, это произойдет еще не скоро.

Полный пример использования Mach и генераторов вы можете найти в моём [форке][6]

![Как yield изменит Node.js](/assets/articles-assets/footer/vader-1.jpg)

_Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar).
Всем добра!_

{:.photo-author}
_фото: [jdhancock](https://www.flickr.com/photos/jdhancock/)_


[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators
[2]: https://github.com/creationix/nvm
[3]: https://github.com/visionmedia/n
[4]: https://github.com/machjs/mach
[5]: https://github.com/kriskowal/q
[6]: https://github.com/maccman/mach/blob/master/prototypes/generators.js
