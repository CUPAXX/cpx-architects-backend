const route = require("express").Router();
const upload = require("../helpers/upload");

const galleryController = require("../controllers/gallery");

route.post("/", upload.single("image"), galleryController.createGallery);
route.get("/", galleryController.getGallery);
route.get("/:id", galleryController.getGalleryByID);
route.patch("/:id", upload.single("image"), galleryController.updateGallery);
route.delete("/:id", galleryController.deleteGallery);

module.exports = route;
