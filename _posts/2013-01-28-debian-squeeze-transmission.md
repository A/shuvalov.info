---
layout: post
title: "Transmission-daemon"
description: "установка и настройка transmission-daemon на debian squeeze"
keywords: "transmission, torrents, debian"
tags: [homeserver]
---
{% include JB/setup %}

![](http://31808.selcdn.ru/it-prm/pics/transmission.png){: class="img-center" width="270"} 
<br>

## Установка transmission

Установка `transmission-daemon`&nbsp;— штука достаточно простая. Для начала я обновлил пакеты.

	sudo aptitude update
	
Затем я проверил, доступен ли `transmission-daemon`
	
	aptitude search transmission-daemon

В случае, если демон недоступен, его нужно добавить. В файл `/etc/apt/sources.list` нужно дописать подходящий репозиторий. К примеру

	deb http://ftp.de.debian.org/debian squeeze main

Затем заново обновить порты

	sudo aptitude update

И установить transmission

	sudo aptitude install transmission-daemon
	
Скорее всего в процессе установки понадобится подтвердить установку зависимостей. 

## Настройка transmission

Прежде чем править файл с настройками нужно остановить демон — при перезагрузке файл настроек затирается на предыдущий.

	/etc/init.d/transmission-daemon stop

Файл с настройками лежит здесь: 

	/etc/transmission-daemon/settings.json 

Для корректной работы сервиса я изменил следующие настройки:

	{
	  "download-dir": "/home/user/torrents",
	  "rpc-bind-address": "192.168.1.101",
	  "rpc-enabled": true,
	  "rpc-port": 9091, 
	  "rpc-whitelist-enabled": false, 
	  "rpc-username": "User", 
	  "rpc-password": "Password" 
	}

После того, как изменения в файле сохранены&nbsp;— transmission нужно запустить 

	/etc/init.d/transmission-daemon start

## Transmission Remote GUI

Для того, что бы реже вспоминать о сервере с торрент-клиентом я сделал так: директория в которую качаются торренты доступна через `samba`, а для подключения к transmission я использую [Transmission Remote GUI][]{: rel="nofollow"}. Его легко можно назначить дефолтным приложением для открытия torrent-файлов, тогда скачивание торрентов не будет сильно отличаться от utorrent'а.
	
[Transmission Remote GUI]: http://code.google.com/p/transmisson-remote-gui/