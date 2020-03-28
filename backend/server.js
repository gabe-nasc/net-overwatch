const requireDir = require("require-dir");
const config = require("./config.json");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const { user, pwd } = config["database"];

mongoose.connect(
  `mongodb+srv://${user}:${pwd}@net-overwatch-so0e8.gcp.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
requireDir("./src/models/");
app.use("/api", require("./src/routes"));
app.listen(3001);
