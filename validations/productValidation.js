const { body } = require("express-validator");

exports.productValidator = [
  body("title")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("title category is required"),

  body("price")
    .isLength({ min: 1 })
    .notEmpty()
    .trim()
    .escape()
    .withMessage("price is required"),

  body("discount")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("discount is required"),

  body("categories")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("categories is required"),

  body("description")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("description is required"),

  body("stock").notEmpty().trim().escape().withMessage("stock is required"),
];


