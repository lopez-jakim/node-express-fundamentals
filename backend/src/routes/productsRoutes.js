import express from "express"
import { getAllProduct, createProduct, updateProduct, deleteProduct, getProductById } from "../controllers/productsControllers.js"

const router = express.Router();

router.get("/", getAllProduct);
router.get("/", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;