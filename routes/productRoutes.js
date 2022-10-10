const express = require("express");
const router = express.Router();

const Authotization = require("../services/Authorization");

const productController = require("../controllers/Product");


router.post("/create-product",Authotization.authorized,productController.createProduct);

router.get(
  "/products/:page",
  Authotization.authorized,
  productController.products
);

router.get(
  "/getproduct/:id",
  productController.getProductById
);

module.exports = router;
