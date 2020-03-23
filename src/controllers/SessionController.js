const mongoose = require("mongoose");

const Session = mongoose.model("Session");

module.exports = {
  async index(req, res) {
    const sessions = await Session.find();

    return res.json(sessions);
  },

  async show(req, res) {
    const session = await Session.find(req.params.id);

    return res.json(session);
  },

  async store(req, res) {
    const session = await Session.create(req.body);

    return res.json(session);
  },

  async update(req, res) {
    const session = await Host.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(session);
  }
};
