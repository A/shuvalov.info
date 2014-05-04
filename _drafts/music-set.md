---

layout: post
title: "Soundcloud workset-1"
description: "Ambient, idm, glitch и электроника для усердной работы"
keywords: ["soundcloud", "workset", "музыка для работы", "ambient", "glitch", "female vocal"]

---

Иногда, во время работы я гоняю по кругу Nerevar Rising, иногда работаю под шаффл
из iTunes, а порою и под бодрый deathcore или умиротворяющие мотеты 15-ого века,
но больше всего мне нравится писать код под сладкие девичьи голоса, замысловатые
глитчи и обволакивающе-сказочную атмосферу электронной музыки.

Так вот, от чего бы не сделать компиляцию самых крутых треков, ведь на SoundCloud
каждый день появляются десятки новых и не менее крутых. И сделал, тащемта, а
заодно и опробовал плеер [toneden][1] — давно собирался.

А под какую музыку пишете код вы?

<div id="player"><a href="https://soundcloud.com/asheee/sets/workset-1">Мой плейлист на SoundCloud</a>.</div>

<script>
  (function() {
      var script = document.createElement('script');
      
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//sd.toneden.io/production/toneden.loader.js'
      
      var entry = document.getElementsByTagName("script")[0];
      entry.parentNode.insertBefore(script, entry);
  }());
  ToneDenReady = window.ToneDenReady || [];
  ToneDenReady.push(function() {
      ToneDen.player.create({
          dom: '#player',
          skin: 'mojave',
          visualizerType: 'bars',
          urls: [
              'https://soundcloud.com/asheee/sets/workset-1'
          ]
      });
  });
</script>


[1]: https://www.toneden.io/player