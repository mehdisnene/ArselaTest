const express = require("express");
const Form = require("../models/Form");
const router = express.Router();

router.post(
  "/",

  async (req, res) => {
    try {
      const newForm = new Form({
        title: req.body.title,
        data: req.body.data,
      });

      const form = await newForm.save();

      res.json(form);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const forms = await Form.find();

    res.json(forms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:title", async (req, res) => {
  try {
    const form = await Form.findOne({ title: req.params.title });

    if (!form) {
      return res.status(404).json({ msg: "Page not found" });
    }
    res.json(form);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Page not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
