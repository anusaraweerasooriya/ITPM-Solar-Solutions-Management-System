import User from "../models/User.js";
import { HttpError } from "../models/HttpError.js";
import { validationResult } from "express-validator";

export const getMonthlyConsumption = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 403)
    );
  }

  const {
    email,
    category,
    lastReadingDate,
    currReadingDate,
    noOfDays,
    prevMeterReading,
    currMeterReading,
    noOfUnits,
  } = req.body;

  const avgUnitsPerDay = noOfUnits / noOfDays;
  const avgUnitsPerMonth = avgUnitsPerDay * 30;
  console.log(avgUnitsPerDay);
  console.log(avgUnitsPerMonth);

  let categoryV1U1;
  let v1u1price = 30.0;
  let v1u2price = 37.0;

  let v2u1price = 42.0;
  let v2u2price = 42.0;
  let v2u3price = 50.0;
  let v2u4price = 50.0;
  let v2u5price = 75.0;

  let v1u1total = 0;
  let v1u2total = 0;
  let v2u1total = 0;
  let v2u2total = 0;
  let v2u3total = 0;
  let v2u4total = 0;
  let v2u5total = 0;

  let totalPriceForElectricity = 0;
  let totalBill = 0;
  let fixedCharge = 0;

  if (avgUnitsPerMonth <= 60) {
    for (let i = 0; i < avgUnitsPerMonth; i++) {
      if (i < 30) {
        v1u1total = v1u1total + v1u1price;
      } else {
        v1u2total = v1u2total + v1u2price;
      }
    }
    totalPriceForElectricity = v1u1total + v1u2total;
  } else {
    for (let i = 0; i < avgUnitsPerMonth; i++) {
      if (i < 60) {
        v2u1total = v2u1total + v2u1price;
      }
      if (i < 90 && i >= 60) {
        v2u2total = v2u2total + v2u2price;
      }
      if (i < 120 && i >= 90) {
        v2u3total = v2u3total + v2u3price;
      }
      if (i < 180 && i >= 120) {
        v2u4total = v2u4total + v2u4price;
      }
      if (i >= 180) {
        v2u5total = v2u5total + v2u5price;
      }
    }
    totalPriceForElectricity =
      v2u1total + v2u2total + v2u3total + v2u4total + v2u5total;
  }

  if (avgUnitsPerMonth <= 30) {
    fixedCharge = 400.0;
    totalBill = totalPriceForElectricity + fixedCharge;
  }
  if (30 < avgUnitsPerMonth <= 60) {
    fixedCharge = 550.0;
    totalBill = totalPriceForElectricity + fixedCharge;
  }
  if (60 < avgUnitsPerMonth <= 90) {
    fixedCharge = 650.0;
    totalBill = totalPriceForElectricity + fixedCharge;
  }
  if (90 < avgUnitsPerMonth <= 180) {
    fixedCharge = 1500.0;
    totalBill = totalPriceForElectricity + fixedCharge;
  }
  if (avgUnitsPerMonth > 180) {
    fixedCharge = 2000.0;
    totalBill = totalPriceForElectricity + fixedCharge;
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
  });
};
