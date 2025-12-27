const express = require('express')
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// ============================================
// SAMPLE DATA (In-Memory Database)
// ============================================

// Messages data
const messages = [
    { id: 1, title: "Welcome", content: "Welcome to our API!", author: "Admin" },
    { id: 2, title: "Update", content: "System will be updated soon", author: "System" },
    { id: 3, title: "Announcement", content: "New features coming!", author: "Team" }
]

// Products data
const products = [
    { id:  1, name: "Laptop", price: 45000, category: "Electronics", stock: 15 },
    { id: 2, name: "Mouse", price: 500, category: "Electronics", stock:  50 },
    { id: 3, name: "Keyboard", price: 1200, category: "Electronics", stock: 30 },
    { id: 4, name: "Monitor", price: 8000, category: "Electronics", stock: 20 },
    { id: 5, name: "Headphones", price: 2500, category: "Electronics", stock:  25 }
]

// ============================================
// BASIC ROUTES (from your original code)
// ============================================

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

// ============================================
// REST API ENDPOINTS - MESSAGES
// ============================================

// GET all messages
app.get('/api/messages', (request, response) => {
    response.status(200).json({
        success: true,
        count: messages.length,
        data: messages
    })
})

// GET single message by ID (Route Parameter)
app.get('/api/messages/:id', (request, response) => {
    const messageId = parseInt(request.params.id)
    const message = messages.find(msg => msg.id === messageId)
    
    if (!message) {
        return response.status(404).json({
            success: false,
            message: `Message with ID ${messageId} not found`
        })
    }
    
    response.status(200).json({
        success: true,
        data: message
    })
})

// GET messages by author (Query Parameter)
app.get('/api/messages/filter/author', (request, response) => {
    const author = request.query.author
    
    if (!author) {
        return response.status(400).json({
            success: false,
            message: "Please provide an author query parameter"
        })
    }
    
    const filteredMessages = messages.filter(msg => 
        msg.author. toLowerCase() === author.toLowerCase()
    )
    
    response.status(200).json({
        success: true,
        count: filteredMessages.length,
        data: filteredMessages
    })
})

// POST - Create new message
app.post('/api/messages', (request, response) => {
    const { title, content, author } = request. body
    
    // Simple validation
    if (!title || ! content || !author) {
        return response.status(400).json({
            success: false,
            message: "Please provide title, content, and author"
        })
    }
    
    const newMessage = {
        id: messages.length + 1,
        title,
        content,
        author
    }
    
    messages. push(newMessage)
    
    response.status(201).json({
        success: true,
        message: "Message created successfully",
        data: newMessage
    })
})

// ============================================
// REST API ENDPOINTS - PRODUCTS
// ============================================

// GET all products
app. get('/api/products', (request, response) => {
    response.status(200).json({
        success: true,
        count: products.length,
        data: products
    })
})

// GET single product by ID (Route Parameter)
app.get('/api/products/:id', (request, response) => {
    const productId = parseInt(request.params.id)
    const product = products.find(prod => prod.id === productId)
    
    if (!product) {
        return response.status(404).json({
            success: false,
            message: `Product with ID ${productId} not found`
        })
    }
    
    response.status(200).json({
        success: true,
        data: product
    })
})

// GET products by category (Route Parameter)
app.get('/api/products/category/:category', (request, response) => {
    const category = request.params.category
    const filteredProducts = products.filter(prod => 
        prod.category.toLowerCase() === category.toLowerCase()
    )
    
    if (filteredProducts.length === 0) {
        return response. status(404).json({
            success: false,
            message:  `No products found in category: ${category}`
        })
    }
    
    response.status(200).json({
        success: true,
        count: filteredProducts.length,
        data: filteredProducts
    })
})

// GET products with price filter (Query Parameters)
app.get('/api/products/filter/price', (request, response) => {
    const { min, max } = request.query
    
    let filteredProducts = [... products]
    
    if (min) {
        filteredProducts = filteredProducts.filter(prod => prod.price >= parseInt(min))
    }
    
    if (max) {
        filteredProducts = filteredProducts.filter(prod => prod.price <= parseInt(max))
    }
    
    response.status(200).json({
        success: true,
        count: filteredProducts.length,
        data: filteredProducts
    })
})

// POST - Create new product
app.post('/api/products', (request, response) => {
    const { name, price, category, stock } = request.body
    
    // Simple validation
    if (!name || !price || !category || stock === undefined) {
        return response.status(400).json({
            success: false,
            message: "Please provide name, price, category, and stock"
        })
    }
    
    const newProduct = {
        id: products.length + 1,
        name,
        price: parseFloat(price),
        category,
        stock: parseInt(stock)
    }
    
    products.push(newProduct)
    
    response.status(201).json({
        success: true,
        message: "Product created successfully",
        data:  newProduct
    })
})

// PUT - Update product by ID
app.put('/api/products/:id', (request, response) => {
    const productId = parseInt(request.params.id)
    const productIndex = products.findIndex(prod => prod.id === productId)
    
    if (productIndex === -1) {
        return response.status(404).json({
            success: false,
            message: `Product with ID ${productId} not found`
        })
    }
    
    const { name, price, category, stock } = request.body
    
    // Update only provided fields
    if (name) products[productIndex].name = name
    if (price) products[productIndex].price = parseFloat(price)
    if (category) products[productIndex].category = category
    if (stock !== undefined) products[productIndex].stock = parseInt(stock)
    
    response.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: products[productIndex]
    })
})

// DELETE - Delete product by ID
app.delete('/api/products/:id', (request, response) => {
    const productId = parseInt(request.params.id)
    const productIndex = products.findIndex(prod => prod.id === productId)
    
    if (productIndex === -1) {
        return response.status(404).json({
            success: false,
            message: `Product with ID ${productId} not found`
        })
    }
    
    const deletedProduct = products.splice(productIndex, 1)
    
    response.status(200).json({
        success: true,
        message: "Product deleted successfully",
        data: deletedProduct[0]
    })
})

// ============================================
// ERROR HANDLING - 404 for undefined routes
// ============================================

app.use((request, response) => {
    response.status(404).json({
        success: false,
        message: "Route not found"
    })
})

// ============================================
// START SERVER
// ============================================

app. listen(4000, () => {
    console.log("the server is running on port 4000!")
    console.log("API endpoints available at http://localhost:4000/api")
})