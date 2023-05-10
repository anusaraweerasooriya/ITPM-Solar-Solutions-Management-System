import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    products: {
      type: Map,
      of: Number,
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

const User = mongoose.model("User", UserSchema);
export default User;
