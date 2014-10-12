/* jshint strict: false */
/* globals document, window, $ */

$('ol').each(function () {
  $(this).find('li').each(function (k, i) {
    var text = '<span class="number">%number. </span>';
    $(this).prepend(text.replace('%number', k+1));
  });
});

function repeat(s, n) {
  return 1 == n
    ? s
    : s + repeat(s, n-1);
}

$(function() {
  $('.content')
    .find('h1, h2, h3, h4, h5, h6')
    .each(function(i, el) {
      if (!$.trim(el.innerText)) { return; }
      var id = el.id || '#content';
      var sharps = repeat('#', el.nodeName[1]);
      var ancor = $('<a />')
        .addClass('header-link')
        .attr('href', '#' + id)
        .html(sharps);
      return $(el).prepend(ancor);
  });
  $('.header-link').on('click', function (e) {
    e.preventDefault();
    var $el = $(e.target);
    $('body').animate({
      scrollTop: $el.offset().top
    }, 300, function () {
      window.location.hash = $el.attr('href');
    });

  });
});


$.fn.sticky = function ($wrapper) {
  // TODO: Cache container positions and recache them after window.resize
  $wrapper = $wrapper || $(window);
  this
    .each(function () {
      var $container = $(this);
      var $el = $container.find('.js-sticky').first();
      var update = function () {
        window.verbose && console.time('scroll handler');
        var isFixed = $el.hasClass('sticky-fixed');
        var scrolled = $wrapper.scrollTop();
        var offset = $container.offset();
        isFixed
          ? scrolled < offset.top
            && $el.removeClass('sticky-fixed')
          : scrolled > offset.top
            && $el.addClass('sticky-fixed');
        window.verbose && console.timeEnd('scroll handler');
      };
      $wrapper.on('scroll', update);
      update();
    });
};

$(function () {
  $('.js-sticky-likes').sticky();
});
