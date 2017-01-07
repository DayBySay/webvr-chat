install:
	npm install

server:
	node server.js

proc:
	foreman start

deploy:
	git push heroku master
