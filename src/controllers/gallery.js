const galleryModel = require("../models/gallery");
const { response } = require("../helpers/standardRes");
const { removeOldFile } = require("../utils/removeOldFile");

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
  let limit = parseInt(query.limit) || 3;
  let offset = parseInt(query.limit) || 0;
  let page = parseInt(query.page) || 1;
  offset = page * limit - limit;
  const pageInfo = {};

  const totalData = await galleryModel.countGallery();
  const totalPage = Math.ceil(totalData[0].count / limit);
  pageInfo.totalData = totalData[0].count;
  pageInfo.currentPage = page;
  pageInfo.totalPage = totalPage;
  pageInfo.limit = limit;
  pageInfo.nextPage = page < totalPage ? page + 1 : null;
  pageInfo.prevPage = page > 1 ? page - 1 : null;

  const results = await galleryModel.getGallery(limit, offset);
  return response(res, 200, true, "List of Gallery", results, pageInfo);
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
  if (getGallery.length > 0) {
    removeOldFile(`${getGallery[0].image}`);
  } else {
    return response(
      res,
      404,
      false,
      `Request Failed Gallery with ID (${id}) not found`
    );
  }
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
