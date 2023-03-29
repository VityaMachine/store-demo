const Joi = require("joi");

class ProductsValidators {
  newProduct(req, res, next) {
    const newProductRules = Joi.object({
      productName: Joi.string().required(),
      productType: Joi.string().required(),
      manufacturerName: Joi.string().required(),
      rate: Joi.number(),
      ratesCount: Joi.number(),
      reviewsCount: Joi.number(),
      availableOptions: Joi.array()
        .items(
          Joi.object({
            optionColorScheme: Joi.string().required(),
            optionImagesLinks: Joi.array().items(Joi.string()).min(1).required(),
            optionPrices: Joi.array()
              .items(
                Joi.object({
                  size: Joi.string().max(4).required(),
                  price: Joi.number().required()
                })
              ).min(1).required(),
          })
        ).min(1).required(),
    });

    const validationResult = newProductRules.validate(req.body);

    if (validationResult.error) {
      return res.status(400).send(validationResult.error.details[0]);
    }
    next();
  }
}


module.exports = new ProductsValidators();