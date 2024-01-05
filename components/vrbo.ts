import type { Locator, Page } from "@playwright/test";
export class VRBO {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // get errorShown() {
  //   return this.page.getByText("Those dates are not available");
  // }
  get dealHeader() {
    return this.page
      .locator('//*[@data-stid="content-hotel-title"]')
      .locator(".uitk-heading");
  }
  get pricePerNight() {
    return this.page
      .locator('//*[@data-test-id="price-summary-message-line"]')
      .locator(".uitk-text")
      .nth(1);
  }

  get detailsButton() {
    return this.page.getByRole("button", { name: "Price details" });
  }

  get taxesTotal() {
    return this.page
      .locator('//*[@data-stid="price-summary-card"]')
      .locator(".uitk-table-row")
      .nth(1)
      .locator(".uitk-table-cell")
      .nth(1);
  }

  get stayTotalPrice() {
    return this.page
      .locator('//*[@data-stid="price-summary-card"]')
      .locator(".uitk-card-content-section")
      .nth(1)
      .locator(".uitk-table-row")
      .locator(".uitk-table-cell")
      .nth(1);
  }

  priceDetail(element: Locator) {
    return element.innerText();
  }

  async priceWithRemovedComa(e: Locator) {
    return (await this.priceDetail(e)).replace(/,/g, "");
  }
}
