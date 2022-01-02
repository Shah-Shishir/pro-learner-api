require("dotenv").config();

const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const routes = require("./api/routes/routes");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log(err));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  res.send("<h1>Hello Express!<h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
