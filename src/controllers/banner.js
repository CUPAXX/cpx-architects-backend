const bannerModel = require("../models/banner");
const { response } = require("../helpers/standardRes");
const { removeOldFile } = require("../utils/removeOldFile");

exports.createBanner = async (req, res) => {
  const file = req.file;
  const data = {
    path: `${process.env.APP_UPLOAD_PATH}/${file.filename}`,
    blurData: req.body.blurData,
    label: file.filename,
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
  if (results.length <= 0) {
    return response(res, 404, false, `Banner with ID (${id}) not Found!`);
  }
  return response(res, 200, true, "Detail banner", results[0]);
};

exports.updateBanner = async (req, res) => {
  const { id } = req.params;
  const Formdata = req.body;
  const file = req.file;

  const updateData = {
    id,
    ...Formdata,
  };
  if (file) {
    Object.assign(updateData, {
      path: `${process.env.APP_UPLOAD_PATH}/${file.filename}`,
      label: file.filename,
    });
    const results = await bannerModel.getBannerByID(id);
    removeOldFile(`${results[0].path}`);
  }

  const key = Object.keys(updateData);
  if (key.length <= 1) {
    return response(
      res,
      400,
      false,
      "Request denied at least update 1 column!"
    );
  }
  const results = await bannerModel.updateBanner(updateData);
  if (results.affectedRows > 0) {
    return response(
      res,
      200,
      true,
      `Banner Data with ID (${id}) Successfully Updated !!`
    );
  }
};

exports.deleteBanner = async (req, res) => {
  const { id } = req.params;
  const getBanner = await bannerModel.getBannerByID(id);
  if (getBanner.length > 0) {
    removeOldFile(`${getBanner[0].path}`);
  } else {
    return response(
      res,
      404,
      false,
      `Request Failed Banner with ID (${id}) not found`
    );
  }
  const results = await bannerModel.deleteBanner(id);
  if (results.affectedRows > 0) {
    return response(
      res,
      200,
      true,
      `Banner Data with ID (${id}) Successfully deleted !!`
    );
  }
};
