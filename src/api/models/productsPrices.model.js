const Sequelize = require("sequelize");

const sequelize = require("../../utils/sequelize.connect");

const ProductPriceModel = sequelize.define(
  "ProductPrice",
  {
    id: {
      type: Sequelize.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    option_id: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    size: {
      type: Sequelize.STRING(4),
      allowNull: false,
    },
    price: {
      type: Sequelize.FLOAT(18,2),
      allowNull: false,
    },
  },
  {
    tableName: "STORE_PRODUCTS_PRICE",
    timestamps: false
  }
);

module.exports = ProductPriceModel;
