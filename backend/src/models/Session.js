const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true
  },

  startTime: {
    type: Date,
    required: true
  },

  endTime: {
    type: Date,
    required: true
  },

  packetLoss: {
    type: Number,
    required: true
  },

  totalPackets: {
    type: Number,
    required: true
  },

  averageLatency: {
    type: Number,
    required: true
  }
});

mongoose.model("Session", SessionSchema);
