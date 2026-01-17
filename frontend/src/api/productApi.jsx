import axios from "axios"

const API = `${import.meta.env.VITE_API_URL}/products`

export const fetchProducts = (category, subcategory) => {
  let url = `${API}/${category}`

  if (subcategory) {
    url += `/${subcategory}`
  }

  return axios.get(url).then(res => res.data)
}
