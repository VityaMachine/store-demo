const express = require("express");
const router = express.Router();

const CartController = require('../controllers/cart.controller');
const CartValidators = require('../validators/cart.validators');

router.post("/", CartValidators.newCartElement, CartController.addProductToCart);

router.get("/", CartController.getAllProductsFromCart);

router.patch('/:cartElemId', CartValidators.updateQuantity, CartController.chancgeProductQuantity);

router.delete('/:cartElemId', CartController.deleteProductFromCart);

module.exports = router;