const express = require("express");
const routes = express.Router();

const HostController = require("./controllers/HostController");

routes.get("/hosts", HostController.index);
routes.get("/hosts/:id", HostController.show);
routes.post("/hosts", HostController.store);
routes.put("/hosts/:id", HostController.update);

module.exports = routes;
