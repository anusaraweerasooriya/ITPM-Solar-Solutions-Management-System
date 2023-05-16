import express from "express";
import { createProductRequest, getProductRequestById, getAdminProductRequest } from "../controllers/productRequest.js";

const router = express.Router();

router.post("/createProductRequest", createProductRequest);
router.get("/adminProductRequest", getAdminProductRequest);
router.get("/getProductRequestById", getProductRequestById);

export default router;