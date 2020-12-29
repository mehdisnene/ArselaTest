require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
app.use(express.static(path.join(__dirname, "../frontend/build")));
mongoose.connect(
  " mongodb+srv://user:user@cluster0.8kudi.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connection to db established"));
app.use(express.json());

app.use("/api/page", require("./routes/Page"));
app.use("/api/form", require("./routes/Form"));
app.use("/api/formData", require("./routes/FormData"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.listen(process.env.PORT, () =>
  console.log(`server has started at port ${process.env.PORT}`)
);
