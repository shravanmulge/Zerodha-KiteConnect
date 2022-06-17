const { KiteConnect } = require('kiteconnect');
const loginDetails = require('../secrets/loginDetails');
const kiteConnect = require('kiteconnect').KiteConnect;
const details = require('../secrets/loginDetails');

const connection = async (requestToken) => {
  let kc = new KiteConnect({ api_key: details.api_key });
  await kc.generateSession(requestToken, details.api_secret);
  return kc;
};

module.exports = connection;
