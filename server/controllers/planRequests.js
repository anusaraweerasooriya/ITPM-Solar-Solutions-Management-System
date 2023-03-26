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

export const getAdminRequestPlans = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

    //format sort
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
        { user: { $regex: new RegExp(search, "i") } },
        { clientName: { $regex: new RegExp(search, "i") } },
        { type: { $regex: new RegExp(search, "i") } },
        { monthlyPowerConsumption: { $regex: new RegExp(search, "i") } },
        { gridType: { $regex: new RegExp(search, "i") } },
        { status: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await PlanRequest.countDocuments({
      clientName: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      requests,
      total,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong! Please try again.", 404);
    return next(error);
  }
};

export const getRequestsByUser = async (req, res, next) => {
  try {
    const { user } = req.query;

    const userPendingRequests = await PlanRequest.find({
      status: "pending",
      user,
    });
    console.log(userPendingRequests);

    res.status(200).json(userPendingRequests);
  } catch (err) {
    const error = new HttpError("Something went wrong! Please try again.", 404);
    return next(error);
  }
};

export const updatePendingRequest = async (res, req, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 403)
    );
  }

  const {
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

  const requestId = req.params.rid;

  let request;
  try {
    request = await PlanRequest.findById(requestId);
  } catch (err) {
    const error = new HttpError("Something went wrong. Please try again.", 422);
    return next(error);
  }

  request.clientName = clientName;
  request.email = email;
  request.phone = phone;
  request.type = type;
  request.companyName = companyName;
  request.companyAddress = companyAddress;
  request.monthlyPowerConsumption = monthlyPowerConsumption;
  request.gridType = gridType;
  request.clientAddress = clientAddress;
  request.description = description;

  try {
    await request.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not update the request",
      500
    );
    return next(error);
  }

  res.status(200).json({ request });
};
