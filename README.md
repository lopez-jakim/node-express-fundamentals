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
### Java Script Object Notation (JSON):
- text format used to represent structured data.

### Express' Helper Method:
- #### response.json()
    - to send .json reponse to the frontend.

### Route Parameter:
- a variable inside the URL that lets your server handle dynamic values like:
    - /products/5
    - /user/abc123
    - /coordinator/ferrer
- in express, you write this with a colon (:), for example:
    - /products/:id
        - whatever replaces :id in the URL becomes available as `request.params.id` in your route handler.

main reference: https://youtu.be/ha_leEpnT30?si=18diFcz3vAek0snd