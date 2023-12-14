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

  //Hilton Houston
  //button more price
  get morePriceButton() {
    return this.page
      .locator('//*[@data-roomtypecode="Q2"]')
      .locator('//*[@data-cypress="roomMoreRatesButtonQ2"]');
  }

  get flex_honor_night_price() {
    return this.page
      .getByTestId("honorsDiscountBlock")
      .nth(0)
      .getByTestId("honorsDiscountPrice");
  }
  get flex_title() {
    return this.page
      .getByTestId("rateTableDescriptionCell")
      .nth(0)
      .getByTestId("rateNameText");
  }

  get flex_book_button() {
    return this.page
      .getByTestId("rateTableHonorsCell")
      .nth(0)
      .getByTestId("honorsDiscountBookCTA");
  }

  get total_per_stay() {
    return this.page.getByTestId("totalForStayAmount");
  }
  get full_total_per_stay() {
    return this.page.getByTestId("totalForStay");
  }
  get total_tax() {
    return this.page.locator(".PriceSummary_priceLine__aOf8m").last();
  }

  priceDetail(element: Locator) {
    return element.innerText();
  }

  async priceWithRemovedComa(e: Locator) {
    return (await this.priceDetail(e)).replace(/,/g, "");
  }
}
