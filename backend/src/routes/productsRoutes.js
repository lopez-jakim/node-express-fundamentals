import express from "express"
import { getAllProduct, createProduct, updateProduct, deleteProduct } from "../controllers/productsControllers.js"

const router = express.Router();

router.get("/", getAllProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;