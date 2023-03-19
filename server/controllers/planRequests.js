import User from "../models/User.js";
import { HttpError } from "../models/HttpError.js";
import { validationResult } from "express-validator";
import PlanRequest from "../models/PlanRequest.js";

export const submitRequestPlan = async (req, res, next) => {
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
      status: "pending",
      rejectMessage: null,
    });
  } catch (err) {
    const error = new HttpError("Something went wrong! Please try again.", 500);
    return next(error);
  }

  let savedRequest;
  try {
    savedRequest = await createdRequest.save();
  } catch (err) {
    const error = new HttpError(
      "Could not submit the request! Please try again.",
      500
    );
    return next(error);
  }

  res.status(200).json({ savedRequest });
};

export const getRequestPlans = async (req, res, next) => {
  let requests;
  try {
    requests = await PlanRequest.find();
  } catch (err) {
    const error = new HttpError("Failed to fetch data. Please try again!", 404);
    return next(error);
  }

  res.status(200).json(requests);
};

export const getAdminRequestPlans = async (res, req, next) => {
  try {
    const { page = 1, pagSize = 20, sort = null, search = "" } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
      };
      return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const requests = await PlanRequest.find({
      $or: [
        { _id: { $regex: new RegExp(search, "i") } },
        { user: { $regex: new RegExp(search, "i") } },
        { clientName: { $regex: new RegExp(search, "i") } },
        { type: { $regex: new RegExp(search, "i") } },
        { monthlyPowerConsumption: { $regex: new RegExp(search, "i") } },
        { gridType: { $regex: new RegExp(search, "i") } },
        { status: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pagSize)
      .limit(pagSize);

    const total = await PlanRequest.countDocuments({
      _id: { $regex: search, $options: "i" },
    });

    res.status(200).json({ requests, total });
  } catch (err) {
    const error = new HttpError("Something went wrong! Please try again.");
    return next(error);
  }
};
