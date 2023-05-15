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
      savedPlan.status = "plan-created";
      await savedPlan.save();
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
