---

layout: post
title: "Паттерн объект-значение"
group: "7 паттернов для рефакторинга JavaScript-приложений"
description: "7 паттернов для рефакторинга JavaScript-приложений"
keywords: ["JavaScript", "JS", "Node", "рефакторинг", "паттерны", "patterns", "crushlovely"]
translation:
  author: Michael Phillips
  title: "7 patterns to refactor JavaScript applications: Value Objects"
  link: http://journal.crushlovely.com/post/88286828068/7-patterns-to-refactor-javascript-applications-value

---

17 октября 2012 года Bryan Helmkamp, основатель [Code Climate][1] написал [пост][2] описывающий 7 паттернов для рефакторинга толстых ActiveRecord-моделей в Ruby on Rails. Здесь, в Crush & Lovely, у всех Rails-разработчиков этот пост является основным ориентиром для написания модульного, лаконичного, выразительного и тестируемого кода.

В этой серии статей мы расскажем о подобных концепциях в JavaScript. Как и работа Bryan Helmkamp, эта серия так же применима к моделям данных, и не менее полезна. Каждую неделю мы будем публиковать по одной статье, а прямо сейчас, на этой неделе, мы поговорим о Value Objects.

### Паттерны

СПИСОК ПАТТЕРНОВ

### Объект-значение

В статье Brayan’а объект-значение описывается как «простой объект, который сравнивается по значению, а не по идентификатору». Поскольку в JavaScript все объекты передаются по ссылке, здесь нет нативных примеров ни в ECMAScript 5, ни даже в Harmony. Попробуем так:

    var foo = new Number( 2 );
    var bar = new Number( 2 );
    foo === bar; // => false


В этом примере примитивы сохраняются в переменные `foo` и `bar`, которые равны по значению, но, технически, эти примитивы являются объектами. `Number`-конструктор, не смотря на то, что он создает примитивный элемент, создаст «простой  JavaScript-Object в старом стиле» ([POJO][3]_), потому переменные сравниваются по ссылке, а не по значению и `foo` и `bar` не будут равны между собой, хотя представляют одинаковое значение.

Но объект-значение предлагает хорошее место для размещения бизнес-логики. Практически любое значение в вашем приложении имеет ассоциированную с ним логику, к примеру, проверку равенства, и лучшее место для этой логики — инстанс объекта-значения.

### Пример

Рассмотрим приложение по классификации студентов, где студент получает баллы в процентах, определяя по ним буквенную оценку и то, проходит ли он дальше, или ему пора исправляться.

var _ = require('underscore');
 
var Grade = function( percentage ) {
  this.percentage = percentage;
  this.grade = this.grade( percentage );
};
 
Grade.prototype = _.extend( Grade.prototype, {
 
  grades: [
    { letter: 'A', minimumPercentage: 0.9, passing: true },
    { letter: 'B', minimumPercentage: 0.8, passing: true },
    { letter: 'C', minimumPercentage: 0.7, passing: true },
    { letter: 'D', minimumPercentage: 0.6, passing: true },
    { letter: 'F', minimumPercentage: 0,   passing: false }
  ],
 
  passingGradeLetters: function() {
    return _.chain( this.grades ).where({ passing: true }).pluck('letter').value();
  },
 
  grade: function( percentage ) {
    return _.find( this.grades, function( grade ) { return percentage >= grade.minimumPercentage; });
  },
 
  letterGrade: function() {
    return this.grade.letter;
  },
 
  isPassing: function() {
    return this.grade.passing
  },
 
  isImprovementFrom: function( grade ) {
    return this.isBetterThan( grade );
  },
 
  isBetterThan: function( grade ) {
    return this.percentage > grade.percentage;
  },
 
  valueOf: function() {
    return this.percentage;
  }
 
});
 
module.exports = Grade;

Такая структура дает дополнительное преимущество, делая ваш код более выразительным. Теперь можно писать:

		var firstStudent = { grade: new Grade(0.45) };
		var secondStudent = { grade: new Grade(0.70) };
 
		firstStudent.grade.isPassing() //=> false
		firstStudent.grade.isBetterThan( secondStudent.grade ); //=> false

Перед тем как интегрировать объекты-значения в приложение, стоит   заменить несколько вещей:

- `valueOf`- и `toString`-методы имеют [определенное предназначение][4] и рекомендуются для создания собственных объектов-значений. Применив его в `Grade`-объекте выше, мы добавили ему поддержку стандартного ECMAScript-синтаксиса, что позволило нам писать такие конструкции:

		var myGrade = new Grade(0.65);
		alert('My Grade is ' + myGrade + '!'); // alerts, 'My Grade 		is 0.65!'
 
		var myOtherGrade = new Grade(0.75);
		myGrade < myOtherGrade; // true

К сожалению, даже если два различных объекта возвращают одинаковое значение с помощью `valueOf`, они все равно не будут равны.

- При конвертировании объекта-значения с помощью `JSON.stringify`, согласно конвенции, используется `toJSON`-метод, который возвращает значение, которое вы хотите получить при конвертировании в строку. Если же метод `toJSON` не определен, то будет `valueOf`. Если `valueOf` нет — объект будет конвертирован как Object, что, зачастую, не желательно.  

- Хороший паттерн — использовать `valueOf` для возвращения значения, с которым объект был инициализирован, что позволяет воссоздать этот объект с другой стороны транспорта. Это очень полезно если приложение имеет клиент и сервер, между которыми передаются объекты-значения. Используя простое значение объекта на входе и на выходе, вы можете взаимодействовать с объектом-значением на сервере, затем отправить значение на клиент, используя valueOf, и воссоздать там объект заново.

- Если вы предпочитаете более функциональный подход к объектам-значениям, то вы можете добавить методы в функцию-конструктор вместо ее прототипа. Посмотрите на следующий пример:

		Grade.equal = function( grade1, grade2 ) {
		  return grade1.valueOf() === grade2.valueOf();
		}
 
		var myFirstGrade = new Grade( 0.7 );
		var mySecondGrade = new Grade( 0.7 );
		Grade.equal( myFirstGrade, mySecondGrade ) // => true

И объектно-ориентированный, и функциональный подход, являются допустимыми. Все зависит исключительно от вашего стиля.

### Тестирование

Так как этот паттерн централизует логику в единый объект, тестирование значительно ускоряется и упрощается. К тому же, требуется гораздо меньше тестов для покрытия большей части логики приложения. Посмотрите сами:

var Grade = require('./grade');
var grade1;
var grade2;
 
describe('Grade', function() {
 
  describe('#isPassing', function() {
 
    it('returns true if grade is passing', function() {
      grade1 = new Grade(0.8);
      expect(grade1.isPassing()).to.be.true;
    });
 
    it('returns false if grade is not passing', function() {
      grade1 = new Grade(0.58);
      expect(grade1.isPassing()).to.be.false;
    })
 
  });
 
  describe('#letterGrade', function() {
 
    it('returns correct letter for percentage', function() {
      grade1 = new Grade(0.8);
      expect(grade1.letterGrade()).to.equal('B');
    });
 
    it('returns A for 100 percent', function() {
      grade1 = new Grade(1);
      expect(grade1.letterGrade()).to.equal('A');
    });
 
    it('returns F for 0 percent', function() {
      grade1 = new Grade(0);
      expect(grade1.letterGrade()).to.equal('F');
    });
 
    it('returns F for anything lower than 0.6', function() {
      grade1 = new Grade(0.4);
      expect(grade1.letterGrade()).to.equal('F');
    });
 
  });
 
  describe('#passingGradeLetters', function() {
 
    it('returns all passing letters', function() {
      grade1 = new Grade(0.8);
      expect(grade1.passingGradeLetters()).to.have.members(['A', 'B', 'C', 'D']);
    });
 
  });
 
  describe('#isImprovementFrom', function() {
 
    it('returns true if grade is better than comparison grade', function() {
      grade1 = new Grade(0.8);
      grade2 = new Grade(0.7);
      expect(grade1.isImprovementFrom( grade2 )).to.be.true;
    });
 
    it('returns false if grades are equal', function() {
      grade1 = new Grade(0.7);
      grade2 = new Grade(0.7);
      expect(grade1.isImprovementFrom( grade2 )).to.be.false;
    });
 
  });
 
  describe('#isBetterThan', function(){
 
    it('returns true if grade is better than comparison grade', function() {
      grade1 = new Grade(0.8);
      grade2 = new Grade(0.7);
      expect(grade1.isImprovementFrom( grade2 )).to.be.true;
    });
 
    it('returns false if grades are equal', function() {
      grade1 = new Grade(0.7);
      grade2 = new Grade(0.7);
      expect(grade1.isImprovementFrom( grade2 )).to.be.false;
    });
 
  });
 
});

Одно из преимуществ тестирования объекта-значения в том, что сетап для тестирования максимально прост. Тестирование различных взаимодействий получается простым и эффективным, позволяя избежать создания специальных моделей и написания сложной логики. В добавок, логика изолируется от любых тестов моделей, что позволяет держать тесты компактными и специализированными

* * * * *

В следующем посте мы рассмотрим сервисные объекты, которые являются хорошим инструментом для изолирования процедурного кода.


[1]: https://codeclimate.com/
[2]: http://blog.codeclimate.com/blog/2012/10/17/7-ways-to-decompose-fat-activerecord-models/
[3]: https://ru.wikipedia.org/wiki/POJO
[4]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf
