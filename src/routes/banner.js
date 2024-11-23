const route = require("express").Router();
const upload = require("../helpers/upload");

const bannerController = require("../controllers/banner");

//const configMulter = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image2', maxCount: 1 }])

route.post("/", upload.single("image"), bannerController.createBanner);
route.get("/", bannerController.getBanner);
route.get("/:id", bannerController.getBannerByID);
route.patch("/:id", upload.single("image"), bannerController.updateBanner);
route.delete("/:id", bannerController.deleteBanner);

module.exports = route;
