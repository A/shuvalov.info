---
layout: post
title: "Jekyll Bootstrap и Google Analytics"
description: "Как заставить работать аналитику в jekyll-bootstrap"
keywords: ["jekyll", "bootstrap", "analytics"]
---


![](http://31808.selcdn.ru/it-prm/pics/jekyll.png) 
 
Проблема в том, что блог я генерирую на localhost'e, и выкладываю уже 
сгенерированый сайт на сервер. Из-за этого хитрый план разработчика Jekyll 
Bootstrap рушится, и аналитика ни работает нигде. По этому самому плану, 
если сайт генерируется в продакшне, то аналитика подключается. Если же сайт 
генерируется на локальной машине разработчика — аналитика не включается. 
Обходил я это с помощью самого простого решения — захардкодить в шаблон страницы
код аналитики. Это, конечно, работало, но количество просмотренных страниц
серьезно увеличивалось, когда я писал новую статью на макбуке, или когда я
что-нибудь дорабатывал. 

Я решил разобраться и заставить аналитику работать как положено. Для этого я
пытался генерировать сайт с атрибутом `--safe`. Именно так советовали на гитхабе.

    jekyll --safe

Но этот вариант помогает лишь в том случае, когда ты не используешь плагины.
Если же ты их используешь, то в безопасном режиме эти плагины выключаются, что
никуда не годится. Я решил завязать аналитику на параметр `production_url`
в конфиге. В файле `_includes/JB/analytics` я написал такую штуку

    {% raw %}{% if site.url == site.production_url %}
        {% if site.JB.analytics.google.tracking_id %}
            {% include JB/analytics-providers/google %}
        {% endif %}
        {% if site.JB.analytics.yandex.id %}
            {% include JB/analytics-providers/yandex %}
        {% endif %}
    {% endif %}{% endraw %}

Теперь, если запускать сайт с параметром `--url`, соответствующим ссылке 
на продакшн, то подключаются скрипты аналитики. Я внес все это в `Rakefile`.

    task :default => :run
     
    desc 'Deploy to server'
    task :push => :build do
        sh "rsync -az --delete _site/ eva:/home/web/www/anton-shuvalov.info"
    end
     
    desc 'Build for deploy'
    task :build do
      sh "jekyll --no-server --no-auto --url http://anton-shuvalov.info"
    end
     
    desc 'Run server'
    task :run do
        print "> Starting jekyll...\n"
      sh "jekyll --server"
    end
 
## Яндекс метрика для Jekyll
 
Я изменил `_config.yml`. Удалил лишних провайдеров аналитики и параметр,
который отвечал за то, какого провайдера использовать. Ну и я добавил
в конфиг яндекс.

  JB:
    ...
    analytics :
    google : 
      tracking_id : 'UA-26825614-2'
    yandex :
      id : '19212163'
    ...
 
Ну и, собственно, файл `_includes/JB/analitycs-providers/yandex`:

    {% raw %}
      <script type="text/javascript">
        (function (d, w, c) {
          (w[c] = w[c] || []).push(function() {
            try {
              w.yaCounter{{ site.JB.analytics.yandex.id }} = new Ya.Metrika({
              id:{{ site.JB.analytics.yandex.id }},
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true});
            } catch(e) { }
          });
         
          var n = d.getElementsByTagName("script")[0],
              s = d.createElement("script"),
              f = function () { n.parentNode.insertBefore(s, n); };
              s.type = "text/javascript";
              s.async = true;
              s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";
         
          if (w.opera == "[object Opera]") {
              d.addEventListener("DOMContentLoaded", f, false);
          } else { f(); }
        })(document, window, "yandex_metrika_callbacks");
      </script>
      <noscript>
        <div>
          <img src="//mc.yandex.ru/watch/{{ site.JB.analytics.yandex.id }}" style="position:absolute; left:-9999px;" alt="" />
        </div>
      </noscript>
    {% endraw %}