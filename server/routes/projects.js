import express from "express";
import { body, validationResult } from "express-validator";
import { authenticateToken } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import Project from "../models/Project.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Get all projects (public)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Get projects error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get single project (public)
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Get project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create project (admin only)
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  [
    body("title").notEmpty().trim(),
    body("description").notEmpty(),
    body("technologies").optional().isArray(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
        title,
        description,
        technologies,
        githubLink,
        liveLink,
        featured,
      } = req.body;

      const projectData = {
        title,
        description,
        technologies: technologies ? JSON.parse(technologies) : [],
        githubLink: githubLink || "",
        liveLink: liveLink || "",
        featured: featured === "true" || featured === true,
      };

      if (req.file) {
        projectData.image = `/uploads/images/${req.file.filename}`;
      }

      const project = new Project(projectData);
      await project.save();

      res.status(201).json(project);
    } catch (error) {
      console.error("Create project error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Update project (admin only)
router.put(
  "/:id",
  authenticateToken,
  upload.single("image"),
  [
    body("title").optional().notEmpty().trim(),
    body("description").optional().notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      const {
        title,
        description,
        technologies,
        githubLink,
        liveLink,
        featured,
      } = req.body;

      if (title) project.title = title;
      if (description) project.description = description;
      if (technologies) project.technologies = JSON.parse(technologies);
      if (githubLink !== undefined) project.githubLink = githubLink;
      if (liveLink !== undefined) project.liveLink = liveLink;
      if (featured !== undefined)
        project.featured = featured === "true" || featured === true;

      // Handle image update
      if (req.file) {
        // Delete old image if exists
        if (project.image) {
          const oldImagePath = path.join(
            __dirname,
            "..",
            project.image.replace(/^\//, "")
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        project.image = `/uploads/images/${req.file.filename}`;
      }

      await project.save();
      res.json(project);
    } catch (error) {
      console.error("Update project error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Delete project (admin only)
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete associated image
    if (project.image) {
      const imagePath = path.join(
        __dirname,
        "..",
        project.image.replace(/^\//, "")
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
