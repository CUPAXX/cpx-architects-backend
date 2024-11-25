const db = require("../helpers/db");
const { promisify } = require("util");
const execPromise = promisify(db.query).bind(db);
const { dynamicUpdateQuery } = require("../utils/dynamicUpdateQuery");

exports.createGallery = (data) => {
  return execPromise(
    `INSERT INTO gallery (label, image) VALUES ('${data.label}', '${data.image}')`
  );
};

exports.getGallery = (limit, offset) => {
  return execPromise(`SELECT * FROM gallery LIMIT ${limit} OFFSET ${offset}`);
};

exports.getGalleryByID = (id) => {
  return execPromise(`SELECT * FROM gallery WHERE id=${id}`);
};

exports.updateGallery = (data) => {
  let query = "UPDATE gallery SET ";

  const finalQuery = dynamicUpdateQuery(query, data);
  return execPromise(finalQuery);
};

exports.deleteGallery = (id) => {
  return execPromise(`DELETE FROM gallery WHERE id=${id}`);
};

exports.countGallery = () => {
  return execPromise("SELECT COUNT(id) as count FROM gallery");
};
