export async function getAllProduct(request, response) {
    response.status(200).send("You just fetched the products!");
}

export async function createProduct (request, response) {
    response.status(201).json({message: "You just created a product!"});
}

export async function updateProduct (request, reponse) {
    response.status(200).json({message: "You just update a product!"});
}

export async function deleteProduct (request, response) {
    response.status(200).json({message: "You just delete a product!"});
}