const prompts = require('prompts');
const stockPrice = async (kc) => {
  let response = await prompts({
    type: 'text',
    name: 'stock',
    message: 'Please enter the name of the stock: ',
  });
  console.log(response.stock);
  return await kc.getLTP(response.stock);
};

module.exports = stockPrice;
