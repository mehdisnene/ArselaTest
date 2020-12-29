const express = require("express");
const FormData = require("../models/FormData");
const Form = require("../models/Form");
const Page = require("../models/Page");
const router = express.Router();

router.post(
  "/",

  async (req, res) => {
    try {
      const newFormData = new FormData({
        form: req.body.form,
        page: req.body.page,
        data: req.body.data,
      });

      const formData = await newFormData.save();

      res.json(formData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const formDatas = await FormData.find();

    res.json(formDatas);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/byform/:title", async (req, res) => {
  try {
    const form = await Form.findOne({ title: req.params.title });

    const formData = await FormData.find({ form });

    if (!formData) {
      return res.status(404).json({ msg: "Page not found" });
    }
    res.json(formData);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Page not found" });
    }
    res.status(500).send("Server Error");
  }
});
router.get("/bypage/:title", async (req, res) => {
  try {
    const page = await Page.findOne({ titlePage: req.params.title });

    const formData = await FormData.find({ page });

    if (!formData) {
      return res.status(404).json({ msg: "Page not found" });
    }
    res.json(formData);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(404).json({ msg: "Page not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
