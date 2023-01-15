import { Crawler } from './services/Crawler';

const urls: string[] = [''];

(async () => {
  try {
    const crawler = new Crawler(urls)
    await crawler.start()
  } catch(e) {
    console.error(e)
  }
})();