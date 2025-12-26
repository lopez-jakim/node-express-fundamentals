## NodeJS :
- javascript runtime environment (allows dev to run JS code outside of browser).
- the logic/backend for javascript.

for nodejs setup & initialization:
`npm init -y`

## ExpressJS:
- a web application framework for javascript.
- simplify the process of building web applications.

for expressjs setup & initialization:
`npm install express`

---
### thing to remember:
- script tags: 
    < script >
    < / script >
- click event listener (`button.addEventListener`)
    - to send a     get request to the express backend.
- fetch() function
    - provide its path to the backend.
- Cross Origin Resource Sharing (CORS):
    - forces the browser to check if the frontend is allowed to talk to the back end.
    - if not allowed, the request is simply blocked.
    - important security layer to prevent unallowed access.
    - if the server (backend) and frontend running in a different ports, it will be treated as different "origins" (cross-origins).
    - to install the cors package: `npm install cors`

main reference: https://youtu.be/ha_leEpnT30?si=18diFcz3vAek0snd