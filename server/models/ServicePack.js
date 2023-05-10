import mongoose from "mongoose";

const ServicePackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    products: {
      type: Map,
      of: Number,
    },
    monthlyPowerConsumption: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const ServicePack = mongoose.model("ServicePack", ServicePackSchema);
export default ServicePack;
