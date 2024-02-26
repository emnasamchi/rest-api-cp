const express = require("express");

const app = express();

const mongoose = require("mongoose");

require("dotenv").config();
mongoose.connect(process.env.DB).then(() => {
  console.log("database connected ");
});

const User = require("./models/user");

app.use(express.json());

//  find all users
app.get("/users", async function (req, res) {
  try {
    const users = await User.find();

    res.status(201).json({ message: "found ", data: users });
  } catch (error) {
    res.status(500).json({ message: "errorr" });
  }
});

// create new user
app.post("/create", async function (req, res) {
  try {
    const newUser = await User.create(req.body);

    res.status(201).json({ message: "user created ", data: newUser });
  } catch (error) {
    res.status(500).json({ message: "errorr" });
  }
});

app.put("/update/:id", async function (req, res) {
  try {
    console.log(req.params);
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(201).json({ message: "user updated ", data: updated });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "errorr" });
  }
});
app.delete("/delete/:id", async function (req, res) {
  try {
    console.log(req.params);
    const deleted = await User.findByIdAndDelete(req.params.id);

    res.status(201).json({ message: "user updated ", data: deleted });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "errorr" });
  }
});
app.listen(3000, function () {
  console.log("server on 3000");
});
