---
layout: post
title: "Как писался PostgreSQL"
description: "История создания одной из самых популярных баз данных"
keywords: ["postgres", "postgresql", "история", "архитектура"] 
---


<img class="img-center" src="http://31808.selcdn.ru/it-prm/pics/postgresql.png"  />

Разработка СУБД POSTRGES началась в 1986 году под руководством профессора Майкла Стоунбрейкера (Michael Stonebraker). Концепции системы и архитектурные решения представлены в [THE DESIGN OF POSTGRES][]{: rel="nofollow"}, [The POSTGRES data model][]{: rel="nofollow"}, [The design of the POSTGRES rules system][]{: rel="nofollow"}, [The design of the POSTGRES storage system][]{: rel="nofollow"}.

## Прототипы 
В первых версиях POSTGRES было большое количество архитектурных решений. Только после Версии 3 разработчики сконцентрировали свое внимание на переносимости и стабильности СУБД.

*	Первый прототип заработал в 1987 и был продемонстрирован на Конференции ACM-SIGMOD  в 1988 году. 
*	Второй прототип (Версия 1), описанный в [The implementation of POSTGRES][]{: rel="nofollow"} был выпущен в июне 1989 года.
*	Третий прототип (Версия 2), выпущен в Июне 1990 года.
*	Четвертый прототип (Версия 3) выпущен в 1991.

## Поддержка
В 1993 году стало очевидно, что обслуживание прототипа кода и его поддержка занимают гораздо больше времени, чем сами исследования в области баз данных. Пытаясь снизить нагрузку, связанную с поддержкой, проект Беркли POSTGRES официально прекратил своё существование с выходом версии 4.2. 

## Переписывание 
В 1994, Эндрю Ю (Andrew Yu) и Джолли Чен (Jolly Chen) добавили в POSTGRES интерпретатор языка SQL. СУБД была полностью приведена к стандарту ANSI C и сократив свой размер на 25%. Были внесены многие внутренние изменения, которые увеличили производительность и обслуживаемость кода. Postgres95 был быстрее на 30-50% согласно Wisconsin Benchmark по сравнению с POSTGRES, Version 4.2. При разработке Postgres95 акцент ставился на обнаружение и понимание существующих проблем в коде сервера.

## PostgreSQL

В 1996 году было решено, что имя "Postgres95" не соответствует настоящему времени. Для проекта было выбрано название PostgreSQL. Если при разработке Postgres95 внимание разработчиков было сконцентирировано на обнаружении и понимании существующих проблем в коде сервера, то в PostgreSQL внимание сместилось на расширение возможностей и совместимости при продолжении работы во всех других областях.

## Вывод
PostgreSQL — это весьма объемный проект. Путь между прототипом, и версией, имеющей четкую концепцию и всесторонне продуманные архитектурные решения у ребят из Беркли занял 10 лет.



[THE DESIGN OF POSTGRES]: http://db.cs.berkeley.edu/papers/ERL-M85-95.pdf
[The POSTGRES data model]: http://db.cs.berkeley.edu/papers/ERL-M87-13.pdf
[The design of the POSTGRES rules system]: http://postgresql.ru.net/manual/biblio.html#STON87A
[The design of the POSTGRES storage system]: http://db.cs.berkeley.edu/papers/ERL-M87-06.pdf

[The implementation of POSTGRES]: http://db.cs.berkeley.edu/papers/ERL-M90-34.pdf