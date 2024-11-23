const route = require("express").Router();

const contactController = require("../controllers/contact");

route.get("/", contactController.getContact);
route.patch("/:id", contactController.updateContact);

module.exports = route;
