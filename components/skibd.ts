import type { Locator, Page } from "@playwright/test";
export class Skibd {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get checkInDate() {
    return this.page.getByLabel("Check-In");
  }
  get checkOutDate() {
    return this.page.getByLabel("Check-Out");
  }

  get peopleCount() {
    return this.page.locator("#lodging_details_filter__adult_countInput");
  }
  get childCount() {
    return this.page.locator("#lodging_details_filter__child_countInput");
  }
  get child_0_Age() {
    return this.page.locator("#lodging_details_filter__child_age_0Input");
  }
  get child_1_Age() {
    return this.page.locator("#lodging_details_filter__child_age_1Input");
  }

  get searchButton() {
    return this.page.getByRole("button", { name: "Search" });
  }
  get dealsList() {
    return this.page.locator(".lodging_details_deals__deals_list ");
  }

  get bweOption() {
    return this.page.getByRole("heading", {
      name: "Book Winter Early & Save: Non-Refundable",
    });
  }

  get cyberSale() {
    return this.page.getByRole("heading", {
      name: "Pass Holder Exclusive Cyber Sale",
    });
  }

  get esOption() {
    return this.page.getByRole("heading", {
      name: "Extended Snowcation",
    });
  }
  get standardOption() {
    return this.page.getByRole("heading", {
      name: "Standard Room Rate",
    });
  }

  get addToCartButton() {
    return this.page
      .locator("#c27_Product_Detail_1")
      .getByRole("button", { name: "Add to Cart ," });
  }

  get subtotal() {
    return this.page.locator(".g1__pricetotal--v3.summary_price_value").nth(0);
  }

  get taxesFees() {
    return this.page.locator(".g1__pricetotal--v3.summary_price_value").nth(1);
  }

  get onlineTotal() {
    return this.page.locator(
      ".g1__pricetotal--v1.summary_price_value--prominent-price.summary_price_value"
    );
  }

  get rewardsTotal() {
    return this.page.locator(".g1__pricetotal_rewards--v3.summary_price_value");
  }

  priceDetail(element: Locator) {
    return element.innerText();
  }

  dealsText(num: number) {
    return this.page
      .locator(
        ".lodging_details_deals__deals_list .lodging_details_deals__deals_item__label_text"
      )
      .nth(num);
  }

  get myRoom() {
    return this.page
      .locator("#c27_Product_Detail_2")
      .getByRole("button", { name: "Add to Cart" });
  }

  get basicPerNight() {
    return this.page
      .locator("#c27_Product_Detail_2")
      .locator(".lodging_details_unit_results__unit_price_nightly")
      .nth(0);
  }

  async priceWithRemovedComa(e: Locator) {
    return (await this.priceDetail(e)).replace(/,/g, "");
  }
}
