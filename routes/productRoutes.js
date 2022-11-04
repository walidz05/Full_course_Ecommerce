const express = require("express");
const router = express.Router();

const Authotization = require("../services/Authorization");

const productController = require("../controllers/Product");

const {productValidator} = require('../validations/productValidation');


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

router.put('/product',Authotization.authorized,productValidator,productController.updateProduct);

router.delete(
  "/product/:id",
  Authotization.authorized,
  productValidator,
  productController.deleteProduct
);

router.get('/products-by-category/:name/:page?',productController.getProductsByCategorty);

router.get(
  "/search-products/:keyword/:page?",
  productController.getProductsByCategorty
);

module.exports = router;
