install:
	npm install

server:
	node server.js

proc:
	foreman start

deploy:
	git push heroku master

build:
	npm run build

watcher:
	gulp watch

lint:
	npm run lint
