---
layout: post
title: "Из Pocket в Instapaper"
description: "Немного о том, как я до этого докатился"
keywords: ["Дизайн", "Design", "Книги", "Книга", "заметки"]
feature: false
cover: /assets/articles-assets/features/cook.jpg
---

Недавно в твиттере [@juev][1] написал: 

<blockquote class="twitter-tweet" lang="ru"><p>Обалденно! Открыл в Instapaper for iOS статью на русском языке и включил проговаривание. Так четко читает, слушать приятно.</p>&mdash; Denis Evsyukov (@Juev) <a href="https://twitter.com/Juev/status/512643235420717056">18 сентября 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

И я, конечно же, решил заставить робота ласкать своим милым голоском и мои уши. 
Качество очень сильно зависит от статьи. В вычурных материалах ударения
и эмфазисы в гротескно-напыщенных выражениях стоят отнюдь не там где им полагается,
а код даже люди читают вслух очень забавно. Но в большинстве статей качества
произношения вполне хватает для того, чтобы слушать статьи как подкасты. В платной
версии Instacast можно даже делать плейлисты из статей. Потрясающе, не правда ли?
Теперь можно <s>читать</s> слушать отложенные статьи за работой, быстрее опустошая
огромный завал из Pocket'а :D

<iframe class='youtube' src="//www.youtube.com/embed/bNUJCl6lppk" frameborder="0" allowfullscreen></iframe>


Еще одна вещь, которая продала мне Instacast — возможность выделять текст.
Мне просто лень тянуться за Evernote каждый раз, когда я нахожу что-то интересное,
и я давно мечтал делать это как в iBooks: провел пальцем по строчкам — готово.

![{{page.title}}]({{site.production_url}}/assets/articles-assets/instacast.jpg)

## Перенос статей из Pocket в Instapaper

Внезапно, я не нашел абсолютно никаких быстрых способов перенести статьи из Pocket
в Instapaper: ни импорта, ни утилит. Всё что было, датировалось годом 2012, было
покрыто пылью и работало с предсказуемым результатом <span class='hidden'>никак</span>.

Я посмотрел на эти пыльные труды и решил сделать все в консоли. 

- В Pocket нужно доскроллить страницу до конца, чтобы появились все статьи
- Затем нужно собрать ссылки на все статьи и скопировать результат без первой
  и последней кавычки:

{% highlight js %}
JSON.stringify(
  $('.original_url')
    .map(function () {
      return this.href
      .replace('http://getpocket.com/redirect?url=', '')
  }).toArray()
);
{% endhighlight %}


- После этого идем на сайт Instapaper, и создаем переменную, куда запишем ссылки из Pocket:

{% highlight js %}
  var urls = /* скопированные ссылки */
{% endhighlight %}

- И осталось только добавить каждую ссылку через API Instapaper к себе в аккаунт:

{% highlight js %}
urls.map(function (url) {
  url = decodeURIComponent(url);
  console.log(url);
  $
    .ajax({
      url: 'https://www.instapaper.com/api/add',
      data: {
        url: url,
        username: /* email */,
        password: /* password */
      }
    })
    .done(function () {
      console.log(arguments)
    })
})
{% endhighlight %}

Ну и, о чудо, теперь о Pocket можно забыть.

[1]: https://twitter.com/Juev

_Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar).
Всем добра и штурмовиков_.


[1]: https://gist.github.com/shuvalov-anton/862276679479cfcd0421
[2]: http://files.swaroopch.com/vim/byte_of_vim_v051.pdf
[3]: http://rus-linux.net/MyLDP/BOOKS/Vim/prosto-o-vim.pdf
[4]: {{site.production_url}}/2014/08/30/month-of-vim/
[5]: https://github.com/shuvalov-anton/.dotfiles/blob/master/.vimrc
