const router = require("express").Router();

const bannerRoute = require("./banner");
const contactRoute = require("./contact");
const galleryRoute = require("./gallery");
const projectRoute = require("./project");

router.use("/banner", bannerRoute);
router.use("/contact", contactRoute);
router.use("/gallery", galleryRoute);
router.use("/project", projectRoute);

module.exports = router;
