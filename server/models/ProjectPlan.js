import mongoose from "mongoose";

const ProjectPlanSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    user: {
      type: String,
      require: true,
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
    status: {
      type: String,
      enum: ["paymentPending", "paymentCompleted", "rejected"],
      default: "paymentPending",
    },
  },
  { timestamps: true }
);

const ProjectPlan = mongoose.model("ProjectPlan", ProjectPlanSchema);
export default ProjectPlan;
