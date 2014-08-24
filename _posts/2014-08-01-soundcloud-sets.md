---

layout: post
title: "Музыка для работы"
description: "Мои плейлисты: теплый glitch, нежные девичьи голоса, интересная электроника и chillwave"
keywords: ["JavaScript", "JS", "Node", "рефакторинг", "паттерны", "patterns", "crushlovely"]
invisible: true
feature: true
cover: /assets/articles-assets/features/feature-music.jpg
---

![{{page.title}}]({{page.cover}})

{:.photo-author}
_фото: [Joshua Schnable](https://www.flickr.com/photos/joshua_schnable/)_ 

{{ page.description}}:


{% assign posts = site.posts | where: 'category', 'soundcloud' %}

<ul class='articles-list'>
  {% for post in posts %}
    {% include article-snippet.html %}
  {% endfor %}
</ul>

_Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar),
чтобы не пропустить новые публикации!_

