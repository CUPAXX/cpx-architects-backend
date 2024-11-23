const bannerModel = require("../models/banner");
const { response } = require("../helpers/standardRes");

exports.createBanner = async (req, res) => {
  const data = {
    path: `${process.env.APP_UPLOAD_PATH}/${req.file.filename}`,
    blurData: req.body.blurData,
    label: req.file.filename,
  };
  const results = await bannerModel.createBanner(data);
  if (results.affectedRows > 0) {
    return response(res, 200, true, "New Banner Successfully Added!");
  }
};

exports.getBanner = async (req, res) => {
  const results = await bannerModel.getBanner();
  return response(res, 200, true, "List all banner", results);
};

exports.getBannerByID = async (req, res) => {
  const { id } = req.params;
  const results = await bannerModel.getBannerByID(id);
  return response(res, 200, true, "Detail banner", results[0]);
};
