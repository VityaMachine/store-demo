const { Op } = require("sequelize");

const CartModel = require("../models/cart.model");

const ProductsGeneralModel = require("../models/productsGeneral.model");
const ProductOptionsModel = require("../models/productsOptions.model");
const ProductPriceModel = require("../models/productsPrices.model");

const { v4: uuidv4 } = require("uuid");

const ProductHelpers = require("../../utils/productHelpers");
const CartHelpers = require("../../utils/cartHelpers");

class CartController {
  async addProductToCart(req, res, next) {
    try {
      const newElementData = req.body;

      const generalModelData = await ProductsGeneralModel.findAll({});
      const optionsModelData = await ProductOptionsModel.findAll({});
      const pricesModelData = await ProductPriceModel.findAll({});

      const generalDataArray = generalModelData.map((el) => el.dataValues);
      const optionsDataArray = optionsModelData.map((el) => el.dataValues);
      const pricesDataArray = pricesModelData.map((el) => el.dataValues);

      const productsDataArray = ProductHelpers.arrayProductsConstructor(
        generalDataArray,
        optionsDataArray,
        pricesDataArray
      );

      const selectedProduct = productsDataArray.find(
        (el) => el.id === newElementData.product_id
      );

      if (!selectedProduct) {
        return res.status(404).send({ message: "product not found" });
      }

      const selectedOption = selectedProduct.availableOptions.find(
        (el) => el.option_id === newElementData.option_id
      );

      if (!selectedOption) {
        return res.status(404).send({ message: "option not found" });
      }

      const selectedPrice = selectedOption.prices.find(
        (el) => el.price_id === newElementData.price_id
      );

      if (!selectedPrice) {
        return res.status(404).send({ message: "price not found" });
      }

      const cartData = await CartModel.findAll({});
      const cartArray = cartData.map((el) => el.dataValues);

      const isInCart = cartArray.find((el) => {
        if (
          el.product_id === newElementData.product_id &&
          el.option_id === newElementData.option_id &&
          el.price_id === newElementData.price_id
        ) {
          return true;
        }
      });

      if (isInCart) {
        throw new Error(
          "Selected product (incl. options and size) already added to cart"
        );
      }

      const addingResult = await CartModel.create({
        id: uuidv4(),
        ...newElementData,
      });

      if (!addingResult) {
        throw new Error("wrong database action");
      }

      const resultData = CartHelpers.newCartElement(
        selectedProduct,
        selectedOption,
        selectedPrice,
        addingResult.id,
        newElementData.quantity
      );

      return res.send(resultData);
    } catch (error) {
      next(error);
    }
  }

  async getAllProductsFromCart(req, res, next) {
    try {
      const cartData = await CartModel.findAll({});
      const cartArray = cartData.map((el) => el.dataValues);

      const cartProductsIds = cartArray.map((el) => el.product_id);
      const cartOptionsIds = cartArray.map((el) => el.option_id);
      const cartPricesIds = cartArray.map((el) => el.price_id);

      const productGeneralData = await ProductsGeneralModel.findAll({
        where: {
          id: {
            [Op.in]: cartProductsIds,
          },
        },
      });
      const productGeneralArray = productGeneralData.map((el) => el.dataValues);

      const productOptionsData = await ProductOptionsModel.findAll({
        where: {
          option_id: {
            [Op.in]: cartOptionsIds,
          },
        },
      });
      const productOptionsArray = productOptionsData.map((el) => el.dataValues);

      const productPricesData = await ProductPriceModel.findAll({
        where: {
          id: {
            [Op.in]: cartPricesIds,
          },
        },
      });
      const productPricesArray = productPricesData.map((el) => el.dataValues);

      const resultArray = CartHelpers.allCartElements(
        cartArray,
        productGeneralArray,
        productOptionsArray,
        productPricesArray
      );

      return res.send(resultArray);
    } catch (error) {
      next(error);
    }
  }

  async chancgeProductQuantity(req, res, next) {
    try {
      const idToUpdate = req.params.cartElemId;
      const newQuantity = req.body.quantity;

      const elementToUpdate = await CartModel.findOne({
        where: {
          id: idToUpdate,
        },
      });

      if (!elementToUpdate) {
        return res.status(404).send({ message: "product not found" });
      }

      await CartModel.update(
        {
          quantity: newQuantity,
        },
        {
          where: {
            id: idToUpdate,
          },
        }
      );

      return res.status(201).send({ message: "success" });
    } catch (error) {
      next(error);
    }
  }

  async deleteProductFromCart(req, res, next) {
    try {
      const idToDelete = req.params.cartElemId;

      
      const elementToDelete = await CartModel.findOne({
        where: {
          id: idToDelete,
        },
      });

      if (!elementToDelete) {
        return res.status(404).send({ message: "product not found" });
      }


      await CartModel.destroy({
        where: {
          id: idToDelete
        }
      })

      return res.status(204).send()
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CartController();
