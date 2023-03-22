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
import { createRuralProject } from "./controllers/ruralProjects.js";
import ruralRoutes from "./routes/ruralProjects.js";
import billRoutes from "./routes/bill.js";
import requestRoutes from "./routes/requests.js";

/* MIDDLEWARE CONFIGURATION =====================*/
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: false }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(cors());
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

/* ROUTES =====================*/
app.use("/auth", authRoutes);
app.use("/projects", ruralRoutes);
app.use("/bill", billRoutes);
app.use("/requests", requestRoutes);

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

    // BillMetrics.insertMany({
    //   version: "Version1",
    //   version1Category1Price: 30.0,
    //   version1Category2Price: 37.0,
    //   version2Category1Price: 42.0,
    //   version2Category2Price: 42.0,
    //   version2Category3Price: 50.0,
    //   version2Category4Price: 50.0,
    //   version2Category5Price: 75.0,
    //   category1FixedCharge: 400.0,
    //   category2FixedCharge: 550.0,
    //   category3FixedCharge: 650.0,
    //   category4FixedCharge: 1500.0,
    //   category5FixedCharge: 2000.0,
    // });
  })
  .catch((error) => console.log(`${error} did not connect`));
