import express from "express";
import { createProductRequest } from "../controllers/productRequest.js";

const router = express.Router();

router.post("/createProductRequest", createProductRequest);

export default router;