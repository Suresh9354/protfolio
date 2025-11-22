import express from "express";
import { body, validationResult } from "express-validator";
import { authenticateToken } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import Bio from "../models/Bio.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get bio (public)
router.get("/", async (req, res) => {
  try {
    const bio = await Bio.getBio();
    res.json(bio);
  } catch (error) {
    console.error("Get bio error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update bio (admin only)
router.put("/", authenticateToken, upload.single("image"), async (req, res) => {
  try {
    let bio = await Bio.findOne();
    if (!bio) {
      bio = new Bio();
    }

    // Update fields from form data (multipart/form-data sends everything as strings)
    if (req.body.name !== undefined) bio.name = req.body.name;
    if (req.body.title !== undefined) bio.title = req.body.title;
    if (req.body.description !== undefined)
      bio.description = req.body.description;
    if (req.body.email !== undefined) bio.email = req.body.email;
    if (req.body.phone !== undefined) bio.phone = req.body.phone;
    if (req.body.location !== undefined) bio.location = req.body.location;
    if (req.body.resumeLink !== undefined) bio.resumeLink = req.body.resumeLink;

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      if (bio.image) {
        const oldImagePath = path.join(
          __dirname,
          "..",
          bio.image.replace(/^\//, "")
        );
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      bio.image = `/uploads/images/${req.file.filename}`;
    }

    // Handle social links
    if (req.body.socialLinks) {
      try {
        const socialLinks =
          typeof req.body.socialLinks === "string"
            ? JSON.parse(req.body.socialLinks)
            : req.body.socialLinks;
        bio.socialLinks = { ...bio.socialLinks, ...socialLinks };
      } catch (parseError) {
        console.error("Error parsing socialLinks:", parseError);
        // Continue without updating socialLinks if parsing fails
      }
    }

    // Validate required fields
    if (!bio.name || !bio.title || !bio.description) {
      return res.status(400).json({
        message: "Name, title, and description are required",
      });
    }

    await bio.save();
    res.json(bio);
  } catch (error) {
    console.error("Update bio error:", error);
    console.error("Error details:", error.message);
    console.error("Stack:", error.stack);
    res.status(500).json({
      message: "Server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;
