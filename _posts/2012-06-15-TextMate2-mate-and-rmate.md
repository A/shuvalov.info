---
layout: post
title: "mate и rmate в TextMate&nbsp;2"
description: ""
category: 
tags: [textmate]
---
{% include JB/setup %}

<img src="http://31808.selcdn.ru/it-prm/pics/TextMate2.png" width="183px" class="img-center" /> 
 
## Введение
Я полностью согласен с авторами [“The Pragmatic Programmer”](http://www.amazon.com/The-Pragmatic-Programmer-Journeyman-Master/dp/020161622X){: rel="nofollow" } [Andrew Hunt](http://andy.pragprog.com/){: rel="nofollow" } и [David Thomas](http://pragdave.pragprog.com/){: rel="nofollow" } в том, что иметь один-единственный редактор текста для всего - это прекрасно. Таким редактором для меня является [textmate 2](http://blog.macromates.com/2011/textmate-2-0-alpha/ "TextMate Blog &raquo; TextMate 2.0 Alpha"){: rel="nofollow" }. Я стараюсь использовать его везде, где это возможно. В основном я работаю с JS, HTML, CSS и Markdown для статей и заметок. Бывает пишу PHP-код и shell-скрипты. Изредка судьба, ухмыляясь, заставляет меня писать на pascal. С помощью различных дополнений, область применения Textmate можно расширять практически бесконечно.

Textmate поставляется с двумя консольными скриптами `mate` и `rmate`. `mate` позволяет из терминала открыть файл в textmate. Выглядит это, к примеру, так - `sudo mate /etc/hosts/`. С помощью `rmate` можно провернуть то-же самое, но на удаленнам сервере. Раньше я ежедневно пользовался `ssh` или даже `sshfs` для редактирования файлов на сервере. С одной стороны перспектива редактирования кода в *vim*-подобных редакторах, с другой медленная скорость работы `sshfs` как файловой системы. В целом, удаленное редактирование файлов мне не импонировало ни тем, ни другим...

## Mate

В консоли Mac OS X существует команда [open](https://developer.apple.com/library/mac/#documentation/Darwin/Reference/ManPages/man1/open.1.html "open(1) Mac OS X Manual Page"){: rel="nofollow" }, заменяющая в терминале двойной клик по файлу. `open -a` в терминале заменяет команду "открыть с помощью". Например, что бы открыть из терминала в textmate файл, 
`/etc/hosts`, вполне можно обойтись командой `open /etc/hosts/ -a TextMate`. Несколько файлов открываются командой  <pre><code>open ~/.bashrc ~/.profile -a TextMate</code></pre>

Но команда `open` имеет несколько ограничений. Невозможно открыть файл на определенной строке. Так же невозможно придержать консоль до закрытия файла. Последнее ограничение не позволяет использовать textmate как внешний редактор, например, для git или svn. 

По этому у textmate есть замена неповоротливому `open` - `mate`. Скрипт устанавливатется из textmate-preferences-terminal. `mate` позволяет использовать textmate из терминала, так как-будто это действительно консольное приложение. Например, для того, что бы использовать его как внешний редактор для всех консольных приложений просто добавим это в `./profile`:  
<pre><code>export EDITOR='mate -w'</code></pre>
	
Ключ `-w` - заставляет терминал дождаться закрытия файла, перед продолжением.

## Rmate
### SSH-туннель ###
Если говорить кратко - `ssh`-туннель перенаправляет траффик с определенного порта на любой порт локальной машины посредством `ssh`-соединения. Создадим туннель для того, что бы получить возможность редактировать файлы на сервере с помощью textmate:  
<pre><code>ssh -R 52698:localhost:52698 &lt;user&gt;@&lt;server&gt;</code></pre>
	
Возможно, будет проще обновить настройки `ssh` подключения, для того, что бы туннель всегда создавался автоматически, без ключа `-R` и объявления пробрасываемых портов.  
Для единственного сервера добавим следующие строки в `~/.ssh/config`:  
<pre><code>Host &lt;адрес сервера&gt;
RemoteForward 52698 127.0.0.1:52698</code></pre>

Либо можно использовать тоннель как настройку по-умолчанию, для любого сервера:  
<pre><code>Host *
RemoteForward 52698 127.0.0.1:52698</code></pre>
	

### Установка ###
Создаем новый файл на сервере, скопируем в него содержимое rmate (`preferences > terminal: ссылка rmate `) и дадим права на исполнение:
<pre><code class="bash"># rmate доступен всем пользователям
sudo vi /usr/local/bin/rmate
chmod +x /usr/local/bin/rmate
</code></pre>
<pre><code class="bash"># rmate доступен только текущему пользователю (проверь, есть ли этот каталог в $PATH)
vi ~/bin/rmate
chmod +x ~/bin/rmate
</code></pre>	
	
Альтернативный вариант - использовать команду scp для того, что бы залить скрипт с локальной машины на сервер. Выглядит это примерно так: 
<pre><code>scp /Applications/TextMate.app/Contents/Frameworks/Preferences.framework/Versions/A/Resources/rmate &lt;пользователь&gt;@&lt;сервер.com&gt;:/usr/local/bin/</code></pre>

Вот и все. Больше нам не придется к этому возвращаться.  

Теперь можно использовать `rmate` на сервере. Проверим, как он работает:  
<pre><code class="bash">rmate ~/test.txt</code></pre>
	
Мы должны увидеть новое окно textmate с пустым файлом. Напишем что-нибудь в этом файле. После сохранения файл появится на сервере.

### Известные проблемы ###

#### /usr/bin/env: ruby: No such file or directory ####
На сервере не установлен ruby-интерпретатор. [Michael Newton](http://mike.eire.ca/){: rel="nofollow" } переписал [rmate на php](http://pastebin.com/GcSXtTW2){: rel="nofollow" }. 

#### Warning: remote port forwarding failed for listen port 52698 ####
На сервере 52698 порт уже чем-то занят. Нужно отключиться от сервера, и создать ssh-туннель используя другой порт:  
<pre><code>ssh -R &lt;мой-порт&gt;:localhost:52698 &lt;user&gt;@&lt;server&gt;</code></pre>

Теперь, запуская rmate нужно так же указывать номер порта:  
<pre><code>rmate -p &lt;мой-порт&gt; rmate_rocks.txt</code></pre>

В результате ssh-туннель будет пересылать данные с вашего порта на сервере к порту 52698 на локальной машине. В настройках textmate ничего менять не нужно.

### Заключение ###
`rmate` и `mate` расширяют возможности использования textmate до удаленных серверов и консольных приложений. Здесь можно найти миллион замечательных способов применения этого уютного редактора. Например, можно использовать textmate для того, что бы писать комментарии к коммиту изменений на github:  
<pre><code>export GIT_EDITOR="mate --name 'Git Commit Message' -w -l 1"</code></pre>

Много всего можно придумать, и я очень рад, что погружаться в дебри консоли я буду с комфортным мне редактором кода. 

