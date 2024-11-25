const projectModel = require("../models/project");
const { response } = require("../helpers/standardRes");
const { removeOldFile } = require("../utils/removeOldFile");
const { pageInfo } = require("../utils/pageInfo");

exports.createProject = async (req, res) => {
  const file = req.files;
  const body = req.body;
  const data = {
    projectName: body.projectName,
    image: `${process.env.APP_UPLOAD_PATH}/${file.image[0].filename}`,
    label: file.image[0].filename,
    image2: file.image2
      ? `${process.env.APP_UPLOAD_PATH}/${file.image2[0].filename}`
      : "",
    label2: file.image2 ? file.image2[0].filename : "",
    image3: file.image3
      ? `${process.env.APP_UPLOAD_PATH}/${file.image3[0].filename}`
      : "",
    label3: file.image3 ? file.image3[0].filename : "",
    description: body.description,
  };
  const results = await projectModel.createProject(data);
  if (results.affectedRows > 0) {
    return response(res, 200, true, "New Project Successfully Added!");
  }
};

exports.getProject = async (req, res) => {
  const query = req.query;
  const totalData = await projectModel.countProject();
  const getPageInfo = pageInfo(query, totalData);

  const results = await projectModel.getProject(
    getPageInfo.limit,
    getPageInfo.offset
  );
  return response(res, 200, true, "List of Project", results, getPageInfo);
};

exports.getProjectByID = async (req, res) => {
  const { id } = req.params;
  const results = await projectModel.getProjectByID(id);
  if (results.length <= 0) {
    return response(res, 404, false, `Project with ID (${id}) not Found!`);
  }
  return response(res, 200, true, "Detail Project", results[0]);
};

exports.updateProject = async (req, res) => {
  const { id } = req.params;
  const file = req.files;
  const body = req.body;

  const fileKey = Object.keys(file);

  const updateData = {
    id,
    ...body,
  };

  if (fileKey.length > 0) {
    const results = await projectModel.getProjectByID(id);
    if (results.length <= 0) {
      return response(
        res,
        404,
        false,
        `Request Failed Project with ID (${id}) not found`
      );
    }
    for (let i = 0; i < fileKey.length; i++) {
      let val = fileKey[i];
      let labelCond = i > 0 ? i + 1 : "";
      updateData[
        val
      ] = `${process.env.APP_UPLOAD_PATH}/${file[val][0].filename}`;
      updateData[`imageLabel${labelCond}`] = file[val][0].filename;
      removeOldFile(`${results[0][val]}`);
    }
  }

  const updateDataKey = Object.keys(updateData);
  if (updateDataKey.length <= 1) {
    return response(
      res,
      400,
      false,
      "Request denied at least update 1 column!"
    );
  }

  const results = await projectModel.updateProject(updateData);
  if (results.affectedRows > 0) {
    return response(
      res,
      200,
      true,
      `Project Data with ID (${id}) Successfully Updated !!`
    );
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  const getProject = await projectModel.getProjectByID(id);
  if (getProject.length <= 0) {
    return response(
      res,
      404,
      false,
      `Request Failed Project with ID (${id}) not found`
    );
  }

  removeOldFile(`${getProject[0].image}`);
  if (getProject[0].image2) {
    removeOldFile(`${getProject[0].image2}`);
  }
  if (getProject[0].image3) {
    removeOldFile(`${getProject[0].image3}`);
  }
  const results = await projectModel.deleteProject(id);
  if (results.affectedRows > 0) {
    return response(
      res,
      200,
      true,
      `Project Data with ID (${id}) Successfully deleted !!`
    );
  }
};
