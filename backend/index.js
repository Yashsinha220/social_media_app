const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { register } = require("./controllers/auth");
const { authRoute } = require("./routers/authroute.js");
const {userRoute} =require('./routers/userroute.js');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(express.json());
app.use(helmet());
// app.use(helmet.crossOriginEmbedderPolicy({policy : "cross-origin"}))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

/*MIDDLE WEARE SETUP  for the file storage*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  function: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/*MONGOOSE SETUP */
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("data base connected succsefull");
  })
  .catch((e) => {
    console.log("eroor thrown by the server", e);
  });

app.get("/", (req, res, next) => {
  res.send("hi yash");
});

/*Routes with file */
app.post("/auth/register", upload.single("picture"), register);
app.use("/auth", authRoute);
app.use('/users' , userRoute);

app.listen(PORT, () => {
  console.log(`server is running at PORT http://localhost:${PORT}`);
});
