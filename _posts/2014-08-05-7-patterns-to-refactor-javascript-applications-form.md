---

layout: post
title: "Паттерн «объект-форма»"
group: "7 паттернов для рефакторинга JavaScript-приложений"
description: "7 паттернов для рефакторинга JavaScript-приложений"
keywords: ["JavaScript", "JS", "Node", "рефакторинг", "паттерны", "patterns", "crushlovely"]
translation:
  author: Michael Phillips
  title: "7 patterns to refactor JavaScript applications: Form Objects"
  link: http://journal.crushlovely.com/post/89270334848/7-patterns-to-refactor-javascript-applications-form

---

![{{post.title}}](/assets/articles-assets/footer/l/l-5.jpg)

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

## Объект-форма

Часто формы имеют сложную логику, которую можно разбить на несколько категорий: валидация, передача данных вместе с различной их обработкой, и обратная связь.

Объект-форма инкапсулирует всю связанную с ним логику в один изолированный, сфокусированный и легко тестируемый объект.  К примеру, у вас может быть
форма логина на сайт, которая имеет связанный с ней  объект-форму, содержащий следующую логику:

1. проверка на заполненность всех требуемых полей,
2. проверка на корректность введенных данных,
3. сохранение данных в базу,
4. уведомление пользователя об успешной регистрации или произошедшей ошибке.

Польза размещения валидации моделей в объекте-форме вместо самой модели, возможно, не так очевидна, если валидация касается одной модели. Но спросите себя: «Где должна происходить проверка данных формы при её отправке на сервер?» Лично я предпочитаю держать валидацию ближе к форме, чем к базе данных, потому как это обеспечивает быструю реакцию формы на введенные данные. Плюс, гораздо семантичнее если валидация находится сразу за кнопкой «отправить», а не где-то в глубине определений. Да и такой вариант позволяет лучше контролировать процесс валидации в его специфичном контексте и не мешает использованию модели в различных других сценариях.

Фактически, если подумать более глобально — с помощью объектов-форм мы разгружаем понятие «Модель», и превращая модели в Data Access Objects (DAO). В таком формате, модель будет полагаться на объект-форму, который гарантирует, что все данные, которые получает модель — корректны. Это хороший паттерн проектирования с позиции архитектуры приложения.

Посмотрим на два примера. Один из них демонстрирует полноценную объект-форму, который покрывает весь процесс. Другой — объект-валидация, который может быть использован в различных компонентах.

### Пример

Представим учителя, который регистрирует новых студентов в начале учебного года. Объект-форма в приложении отвечает за все аспекты обработки полученной из формы информации:

{% highlight javascript %}
var _ = require('underscore');
var async = require('async');
var Q = require('q');
 
var NewStudentForm = function( formData ) {
  this.formData = formData;
};
 
NewStudentForm.prototype = _.extend( NewStudentForm.prototype, {

  process: function() {
    this.token = Q.defer();
 
    async.series([
      this.validate,
      this.persist,
    ], this.result );

    return this.token.promise;
  },
 
  validate: function( next ) {
    // validate object properties,
    // e.g. required fields, pattern matching, etc
    next();
  },
 
  persist: function( next ) {
    // persistence, such as write to DB or send to server
    new CreateNewStudent( this.formData ).run()
      .then(function() {
        next();
      })
      .fail( next );
  },
 
  result: function( err ) {
    // resolve or reject the deferred
    if ( err ) {
      this.error( err );
      this.token.reject( err );
    } else {
      this.token.resolve();
    }
  }
 
  error: function( err ) {
    // send errors back to the user
  }
 
});
{% endhighlight %}

Эта форма имеет небольшой и выразительный API для вызова в различных компонентах нашего приложения, таких как контроллер или представление:

{% highlight javascript %}
new NewStudentForm( formData ).process()
  .then(function() {
    // success callback
  })
  .fail(function() {
    // error callback
  });
{% endhighlight %}

Один из потрясающих плюсов объектов-форм в JavaScript — их потенциал к переиспользованию. Мы можем валидировать данные на клиенте перед тем как отправить их на сервер, но мы не хотели бы делать это только на клиенте, потому как пользователь может скомпрометировать эту валидацию, так что мы так же добавим проверку на сервере. Кроме этого, возможно мы так же захотим добавить проверку в различных методах API.

Если подойти творчески, к работе с объектами-формами — мы можем создать консистентный API, который можно использовать во всех компонентах приложения. К примеру, если вместо объекта-формы, покрывающей все аспекты обработки, мы создадим объект-валидацию, который проверяет исключительно корректность значений формы, то мы сможем использовать его в создании выразительного процесса:

{% highlight javascript %}
var _ = require('underscore');
var async = require('async');
var Q = require('q');
 
var NewStudentFormValidator = function( formData ) {
  this.formData = formData;
};
 
NewStudentFormValidator.prototype = _.extend( NewStudentFormValidator.prototype, {

  validate: function() {
    this.token = Q.defer();
 
    async.series([
      this.validateEmail,
      this.validatePhoneNumber
      // any other validations
    ], this.result );

    return this.token.promise;
  },
 
  validateEmail: function( next ) {
    // run email validation
    next();
  },
 
  validatePhoneNumber: function( next ) {
    // run phone number validation
    next();
  },
 
  result: function( err ) {
    // resolve or reject the deferred
    if ( err ) {
      this.token.reject( err );
    } else {
      this.token.resolve();
    }
  }
 
});
{% endhighlight %}

Такой подход хорош гибкостью и легким переиспользованием объекта-валидации, в отличии от большого и монолитного объекта-формы.

{% highlight javascript %}
// Client-side
new NewStudentFormValidator( formData ).validate()
  .then(function() {
    // submit form to server via standard HTTP form
    // or via AJAX
  })
  .fail(function( err ) {
    // message errors to user
  });
 
// Server-side (application route)
new NewStudentFormValidator( formData ).validate()
  .then(function() {
    return new CreateNewStudent( formData ).run();
  })
  .then(function() {
    // send user to the success page
  })
  .fail(function( err ) {
    // set flash, send user back to form
  });
 
// Server-side (API route)
new NewStudentFormValidator( formData ).validate()
  .then(function() {
    return new CreateNewStudent( formData ).run();
  })
  .then(function() {
    // send 200 OK
  })
  .fail(function( err ) {
    // send 422 with errors
  });
{% endhighlight %}

Создав в одном месте объект-валидацию, мы можем использовать ее на каждом этапе передачи данных между формой и базой данных, обеспечивая корректность везде, где она необходима. Такой подход позволяет держать код более организованным и соответствующим принципам DRY, но если вам больше подходит вариант «все в одном» —  воспользуйтесь  объектом-формой. Все зависит от того, какой подход более приемлет ваша команда.

### Тестирование

Не имеет значения то, как вы составляете свой объект-форму. В плане тестирования он очень прост, благодаря отвязанности от всего стека приложения. Все, что вам необходимо — создать объект с теми данными формы, которые вы должны протестировать, а затем пропустить их сквозь объект-форму. Хорошая практика — проверять и поведение при котором должны возникать ошибки. Это позволит вам убедиться, что приложение правильно сообщает о них пользователю.

{% highlight javascript %}
var _ = require('underscore');
var expect = require('chai').expect;
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
 
 
var NewStudentForm = require('./NewStudentForm');
 
describe('NewStudentForm', function(){
 
  describe('Passing Data', function(){  
    var formData = {
      firstName: 'John',
      lastName: 'Smith',
      gender: 'm'
    };
 
    before(function(){
      var newStudentForm = new NewStudentForm( formData ).process();
    });
 
    it('persists the data', function(){
      // check database for persisted documents
    });
 
    it('resolves the promise', function(){
      expect( newStudentForm ).to.eventually.be.fulfilled;
    });

  });
 
  describe('Failing Data', function(){  
    var formData = {
      firstName: null,
      lastName: 'Smith',
      gender: 'm'
    };
 
    before(function(){
      var newStudentForm = new NewStudentForm( formData ).process();
    });
 
    it('does not persist the data', function(){
      // check database for absence of persisted data
    });
 
    it('rejects the promise', function(){
      expect( newStudentForm ).to.eventually.be.rejected;
    });

  });

});
{% endhighlight %}

* * * * *

В следующем посте мы обсудим объекты-запросы, позволяющие очень выразительно и понятно получать данные из базы или создавать отфильтрованную выборку из коллекции.

![{{post.title}}](/assets/articles-assets/footer/l/l-6.jpg)

_Подписывайтесь на [РСС](http://feeds.feedburner.com/anton-shuvalov/FJHar).
Всем добра!_

{:.photo-author}
_фото: [shuttermanic](https://www.flickr.com/photos/shuttermanic/)_
