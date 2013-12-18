# from https://github.com/kizu/kizu.github.com/blob/master/Makefile

build:
	stylus -o assets/css/ ./_stylus/main.styl

serve:
	jekyll serve --watch --config _config.yml

.PHONY: build