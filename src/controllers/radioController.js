const express = require("express");
var ObjectId = require("mongoose").Types.ObjectId;
const router = express.Router();
const Radio = require("../models/Radio");
const authMiddleware = require("../middlewares/auth");

/**
 * Create radio
 */
router.post("/create", authMiddleware, async (req, res) => {
  // check if has radio with same name
  let hasName = await Radio.findOne({ name: req.body.name });
  if (hasName) {
    return res.status(400).send({ error: "Radio name already exists." });
  }

  radio = await Radio.create({
    ...req.body,
    user: new ObjectId(req.userId)
  });

  res.send(radio);
});

/**
 * Update radio
 */
router.put("/update", authMiddleware, async (req, res) => {
  let radioId = req.body._id;

  // check if radio exists and belongs to user
  let radioOld = await Radio.findById(radioId);

  // check if user is owner of this radio
  if (!radioOld || radioOld.user != req.userId) {
    return res.status(404).send({ error: "Radio not found." });
  }

  // update and send to user
  await Radio.updateOne({ _id: radioId }, req.body);
  res.send(req.body);
});

/**
 * delete radio
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  let radioId = req.params.id;

  // check if radio exists and belongs to user
  let radioOld = await Radio.findById(radioId);

  // check if user is owner of this radio
  if (!radioOld || radioOld.user != req.userId) {
    return res.status(404).send({ error: "Radio not found." });
  }

  // update and send to user
  await Radio.deleteOne({ _id: radioId });
  res.send("deleted");
});

/**
 * List registered radios by user
 */
router.get("/registered", authMiddleware, async (req, res) => {
  radios = await Radio.find({ user: new ObjectId(req.userId) }).limit(100);
  res.send({ radios: radios });
});

/**
 * Find all radios that match with search param
 */
router.get("/", async (req, res) => {
  const { search } = req.query;
  radios = await Radio.find({ name: { $regex: search, $options: "i" } }).limit(
    20
  );
  res.send({ radios });
});

module.exports = app => app.use("/radio", router);
