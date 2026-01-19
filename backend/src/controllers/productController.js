import mongoose from "mongoose"
import Product from "../models/Product.js"

// /api/products/:category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params

    const products = await Product.find({
      category,
      status: "Active",
    }).sort({ createdAt: -1 })

    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// /api/products/:category/:subcategory
export const getProductsByCategoryAndSubcategory = async (req, res) => {
  try {
    const { category, subcategory } = req.params

    let products = await Product.find({
      category,
      subcategory,
      status: "Active",
    }).sort({ createdAt: -1 })

    if (products.length === 0) {
      products = await Product.find({
        category,
        status: "Active",
      }).sort({ createdAt: -1 })
    }

    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// /api/products/by-id/:id
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" })
    }

    const product = await Product.findById(id)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

// admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch {
    res.status(400).json({ message: "Invalid product data" })
  }
}
