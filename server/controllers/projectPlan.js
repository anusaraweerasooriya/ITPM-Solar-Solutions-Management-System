import { HttpError } from "../models/HttpError.js";
import { validationResult } from "express-validator";
import PlanRequest from "../models/PlanRequest.js";
import ProjectPlan from "../models/ProjectPlan.js";
import ServicePack from "../models/ServicePack.js";

export const createProjectPlanForRequest = async (req, res, next) => {
  const { reqId } = req.params;
  const { serviceCharge, totalCost, description } = req.body;
  let request;
  let servicePacks;
  let servicePack;

  try {
    request = await PlanRequest.findById(reqId);
  } catch (err) {
    const error = HttpError("Could'nt find the request", 500);
    return next(error);
  }

  try {
    servicePacks = await ServicePack.find();
  } catch (err) {
    const error = HttpError("Could'nt find the request", 500);
    return next(error);
  }

  if (request.monthlyPowerConsumption === "0-60") {
    servicePack = servicePacks.find((pack) => pack.name === "OffGridPackOne");
  }
  if (request.monthlyPowerConsumption === "61-120") {
    servicePack = servicePacks.find((pack) => pack.name === "OffGridPackTwo");
  }
  if (request.monthlyPowerConsumption === "121-180") {
    servicePack = servicePacks.find((pack) => pack.name === "OffGridPackTwo");
  }
  if (request.monthlyPowerConsumption === "180-240") {
    servicePack = servicePacks.find((pack) => pack.name === "OffGridPackTwo");
  }
  if (request.monthlyPowerConsumption === "240>") {
    servicePack = servicePacks.find((pack) => pack.name === "OffGridPackThree");
  }
  // if (request.gridType === "Off-Grid") {
  // }

  // if (request.gridType === "On-Grid") {
  //   if (request.monthlyPowerConsumption === "0-60") {
  //   }
  //   if (request.monthlyPowerConsumption === "61-120") {
  //   }
  //   if (request.monthlyPowerConsumption === "121-180") {
  //   }
  //   if (request.monthlyPowerConsumption === "180-240") {
  //   }
  //   if (request.monthlyPowerConsumption === "240>") {
  //   }
  // }

  let createdPlan;
  let savedPlan;
  try {
    createdPlan = new ProjectPlan({
      requestId: reqId,
      user: request.user,
      servicePack: servicePack._id,
      serviceCharge,
      totalCost,
      description,
    });
    savedPlan = await createdPlan.save();
  } catch (err) {
    const error = new HttpError(
      "Could'nt create the plan. please try again!",
      500
    );
    return next(error);
  }

  if (savedPlan) {
    try {
      request.status = "plan-created";
      await request.save();
    } catch (err) {
      const error = new HttpError("Couldn't update the request", 500);
      return next(error);
    }
  }

  res.status(200).json({ savedPlan });
};

export const getServicePackById = async (req, res, next) => {
  const { servicePack } = req.params;
  let pack;

  try {
    pack = await ServicePack.findById(servicePack);
  } catch (err) {
    const error = new HttpError("Couldn't find the service pack", 500);
    return next(error);
  }

  res.status(200).json({ pack });
};

export const getServicePackByRequest = async (req, res, next) => {
  const { reqID } = req.params;
  let packs;
  let request;
  let pack;

  try {
    request = await PlanRequest.findById(reqID);
    console.log(request);
  } catch (err) {
    const error = HttpError("Could'nt find the request", 500);
    return next(error);
  }

  try {
    packs = await ServicePack.find();
  } catch (err) {
    const error = new HttpError("Couldn't find the service pack", 500);
    return next(error);
  }
  if (request.monthlyPowerConsumption === "0-60") {
    pack = packs.find((pack) => pack.name === "OffGridPackOne");
  }
  if (request.monthlyPowerConsumption === "61-120") {
    pack = packs.find((pack) => pack.name === "OffGridPackTwo");
  }
  if (request.monthlyPowerConsumption === "121-180") {
    pack = packs.find((pack) => pack.name === "OffGridPackTwo");
  }
  if (request.monthlyPowerConsumption === "180-240") {
    pack = packs.find((pack) => pack.name === "OffGridPackTwo");
  }
  if (request.monthlyPowerConsumption === "240>") {
    pack = packs.find((pack) => pack.name === "OffGridPackThree");
  }

  res.status(200).json({ pack });
};

export const getAdminProjectPlans = async (req, res, next) => {
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

    const plans = await ProjectPlan.find({
      $or: [
        { requestId: { $regex: new RegExp(search, "i") } },
        { servicePack: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await PlanRequest.countDocuments({
      clientName: { $regex: search, $options: "i" },
    });

    res.status(200).json({
      plans,
      total,
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError("Something went wrong! Please try again.", 404);
    return next(error);
  }
};

export const getProjectPlansByUser = async (req, res, next) => {
  const { user } = req.params;

  let plans;

  try {
    plans = await ProjectPlan.find({ user });
  } catch (err) {
    const error = new HttpError("Comething went wrong please try again", 500);
    return next(err);
  }

  res.status(200).json(plans);
};

export const getProjectPlanById = async (req, res, next) => {
  const { planId } = req.params;

  try {
    const plan = await ProjectPlan.findById(planId);
    res.status(200).json(plan);
  } catch (err) {
    const error = new HttpError("Something wen wrong", 500);
    return next(error);
  }
};
