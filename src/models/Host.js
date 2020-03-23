const mongoose = require("mongoose");

const HostSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  }
});

mongoose.model("Host", HostSchema);
