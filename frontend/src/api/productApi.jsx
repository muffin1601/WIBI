import axios from "axios"

const API = `${import.meta.env.VITE_API_URL}/products`

export const fetchProducts = async (category, subcategory) => {
  let url = `${API}/${category}`
  if (subcategory) url += `/${subcategory}`
  const res = await axios.get(url)
  return res.data
}

export const fetchProductById = async (id) => {
  const res = await axios.get(`${API}/by-id/${id}`)
  return res.data
}
