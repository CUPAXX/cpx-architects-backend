const galleryModel = require("../models/gallery");
const { response } = require("../helpers/standardRes");
const { removeOldFile } = require("../utils/removeOldFile");
const { pageInfo } = require("../utils/pageInfo");

exports.createGallery = async (req, res) => {
  const file = req.file;
  const data = {
    image: `${process.env.APP_UPLOAD_PATH}/${file.filename}`,
    label: file.filename,
  };
  const results = await galleryModel.createGallery(data);
  if (results.affectedRows > 0) {
    return response(res, 200, true, "New Gallery Successfully Added!");
  }
};

exports.getGallery = async (req, res) => {
  const query = req.query;
  const totalData = await galleryModel.countGallery();
  const getPageInfo = pageInfo(query, totalData);

  const results = await galleryModel.getGallery(
    getPageInfo.limit,
    getPageInfo.offset
  );
  return response(res, 200, true, "List of Gallery", results, getPageInfo);
};

exports.getGalleryByID = async (req, res) => {
  const { id } = req.params;
  const results = await galleryModel.getGalleryByID(id);
  if (results.length <= 0) {
    return response(res, 404, false, `Gallery with ID (${id}) not Found!`);
  }
  return response(res, 200, true, "Detail Gallery", results[0]);
};

exports.updateGallery = async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  const updateData = {
    id,
  };
  if (file) {
    Object.assign(updateData, {
      image: `${process.env.APP_UPLOAD_PATH}/${file.filename}`,
      label: file.filename,
    });
    const results = await galleryModel.getGalleryByID(id);
    if (results.length <= 0) {
      return response(
        res,
        404,
        false,
        `Request Failed Project with ID (${id}) not found`
      );
    }
    removeOldFile(`${results[0].image}`);
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
  const results = await galleryModel.updateGallery(updateData);
  if (results.affectedRows > 0) {
    return response(
      res,
      200,
      true,
      `Gallery Data with ID (${id}) Successfully Updated !!`
    );
  }
};

exports.deleteGallery = async (req, res) => {
  const { id } = req.params;
  const getGallery = await galleryModel.getGalleryByID(id);
  if (getGallery.length <= 0) {
    return response(
      res,
      404,
      false,
      `Request Failed Gallery with ID (${id}) not found`
    );
  }

  removeOldFile(`${getGallery[0].image}`);
  const results = await galleryModel.deleteGallery(id);
  if (results.affectedRows > 0) {
    return response(
      res,
      200,
      true,
      `Gallery Data with ID (${id}) Successfully deleted !!`
    );
  }
};
