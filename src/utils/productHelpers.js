class ProductHelpers {
  basicProdObjConstructor(generalInfo, optionsInfo, pricesInfo) {
    const pricesArray = pricesInfo.map((el) => el.dataValues || el);
    const optionsArray = optionsInfo.map((el) => el.dataValues || el);
    const generaiObject = generalInfo.dataValues || generalInfo;

    const pricesResultDataIds = [];
    const optionsResultDataIds = [];

    pricesArray.forEach((elem) => {
      const isInArray = pricesResultDataIds.some(
        (el) => el.option_id === elem.option_id
      );

      if (isInArray) {
        return;
      }
      pricesResultDataIds.push({
        option_id: elem.option_id,
      });
    });

    const pricesResultData = pricesResultDataIds.map((elem) => {
      const optionPrices = pricesArray.filter(
        (el) => elem.option_id === el.option_id
      );

      return {
        option_id: elem.option_id,
        prices: optionPrices,
      };
    });

    optionsArray.forEach((elem) => {
      const isInArray = optionsResultDataIds.some(
        (el) => el.option_id === elem.option_id
      );

      if (isInArray) {
        return;
      }
      optionsResultDataIds.push({
        option_id: elem.option_id,
      });
    });

    const optionsResultData = optionsResultDataIds.map((elem) => {
      const optionData = optionsArray.filter(
        (el) => el.option_id === elem.option_id
      );

      const resultObj = {};

      resultObj.option_id = optionData[0].option_id;
      resultObj.product_id = optionData[0].product_id;
      resultObj.optionColorName = optionData[0].optionColorName;
      resultObj.optionColorCode = optionData[0].optionColorCode;
      resultObj.optionImages = optionData.map((el) => el.optionColorLink);

      return resultObj;
    });

    const optionsAndPricesData = optionsResultData.map((elem) => {
      const {
        option_id,
        product_id,
        optionColorName,
        optionColorCode,
        optionImages,
      } = elem;

      const elemPrices = pricesResultData.find(
        (el) => el.option_id === option_id
      );

      return {
        option_id,
        product_id,
        optionColorName,
        optionColorCode,
        optionImages,
        prices: elemPrices.prices.map((e) => ({
          price_id: e.id,
          size: e.size,
          price: e.price,
        })),
      };
    });

    const resultObj = {
      ...generaiObject,
      availableOptions: optionsAndPricesData.map((e) => {
        const {
          option_id,
          optionColorName,
          optionColorCode,
          optionImages,
          prices,
        } = e;

        return {
          option_id,
          optionColorName,
          optionColorCode,
          optionImages,
          prices,
        };
      }),
    };

    return resultObj;
  }

  arrayProductsConstructor(generalInfo, optionsInfo, pricesInfo) {
    const pricesResultDataIds = [];
    const optionsResultDataIds = [];

    pricesInfo.forEach((elem) => {
      const isInArray = pricesResultDataIds.some(
        (el) => el.option_id === elem.option_id
      );

      if (isInArray) {
        return;
      }
      pricesResultDataIds.push({
        option_id: elem.option_id,
      });
    });

    const pricesResultDataArray = pricesResultDataIds.map((elem) => {
      const optionPrices = pricesInfo.filter(
        (el) => elem.option_id === el.option_id
      );

      return {
        option_id: elem.option_id,
        prices: optionPrices,
      };
    });

    optionsInfo.forEach((elem) => {
      const isInArray = optionsResultDataIds.some(
        (el) => el.option_id === elem.option_id
      );

      if (isInArray) {
        return;
      }
      optionsResultDataIds.push({
        option_id: elem.option_id,
      });
    });

    const optionsDataArray = optionsResultDataIds.map((elem) => {
      const optionData = optionsInfo.filter(
        (el) => el.option_id === elem.option_id
      );

      const resultObj = {};

      resultObj.option_id = optionData[0].option_id;
      resultObj.product_id = optionData[0].product_id;
      resultObj.optionColorName = optionData[0].optionColorName;
      resultObj.optionColorCode = optionData[0].optionColorCode;
      resultObj.optionImages = optionData.map((el) => el.optionColorLink);

      return resultObj;
    });

    const optionsAndPricesData = optionsDataArray.map((elem) => {
      const {
        option_id,
        product_id,
        optionColorName,
        optionColorCode,
        optionImages,
      } = elem;

      const elemPrices = pricesResultDataArray.find(
        (el) => el.option_id === option_id
      );

      return {
        option_id,
        product_id,
        optionColorName,
        optionColorCode,
        optionImages,
        prices: elemPrices.prices.map((e) => ({
          price_id: e.id,
          size: e.size,
          price: e.price,
        })),
      };
    });

    const resultArray = generalInfo.map((elem) => {
      const elemId = elem.id;

      const elemOptions = optionsAndPricesData.filter(
        (el) => el.product_id === elemId
      );

      return {
        ...elem,
        availableOptions: elemOptions,
      };
    });

    return resultArray;
  }
}

module.exports = new ProductHelpers();
