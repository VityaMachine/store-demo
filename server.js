const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const ProductsGeneralModel = require('./src/api/models/productsGeneral.model');
const ProductOptionsModel = require('./src/api/models/productsOptions.model');
const ProductPriceModel = require('./src/api/models/productsPrices.model');


const productRouter = require('./src/api/routers/products.router');


class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    this.initSequelizeModels();
    this.initRoutes();
    this.intiErrorHandlers();
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddlewares() {
    const formatsLogger =
      this.server.get("env") === "development" ? "dev" : "short";
    this.server.use(logger(formatsLogger));
    this.server.use(

      cors({})
    );
    this.server.use(express.json());


  }

  initSequelizeModels() {
    // ProductsGeneralModel.sync({ force: true });
    // ProductOptionsModel.sync({ force: true });
    // ProductPriceModel.sync({ force: true });


    ProductsGeneralModel.sync();
    ProductOptionsModel.sync();
    ProductPriceModel.sync();

  }

  initRoutes() {

    this.server.use("/api/products/", productRouter);


  }

  intiErrorHandlers() {
    this.server.use((req, res) => {
      res.status(404).json({ message: "Not found" });
    });

    this.server.use((err, req, res, next) => {
      res.status(500).json({ message: err.message });
    });
  }

  startListening() {
    this.server.listen(process.env.PORT, () => {
      console.log("server started at port: ", process.env.PORT);
    });
  }
}

module.exports = Server;
