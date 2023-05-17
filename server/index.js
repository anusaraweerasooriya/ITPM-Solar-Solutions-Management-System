import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import {
  createRuralProject,
  updateRuralProject,
} from "./controllers/ruralProjects.js";
import ruralRoutes from "./routes/ruralProjects.js";
import donationRoutes from "./routes/donations.js";
import billRoutes from "./routes/bill.js";
import { createProduct } from "./controllers/products.js";
import productsRoutes from "./routes/products.js";
import projectRoutes from "./routes/projects.js";
import recentProjectRoutes from "./routes/recentProjects.js";
import requestRoutes from "./routes/requests.js";
import projectPlanRoutes from "./routes/projectPlan.js";
import { addRecentProject } from "./controllers/recentProjects.js";
//import {ProductRequest} from "./controllers/productRequest.js"
import productRequestRoutes from "./routes/productRequest.js";

/* MIDDLEWARE CONFIGURATION =====================*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

app.options("*", cors());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE =================================*/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* ROUTES WITH FILE UPLOAD ================================= */
app.post("/ruralproject", upload.single("imagePath"), createRuralProject);
app.post("/createProduct", upload.single("imagePath"), createProduct);
app.post("/addRecentProject", upload.single("picturePath"), addRecentProject);

/* ROUTES =====================*/
app.use("/auth", authRoutes);
app.use("/projects", ruralRoutes);
app.use("/bill", billRoutes);
app.use("/products", productsRoutes);
app.use("/donations", donationRoutes);
app.use("/projects", projectRoutes);
app.use("/recentProjects", recentProjectRoutes);
app.use("/requests", requestRoutes);
app.use("/plans", projectPlanRoutes);
app.patch("/updateRuralProject/:pid", updateRuralProject);
app.use("/productRequests", productRequestRoutes);
/* ERROR HANDLING MIDDLEWARE =================================*/
app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

/* MONGOOSE SETUP =====================*/
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
