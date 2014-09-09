---

layout: post
title: "Паттерн «объект-представление»"
group: "7 паттернов для рефакторинга JavaScript-приложений"
description: "7 паттернов для рефакторинга JavaScript-приложений"
keywords: ["JavaScript", "JS", "Node", "рефакторинг", "паттерны", "patterns", "crushlovely"]
translation:
  author: Michael Phillips
  title: "7 patterns to refactor JavaScript applications: View Objects"
  link: http://journal.crushlovely.com/post/89978453593/7-patterns-to-refactor-javascript-applications-view

---

![{{post.title}}](/assets/articles-assets/footer/l/l-9.jpg)

{:.photo-author}
_фото: [shuttermanic](https://www.flickr.com/photos/shuttermanic/)_

17 октября 2012 года Bryan Helmkamp, основатель [Code Climate][1] написал
[пост][2] описывающий 7 паттернов для рефакторинга толстых `ActiveRecord`-моделей
в Ruby on Rails. Здесь, в Crush & Lovely, у всех Rails-разработчиков этот пост
является основным ориентиром для написания модульного, лаконичного, выразительного
и тестируемого кода.

В этой серии статей мы расскажем о подобных концепциях в JavaScript. Как и работа
Bryan Helmkamp, эта серия так же применима к моделям данных, и не менее полезна.
В этом посте обсудим паттерн «объект-форму.

[1]: https://codeclimate.com/
[2]: http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/

{% include 7-patterns.md %}

## Объект-представление

Лучше всего храненить логику и атрибуты необходимые только для формирования
представления (HTML в обычных сайтах или JSON в API) вне моделей.
Хранение специфичной информации непосредственно в модели создает путаницу
в том, что является «настоящими» данными модели (и хранится в базе),
а что требуется только для представления. Объект-представление работает как
адаптер между «настоящими» данными модели и представлением этих данных.

Представим, например, модель товара с атрибутом `price`,
который хранится в базе со значением `599` центов,  но в представлении
продукта значение изменяется на `$5.99`. С одной стороны, хранить это значение
как второй атрибут `price` в модели совсем не правильно. С другой, также неправильно
включать логику форматирования в шаблон.

Объект-представление «одевает» данные модели, трансформируя, добавляя или удаляя
значения, и возвращая новый объект для использования в слое представления.
Этот подход создает хорошее место для логики и атрибутов, связанных с
представлением и не смешивает их со свойствами модели.

Я хочу отметить, что существуют различные мнения о том, что именно подразумевается
под этим паттерном. Helmkamp упоминает об этом в оригинальной статье, да и
у нас в Crush & Lovely это частая тема для споров — наши инженеры предпочитают
не употреблять название «объект-представление», в основном, потому что обычно
под представлением имеют в виду HTML, а этот паттерн может использоваться и для
формирования ответа API, и для передачи данных внешним сервисам и любыми другим
способами. Мы предпочитаем название «Presenter», в первую очередь потому что это
имя хорошо отражает суть паттерна — формирование представления данных, вне зависимости
от их конечной формы.

### Пример

К примеру, возмем конец года, когда преподаватели печатают отчеты по каждому студенту.
Кроме различной информации, отчет содержит среднюю оценку студента, информацию
о том, переведен ли он на следующий курс, и его номер телефона.

Скрипт для генерации отчетов находит каждого студента и оценки которые он получал
в течение года, создавая «настоящее» представление объекта:

{% highlight js %}
{
  "id": "123456",
  "firstName": "Susan",
  "lastName": "Smith",
  "gender": "f",
  "phone": "5551234567",
  "assignments": [
    {
      "grade": 0.65
    },
    {
      "grade": 0.83
    },
    {
      "grade": 0.90
    },
    ...
  ]
}
{% endhighlight %}

PDF-верстка отчета «глупа» и ничего не знает о форматировании данных:

{% highlight js %}
...
<p class="average-grade">Average grade across all assignments: {{averageGrade}}</p>
<p class="passing-status">Passing: {{isPassing}}</p>
...
<p>
  For any questions, please call the teacher at {{teacher.phone}}.
</p>
...
{% endhighlight %}

Формирование данных студента для представления станет проще если мы воспользуемся
объектом-представлением, который, после создания, передадим прямо в шаблон. Вот
пример того, как должен выглядеть объект-представление «одевающий» модели наших
студентов для использования в шаблоне:

{% highlight js %}
var _ = require('underscore');
var DetermineStudentPassingStatus = require('./determineStudentPassingStatus');
var GetAverageGradeFromAssignments = require('./getAverageGradeFromAssignments');

var StudentGradeReportPresenter = function( students ) {
  // ensure students variable is array
  this.students = ( students instanceof Array ) ? students : [students];
};

StudentGradeReportPresenter.whitelistKeys = [
  'firstName',
  'lastName',
  'isPassing',
  'averageGrade',
  'phone'
];

StudentGradeReportPresenter.prototype = _.extend( StudentGradeReportPresenter.prototype, {

  present: function() {
    var process = _.compose(
      this.sanitizeAttributes.bind( this ),
      this.getAverageGrade.bind( this ),
      this.getPassingStatus.bind( this ),
      this.formatPhoneNumber.bind( this )
    );

    this.result = _( this.students ).map( process );

    // return same type of primitive that was passed in
    // either Array or single object
    return ( this.students.length > 1 ) ? this.result : this.result[0];
  },

  sanitizeAttributes: function( student ) {
    student = _.pick.apply( null, [student].concat( StudentGradeReportPresenter.whitelistKeys ));
    return student;
  },

  getAverageGrade: function( student ) {
    student.isPassing = new DetermineStudentPassingStatus( student.id ).fromAssignments( student.assignments );
    return student;
  },

  getPassingStatus: function( student ) {
    student.averageGrade = new GetAverageGradeFromAssignments( student.assignments ).run();
    return student;
  },

  formatPhoneNumber: function( student ) {
    student.phone = student.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    return student;
  }

});

module.exports = StudentGradeReportPresenter;
{% endhighlight %}

Так что, все, что нужно сделать — взять данные студентов и передать их
в представление для рендеринга:

{% highlight js %}
new CurrentStudentsWithAssignmentsQuery().run()
  .then(function( students ) {
    return new StudentGradeReportPresenter( students ).present();
  })
  .then(function( students ) {
    res.render('reportCard', students);
  });
{% endhighlight %}

Нужно отметить отилчную возможность извлечь часто используемые метобы объекта-представления,
такие как форматирование телефонного номера и вынести их в модули или хелперы,
которые могут быть использованы в других объектах-представления, делая ваше
приложение более модульным. Возможности для организации кода при использовании
объектов-представлений открыты и гибки, так что каждый инженер должен
взглянуть на свой собственный стиль, для того, чтобы получить лучший результат.


### Тестирование

Юнит-тесты для проверки изменений данных на удивление прямолинейны, так как все,
что вам нужно сделаеть — передать сквозь объект-представление один объект или
массив а затем получить другой на выходе. Остается только проверить корректрость
обработанных данных.

{% highlight js %}
var expect = require('chai').expect;
var StudentGradeReportPresenter = require('./studentGradeReportPresenter');
var Grade = require('./grade');

describe('StudentGradeReportPresenter', function(){
  var student;
  var presentedStudent;

  before(function(){
    student = {
      id: '123456',
      firstName: 'Susan',
      lastName: 'Smith',
      gender: 'f',
      phone: "5551234567",
      assignments: [
        {
          grade: new Grade(0.65)
        },
        {
          grade: new Grade(0.83)
        },
        {
          grade: new Grade(0.90)
        }
      ]
    };

    presentedStudent = new StudentGradeReportPresenter( student ).present();
  });

  it('returns only the specified properties', function(){
    expect( presentedStudent ).to.have.keys('firstName', 'lastName', 'phone', 'averageGrade', 'isPassing');
  });

  describe('.phone', function(){

    it('returns the correct value', function() {
      expect( presentedStudent.phone ).to.equal('555-123-4567');
    });

  });

  describe('.isPassing', function(){

    it('returns the correct value', function() {
      expect( presentedStudent.isPassing ).to.equal(true);
    });

  });

  describe('.averageGrade', function(){

    it('returns the correct value', function(){
      expect( presentedStudent.averageGrade ).to.equal(0.79);
    });

  });

});
{% endhighlight %}

* * * * *

В следующем посте мы рассмотрим объекты-политики, которые представляют отличные
инструменты для инкапсуляции бизнес-логики.

![{{post.title}}](/assets/articles-assets/footer/l/l-10.jpg)

{:.photo-author}
_фото: [shuttermanic](https://www.flickr.com/photos/shuttermanic/)_

_Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar).
Всем добра!_

{:.photo-author}
