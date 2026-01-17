import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import mongoose from "mongoose";

// Mongo models
import Product from "../src/models/Product.js";
import Category from "../src/models/Category.js";
import Subcategory from "../src/models/Subcategory.js";
import Profile from "../src/models/Profile.js";
import NewsletterEmail from "../src/models/NewsletterEmail.js";
import CatalogueRequest from "../src/models/CatalogueRequest.js";

// Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Mongo connect
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected ✅");


const migrateNewsletterEmails = async () => {
  const { data } = await supabase.from("newsletter_emails").select("*");
  if (!data) return;
  await NewsletterEmail.insertMany(data);
  console.log("Newsletter emails migrated ✅");
};

const migrateCatalogueRequests = async () => {
  const { data } = await supabase.from("catalogue_requests").select("*");
  if (!data) return;
  await CatalogueRequest.insertMany(data);
  console.log("Catalogue requests migrated ✅");
};

const migrateProfiles = async () => {
  const { data } = await supabase.from("profiles").select("*");
  if (!data) return;
  await Profile.insertMany(data);
  console.log("Profiles migrated ✅");
};

const migrateCategories = async () => {
  const { data } = await supabase.from("categories").select("*");
  const map = {};

  for (const c of data) {
    const doc = await Category.create({
      name: c.name,
      slug: c.slug,
      description: c.description,
      image: c.image,
      catalogue_url: c.catalogue_url,
      status: c.status
    });
    map[c.id] = doc._id;
  }

  for (const c of data) {
    if (c.parent_id) {
      await Category.findByIdAndUpdate(
        map[c.id],
        { parent_id: map[c.parent_id] }
      );
    }
  }

  console.log("Categories migrated ✅");
  return map;
};

const migrateSubcategories = async (categoryMap) => {
  const { data } = await supabase.from("subcategories").select("*");
  const map = {};

  for (const s of data) {
    const doc = await Subcategory.create({
      name: s.name,
      slug: s.slug,
      description: s.description,
      image: s.image,
      status: s.status,
      category_id: categoryMap[s.category_id]
    });
    map[s.id] = doc._id;
  }

  for (const s of data) {
    if (s.parent_subcategory_id) {
      await Subcategory.findByIdAndUpdate(
        map[s.id],
        { parent_subcategory_id: map[s.parent_subcategory_id] }
      );
    }
  }

  console.log("Subcategories migrated ✅");
};

const migrateProducts = async () => {
  const { data } = await supabase.from("products").select("*");

  for (const p of data) {
    await Product.create({
      name: p.name,
      description: p.description,
      category: p.category,
      subcategory: p.subcategory,
      status: p.status,
      data: p.data || {}
    });
  }

  console.log("Products migrated ✅");
};


const runMigration = async () => {
  await migrateNewsletterEmails();
  await migrateCatalogueRequests();
  await migrateProfiles();

  const categoryMap = await migrateCategories();
  await migrateSubcategories(categoryMap);

  await migrateProducts();

  console.log("🎉 DATABASE MIGRATION COMPLETE");
  process.exit();
};

runMigration();
