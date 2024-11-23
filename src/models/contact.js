const db = require("../helpers/db");
const { promisify } = require("util");
const execPromise = promisify(db.query).bind(db);
const { dynamicUpdateQuery } = require("../utils/dynamicUpdateQuery");

exports.getContact = () => {
  return execPromise("SELECT * FROM contact");
};

exports.updateContact = (data) => {
  let query = "UPDATE contact SET ";

  const finalQuery = dynamicUpdateQuery(query, data);
  return execPromise(finalQuery);
};
