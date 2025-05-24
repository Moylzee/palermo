install:
	npm install -g firebase-tools
	npm init -y
	npm install --save firebase
	npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
	
deploy:
	npx webpack
	firebase deploy