const express = require("express");
const router = express.Router();
const {categoryValidator}  = require('../validations/categoryValidator');
const categoryController = require('../controllers/Category');
const Authotization = require('../services/Authorization');

router.post("/create-category",categoryValidator,Authotization.authorized,categoryController.create);
router.get('/categories/:page',categoryController.categories);
router.get('/category/:id',categoryController.findByIdCategory);
router.put("/category",Authotization.authorized,categoryValidator,categoryController.updateCategory);

router.delete("/category/:id",categoryController.deletedCategory);

router.get("/all-categories", categoryController.allCategories);


module.exports = router;


