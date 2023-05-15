import mongoose from "mongoose";

const ProjectPlanSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    servicePack: {
      type: String,
      require: true,
    },
    serviceCharge: {
      type: Number,
      required: true,
    },
    totalCost: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const ProjectPlan = mongoose.model("ProjectPlan", ProjectPlanSchema);
export default ProjectPlan;
