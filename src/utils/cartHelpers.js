class CartHelpers {
  newCartElement(generalData, optionData, priceData, id, quantity) {
    const result = {
      id,
      productId: generalData.id,
      productName: generalData.productName,
      productType: generalData.productType,
      manufacturerName: generalData.manufacturerName,
      reviewsCount: generalData.reviewsCount,
      rate: generalData.rate,
      ratesCount: generalData.ratesCount,
      option_id: optionData.option_id,
      optionColorName: optionData.optionColorName,
      optionColorCode: optionData.optionColorCode,
      optionImages: optionData.optionImages,
      price_id: priceData.price_id,
      price: priceData.price,
      size: priceData.size,
      quantity,
      total_cost: quantity * priceData.price,
    };

    return result;
  }

  allCartElements(cartData, generalData, optionData, priceData) {
    const resData = cartData.map((el) => {
      const { id, product_id, option_id, price_id, quantity } = el;

      const generalDataObj = generalData.find((el) => el.id === product_id);
      const {
        productName,
        productType,
        manufacturerName,
        reviewsCount,
        rate,
        ratesCount,
      } = generalDataObj;

      const optionDataObj = optionData.find((el) => el.option_id === option_id);
      const { optionColorName, optionColorCode } = optionDataObj;
      const optionDataArray = optionData.filter(
        (el) => el.option_id === option_id
      );
      const optionImagesArray = optionDataArray.map((el) => el.optionColorLink);

      const priceDataObj = priceData.find((el) => el.id === price_id);
      const { size, price } = priceDataObj;

      return {
        id,
        product_id,
        productName,
        productType,
        manufacturerName,
        reviewsCount,
        rate,
        ratesCount,
        option_id,
        optionColorName,
        optionColorCode,
        optionImages: optionImagesArray,
        price_id,
        price,
        size,
        quantity,
        total_cost: quantity * price,
      };
    });

    return resData;
  }

  
}

module.exports = new CartHelpers();
