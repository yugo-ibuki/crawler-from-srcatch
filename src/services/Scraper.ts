import { Page, HTTPResponse } from 'puppeteer';

export class Scraper {
  #page: Page
  #urls: string[]

  constructor(
    { page, urls }: { page: Page, urls: string[] }
  ) {
    this.#page = page
    this.#urls = urls
  }

  public async start() {
    // const anchors =
      await this.getAnchors()
  }

  private async getAnchors() {
    // const anchors = await this.#page.$$('a')
    const anchors = await this.#page.$$eval('.nav01 > a', a => {
      return a.map(a => a.href)
    })
    console.log(anchors)
    // anchors.map(async (anchor) => {
    //   const href = anchor.getProperty('href')
    //   console.log(href)
    // })
    // return anchors
  }
}