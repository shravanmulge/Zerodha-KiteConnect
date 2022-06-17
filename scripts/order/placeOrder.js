const placeOrder = async (kc) => {
  try {
    let orderDetails = {
      exchange: 'NSE',
      tradingsymbol: 'RELIANCE',
      transaction_type: 'BUY',
      quantity: 3,
      product: 'MIS',
      order_type: 'MARKET',
    };

    return await kc.placeOrder('amo', orderDetails);
  } catch (error) {
    console.log(error);
  }
};

module.exports = placeOrder;
