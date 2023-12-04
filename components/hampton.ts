import type { Locator, Page } from "@playwright/test";
export class Hampton {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //2 Queen Room Fridge and Microwave
  get roomType() {
    return this.page
      .getByTestId("noOfRoomsReturned")
      .locator('//*[@data-roomtypecode="NQRU"]')
      .getByTestId("roomTypeName");
  }

  get moreRatesButton() {
    return this.page
      .getByTestId("noOfRoomsReturned")
      .locator('//*[@data-roomtypecode="NQRU"]')
      .getByTestId("moreRatesButton");
  }

  get flexRateHonor() {
    return this.page
      .getByTestId("rateTableHonorsCell")
      .getByTestId("honorsDiscountBlock")
      .getByTestId("honorsDiscountPrice")
      .nth(0);
  }
  get totalRoomChargeAmount() {
    return this.page.getByTestId("totalRoomChargeAmount");
  }
  get totalTaxesAmount() {
    return this.page.getByTestId("totalTaxesAmount");
  }
  get totalForStayAmount() {
    return this.page.getByTestId("totalForStayAmount");
  }

  priceDetail(element: Locator) {
    return element.innerText();
  }
}
