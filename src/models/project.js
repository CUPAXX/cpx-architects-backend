const db = require("../helpers/db");
const { promisify } = require("util");
const execPromise = promisify(db.query).bind(db);
const { dynamicUpdateQuery } = require("../utils/dynamicUpdateQuery");

exports.createProject = (data) => {
  return execPromise(
    `INSERT INTO project 
    (projectName, image, imageLabel, image2, imageLabel2, image3, imageLabel3, description) 
    VALUES ('${data.projectName}', '${data.image}', '${data.label}', '${data.image2}', '${data.label2}', '${data.image3}', '${data.label3}',"${data.description}"
    )`
  );
};

exports.getProject = (limit, offset) => {
  return execPromise(`SELECT * FROM project LIMIT ${limit} OFFSET ${offset}`);
};

exports.getProjectByID = (id) => {
  return execPromise(`SELECT * FROM project WHERE id=${id}`);
};

exports.updateProject = (data) => {
  let query = "UPDATE project SET ";

  const finalQuery = dynamicUpdateQuery(query, data);
  return execPromise(finalQuery);
};

exports.deleteProject = (id) => {
  return execPromise(`DELETE FROM project WHERE id=${id}`);
};

exports.countProject = () => {
  return execPromise("SELECT COUNT(id) as count FROM project");
};
