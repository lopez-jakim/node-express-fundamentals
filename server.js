const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send("the server is completely running!")
})

app.get('/home', (request, response) => {
    response.send("hi, this is the home page!")
})

app.get('/announcement', (request, response) => {
    response.send("this is the announcement page!")
})

app.get('/about-us', (request, response) => {
    response.send("this is the about us page!")
})

app.listen(4000, () => {
    console.log("the server is running!")
})