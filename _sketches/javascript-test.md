---

layout: post
title: "Тест для JavaScript-программистов"
description: "10 вопросов которые заставят вас задуматься"
keywords: ["JavaScript", "JS", "Node", "тест"]
javascript: '/assets/js/quiz.js'

---


<div class="quiz">
  <div class="js-quiz"></div>
  <button class="js-quiz-next quiz__submit">Готово</button>
  <div class="quiz__counter"><span class="js-quiz-counter">10</span> из 10</div>
</div>

<div class='q1 question'>
  <pre><code>(function () {
  return Force || console.log.bind(null, 'Anakin');
  function Force () {
    console.log('Luke');
  }
})()();</code></pre>
  <form>
    <legend>С кем сила?</legend>
    <input type="radio" name="answer_1" value="1" />Luke<br />
    <input type="radio" name="answer_1" value="2" />Anakin<br />
  </form>
</div>

<div class='q2 question'>
  <pre><code>var Jedi = ['Anakin'];
console.log(Jedi);
Jedi[0] = 'Luke';</code></pre>
  <fieldset>
    <legend>Кто сейчас джедай?</legend>
    <input type="radio" name="answer" value="1" />Luke<br />
    <input type="radio" name="answer" value="2" />Anakin<br />
    <input type="radio" name="answer" value="3" />Зависит от браузера<br />
  </fieldset>
</div>

<div class='q3 question'>
  <pre><code>var Anakin = 'Light';
var Palpatine = function (data, callback) {
  setTimeout(callback, 0);
  return data;
}
Anakin = Palpatine('Dark', function () {
  console.log(Anakin);
});</code></pre>
  <fieldset>
    <legend>На какой стороне силы Энакин?</legend>
    <input type="radio" name="answer" value="1" />Light<br />
    <input type="radio"  name="answer" value="2" />Dark<br />
    <input type="radio" name="answer"  value="3" />Он сам еще не определился<br />
  </fieldset>
</div>

<div class='q4 question'>
  <pre><code>var Padawan;
{}+[] ? (Padawan = 'Anakin') : (Padawan = 'Luke');</code></pre>
  <fieldset>
    <legend>Кто сейчас падаван?</legend>
    <input type="radio" value="1"  name="answer" />Энакин<br />
    <input type="radio" value="2"  name="answer" />Люк<br />
  </fieldset>
</div>

<div class='q5 question'>
  <pre><code>var fn = function (n) {
  var arr = Array.apply(null, Array(n));
  return arr.map(function (x, i) { return i });
};</code></pre>
  <fieldset>
    <legend>Что делает эта функция?</legend>
    <input type="radio" value="1"  name="answer" />Создает массив чисел от 1 до <code>n</code><br />
    <input type="radio" value="2"  name="answer" />Создает пустой <code>n</code> пустых элементов<br />
    <input type="radio" value="3"  name="answer" />Не иначе, как запускает «Звезду Смерти»!<br />
  </fieldset>
</div>


<div class='q6 question'>
  <pre><code>var Yoda;
[]+{} ? (Yoda = 'Jedi') : (Yoda = 'Master' )</code></pre>
  <fieldset>
    <legend>Кто сейчас Йода?</legend>
    <input type="radio" value="1"  name="answer" />Джедай<br />
    <input type="radio" value="2"  name="answer" />Мастер<br />
  </fieldset>
</div>

<div class='q7 question'>
  <pre><code>var Force = 'Luke';
$(function () { Force = 'Anakin'; });
console.log(Force);</code></pre>
  <fieldset>
    <legend>С кем сейчас Сила?</legend>
    <input type="radio" value="1"  name="answer" />Luke<br />
    <input type="radio" value="2"  name="answer" />Anakin<br />
    <input type="radio" value="3"  name="answer" />Зависит от того, загружен ли уже <code>DOM</code><br />
  </fieldset>
</div>

<div class='q8 question'>
  <pre><code>var arr = ['Anakin', 'Anakin', 'Luke', 'Yoda', 'Yoda', 'Luke'];
arr = arr.filter(function (e,p) {
  return arr.indexOf(e) === p;
});</code></pre>
  <fieldset>
    <legend>Чему равен <code>arr</code></legend>
    <input type="radio" value="1"  name="answer" /><code>['Anakin', 'Anakin', 'Luke', 'Yoda', 'Yoda', 'Luke']</code><br />
    <input type="radio" value="2"  name="answer" /><code>undefined</code><br />
    <input type="radio" value="3"  name="answer" /><code>['Anakin', 'Luke', 'Yoda']</code><br />
  </fieldset>
</div>

<div class='q9 question'>
  <pre><code>var Anakin = function () {};
var Lea = {};
Lea.__proto__ = Anakin.prototype;
var Luke = new Anakin();
console.log(Lea instanceof Anakin);
console.log(Luke instanceof Anakin);</code></pre>
  <fieldset>
    <legend>Что в консоли?</legend>
    <input type="radio" value="1"  name="answer" /><code>true</code>, <code>false</code><br />
    <input type="radio" value="2"  name="answer" /><code>false</code>, <code>true</code><br />
    <input type="radio" value="3"  name="answer" /><code>true</code>, <code>true</code><br />
  </fieldset>
</div>


