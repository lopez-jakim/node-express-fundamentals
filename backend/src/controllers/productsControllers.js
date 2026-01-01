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

export async function updateProduct (request, response) {
    try {
        const {title, content, price} = request.body;
        // Sequelize's update() method
        const [updatedRows] = await product.update(
            {title, content, price },
            {where: {id: request.params.id}
        });

        if (!updatedRows) {
            return response.status(404).json({message: "Product not found!"});
        }

        const updatedProduct = await product.findByPk(request.params.id);

        response.status(200).json({message: "Product updated successfully!", 
            product: updatedProduct
        });
    } catch(error) {
        console.error("Error in updateProduct controller", error);
        response.status(500).json({message: "Internal server error!"});
    }
}

export async function deleteProduct (request, response) {
    try {
        const deletedProduct = await product.destroy(
            {where: {id: request.params.id}
        });

        if(!deletedProduct) {
            return response.status(404).json({message: "Product not found!"});
        }

        response.status(500).json({message: "Product deleted Successfuly!"});
    } catch(error) {
        console.error("Error in deleteProduct controller", error);
        response.status(500).json({message: "Internal server error!"});
    }
}