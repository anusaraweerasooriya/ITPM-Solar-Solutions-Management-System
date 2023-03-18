import mongoose from "mongoose";

const PlanRequestSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    clientName: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      min: 10,
    },
    type: {
      type: String,
      enum: ["commercial", "domestic"],
      default: "customer",
    },
    companyName: {
      type: String,
      min: 5,
    },
    companyAddress: {
      type: String,
      min: 10,
    },
    monthlyPowerConsumption: {
      type: String,
      enum: ["0-60", "61-120", "121-180", "180-240", "240>"],
      default: "0-60",
    },
    gridType: {
      type: String,
      enum: ["On-Grid", "Off-Grid"],
      default: "On-Grid",
    },
    clientAddress: {
      type: String,
      min: 8,
    },
    description: {
      type: String,
      min: 10,
      required: true,
    },
  },
  { timestamps: true }
);

const PlanRequest = mongoose.model("PlanRequest", PlanRequestSchema);
export default PlanRequest;
