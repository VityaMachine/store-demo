const Joi = require("joi");

class CartValidators {
    newCartElement(req, res, next) {

        const newElementRules = Joi.object({
            product_id: Joi.string().required(),
            option_id: Joi.string().required(),
            price_id: Joi.string().required(),
            quantity: Joi.number().min(1).required(),
        })

        const validationResult = newElementRules.validate(req.body);

        if (validationResult.error) {
          return res.status(400).send(validationResult.error.details[0]);
        }

        next();
    }

    updateQuantity(req, res, next) {
        const newQuantitty = Joi.object({
            quantity: Joi.number().min(1).required(),
        })

        const validationResult = newQuantitty.validate(req.body);

        if (validationResult.error) {
          return res.status(400).send(validationResult.error.details[0]);
        }

        next()
    }

}

module.exports = new CartValidators();