import User from "../models/User.js";
import { HttpError } from "../models/HttpError.js";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 403)
    );
  }

  const { fullname, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    const salt = await bcrypt.genSalt();
    hashedPassword = await bcrypt.hash(password, salt);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(err);
  }

  const createdUser = new User({
    name: fullname,
    email,
    password: hashedPassword,
    role: "customer",
  });

  let savedUser;
  try {
    savedUser = await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json(savedUser);
};

export const userLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data", 403)
    );
  }

  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Login failed, please try again.", 500);
    return next(error);
  }

  if (!user) {
    return next(
      new HttpError("User does not exists. Please sign up to continue!", 403)
    );
  }

  const passwordIsMatch = await bcrypt.compare(password, user.password);
  if (!passwordIsMatch) {
    return next(
      new HttpError("Invalid credentials. Please enter correct details!", 403)
    );
  }

  let token;
  try {
    token = jwt.sign({ id: user.__id }, process.env.JWT_SECRET);
  } catch (err) {
    return next(new HttpError("Login failed. Please try again later!", 403));
  }

  delete user.password;

  res.status(200).json({ token, user });
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
