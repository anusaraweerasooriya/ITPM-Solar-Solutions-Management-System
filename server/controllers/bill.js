import User from "../models/User.js";
import { HttpError } from "../models/HttpError.js";
import { validationResult } from "express-validator";
import BillMetrics from "../models/BillMetrices.js";
import BillGenStat from "../models/BillGeneratorStat.js";

export const getMonthlyConsumption = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 403)
    );
  }

  const { email, category, noOfDays, noOfUnits } = req.body;
  console.log(noOfDays, noOfUnits);
  const avgUnitsPerDay = noOfUnits / noOfDays;
  const avgUnitsPerMonth = avgUnitsPerDay * 30;
  console.log(avgUnitsPerDay);
  console.log(avgUnitsPerMonth);

  let metrics;
  let v1u1price;
  let v1u2price;

  let v2u1price;
  let v2u2price;
  let v2u3price;
  let v2u4price;
  let v2u5price;
  let priceList;
  let noOfUnitsList;

  try {
    metrics = await BillMetrics.findOne({ version: "Version1" });
    v1u1price = metrics.version1Category1Price;
    v1u2price = metrics.version1Category2Price;

    v2u1price = metrics.version2Category1Price;
    v2u2price = metrics.version2Category2Price;
    v2u3price = metrics.version2Category3Price;
    v2u4price = metrics.version2Category4Price;
    v2u5price = metrics.version2Category5Price;
    priceList = [
      { v1u1price },
      { v1u2price },
      { v2u1price },
      { v2u2price },
      { v2u3price },
      { v2u4price },
      { v2u5price },
    ];
  } catch (error) {
    next(new HttpError("Failed to fetch data from the server!"));
  }

  let v1u1total = 0;
  let v1u2total = 0;
  let v2u1total = 0;
  let v2u2total = 0;
  let v2u3total = 0;
  let v2u4total = 0;
  let v2u5total = 0;

  let v1u1units = 0;
  let v1u2units = 0;
  let v2u1units = 0;
  let v2u2units = 0;
  let v2u3units = 0;
  let v2u4units = 0;
  let v2u5units = 0;

  let totalPriceForElectricity = 0;
  let totalBill = 0;
  let fixedCharge = 0;

  let dailyBill = [];
  let dailyTotal = 0;
  let dailyUnits = 0;

  if (avgUnitsPerMonth <= 60) {
    for (let i = 0; i < avgUnitsPerMonth; i++) {
      if (i < 30) {
        v1u1total = v1u1total + v1u1price;
        v1u1units = v1u1units + 1;
      }
      if (i >= 30) {
        v1u2total = v1u2total + v1u2price;
        v1u2units = v1u2units + 1;
      }

      if ((i + 1) % avgUnitsPerDay == 0) {
        dailyUnits = i + 1;
        dailyTotal = v1u1total + v1u2total;
        dailyBill.push({ dailyUnits, dailyTotal });
      }
    }

    console.log(v1u1total, v1u2total);
    totalPriceForElectricity = v1u1total + v1u2total;
  }
  if (avgUnitsPerMonth > 60) {
    for (let i = 0; i < avgUnitsPerMonth; i++) {
      if (i < 60) {
        v2u1total = v2u1total + v2u1price;
        v2u1units = v2u1units + 1;
      }
      if (i < 90 && i >= 60) {
        v2u2total = v2u2total + v2u2price;
        v2u2units = v2u2units + 1;
      }
      if (i < 120 && i >= 90) {
        v2u3total = v2u3total + v2u3price;
        v2u3units = v2u3units + 1;
      }
      if (i < 180 && i >= 120) {
        v2u4total = v2u4total + v2u4price;
        v2u4units = v2u4units + 1;
      }
      if (i >= 180) {
        v2u5total = v2u5total + v2u5price;
        v2u5units = v2u5units + 1;
      }

      if ((i + 1) % avgUnitsPerDay == 0) {
        dailyUnits = i + 1;
        dailyTotal = v2u1total + v2u2total + v2u3total + v2u4total + v2u5total;
        dailyBill.push({ dailyUnits, dailyTotal });
      }
    }

    totalPriceForElectricity =
      v2u1total + v2u2total + v2u3total + v2u4total + v2u5total;
  }
  noOfUnitsList = [
    { v1u1units },
    { v1u2units },
    { v2u1units },
    { v2u2units },
    { v2u3units },
    { v2u4units },
    { v2u5units },
  ];

  let updatedBill;
  if (dailyBill) {
    console.log("length: ", dailyBill.length);
    const period = parseFloat((30.0 / dailyBill.length).toFixed(2));
    console.log("period", period);

    let i = 0;
    const updatedBill = dailyBill.map((obj) => {
      i = i + period;
      obj.day = i;
    });
  }

  if (avgUnitsPerMonth <= 30) {
    fixedCharge = metrics.category1FixedCharge;
    totalBill = totalPriceForElectricity + fixedCharge;
  }
  if (avgUnitsPerMonth > 30 && avgUnitsPerMonth <= 60) {
    fixedCharge = metrics.category2FixedCharge;
    totalBill = totalPriceForElectricity + fixedCharge;
  }
  if (avgUnitsPerMonth > 60 && avgUnitsPerMonth <= 90) {
    fixedCharge = metrics.category3FixedCharge;
    totalBill = totalPriceForElectricity + fixedCharge;
  }
  if (avgUnitsPerMonth > 90 && avgUnitsPerMonth <= 180) {
    fixedCharge = metrics.category4FixedCharge;
    totalBill = totalPriceForElectricity + fixedCharge;
  }
  if (avgUnitsPerMonth > 180) {
    fixedCharge = metrics.category5FixedCharge;
    totalBill = totalPriceForElectricity + fixedCharge;
  }
  console.log(fixedCharge);
  dailyBill.push({
    dailyUnits: avgUnitsPerMonth,
    dailyTotal: totalBill,
    day: "last",
  });

  let data;
  try {
    const generatedData = new BillGenStat({
      email,
      category,
      noOfDays,
      noOfUnits,
      avgUnitsPerDay: avgUnitsPerDay,
      avgUnitsPerMonth: avgUnitsPerMonth,
      predictedMonthlyBill: totalBill,
      dailyData: dailyBill,
    });

    data = await generatedData.save();
  } catch (err) {
    const error = new HttpError("Something went wrong! Please try again.", 403);
    return next(error);
  }

  res.status(200).json({
    v1u1total,
    v1u2total,
    v2u1total,
    v2u2total,
    v2u3total,
    v2u4total,
    v2u5total,
    totalPriceForElectricity,
    fixedCharge,
    totalBill,
    dailyBill,
    data,
    priceList,
    noOfUnitsList,
  });
};
