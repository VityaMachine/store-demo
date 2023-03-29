const Sequelize = require("sequelize");

const sequelize = require("../../utils/sequelize.connect");

const ProductOptionsModel = sequelize.define(
  "ProductOptions",
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
    product_id: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    optionColorName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    optionColorCode: {
      type: Sequelize.STRING(6),
      allowNull: false,
    },
    optionColorLink: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
  },
  {
    tableName: "STORE_PRODUCTS_OPTIONS",
    timestamps: false
  }
);

module.exports = ProductOptionsModel;
