const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const authConfig = require("../config/auth.json");

router.post("/authenticate", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select("+password");
    if (user) {
      // user exists? check password
      if (!(await bcrypt.compare(password, user.password))) {
        return res
          .status(400)
          .send({ error: "E-mail registered but password is invalid." });
      }
    } else {
      // create user on mongo
      user = await User.create(req.body);
    }

    user.password = undefined;
    return res.send({
      user,
      token: jwt.sign({ id: user.id }, authConfig.secret)
    });
  } catch (e) {
    return res.status(400).send({ error: "Registration failed" + e.message });
  }
});

module.exports = app => app.use("/auth", router);
