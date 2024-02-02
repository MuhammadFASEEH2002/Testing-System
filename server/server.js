// import express from "express";
// import indexRoute from "./routes/index.js";
// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());
// app.use("/", indexRoute);

// app.listen(PORT, () =>
//   console.log(`Server is listening on http://localhost:${PORT}/`)
// );


const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const env = require('dotenv').config()
const cors = require("cors");
const PORT = 5000;
// const verifyToken = require('./middleware/verifyToken')
// const AuthRouter = require("./controllers/Auth");
const IndexRouter = require('./routes/index.js')
// const AdminRouter = require('./routes/adminRoutes')
// const InvesteeRouter = require('./routes/investeeRoutes')
// const InvestorRouter = require('./routes/investorRoutes')



app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
mongoose
  .connect("mongodb+srv://faseeh:Aeiou.123@testing-system.pnoppvs.mongodb.net/")
  .then((res) => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDb Connection Failed", err));
app.use(express.json());
// app.use(express.static('upload'));
app.use(express.urlencoded({ extended: true }));
app.use("/api", IndexRouter);




app.listen(PORT, () => console.log(`Listening on http://127.0.0.1:${PORT}`));