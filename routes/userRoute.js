const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const User = require("../models/userModel");
const router = express.Router();

//create

router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
  try {
    const showAllusers = await User.find();

    res.status(200).json(showAllusers);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

//get or read single User
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await User.findById({ _id: id });

    res.status(200).json(singleUser);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const singleUser = await User.findByIdAndDelete({ _id: id });

    res.status(200).json(singleUser);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

//update, put, patch

router.patch("/:id", async (req, res) => {
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

module.exports = router;
