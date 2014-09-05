/* globals $ */

(function () {
  'use strict';
  var Quiz = function($questions, answers) {
    this.score = 0;
    this.question = 0;
    this.answers = answers;
    this.$quiz = $('.js-quiz');
    this.$questions = $questions;
    $('.js-quiz-next').on('click', this.checkAnswer.bind(this));
    this.load();
  };

  Quiz.prototype.checkAnswer = function () {
    var answer = this.answers[this.question];
    var rightInput = this.$quiz.find('input')[answer];
    var win = $(rightInput).is(':checked');
    win && this.score++;
    $(rightInput).addClass('correct');
    setTimeout(function () {
      this.load(this.question++);
    }.bind(this), 1500);
  };

  Quiz.prototype.load = function () {
    this.$quiz.html($(this.$questions[this.question]).html());
  };

  $(function () {
    new Quiz($('.question'), [0,0,0,0,0,0,0,0,0]);
  });

})();
