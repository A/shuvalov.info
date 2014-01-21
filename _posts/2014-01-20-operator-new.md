---
layout: post
title: "Реализация оператора new в JavaScript"
translation: 
  author: Dr. Axel Rauschmayer
  title: "The new operator implemented in JavaScript"
  link: http://www.2ality.com/2014/01/new-operator.html

---

Вот небольшой фрагмент кода, который очень грубо реализует логику работы 
оператора new в JavaScript.

{% highlight javascript %}
function newOperator(Constr, args) {
  var thisValue = Object.create(Constr.prototype); // (1)
  var result = Constr.apply(thisValue, args);
  if (typeof result === 'object' && result !== null) {
    return result; // (2)
  }
  return thisValue;
}
{% endhighlight %}


1.  Прототип нового объекта, порождаемого конструктором `Constr`, — это `Constr.prototype`.
2.  В реализации конструктора можно переопределить стандартное поведение, когда
    оператор `new` возвращает `this`, возвращая объект. Это может быть полезным,
    когда конструктор должен вернуть инстанс суб-конструктора.