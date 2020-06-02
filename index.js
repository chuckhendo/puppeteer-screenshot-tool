const fs = require("fs");
const puppeteer = require("puppeteer");
const filenamifyUrl = require("filenamify-url");

const urls = fs
  .readFileSync("./urls.txt")
  .toString()
  .split("\n")
  .map((url) => url.trim())
  .filter((url) => url.length !== 0);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.setViewport({ width: 1200, height: 800 });
  for (let url of urls) {
    console.log(url);
    await page.goto(url);
    await page.screenshot({
      path: `./screenshots/${filenamifyUrl(url)}.png`,
      fullPage: true,
    });
  }

  await browser.close();
})();
