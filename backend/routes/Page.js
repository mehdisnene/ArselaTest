const express = require("express");
const Form = require("../models/Form");
const Page = require("../models/Page");
const router = express.Router();

router.post(
  "/",

  async (req, res) => {
    try {
      const form = await Form.findOne({ title: req.body.form });
      console.log(form);
      const newPage = new Page({
        titlePage: req.body.titlePage,
        descriptionPage: req.body.descriptionPage,
        form: form,
      });

      const page = await newPage.save();

      res.json(page);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const pages = await Page.find();
    res.json(pages);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:title", async (req, res) => {
  try {
    const page = await Page.findOne({ titlePage: req.params.title });

    if (!page) {
      return res.status(404).json({ msg: "Page not found" });
    }
    page.form = await Form.findById(page.form);

    res.json(page);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Page not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
