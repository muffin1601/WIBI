import axios from "axios"

export const fetchSubcategoriesByCategory = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/categories/${slug}/subcategories`
  )
  return res.data
}
