import type { Locator, Page } from "@playwright/test";
export class CrestedButteAirbNB {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get dealHeader() {
    return this.page
      .locator('//*[@data-section-id="TITLE_DEFAULT"]')
      .getByRole("heading");
  }
  get pricePerNight() {
    return this.page.locator("._1jo4hgw ._tyxjp1");
  }
  get pricePerStay() {
    return this.page.locator("._1qs94rc ._j1kt73");
  }

  priceDetail(element: Locator) {
    return element.innerText();
  }

  async priceWithRemovedComa(e: Locator) {
    return (await this.priceDetail(e)).replace(/,/g, "");
  }
}
