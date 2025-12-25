NodeJS :
- JavaScript runtime environment (allows dev to run JS code outside of browser)
- the logic/backend for javascript

ExpressJS:
- a web application framework for javascript
- simplify the process of building web applications

for node js setup & initialization:
npm init -y

for express js setup & initialization:
npm install express

node_modules:
- directory in node.js projects that automatically stores all third-party libraries and dependencies needed for project to run.
- when installing a package using ‘npm’, the package and its dependencies are downloaded and placed in this folder.

require() function:
- built-in node.js function that loads other files or libraries into code.
- when calling require(’express’), Node.js looks for the installed express package in node_modules
- gives you access to its function so you can build a web server.

express() function:
- function provided by the express library.
- creates an app object that represents your web server- you use this app variable to define routes, add middleware, and control how your server responds to requests.
    - app.listen:
        - to start a server by listening to a port
    - route:
        - also called route handler, and you decide which data to send back or which action to perform.
        - instruction that says if someone visits a specific URL- it send back a specific response.
        - creates routes with methods such as app.get(), app.post(), etc.
        - handler functions - when a request matches a method & path.

main reference: https://youtu.be/ha_leEpnT30?si=18diFcz3vAek0snd