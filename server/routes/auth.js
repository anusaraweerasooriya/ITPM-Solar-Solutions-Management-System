import express, { Router } from "express";
import { userRegister, userLogin, getUsers } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/users", getUsers);

export default router;
