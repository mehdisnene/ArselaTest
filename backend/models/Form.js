const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  data: [],
});
const Form = mongoose.model("Form", formSchema);
module.exports = Form;
