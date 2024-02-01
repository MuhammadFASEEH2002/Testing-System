import express from "express";
const router = express.Router();
// import { db } from "../models/index.js";
//import ctrlCourse from "../controllers/courseController.js";

router.get("/msg", (req, res) => {
  res.json({ msg: "Hello World" });
});



export default router;