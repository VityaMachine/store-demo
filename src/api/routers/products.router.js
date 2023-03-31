const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/products.controller");
const ProductsValidators = require("../validators/products.validators");

router.get("/id/:productId", ProductsController.getProductById);

router.get("/type/:productType", ProductsController.getProductsByType);

router.get("/", ProductsController.getAllProducts);

router.post(
  "/",
  ProductsValidators.newProduct,
  ProductsController.addNewProduct
);

module.exports = router;
