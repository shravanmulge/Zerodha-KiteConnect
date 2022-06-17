const express = require('express');
const prompts = require('prompts');
const requestToken = require('./scripts/requestToken');
const connection = require('./scripts/connection');
const profile = require('./scripts/profile/profile');
const portfolio = require('./scripts/portfolio/portfolio');
const ltp = require('./scripts/ltp/stockPrice');
const placeOrder = require('./scripts/order/placeOrder');

const app = express();

const menu = async () => {
  let token = await requestToken();
  let wire = await connection(token);
  console.log(`\n\t\t\tMENU\t\t\t
                ============================`);
  console.log('\t\tSelect one of the following:\n');
  console.log(
    `\t\t1. Fetch Profile
     \t\t2. Fetch Portfolio
     \t\t3. Fetch LTP of a Stock
     \t\t4. Place Order`
  );

  let menuResponse = await prompts({
    type: 'number',
    name: 'value',
    message: 'option: ',
  });
  console.log(`You selected option ${menuResponse.value}`);

  switch (menuResponse.value) {
    case 1: {
      console.log(`Fetching your profile. Please wait..`);
      await Promise.all([console.log(await profile(wire)), menu()]);
      break;
    }
    case 2: {
      console.log(`Fetching your portfolio. Please wait..`);
      await Promise.all([console.log(await portfolio(wire)), menu()]);
      break;
    }
    case 3: {
      console.log(`Let's fetch LTP of a stock..`);
      await Promise.all([console.log(await ltp(wire)), menu()]);
      break;
    }
    case 4: {
      console.log(`Let's place an order..`);
      await Promise.all([console.log(await placeOrder(wire)), menu()]);
      break;
    }
    default: {
      console.log(`You must select a number from the menu`);
      menu();
      break;
    }
  }
};
menu();

app.listen(3000);
