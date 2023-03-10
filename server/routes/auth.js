import express, { Router } from "express";
import { userRegister } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", userRegister);

export default router;
