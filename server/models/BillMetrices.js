import mongoose from "mongoose";

const BillMetricsSchema = new mongoose.Schema(
  {
    version: {
      type: String,
    },
    version1Category1Price: {
      type: Number,
      require: true,
    },
    version1Category2Price: {
      type: Number,
      require: true,
    },
    version2Category1Price: {
      type: Number,
      require: true,
    },
    version2Category2Price: {
      type: Number,
      require: true,
    },
    version2Category3Price: {
      type: Number,
      require: true,
    },
    version2Category4Price: {
      type: Number,
      require: true,
    },
    version2Category5Price: {
      type: Number,
      require: true,
    },
    category1FixedCharge: {
      type: Number,
      require: true,
    },
    category2FixedCharge: {
      type: Number,
      require: true,
    },
    category3FixedCharge: {
      type: Number,
      require: true,
    },
    category4FixedCharge: {
      type: Number,
      require: true,
    },
    category5FixedCharge: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const BillMetrics = mongoose.model("BillMetrics", BillMetricsSchema);
export default BillMetrics;
