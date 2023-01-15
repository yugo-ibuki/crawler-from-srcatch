import * as pupetter from 'puppeteer';
import fetch from 'node-fetch';

(async () => {
  const option = {
    headless: true,
    showMo: 100
  }
  const urls: string[] = []
  try {
    const browser = await pupetter.launch(option);
    const page = await browser.newPage();
    await page.goto('https://www.uec.ac.jp/');

    await browser.close()
  } catch(e) {
    console.error(e)
  }
  // const res = await fetch("https://www.uec.ac.jp/")
})();