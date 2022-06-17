const puppeteer = require('puppeteer');
const url = require('url');
const { api_key, userid, password, pin } = require('../secrets/loginDetails');

let requestToken = async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(
    `https://kite.zerodha.com/connect/login?api_key=${api_key}&v=3`
  );

  await page.waitForSelector('input');
  await page.type('input[id="userid"]', `${userid}`);
  await page.type('input[id="password"]', `${password}`);
  await page.click('button[type="submit"]');

  await page.waitForSelector('input[id="pin"]');
  await page.type('input[id="pin"]', `${pin}`);
  await page.click('button[type="submit"]');
  await Promise.all([page.waitForNavigation()]);

  let url = await page.url();
  let current_url = new URL(url);
  let parsed_token = current_url.searchParams.get('request_token');
  await browser.close();
  return parsed_token;
};

module.exports = requestToken;
