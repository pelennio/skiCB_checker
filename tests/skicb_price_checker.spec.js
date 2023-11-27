// @ts-check
const { test, errors } = require("@playwright/test");
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

  test("1-st room option", async ({ page }) => {
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
    const pricePromo = await component.skibd.dealsText.nth(0).innerText();
    await component.skibd.dealsText.nth(0).click();
    console.log(pricePromo + " typeOf ");
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
    publish(`${pricePromo}`, subtotal, taxesFees, onlineTotal, rewardsTotal);
    await page.screenshot({
      path: `curent_prices/${pricePromo}:${myDate}.png`,
    });
  });

  test("2-st room option", async ({ page }) => {
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
    const pricePromo = await component.skibd.dealsText.nth(1).innerText();
    await component.skibd.dealsText.nth(1).click();
    console.log(pricePromo + " typeOf ");
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
    publish(`${pricePromo}`, subtotal, taxesFees, onlineTotal, rewardsTotal);
    await page.screenshot({
      path: `curent_prices/${pricePromo}:${myDate}.png`,
    });
  });

  test("3-st room option", async ({ page }) => {
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
    try {
      const pricePromo = await component.skibd.dealsText.nth(2).innerText();
      await component.skibd.dealsText.nth(2).click();
      console.log(pricePromo + " typeOf ");
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
      publish(`${pricePromo}`, subtotal, taxesFees, onlineTotal, rewardsTotal);
      await page.screenshot({
        path: `curent_prices/${pricePromo}:${myDate}.png`,
      });
    } catch (error) {
      console.log("not timeout error---->>>>");
      console.log(error);
      test.skip();
    }
  });
});
