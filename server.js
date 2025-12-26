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

app.get('/products', (request, response) => {
    response.json([
        {id: 1, name: 'Laptop', price: 1299},
        {id: 2, name: 'Chair', price: 1500}
    ])
})

/**
 * implemented route parameters
 */
app.get('/products/:id', (request, response) => {
    const id = Number(request.params.id)

    const products = [
        {id: 1, name: 'Laptop', price: 1299},
        {id: 2, name: 'Chair', price: 1500},
        {id: 3, name: 'Nigga', price: 6969}
    ]

    const requestedProduct = products.find((product) => product.id === id)
    response.json(requestedProduct)
})

app.listen(4000, () => {
    console.log("the server is running!")
})