const Sequelize = require("sequelize");

const sequelize = require("../../utils/sequelize.connect");

const ProductsGeneralModel = sequelize.define(
  "ProductInfo",
  {
    id: {
      type: Sequelize.STRING(50),
      primaryKey: true,
      allowNull: false,
    },
    productName: {
      type: Sequelize.STRING(250),
      allowNull: false,
    },
    productType: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    manufacturerName: {
      type: Sequelize.STRING(50),
      allowNull: false,
    },
    rate: {
      type: Sequelize.FLOAT(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    ratesCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    reviewsCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "STORE_PRODUCTS_MAININFO",
    timestamps: false
  }
);

module.exports = ProductsGeneralModel;