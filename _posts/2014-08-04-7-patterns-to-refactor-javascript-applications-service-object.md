---

layout: post
title: "Паттерн «объект-сервис»"
group: "7 паттернов для рефакторинга JavaScript-приложений"
description: "7 паттернов для рефакторинга JavaScript-приложений"
keywords: ["JavaScript", "JS", "Node", "рефакторинг", "паттерны", "patterns", "crushlovely"]
translation:
  author: Michael Phillips
  title: "7 patterns to refactor JavaScript applications: Service Objects"
  link: http://journal.crushlovely.com/post/88286835473/7-patterns-to-refactor-javascript-applications-service

---

![{{post.title}}](/assets/articles-assets/footer/l/l-3.jpg)

{:.photo-author}
_фото: [shuttermanic](https://www.flickr.com/photos/shuttermanic/)_

17 октября 2012 года Bryan Helmkamp, основатель [Code Climate][1] написал
[пост][2] описывающий 7 паттернов для рефакторинга толстых `ActiveRecord`-моделей
в Ruby on Rails. Здесь, в Crush & Lovely, у всех Rails-разработчиков этот пост
является основным ориентиром для написания модульного, лаконичного, выразительного
и тестируемого кода.

В этой серии статей мы расскажем о подобных концепциях в JavaScript. Как и работа
Bryan Helmkamp, эта серия так же применима к моделям данных, и не менее полезна.
В этом посте обсудим паттерн «объект-сервис».

[1]: https://codeclimate.com/
[2]: http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/

{% include 7-patterns.md %}

### Объект-сервис

Объекты-сервисы — это объекты, выполняющие определенные операции или действия.
Когда процесс усложняется, его становится все сложнее покрывать тестами, или он
взаимодействует более чем с одним типом модели, объект-сервис может помочь
сделать ваш код чище.

Цель объекта-сервиса — изолировать операции, в соответствии со следующими принципами:

- **Строгость на входе и выходе**. Объект-сервис  создается, для работы  с очень
  специфичными процессами, так что можно пожертвовать [принципом надежности][3]
    в пользу создания очень узкоспециализированного инструмента.
- **Тщательная документация**. Этот модуль будет использоваться в совершенно
  неожиданных местах, поэтому очень важно хорошо задокументировать его использование.
- **Завершение после выполнения операции**. Паттерн не должен смешиваться
  с рабочим процессом, который выполняется с регулярной периодичностью, постоянно
  слушает сообщения веб-сокетов, или выполняет любые другие операции, которые
  не могут быть завершены сразу. При вызове объекта-сервиса, он должен выполнить
  все операции (синхронные и асинхронные), затем завершиться.

### Пример

Программа, написанная того, чтобы помочь учителям оценить своих студентов
в конце года должна определять проходит ли студент на следующий курс. Процесс
получает все оценки студента, находит средний балл, затем прикрепляет его студенту.

{% highlight javascript %}
var _ = require('underscore');
 
var DetermineStudentPassingStatus = function( student ) {
  this.student = student;
}
 
DetermineStudentPassingStatus.prototype = _.extend( DetermineStudentPassingStatus.prototype, {
 
  minimumPassingPercentage: 0.6,
 
  fromAssignments: function( assignments ) {
    return _.compose(
      this.determinePassingStatus.bind( this ),
      this.averageAssignmentGrade,
      this.extractAssignmentGrades
    )( assignments );
  },
 
  extractAssignmentGrades: function( assignments ) {
    return _.pluck( assignments, 'grade' );
  },
 
  averageAssignmentGrade: function( grades ) {
    return grades.reduce( function( memo, grade ) {
      return memo + grade.percentage;
    }, 0) / grades.length;
  },
 
  determinePassingStatus: function( averageGrade ) {
    return averageGrade >= this.minimumPassingPercentage;
  }
 
});
 
module.exports = DetermineStudentPassingStatus;
{% endhighlight %}

Благодаря тому, что мы вынесли эту логику в единый модуль, мы, централизовали
все возможные изменения процесса, которые могут произойти в будущем. Например,
если потребуется отправлять email-уведомление студентам, которые не набрали
достаточно баллов, достаточно будет просто добавить соответствующий метод,
а еще лучше — создать другой объект-сервис.

### Тестирование

Даже если действие, описанное в сервисном объекте, становится все более сложным,
тесты все так же остаются сфокусированными на одной операции, предотвращая
появление огромных файлов и громоздкой подготовки окружения.

{% highlight javascript %}
var expect = require('chai').expect;
var DetermineStudentPassingStatus = require('./determineStudentPassingStatus');
var Grade = require('./grade');
 
describe('DetermineStudentPassingStatus', function(){
  var student = {};
  var assignments = [
    {grade: new Grade(0.5)},
    {grade: new Grade(0.8)},
    {grade: new Grade(0.9)},
    {grade: new Grade(0.6)},
  ];
  var determineStudentPassingStatus = new DetermineStudentPassingStatus( student );
 
  describe('#extractAssignmentGrades', function(){

    it('returns an array of grade value objects', function(){
      var grades = determineStudentPassingStatus.extractAssignmentGrades( assignments );
      expect( grades[0] ).to.be.an.instanceof( Grade );
    });
 
  });
 
  describe('#averageAssignmentGrade', function(){

    it('returns the average of all of the grades', function(){
      var grades = determineStudentPassingStatus.extractAssignmentGrades( assignments );
      var averageGrade = determineStudentPassingStatus.averageAssignmentGrade( grades );
      expect( averageGrade ).to.equal( ( (0.5 + 0.8 + 0.9 + 0.6) / 4 ) );
    });
 
  });
 
  describe('#determinePassingStatus', function(){

    it('returns whether or not the student is passing', function(){
      var grades = determineStudentPassingStatus.extractAssignmentGrades( assignments );
      var averageGrade = determineStudentPassingStatus.averageAssignmentGrade( grades );
      var passing = determineStudentPassingStatus.determinePassingStatus( averageGrade );
      expect( passing ).to.be.true;
    });
 
  });
 
  describe('#fromAssignments', function(){
    var passing;
 
    it('returns the correct passing state', function(){
      passing = determineStudentPassingStatus.fromAssignments( assignments );
      expect( passing ).to.be.true;
 
      // overwrite to test false return
      assignments = [
        {grade: new Grade(0.5)},
        {grade: new Grade(0.4)},
        {grade: new Grade(0.8)},
        {grade: new Grade(0.6)},
      ];
      passing = determineStudentPassingStatus.fromAssignments( assignments );
      expect( passing ).to.be.false;
    });

  });
 
});
{% endhighlight %}

Объект-сервис может быть очень полезным инструментом для вычищенная и
рефакторинга кода. Изолированные действия помогают сделать логику приложения
более простой, аккуратной, удобной для покрытия тестами и, в конце концов,
обеспечат более легкую поддержку кода.

[3]: http://en.wikipedia.org/wiki/Robustness_principle

* * * * *

В следующем посте мы рассмотрим объекты-формы.

![{{post.title}}](/assets/articles-assets/footer/l/l-4.jpg)

_Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar).
Всем добра!_

{:.photo-author}
_фото: [shuttermanic](https://www.flickr.com/photos/shuttermanic/)_
