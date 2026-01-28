import { supabase } from "../lib/supabase"

export const fetchCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("status", "Active")         
    .order("name", { ascending: true })

  if (error) {
    console.error("Error fetching categories:", error)
    throw error
  }

  return data ?? []
}



export const fetchCategoryBySlug = async (slug) => {
  const { data, error } = await supabase
    .from("categories")
    .select("catalogue_url")
    .eq("slug", slug)
    .eq("status", "Active")
    .single()

  if (error) {
    console.error("Error fetching category:", error)
    return null
  }

  return data
}
