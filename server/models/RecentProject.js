import mongoose from "mongoose";

const RecentProjectSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
      require: true,
    },
    projectName: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    projectType: {
      type: String,
      enum: ["Domestic", "Commercial"],
      required: true,
    },
    description: {
      type: String,
    },
    picturePath: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const RecentProject = mongoose.model("RecentProject", RecentProjectSchema);
export default RecentProject;
