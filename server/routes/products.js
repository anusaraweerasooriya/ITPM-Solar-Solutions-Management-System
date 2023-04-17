import express from "express";

import { getAdminProducts } from "../controllers/products.js";
import { getProducts } from "../controllers/products.js";

const router = express.Router();

router.get("/adminProducts", getAdminProducts);
router.get("/viewProducts", getProducts);

export default router;