// @ts-check
const { test } = require("@playwright/test");
const moment = require("moment");
import { Components } from "../components";
import { publish } from "../src/publisher";
import { removeDuplicatesFromResults } from "../src/duplicate-remover.js";

test.describe("Price check: ", async () => {
  const checkInDate = "03/09/2024";
  const checkOutDate = "03/16/2024";
  const myDate = moment().format("MM-D-YYYY");
  const csvPath = "curent_prices/hilton-price.csv";

  test.afterAll("Teardown", async () => {
    console.log("csvPath: ", csvPath, `\n`, "**********");
    await removeDuplicatesFromResults(csvPath);
  });

  test("1-st room option", async ({ page }) => {
    const component = new Components(page);
    await page.goto(
      "https://be.synxis.com/?adult=3&arrive=2024-03-09&chain=17001&child=1&childages=8&config=PlayaWebsite&configcode=PlayaWebsite&currency=USD&depart=2024-03-16&dsclid=57964578136145920&hotel=5231&level=hotel&local=en-US&locale=en-US&rooms=1&theme=PlayaWebsite&themecode=PlayaWebsite&utm_medium=metasearch&utm_source=tripadvisor&utm_term=US"
    );

    const pricePromo = await component.hilton.dealHeader.innerText();
    const onlineTotal = await component.hilton.pricePerNight.innerText();
    const rewardsTotal = (
      await component.hilton.priceWithRemovedComa(component.hilton.pricePerStay)
    )
      .split(" ", 1)
      .toString();
    const subtotal = "n/a";
    const taxesFees = "n/a";

    publish(
      csvPath,
      pricePromo,
      subtotal,
      taxesFees,
      onlineTotal,
      rewardsTotal
    );
  });

  test("2-st room option: Hilton Garden Inn  Houston", async ({ page }) => {
    const component = new Components(page);
    await page.goto(
      "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=HOUSIGI&arrivalDate=2024-01-26&departureDate=2024-01-28&room1NumAdults=2&room1NumChildren=2"
    );
    await component.hilton.morePriceButton.click();
    const pricePerNight =
      await component.hilton.flex_honor_night_price.innerText();
    const pricePromo = await component.hilton.flex_title.innerText();
    await component.hilton.flex_book_button.click();
    await page.waitForTimeout(3000);
    const subtotal = "n/a";
    let taxesFees = (
      await component.hilton.total_tax.innerText({ timeout: 3000 })
    ).split("\n", 3)[1];
    console.log("taxesFees: ", taxesFees);
    let rewardsTotal = await component.hilton.total_per_stay.innerText({
      timeout: 3000,
    });
    console.log("rewardsTotal: ", rewardsTotal);
    publish(
      csvPath,
      pricePromo,
      subtotal,
      taxesFees,
      pricePerNight,
      // @ts-ignore
      rewardsTotal
    );
  });

  test("3-st room option: Tru by Hilton Amarillo West", async ({ page }) => {
    const component = new Components(page);
    await page.goto(
      "https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=AMATXRU&arrivalDate=2023-12-26&departureDate=2023-12-27&room1NumAdults=2&room1NumChildren=2"
    );
    await component.hilton.morePriceButton.click();
    const pricePerNight =
      await component.hilton.flex_honor_night_price.innerText();
    const pricePromo =
      (await component.hilton.flex_title.innerText()) + " - Amarillo";
    await component.hilton.flex_book_button.click();
    await page.waitForTimeout(3000);
    const subtotal = "n/a";
    let taxesFees = (
      await component.hilton.total_tax.innerText({ timeout: 3000 })
    ).split("\n", 3)[1];
    console.log("taxesFees: ", taxesFees);
    let rewardsTotal = await component.hilton.total_per_stay.innerText({
      timeout: 3000,
    });
    console.log("rewardsTotal: ", rewardsTotal);
    publish(
      csvPath,
      pricePromo,
      subtotal,
      taxesFees,
      pricePerNight,
      // @ts-ignore
      rewardsTotal
    );
  });
});
