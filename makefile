# from https://github.com/kizu/kizu.github.com/blob/master/Makefile

build:
        stylus --include-css _stylus/main.styl assets/css/main.css && \

serve:
        jekyll serve --watch --config _config.yml

.PHONY: build