---

layout: post
title: "Паттерн «объект-запрос»"
group: "7 паттернов для рефакторинга JavaScript-приложений"
description: "7 паттернов для рефакторинга JavaScript-приложений"
keywords: ["JavaScript", "JS", "Node", "рефакторинг", "паттерны", "patterns", "crushlovely"]
translation:
  author: Michael Phillips
  title: "7 patterns to refactor JavaScript applications: Query Objects"
  link: http://journal.crushlovely.com/post/89978453593/7-patterns-to-refactor-javascript-applications-query

---

![{{post.title}}](/assets/articles-assets/footer/l/l-7.jpg)

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

## Объект-запрос

Запросы к базам данных, даже самые простые, могут быть большими и сложными
для чтения и понимания. Более сложные запросы, особенно те, которые
взаимодействуют с несколькими коллекциями или таблицами, тяжело не только
писать, но и поддерживать.

Паттерн «объект-запрос» обеспечивает хороший инструмент для отделения
логики запросов и связанных с ними операций в отдельный модуль. Такое
разделение позволяет получить горяздо более поддерживаемую и читаемую
структуру, а так же обеспечивает очень понятный API для кода, использующего
объект-запрос.


### Пример

Давайте представим какой-нибудь метод API, который возвращает список
всех студентов, перешедших на следующий курс, в JSON-формате. 

Без использования объекта запросов у нас могла бы быть функция в API-контроллере или объект-сервис, как в примере ниже. Стоит отметить,  что
`DetermineStudentPassingStatus` я взял из статьи об [объекте-сервисе][3].

{% highlight js %}
// expecting all collection variables to be defined

var _ = require('underscore');
var Q = require('q');
var DetermineStudentPassingStatus = require('./determineStudentPassingStatus');

var getCurrentlyPassingStudents = function() {
  var token = Q.defer();  

  // find all current students
  studentCollection.findAll({ isCurrent: true }, function( students ) {
    var studentIds = _( students ).pluck('_id');

    // find all assignments for those current students
    assignmentsCollection.findAll({ studentId: { $in: studentIds }}, function( assignments ) {
      var passingStudentIds = [];

      // group the assignments by studentId and then assess passing status
      // adding the studentId to the array of passing students if passing
      _( assignments ).chain()
        .groupBy('studentId')
        .each( function( assignments, studentId ) {
          var passingStatus = new DetermineStudentPassingStatus( studentId ).run( assignments );
          if ( passingStatus === true )
            passingStudentIds.push( studentId );
        })
        .value();

      // filter all current students down to those that are passing
      // and resolve the deferred
      var passingStudents = _( students ).filter( function( student ) {
        return passingStudentIds.indexOf( student._id ) !== -1;
      });
      token.resolve( passingStudents );
    })
  })

  return token.promise;
};
{% endhighlight %}

[3]: /2014/08/04/7-patterns-to-refactor-javascript-applications-service-object/

Мы сейчас не просто спустились на последние круги коллбек-ада, мы написали
код, который очень сложно прочитать. Благодаря объекту запросов, мы
можем создать гораздо более выразительный модуль.

{% highlight js %}
var _ = require('underscore');
var async = require('async');
var Q = require('q');

var CurrentlyPassingStudentsQuery = function() {};

CurrentlyPassingStudentsQuery.prototype = _.extend( CurrentlyPassingStudentsQuery.prototype, {

  run: function() {
    this.deferred = Q.defer();

    _.bindAll( this, 'fetchCurrentStudents', 'fetchAssignmentsForCurrentStudents', 'compilePassingStudentIds', 'filterAllPassingStudents', 'result' );
    async.waterfall([
      this.fetchCurrentStudents,
      this.fetchAssignmentsForCurrentStudents,
      this.filterAllPassingStudents
    ], this.result );

    return this.deferred.promise;
  },

  fetchCurrentStudents: function( next ) {
    studentCollection.findAll({ isCurrent: true }, function( currentStudents ) {
      next( null, currentStudents );
    });
  },

  fetchAssignmentsForCurrentStudents: function( currentStudents, next ) {
    var currentStudentIds = _( currentStudents ).pluck('_id');

    assignmentsCollection.findAll({ studentId: { $in: studentIds }}, function( assignments ) {
      next( null, currentStudents, assignments );
    });
  },

  compilePassingStudentIds: function( currentStudents, assignments, next ) {
    var passingStudentIds = [];

    _( assignments ).chain()
      .groupBy('studentId')
      .each( function( assignments, studentId ) {
        var passingStatus = new DetermineStudentPassingStatus( studentId ).run( assignments );
        if ( passingStatus === true )
          passingStudentIds.push( studentId );
      })
      .value();

    next( null, passingStudentIds );
  },

  filterAllPassingStudents: function( passingStudentIds, next ) {
    var currentlyPassingStudents = _( students ).filter( function( student ) {
      return passingStudentIds.indexOf( student._id ) !== -1;
    });
    next( null, currentlyPassingStudents );
  },

  result: function( err, currentlyPassingStudents ) {
    if ( err ) {
      this.deferred.reject( err );
    } else {
      this.deferred.resolve( currentlyPassingStudents );
    }
  }

})
{% endhighlight %}

Сгруппировав все связанные с запросом операции, мы получили более
организованную структуру и создали выразительный API, который удобно
использовать в приложении. Например, в виде контроллера ExpressJS:

{% highlight js %}
var CurrentlyPassingStudentsQuery = require('./currentlyPassingStudentsQuery');

// for route GET /api/students/passing
var currentlyPassingStudents = function( req, res ) {
  new CurrentlyPassingStudentsQuery().run()
    .then(function( currentlyPassingStudents ) {
      res.send( 200, currentlyPassingStudents );
    })
    .fail(function( err ) {
      res.send( 422, err );
    });
};
{% endhighlight %}

Данные, которые возвращает этот метод API будут простой строкой, полученной
из хранилища данных, без какой-либо обработки. Зачастую, это не совсем
то, что нам нужно. В этом примере, объект-запрос может быть объеденен
с объектом-представлением (о котором мы напишем в следующей части). Объект-представление
обеспечивает единое место для трансформации объекта перед показом пользователю.

Есть еще одна вещь, которую хочется отметить. Паттерн «объект-запрос»
открывает очень интересные возможности композиции. К примеру, в коде
приложения может быть много мест, где вам понадобится получить все оценки
определенной группы студентов, и в этом случае мы можем вынести эту
операцию в отдельный объект-запрос, and use it in the 
`#fetchAssignmentsForCurrentStudents` method.

### Тестирование

Создание объекта-запроса вне контекста его использования позволяет
легко покрывать его тестами. Если вы используете тестовую базу данных,
все что вам нужно — загрузить необходимые данные в базу для того, чтобы
обеспечить ожидаемые результаты при выполнении запросов. Остается
только убедиться в том, что результаты корректные

{% highlight js %}
var expect = require('chai').expect;
var CurrentlyPassingStudentsQuery = require('./currentlyPassingStudentsQuery');

describe('CurrentlyPassingStudentsQuery', function(){
  var currentlyPassingStudents;
  var err;

  before(function( done ){
    // first build all records in the necessary
    // tables for testing (steps not shown)
    // then run the Query Object
    new CurrentlyPassingStudentsQuery().run()
      .then( function( _currentlyPassingStudents ) {
        currentlyPassingStudents = _currentlyPassingStudents;
        done();
      });
      .fail( function( _err ) {
        err = _err;
        done();
      });
  });

  it('returns the correct set of records', function(){
    expect( currentlyPassingStudents ).to.have.length( expectedLength ); // however many you are expecting
  });

});
{% endhighlight %}
* * * * *

В следующем посте мы обсудим объект-представление — отличный инструмент для
изоляции преобразований данных модели в их представление.

![{{post.title}}](/assets/articles-assets/footer/l/l-8.jpg)

_Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar).
Всем добра!_

{:.photo-author}
_фото: [shuttermanic](https://www.flickr.com/photos/shuttermanic/)_
