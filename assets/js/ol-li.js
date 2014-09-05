/* jshint strict: false */
/* globals document, window, $ */

$('ol').each(function () {
  $(this).find('li').each(function (k, i) {
    var text = '<span class="number">%number. </span>';
    $(this).prepend(text.replace('%number', k+1));
  });
});

$(function() {
  $('.content')
    .find('h1, h2, h3, h4, h5, h6')
    .each(function(i, el) {
      var $el, id, ancor;
      $el = $(el);
      if (!$el.text().trim()) { return; }
      id = $el.attr('id');
      $el.is('h1')
        && (ancor = '#')
        && (id = 'content');
      $el.is('h2') && (ancor = '##');
      $el.is('h3') && (ancor = '###');
      $el.is('h4') && (ancor = '####');
      $el.is('h5') && (ancor = '#####');
      if (id) {
        return $el
          .prepend($('<a />')
          .addClass('header-link')
          .attr('href', '#' + id)
          .html(ancor));
      }
  });
  $('.header-link').on('click', function (e) {
    e.preventDefault();
    $('body').animate({
      scrollTop: $(e.target).offset().top
    }, 300, function () {
      window.location.hash = $(e.target).attr('href');
    });
    
  });
});
