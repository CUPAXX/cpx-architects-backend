const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "assets", "images"));
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".")[1];
    cb(null, `image-${Date.now()}.${ext}`);
  },
});

module.exports = multer({ storage, limits: { fileSize: "5MB" } });
