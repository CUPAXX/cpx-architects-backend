const contactModel = require("../models/contact");
const { response } = require("../helpers/standardRes");

exports.getContact = async (req, res) => {
  const results = await contactModel.getContact();
  return response(res, 200, true, "Contact Data", results);
};

exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const Formdata = req.body;

  const updateData = {
    id,
    ...Formdata,
  };
  const key = Object.keys(Formdata);
  if (key <= 0) {
    return response(
      res,
      400,
      false,
      "Request denied at least update 1 column!"
    );
  }
  const results = await contactModel.updateContact(updateData);
  if (results.affectedRows === 0) {
    return response(res, 404, false, "Contact Data not Found ID Wrong!");
  }
  return response(
    res,
    200,
    true,
    `Contact Data with ID (${id}) Updated Successfully !!`
  );
};
