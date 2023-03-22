import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    planId: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      required: true,
      max: 50,
    },
    client: {
      type: String,
      required: true,
      min: 7,
    },
    projectType: {
      type: String,
      enum: ["Domestic", "Commercial"],
      required: true,
    },
    description: {
      type: String,
    },
    transaction: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["In-progress", "Completed"],
      default: "In-progress",
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
