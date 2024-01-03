// @ts-check
const { test } = require("@playwright/test");
import { Components } from "../components";
import { publish } from "../src/publisher";

test.describe("Price check: ", async () => {
  const csvPath = "curent_prices/hampton-price.csv";

  /**
   * @param {string} checkInDate
   * @param {string} checkOutDate
   */
  async function checkPrice(checkInDate, checkOutDate, visit, { page }) {
    const component = new Components(page);
    await page.goto(
      `https://www.hilton.com/en/book/reservation/rooms/?ctyhocn=AMADHHX&arrivalDate=${checkInDate}&departureDate=${checkOutDate}&room1NumAdults=2&room1NumChildren=2`
    );
    const roomType = await component.hampton.roomType.innerText();
    await component.hampton.moreRatesButton.click();
    await component.hampton.flexRateHonor.click();
    const onlineTotal = await component.hampton.priceDetail(
      component.hampton.totalRoomChargeAmount
    );
    const taxTotal = await component.hampton.priceDetail(
      component.hampton.totalTaxesAmount
    );
    const rewardsTotal = await component.hampton.priceDetail(
      component.hampton.totalForStayAmount
    );
    publish(
      csvPath,
      roomType + " " + visit,
      visit,
      taxTotal,
      onlineTotal,
      rewardsTotal
    );
  }

  test.skip("1-st room option", async ({ page }) => {
    await checkPrice("2023-12-18", "2023-12-19", "first", { page });
  });
  test.skip("2-st room option", async ({ page }) => {
    await checkPrice("2023-12-26", "2023-12-27", "second", { page });
  });
});
