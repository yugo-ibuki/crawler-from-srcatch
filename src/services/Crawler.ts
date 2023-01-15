import type { Browser, Page } from 'puppeteer'
import { crawlOptions } from '../config'
import * as puppeteer from 'puppeteer'
import { Scraper } from './Scraper';

export class Crawler {
  #browser: Browser
  #page: Page
  #startUrls: string[]
  #urls: string[]

  constructor(startUrl: string[]) {
    this.#browser = {} as Browser
    this.#page = {} as Page
    this.#startUrls = startUrl
    this.#urls = []
  }

  public async start() {
    try {
      this.#browser = await puppeteer.launch(crawlOptions)
      this.#page = await this.#browser.newPage()
      await this.crawl()
      await this.close()
    } catch (e) {
      console.error(e)
    }
  }

  private async crawl() {
    for (const url of this.#startUrls) {
      await this.#page.goto(url);
      // スクレイピング開始
      const scrapingBase = {
        page: this.#page,
        urls: this.#urls,
      }
      const scraper = new Scraper(scrapingBase)
      await scraper.start()
    }
  }

  private async close() {
    await this.#browser.close()
  }
}