---
layout: post
title: 'pgadmin column "datconfig" does not exist'
description: ""
category: 
tags: []
---
{% include JB/setup %}

Пару дней назад установил [Postgres.app][] и [pgadmin v1.8.4][]. Но при попытке подключения из pgadmin  к БД получал ошибку 

`ERROR: Column "datconfig" does not exist`

## Решение

Проблема возникает из-за странной сортировки на сайте [pgadmin][] и невнимательности %username%. pgadmin v1.8.4 кажется последней версией, но на самом деле в списке есть версии v1.10.* и старше. Для того, что бы избавиться от ошибки нужно использовать версию pgadmin v1.12.* или [старше][pgadmin v1.16.0]. 

[Postgres.app]: http://postgresapp.com
[pgadmin v1.8.4]: http://www.pgadmin.org
[pgadmin]: http://www.postgresql.org/ftp/pgadmin3/release/
[pgadmin v1.16.0]: http://www.postgresql.org/ftp/pgadmin3/release/v1.16.0/