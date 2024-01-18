// @ts-check
const { test } = require("@playwright/test");
const moment = require("moment");
import { Components } from "../components";
import { publish as publish_old } from "../src/publisher";
import { publish } from "../src/publisher1";
// https://www.skicb.com/plan-your-trip/lift-access/passes.aspx
// https://www.skicb.com/Plan-Your-Trip/stay/details/The-Grand-Lodge-Crested-Butte-Hotel-and-Suites?location=50422320&arrivaldate=12%2F19%2F2024&departuredate=12%2F26%2F2024&adultcount=3&childcount=1&childagearray=9

test.describe("Price check: ", async () => {
  const checkInDate = "12/19/2024";
  const checkOutDate = "12/26/2024";
  const myDate = moment().format("MM-D-YYYY");
  const csvPathOld = "curent_prices/skicb-price-old.csv";

  const csvPath = "curent_prices/skicb-price.csv";

  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://www.skicb.com/Plan-Your-Trip/stay/details/The-Grand-Lodge-Crested-Butte-Hotel-and-Suites?location=50422320"
    );
  });

  /**
   * @param {number} option the number of option among price deal
   */
  async function testPrice(option, { page }) {
    const component = new Components(page);

    await component.skibd.checkInDate.fill(checkInDate);
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill(checkOutDate);
    await component.skibd.peopleCount.fill("2");
    await component.skibd.childCount.fill("2");
    await component.skibd.peopleCount.click();
    await component.skibd.child_0_Age.fill("12");
    await component.skibd.child_1_Age.fill("8");
    await component.skibd.searchButton.click();
    const el = component.skibd.dealsText(option);

    try {
      const pricePromo = await el.innerText({ timeout: 1000 });
      await el.click();
      await component.skibd.addToCartButton.click();
      const subtotal = await component.skibd.priceWithRemovedComa(
        component.skibd.subtotal
      );
      const taxesFees = await component.skibd.priceWithRemovedComa(
        component.skibd.taxesFees
      );
      const onlineTotal = (
        await component.skibd.priceWithRemovedComa(component.skibd.onlineTotal)
      ).split("\n")[0];
      const rewardsTotal = await component.skibd.priceWithRemovedComa(
        component.skibd.rewardsTotal
      );
      publish_old(
        csvPathOld,
        pricePromo,
        subtotal,
        taxesFees,
        onlineTotal,
        rewardsTotal
      );

      await page.screenshot({
        path: `curent_prices/screens/${pricePromo}:${myDate}.png`,
      });
    } catch (error) {
      console.log(`There is no ${option + 1}-th option to test out`);
      test.skip();
    }
  }

  test("1-st room option", async ({ page }) => {
    await testPrice(0, { page });
  });

  test("2-st room option", async ({ page }) => {
    await testPrice(1, { page });
  });

  test("3-st room option", async ({ page }) => {
    await testPrice(2, { page });
  });

  test("4-st room option", async ({ page }) => {
    const component = new Components(page);
    const option = "The Grand Lodge at Crested Butte - 2 King Emmons Studio ";
    await page.goto(
      "https://www.skicb.com/Plan-Your-Trip/stay/details/The-Grand-Lodge-Crested-Butte-Hotel-and-Suites?location=50422320&arrivaldate=12%2F19%2F2024&departuredate=12%2F26%2F2024&adultcount=3&childcount=1&childagearray=9"
    );

    await component.skibd.myRoom.click();

    try {
      const pricePromo = "The Grand Lodge Crested Butte Hotel and Suites";
      const pricePerNight = await component.skibd.priceWithRemovedComa(
        component.skibd.basicPerNight
      );
      const taxesFees = await component.skibd.priceWithRemovedComa(
        component.skibd.taxesFees
      );
      const stayTotal = await component.skibd.priceWithRemovedComa(
        component.skibd.rewardsTotal
      );
      publish(csvPath, pricePromo, pricePerNight, taxesFees, stayTotal);

      await page.screenshot({
        path: `curent_prices/screens/${pricePromo}:${myDate}.png`,
      });
    } catch (error) {
      console.log(`There is option to test out`);
      test.skip();
    }
  });
});
