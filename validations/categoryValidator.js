const { body } = require("express-validator");

exports.categoryValidator = [
  body("name").notEmpty().trim().escape().withMessage("name category is required"),
];
