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
    console.error("Category products error:", err)
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

    // fallback if subcategory has no products
    if (products.length === 0) {
      products = await Product.find({
        category,
        status: "Active",
      }).sort({ createdAt: -1 })
    }

    res.json(products)
  } catch (err) {
    console.error("Subcategory products error:", err)
    res.status(500).json({ message: "Server error" })
  }
}

// /api/products/single/:id
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "Not found" })
    res.json(product)
  } catch (err) {
    res.status(500).json({ message: "Server error" })
  }
}

// admin
export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ message: "Invalid product data" })
  }
}
