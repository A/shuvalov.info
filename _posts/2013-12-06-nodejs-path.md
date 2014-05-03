---

layout: post
title: "Если в терминале не работают приложения node.js "
tags: ["node", "terminal"]

---


Для того, чтобы научить node.js приложения работать в консоли придется добавить
в переменную окружения `$PATH` путь к приложениям nodejs. 

Один из способов сделать это — добавить следующую строку в файл `~/.profiles`:

{% highlight bash %}
export PATH="/usr/local/share/npm/bin/:$PATH"
{% endhighlight %}