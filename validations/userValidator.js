
const { body } = require("express-validator");

exports.userValidator = [
  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().normalizeEmail().withMessage("email is required"),
  body("password")
    .isLength({
      min: 6,
    })
    .withMessage("password must be min 6 character"),
];


exports.userValidatorLogin = [
  body("email").isEmail().normalizeEmail().withMessage("email is required"),
  body("password").notEmpty().withMessage("password must be min 6 character"),
];

