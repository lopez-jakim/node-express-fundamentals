import express from "express"

const router = express.Router();

router.get("/", (request, response) => {
    response.status(200).send("You just fetched the products!");
});

router.post("/", (request, response) => {
    response.status(201).json({message: "You just created a product!"});
});

router.put("/:id", (request, reponse) => {
    response.status(200).json({message: "You just update a product!"});
});

router.delete("/:id", (request, response) => {
    response.status(200).json({message: "You just delete a produce!"});
});

export default router;