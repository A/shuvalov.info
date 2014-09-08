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
