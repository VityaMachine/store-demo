const { Op } = require("sequelize");

const ProductsGeneralModel = require("../models/productsGeneral.model");
const ProductOptionsModel = require("../models/productsOptions.model");
const ProductPriceModel = require("../models/productsPrices.model");

const { v4: uuidv4 } = require("uuid");

const ProductHelpers = require("../../utils/productHelpers");

const COLOR_SCHEMES = require("../constants/clothesColors");

class ProductsController {
  async addNewProduct(req, res, next) {
    try {
      const {
        productName,
        productType,
        manufacturerName,
        rate,
        ratesCount,
        reviewsCount,
        availableOptions,
      } = req.body;

      const generalData = {
        id: uuidv4(),
        productName,
        productType: productType.toLowerCase(),
        manufacturerName: manufacturerName.toLowerCase(),
        rate,
        ratesCount,
        reviewsCount,
      };

      const pricesArray = [];

      const optionsImagesArray = availableOptions.map((el) => {
        const { optionColorScheme, optionImagesLinks, optionPrices } = el;

        const optionData = {
          option_id: uuidv4(),
          product_id: generalData.id,
          optionColorName: COLOR_SCHEMES[optionColorScheme].colorName,
          optionColorCode: COLOR_SCHEMES[optionColorScheme].colorCode,
        };

        const dataImgLinks = optionImagesLinks.map((el) => {
          const reslut = {
            id: uuidv4(),
            ...optionData,
            optionColorLink: el,
          };

          return reslut;
        });

        pricesArray.push({
          option_id: optionData.option_id,
          optionPrices,
        });

        return dataImgLinks;
      });

      const pricesData = pricesArray.map((el) => {
        const { option_id, optionPrices } = el;

        const optionPricesData = optionPrices.map((el) => ({
          id: uuidv4(),
          option_id,
          size: el.size,
          price: el.price,
        }));

        return optionPricesData;
      });

      const optionsDataArray = optionsImagesArray.flat();
      const pricesDataArray = pricesData.flat();

      const generalModelResult = await ProductsGeneralModel.create(generalData);
      const optionsModelResult = await ProductOptionsModel.bulkCreate(
        optionsDataArray
      );
      const pricesModelResult = await ProductPriceModel.bulkCreate(
        pricesDataArray
      );

      const result = ProductHelpers.basicProdObjConstructor(
        generalModelResult,
        optionsModelResult,
        pricesModelResult
      );

      return res.status(201).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const productId = req.params.productId;

      const productGeneralData = await ProductsGeneralModel.findOne({
        where: {
          id: productId,
        },
      });

      if (!productGeneralData) {
        return res.status(404).send({ message: "product not found" });
      }

      const productOptionsData = await ProductOptionsModel.findAll({
        where: {
          product_id: productGeneralData.id,
        },
      });

      const optionsIds = [];
      productOptionsData.forEach((el) => {
        const isInArray = optionsIds.some((elem) => elem === el.option_id);

        if (isInArray) {
          return;
        }

        optionsIds.push(el.option_id);
      });

      const pricesData = await ProductPriceModel.findAll({
        where: {
          option_id: {
            [Op.in]: optionsIds,
          },
        },
      });

      const result = ProductHelpers.basicProdObjConstructor(
        productGeneralData,
        productOptionsData,
        pricesData
      );

      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async getAllProducts(req, res, next) {
    try {
      const generalModelData = await ProductsGeneralModel.findAll({});
      const optionsModelData = await ProductOptionsModel.findAll({});
      const pricesModelData = await ProductPriceModel.findAll({});

      const generalDataArray = generalModelData.map((el) => el.dataValues);
      const optionsDataArray = optionsModelData.map((el) => el.dataValues);
      const pricesDataArray = pricesModelData.map((el) => el.dataValues);

      const reslut = ProductHelpers.arrayProductsConstructor(
        generalDataArray,
        optionsDataArray,
        pricesDataArray
      );

      res.status(200).send(reslut);
    } catch (error) {
      next(error);
    }
  }

  async getProductsByType(req, res, next) {
    try {
      
      const prodType = req.params.productType;

      const generalData = await ProductsGeneralModel.findAll({
        where: {
          productType: prodType
        }
      })

      const generalsDataArray = generalData.map(el => el.dataValues)
      const productsIds = generalsDataArray.map(el=> el.id)

      const optionsData = await ProductOptionsModel.findAll({
        where: {
          product_id: {
            [Op.in]: productsIds,
          }
        }
      })

      const optionsDataArray = optionsData.map(el => el.dataValues)
      const optionsIds = optionsDataArray.map(el=> el.option_id);

      const pricesData = await ProductPriceModel.findAll({
        where: {
          option_id: {
            [Op.in]: optionsIds,
          }
        }
      })

      const pricesDataArray = pricesData.map(el => el.dataValues)

      const reslut = ProductHelpers.arrayProductsConstructor(
        generalsDataArray,
        optionsDataArray,
        pricesDataArray
      );


      return res.send(reslut);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ProductsController();
