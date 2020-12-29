const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pageSchema = new Schema({
  titlePage: {
    type: String,
    required: true,
  },
  descriptionPage: String,
  form: { type: Schema.Types.ObjectId, ref: "Form" },
});
const Page = mongoose.model("Page", pageSchema);
module.exports = Page;
