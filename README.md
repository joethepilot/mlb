# MLB 2018 Statistics Viewer
All the files needed for the html based viewer are in the public directory.
The viewer consists of just html, css and js files, therefore no specific
web server framework is needed to run the application. Just put this static
content in the proper directory for your web server.

Alternatively, a node.js web server is included, which is set to run on port 3000.

## Install node.js
> sudo apt-get update
> sudo apt-get install nodejs
> sudo apt-get install npm

## Install dependencies specified in package.json for this app to run.
> npm install

## Start the node.js web server
> node app.js

## Load the web page
http://localhost:3000/