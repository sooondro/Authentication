*Setting up server
  -create server folder
  -npm init -y - init npm with default options
  -npm install volleyball express bcryptjs
  -in server folder create index.js file
  -create a basic express app in index.js
    -volleyball logs each http requests
  -npm install --save-dev nodemon - used to automatically restart server when files are changed
    -in package.json set scripts to:
    "scripts": {
      "start": "node index.js",
      "dev": "nodemon index.js"
    }
    -npm run dev - to start the script
  -Create router
    -in server folder create a new folder called auth
    -in that folder create index.js
    -require router and export it
    -require the router in the main index.js using relative path
  -in server folder npm install joi for validating
  -in server do npm install monk, then new folder called db in server, then new file connection.js
  -add db in auth index.js

Creating frontend
  -npx @vue/cli create client - creates a client folder and vuecli in it
  -npm run serve starts a autorefreshing webpack server
  -

Loading icon from https://loading.io/

-in server do npm install jsonwebtoken and npm install joi


practiceMake all path function inside controller

Learned in video 6
  -async await
    -replacement for .then syntax on promises
  -controller
