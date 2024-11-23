const fs = require("fs");

exports.removeOldFile = (path) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(`Error removing file: ${err}`);
      return;
    }

    console.log(`Old file has been successfully removed.`);
  });
};
