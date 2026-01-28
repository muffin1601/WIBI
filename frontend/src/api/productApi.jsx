import { supabase } from "../lib/supabase"

export const fetchProducts = async (category) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("status", "Active")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    throw error
  }

  return data ?? []
}

export const fetchProductById = async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching product by ID:", error)
    throw error
  }

  return data
}
