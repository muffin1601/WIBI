import express from "express"
import {
  getProductsByCategory,
  getProductsByCategoryAndSubcategory,
  getProductById,
  createProduct,
} from "../controllers/productController.js"

const router = express.Router()

// IMPORTANT: order matters
router.get("/by-id/:id", getProductById)
router.get("/:category/:subcategory", getProductsByCategoryAndSubcategory)
router.get("/:category", getProductsByCategory)

// admin
router.post("/", createProduct)

export default router
