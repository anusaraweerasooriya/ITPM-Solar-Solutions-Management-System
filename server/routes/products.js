import express from "express";

import { getAdminProducts } from "../controllers/products.js";
import { getProducts } from "../controllers/products.js";
import { updateProduct } from "../controllers/products.js";
import { getProductById } from "../controllers/products.js";
import { deleteProduct } from "../controllers/products.js";

const router = express.Router();

router.get("/adminProducts", getAdminProducts);
router.get("/viewProducts", getProducts);
router.patch("/updateProduct/:prid", updateProduct);
router.get("/getProductById", getProductById);
router.delete("/deleteProduct/:prid", deleteProduct);

export default router;