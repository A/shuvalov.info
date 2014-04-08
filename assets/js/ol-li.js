/* globals document */

$('ol').each(function () {
  $(this).find('li').each(function (k, i) {
    var text = '<span class="number">%number. </span>';
    $(this).prepend(text.replace('%number', k+1));
  });
});
