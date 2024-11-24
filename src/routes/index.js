const router = require("express").Router();

const bannerRoute = require("./banner");
const contactRoute = require("./contact");
const galleryRoute = require("./gallery");

router.use("/banner", bannerRoute);
router.use("/contact", contactRoute);
router.use("/gallery", galleryRoute);

module.exports = router;
