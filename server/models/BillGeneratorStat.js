import mongoose from "mongoose";

const BillGeneratorSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      min: 2,
      max: 100,
    },
    category: {
      type: String,
      enum: ["Domestic", "Commercial"],
      required: true,
    },
    noOfDays: {
      type: Number,
      required: true,
    },
    noOfUnits: {
      type: Number,
      required: true,
    },
    avgUnitsPerDay: {
      type: Number,
      required: true,
    },
    avgUnitsPerMonth: {
      type: Number,
      required: true,
    },
    predictedMonthlyBill: {
      type: Number,
      required: true,
    },
    dailyData: Array,
  },
  { timestamps: true }
);

const BillGenStat = mongoose.model("BillGenStat", BillGeneratorSchema);
export default BillGenStat;
