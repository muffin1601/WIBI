import express from "express"
import {
  getProductsByCategory,
  getProductsByCategoryAndSubcategory,
  getSingleProduct,
  createProduct,
} from "../controllers/productController.js"

const router = express.Router()

//  IMPORTANT: specific routes FIRST
router.get("/single/:id", getSingleProduct)

//  category + subcategory
router.get("/:category/:subcategory", getProductsByCategoryAndSubcategory)

//  category only
router.get("/:category", getProductsByCategory)

// admin
router.post("/", createProduct)

export default router
