const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const formDataSchema = new Schema({
  form: { type: Schema.Types.ObjectId, ref: "Form" },
  page: { type: Schema.Types.ObjectId, ref: "Page" },

  data: [],
});
const FormData = mongoose.model("FormData", formDataSchema);
module.exports = FormData;
