const express = require("express");
const router = express.Router();
const {categoryValidator}  = require('../validations/categoryValidator');
const categoryController = require('../controllers/Category');

router.post("/create-category",categoryValidator,categoryController.create);

module.exports = router;
