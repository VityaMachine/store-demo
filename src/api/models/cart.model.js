const Sequelize = require("sequelize");

const sequelize = require("../../utils/sequelize.connect");

const CartModel = sequelize.define(
    "CartModel",{
    id: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      option_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      price_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    },
    {
        tableName: "CART_PRODUCTS",
        timestamps: false
      }
);


module.exports = CartModel;