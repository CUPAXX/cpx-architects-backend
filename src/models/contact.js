const db = require("../helpers/db");
const { promisify } = require("util");
const execPromise = promisify(db.query).bind(db);

exports.getContact = () => {
  return execPromise("SELECT * FROM contact");
};

exports.updateContact = (data) => {
  const key = Object.keys(data);
  let query = "UPDATE contact SET ";

  for (let i = 1; i < key.length; i++) {
    if (i === 1) {
      query = query + `${key[i]}='${data[key[i]]}'`;
    } else {
      query = query + `, ${key[i]}='${data[key[i]]}'`;
    }
  }
  query = query + ` WHERE id=${data.id}`;
  return execPromise(query);
};
