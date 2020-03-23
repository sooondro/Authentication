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
    -require router adn export it
  -require the router in the main index.js using relative path
