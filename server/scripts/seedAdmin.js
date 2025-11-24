// backend/scripts/seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio"
    );
    console.log("✅ Connected to MongoDB");

    const email = "admin@example.com";
    const password = "admin123"; // change later

    // Look for an existing admin with this email
    const existingAdmin = await User.findOne({ email, role: "admin" });
    if (existingAdmin) {
      console.log("ℹ️ Admin user already exists");
      process.exit(0);
    }

    // Create new admin user
    const admin = new User({
      email,
      password,
      role: "admin", // <— important
    });

    await admin.save();

    console.log("✅ Admin user created successfully!");
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
    console.log("⚠️  IMPORTANT: Change this password after first login!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
