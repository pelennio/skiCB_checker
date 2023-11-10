// @ts-check
const { test } = require("@playwright/test");
const moment = require("moment");
import { Components } from "../components";
import { publish } from "../src/publisher";

test.describe("Price check: ", async () => {
  const checkInDate = "12/19/2023";
  const checkOutDate = "12/26/2023";
  const myDate = moment().format("MM-D-YYYY");

  test.beforeEach(async ({ page }) => {
    await page.goto(
      "https://www.skicb.com/Plan-Your-Trip/stay/details/The-Grand-Lodge-Crested-Butte-Hotel-and-Suites?location=50422320"
    );
  });

  test("Price check: Book Winter Early & Save: Non-Refundable", async ({
    page,
  }) => {
    const component = new Components(page);
    await component.skibd.checkInDate.fill(checkInDate);
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill(checkOutDate);
    await component.skibd.peopleCount.fill("4");
    await component.skibd.searchButton.click();
    await component.skibd.bweOption.click();
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

    const pricePromo = "BWE";
    publish(`${pricePromo}`, subtotal, taxesFees, onlineTotal, rewardsTotal);
    await page.screenshot({
      path: `curent_prices/${pricePromo}:${myDate}.png`,
    });
  });

  test("Extended Snowcation", async ({ page }) => {
    const component = new Components(page);
    await component.skibd.checkInDate.fill(checkInDate);
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill(checkOutDate);
    await component.skibd.peopleCount.fill("4");
    await component.skibd.searchButton.click();
    await component.skibd.esOption.click();
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
    const pricePromo = "ES";
    publish(`${pricePromo}`, subtotal, taxesFees, onlineTotal, rewardsTotal);
    await page.screenshot({
      path: `curent_prices/${pricePromo}:${myDate}.png`,
    });
  });

  test("Standard room option", async ({ page }) => {
    const component = new Components(page);
    await component.skibd.checkInDate.fill(checkInDate);
    await component.skibd.checkOutDate.click();
    await component.skibd.checkOutDate.fill(checkOutDate);
    await component.skibd.peopleCount.fill("4");
    await component.skibd.searchButton.click();
    await component.skibd.standardOption.click();
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
    const pricePromo = "STANDARD";
    publish(`${pricePromo}`, subtotal, taxesFees, onlineTotal, rewardsTotal);
    await page.screenshot({
      path: `curent_prices/${pricePromo}:${myDate}.png`,
    });
  });

  test("BweOption room option with 2 kids", async ({ page }) => {
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
    await component.skibd.bweOption.click();
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
    const pricePromo = "BWE_kids";
    publish(`${pricePromo}`, subtotal, taxesFees, onlineTotal, rewardsTotal);
    await page.screenshot({
      path: `curent_prices/${pricePromo}:${myDate}.png`,
    });
  });
});
