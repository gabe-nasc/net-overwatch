const mongoose = require("mongoose");

const Host = mongoose.model("Host");

module.exports = {
  async index(req, res) {
    const hosts = await Host.find();

    return res.json(hosts);
  },

  async show(req, res) {
    const host = await Host.findById(req.params.id);

    return res.json(host);
  },

  async store(req, res) {
    const host = await Host.create(req.body);

    return res.json(host);
  },

  async update(req, res) {
    const host = await Host.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json(host);
  }
};
