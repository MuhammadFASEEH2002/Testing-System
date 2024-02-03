const express = require("express");
const app = express();
const mongoose = require("mongoose");
const env = require('dotenv').config();
const cors = require("cors");
const IndexRouter = require('./routes/index.js')



app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
mongoose
  .connect(`${process.env.MONGO_LINK}`)
  .then((res) => {console.log("MongoDB connected"); console.log(process.env.CORS_ORIGIN)})
  .catch((err) => console.log("MongoDb Connection Failed", err));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", IndexRouter);
app.get("/",(req,res)=>{
  res.json("hello")
})

app.listen(process.env.PORT, () => {console.log(`Listening on http://127.0.0.1:${process.env.PORT}`);  console.log(process.env.MONGO_LINK)});