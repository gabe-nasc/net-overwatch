const express = require("express");
const routes = express.Router();

const HostController = require("./controllers/HostController");
const SessionController = require("./controllers/SessionController");

routes.get("/hosts", HostController.index);
routes.get("/hosts/:id", HostController.show);
routes.post("/hosts", HostController.store);
routes.put("/hosts/:id", HostController.update);

routes.get("/sessions", SessionController.index);
routes.get("/sessions/:id", SessionController.show);
routes.get("/current", SessionController.current);
routes.post("/sessions", SessionController.store);
routes.put("/sessions/:id", SessionController.update);

module.exports = routes;
