const route = require("express").Router();
const upload = require("../helpers/upload");

const projectController = require("../controllers/project");

const configMulter = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "image2", maxCount: 1 },
  { name: "image3", maxCount: 1 },
]);

route.post("/", configMulter, projectController.createProject);
route.get("/", projectController.getProject);
route.get("/:id", projectController.getProjectByID);
route.patch("/:id", configMulter, projectController.updateProject);
route.delete("/:id", projectController.deleteProject);

module.exports = route;
