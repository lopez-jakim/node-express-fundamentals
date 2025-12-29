import express from "express"
import { createProduct, deleteProduct, getAllNodes, getAllProduct, updateProduct } from "../controllers/productsControllers.js"

const router = express.Router();

router.get("/", getAllProduct);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;