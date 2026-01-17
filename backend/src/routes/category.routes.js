import express from "express"
import {
  getActiveCategories,
  getSubCategoriesByCategorySlug,
  getCategoryBySlug
} from "../controllers/categoryController.js"

const router = express.Router()

// Navbar / Products page
router.get("/", getActiveCategories)

// Category page
router.get("/:slug", getCategoryBySlug)

// Subcategories
router.get("/:slug/subcategories", getSubCategoriesByCategorySlug)


export default router
