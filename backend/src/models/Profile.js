// src/models/Profile.js
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  email: { type: String, required: true },
  full_name: String,
  role: {
    type: String,
    enum: ["user", "admin", "super_admin"],
    default: "user"
  },
  avatar_url: String,
  phone: String,
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Profile", profileSchema);
