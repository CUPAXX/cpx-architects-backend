const db = require("../helpers/db");
const { promisify } = require("util");
const execPromise = promisify(db.query).bind(db);
const { dynamicUpdateQuery } = require("../utils/dynamicUpdateQuery");

exports.createBanner = (data) => {
  return execPromise(
    `INSERT INTO banner (label, path, blurData) VALUES ('${data.label}', '${data.path}', '${data.blurData}')`
  );
};

exports.getBanner = () => {
  return execPromise("SELECT * FROM banner");
};

exports.getBannerByID = (id) => {
  return execPromise(`SELECT * FROM banner WHERE id=${id}`);
};

exports.updateBanner = (data) => {
  let query = "UPDATE banner SET ";

  const finalQuery = dynamicUpdateQuery(query, data);
  return execPromise(finalQuery);
};

exports.deleteBanner = (id) => {
  return execPromise(`DELETE FROM banner WHERE id=${id}`);
};
