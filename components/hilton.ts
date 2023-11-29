import type { Locator, Page } from "@playwright/test";
export class Hilton {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get dealHeader() {
    return this.page.locator(".thumb-cards_cardHeader .app_heading1");
  }
  get pricePerNight() {
    return this.page.locator(".thumb-cards_priceMessages .thumb-cards_price");
  }
  get pricePerStay() {
    return this.page.locator(".thumb-cards_secondaryPriceText");
  }

  priceDetail(element: Locator) {
    return element.innerText();
  }

  async priceWithRemovedComa(e: Locator) {
    return (await this.priceDetail(e)).replace(/,/g, "");
  }
}
