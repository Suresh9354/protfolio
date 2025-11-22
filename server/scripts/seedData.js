import mongoose from "mongoose";
import dotenv from "dotenv";
import Bio from "../models/Bio.js";
import Project from "../models/Project.js";

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio"
    );
    console.log("Connected to MongoDB");

    // Upsert bio
    const bioData = {
      name: "Suresh S",
      title: "Full-Stack Web Developer",
      description:
        "Leveraging expertise in full-stack web development, particularly within the MERN stack, with hands-on experience in delivering innovative web solutions. Dedicated to enhancing user experiences through responsive design and real-time features, with a focus on creating transformative applications that integrate modern technologies for impactful digital interactions.",
      email: "",
      phone: "+91 9354927361",
      resumeLink:
        "https://drive.google.com/uc?export=download&id=1CqlEVKiR3CuaimP38I7PCLfmPibm7pwr",
      socialLinks: {
        github: "https://github.com/Suresh9354",
        linkedin: "https://www.linkedin.com/in/suresh-s-2565b02a2",
        twitter: "",
        portfolio: "",
      },
    };

    const bio = await Bio.findOneAndUpdate({}, bioData, {
      upsert: true,
      new: true,
    });
    console.log("Bio upserted:", bio.name);

    // Seed projects (avoid duplicates by title)
    const projects = [
      {
        title: "E-Commerce Platform – Local Store Online Shopping System",
        description:
          "Built a full-stack e-commerce web application with secure user authentication (login/register), product catalog, cart, and checkout features. Implemented an Admin Dashboard to manage users, products, and orders with analytics and charts. Integrated image upload with preview, toast notifications, and responsive UI design. Deployed on cloud (AWS/GCP) with CI/CD pipeline and containerized using Docker.",
        technologies: ["MERN", "JWT", "Bootstrap", "REST APIs", "AWS"],
        githubLink: "",
        liveLink: "",
        featured: true,
      },
      {
        title: "Task Management System – Productivity & Collaboration Tool",
        description:
          "Developed a full-stack task management web application with user registration, login, and role-based dashboards. Implemented CRUD operations for tasks, categories, and projects with real-time updates. Added drag-and-drop task assignment, notifications, and responsive UI for both desktop and mobile. Deployed on AWS with Docker containers and integrated CI/CD for smooth updates.",
        technologies: ["MERN", "JWT", "Docker", "REST APIs", "AWS"],
        githubLink: "",
        liveLink: "",
        featured: false,
      },
    ];

    for (const p of projects) {
      const exists = await Project.findOne({ title: p.title });
      if (!exists) {
        await Project.create(p);
        console.log("Inserted project:", p.title);
      } else {
        console.log("Project already exists, skipped:", p.title);
      }
    }

    console.log("Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seed();
