import type { Locator, Page } from "@playwright/test";
export class CrestedButteAirbNB {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  get errorShown() {
    return this.page.locator("#bookItTripDetailsError");
  }
  get dealHeader() {
    return this.page
      .locator('//*[@data-section-id="TITLE_DEFAULT"]')
      .getByRole("heading");
  }
  get pricePerNight() {
    return this.page.locator("._1jo4hgw");
  }
  get pricePerStay() {
    return this.page.locator("._1qs94rc ._j1kt73");
  }

  get reserveButton() {
    return this.page.getByRole("button", { name: "Reserve" });
  }

  get taxesTotal() {
    return this.page.getByTestId("price-item-TAXES");
  }
  get taxesTotalCroatia() {
    return this.page.getByTestId("price-item-AIRBNB_GUEST_FEE");
  }
  get translationModalClose() {
    return this.page.getByTestId("modal-container").getByLabel("Close");
  }
  get cleaningFee() {
    return this.page.getByTestId("price-item-CLEANING_FEE");
  }

  get stayTotalPrice() {
    return this.page.getByTestId("price-item-total");
  }

  priceDetail(element: Locator) {
    return element.innerText();
  }

  async priceWithRemovedComa(e: Locator) {
    return (await this.priceDetail(e)).replace(/,/g, "");
  }
}
