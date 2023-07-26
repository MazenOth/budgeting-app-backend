const express = require("express");
const router = express.Router();
const { Wallet, validate } = require("../models/wallet");
const _ = require("lodash");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let wallet = await Wallet.findOne({ name: req.body.name }).where({
    userId: req.body.userId,
  });
  if (wallet) {
    return res.status(400).send("This wallet name already exists.");
  }
  wallet = new Wallet(
    _.pick(req.body, ["userId", "name", "balance", "currency"])
  );
  wallet = await wallet.save();
  res.send(wallet);
});

module.exports = router;
