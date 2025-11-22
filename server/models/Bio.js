import mongoose from "mongoose";

const bioSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    resumeLink: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    socialLinks: {
      github: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      portfolio: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only one bio document exists
bioSchema.statics.getBio = async function () {
  let bio = await this.findOne();
  if (!bio) {
    bio = await this.create({
      name: "Suresh S",
      title: "Full-Stack Web Developer",
      description:
        "Leveraging expertise in full-stack web development, particularly within the MERN stack, with hands-on experience in delivering innovative web solutions. Dedicated to enhancing user experiences through responsive design and real-time features, with a focus on creating transformative applications that integrate modern technologies for impactful digital interactions.",
      // Contact and social links extracted from provided resume image
      email: "",
      phone: "+91 9354927361",
      resumeLink:
        "https://drive.google.com/uc?export=download&id=1CqlEVKiR3CuaimP38I7PCLfmPibm7pwr",
      socialLinks: {
        github: "https://github.com/Suresh9354",
        linkedin: "https://www.linkedin.com/in/suresh-s-2565b02a2",
      },
    });
  }
  return bio;
};

export default mongoose.model("Bio", bioSchema);
