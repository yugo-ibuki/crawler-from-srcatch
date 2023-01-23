import * as puppeteer from 'puppeteer'

const visitedUrls = new Set<string>()

async function crawl(url: string, browser: puppeteer.Browser) {
  const page = await browser.newPage();
  visitedUrls.add(url);
  await page.goto(url);

  // aタグを取得し、リンク先のURLを取得する
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a'))
      .map(a => a.getAttribute('href'))
      .filter(href => href && !href.startsWith('#'));
  });

  console.log('visitedUrls: ', visitedUrls);

  if (links.length <= 0) return

  // リンク先のURLにアクセスし、再帰的にクロールする
  for (const link of links) {
    // githubへのクローリングはしないようにする
    if (link === 'https://github.com/google/security-crawl-maze') continue
    if (!visitedUrls.has(link!)) {
      console.log('link: ', link)
      const trimmedUrl = link!.slice(0, -1);
      await crawl(url + trimmedUrl!, browser);
    }
  }
  await page.close();
}

(async () => {
  const browser = await puppeteer.launch();
  await crawl('https://security-crawl-maze.app', browser);
  await browser.close();
})();
