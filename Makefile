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
	node_modules/.bin/gulp watch

lint:
	node_modules/.bin/eslint ./src/*.js
