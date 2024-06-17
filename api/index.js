const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = process.env.PORT || 3000
const User = require('../models/userModel')
dotenv.config();

app.use(cors());

// const userRoute = require("./routes/userRoute");

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


  app.post("/", async (req, res) => {
    const { name, email, age } = req.body;
  
    try {
      const userAdded = await User.create({
        name: name,
        email: email,
        age: age,
      });
  
      res.status(201).json(userAdded);
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(400).json({ error: err.message });
    }
  });
  
  //read or get
  app.get("/", async (req, res) => {
    try {
      const showAllusers = await User.find();
  
      res.status(200).json(showAllusers);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });
  
  //get or read single User
  app.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const singleUser = await User.findById({ _id: id });
  
      res.status(200).json(singleUser);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });
  
  //delete
  app.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const singleUser = await User.findByIdAndDelete({ _id: id });
  
      res.status(200).json(singleUser);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });
  
  //update, put, patch
  
  app.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
  
    try {
      const updateUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      res.status(200).json(updateUser);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  });

// app.use(userRoute);
app.listen(PORT, () => {
  console.log('Server is started');
})
