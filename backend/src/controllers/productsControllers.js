import product from "../models/Product.js"

export async function getAllProduct(request, response) {
    try {
        const products = await product.findAll()
        response.status(200).json(products);
    } catch(error) {
        console.error("Error in getAllProducts controller", error);
        response.status(500).json({message: "Internal server error!"});
    }
}   

export async function createProduct (request, response) {
    try {
        const {title, content, price} = request.body
        const newProduct = await product.create({title, content, price});

        response.status(201).json({message: "Product created successfully!", product: newProduct});
    } catch(error){
        console.error("Error in createProduct controller", error);
        response.status(500).json({message: "Internal server error!"});
    }
}

export async function updateProduct (request, reponse) {
    response.status(200).json({message: "You just update a product!"});
}

export async function deleteProduct (request, response) {
    response.status(200).json({message: "You just delete a product!"});
}