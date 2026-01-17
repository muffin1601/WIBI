import Category from "../models/Category.js"
import Subcategory from "../models/Subcategory.js"

/**
 * GET all ACTIVE categories 
 * Used for Navbar / Products Mega Menu
 */
export const getActiveCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      status: "Active",
      parent_id: null
    })
      .select("name slug description image")
      .sort({ name: 1 })

    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * GET subcategories by parent category slug
 */
export const getSubCategoriesByCategorySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })

    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    const subcategories = await Subcategory.find({
      category_id: category._id,
      status: "Active",
    }).select("name slug description image")

    res.status(200).json(subcategories)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

/**
 * GET category by slug 
 */
export const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({
      slug: req.params.slug,
      status: "Active"
    })

    if (!category) {
      return res.status(404).json({ message: "Category not found" })
    }

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
