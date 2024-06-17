const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

app.use(cors());

const userRoute = require("./routes/userRoute");

app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) {
        console.error("Error starting server:", err);
      } else {
        console.log("Server is running");
      }
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

app.use(userRoute);
