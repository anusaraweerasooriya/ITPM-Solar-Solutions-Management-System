import User from "../models/User.js";
import { HttpError } from "../models/HttpError.js";
import { validationResult } from "express-validator";
import PlanRequest from "../models/PlanRequest.js";

export const submitRequestPlan = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 403)
    );
  }

  const {
    user,
    clientName,
    email,
    phone,
    type,
    companyName,
    companyAddress,
    monthlyPowerConsumption,
    gridType,
    clientAddress,
    description,
  } = req.body;

  let createdRequest;
  try {
    createdRequest = new PlanRequest({
      user,
      clientName,
      email,
      phone,
      type,
      companyName,
      companyAddress,
      monthlyPowerConsumption,
      gridType,
      clientAddress,
      description,
    });
  } catch (err) {
    const error = new HttpError("Something went wrong! Please try again.", 500);
  }

  let savedRequest;
};
