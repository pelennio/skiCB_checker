const { test } = require("@playwright/test");
import { error } from "console";
import { AirbNBDates } from "../components/dates.js";
import { DatesCroatia } from "../components/dates.js";
import { Components } from "../components/index.js";
import { publish } from "../src/publisher1.js";

test.describe("@airbnb", "Price check: ", async () => {
  const csvPath = "curent_prices/cbAirbNB.csv";
  const dates = new AirbNBDates();
  const checkInDateCB = dates.checkInDate;
  const checkOutDateCB = dates.checkOutDate;

  const datesCroatia = new DatesCroatia();
  const checkInDateCroatia = datesCroatia.checkInDate;
  const checkOutDateCroatia = datesCroatia.checkOutDate;

  async function testPrice(option, place, { page }) {
    const component = new Components(page);
    let checkInDate;
    let checkOutDate;

    if (place == 1) {
      checkInDate = checkInDateCB;
      checkOutDate = checkOutDateCB;
    } else if (place == 2) {
      checkInDate = checkInDateCroatia;
      checkOutDate = checkOutDateCroatia;
    }
    try {
      const propertyUrl = `https://www.airbnb.com/rooms/${option}?adults=2&children=2&check_in=${checkInDate}&check_out=${checkOutDate}`;
      const myLink = await page.goto(propertyUrl);
      let res1 = (await myLink.request().response()).status();
      console.log("The status>> ", res1);
      await page.waitForTimeout(3000);
      if (page.url() === "https://www.airbnb.com/") {
        test.skip("Test skipped because it landed on the Airbnb homepage");
        return;
      }
      if (res1 == 410) {
        throw new Error("The initial page cannot be loaded");
      }

      try {
        await component.cbAirbNB.translationModalClose.click({ timeout: 3000 });
        console.log("Translation modal was closed");
      } catch (error) {
        console.log("There is no translation prompt");
      }

      try {
        const pricePromo = await component.cbAirbNB.dealHeader.innerText();
        // ,,,,
        //   .first()
        //   .innerText({ timeout: 3000 });
        if (await component.cbAirbNB.errorShown.isVisible()) {
          console.log("🧭 The price for this dates is not available");
          test.skip("Test skipped because it landed on the Airbnb homepage");
          return;
        }
        await component.cbAirbNB.reserveButton.click(); // click on reserve button to get price details
        const pricePerNightText =
          await component.cbAirbNB.pricePerNight.innerText();
        const pricePerNight = pricePerNightText.split(" ")[0];
        console.log(pricePerNight);
        let taxesFees;
        try {
          if (place == 1) {
            taxesFees = await component.cbAirbNB.taxesTotal.innerText();
          } else if (place == 2) {
            taxesFees = await component.cbAirbNB.taxesTotalCroatia.innerText({
              timeout: 3000,
            });
          }
          // taxesFees = await component.cbAirbNB.cleaningFee.innerText();
        } catch (error) {
          console.log("I cannot find taxes");
        }

        const stayTotal = (
          await component.cbAirbNB.priceWithRemovedComa(
            component.cbAirbNB.stayTotalPrice
          )
        )
          .split(" ", 1)
          .toString();
        publish(csvPath, pricePromo, pricePerNight, taxesFees, stayTotal);
        console.log(
          "Test details: ",
          pricePromo,
          pricePerNight,
          taxesFees,
          stayTotal
        );
      } catch (error) {
        console.log("🛠️ ", error.message);
      }
    } catch (error) {
      console.log(
        `💡 Some error happen and test was not run", \n`,
        error.message
      );
    }
  }

  test("1-st room option", async ({ page }) => {
    await testPrice("42709896", 1, { page });
  });

  test("2-st room option", async ({ page }) => {
    await testPrice("738343714490717816", 1, { page });
  });

  test("3-st room option", async ({ page }) => {
    await testPrice("45972067", 1, { page });
  });

  test("4-st room option", async ({ page }) => {
    await testPrice("717384652646959728", 1, { page });
  });

  test("5-st room option", async ({ page }) => {
    await testPrice("976942999049228298", 1, { page });
  });

  test("6-st room option", async ({ page }) => {
    await testPrice("962961861588262265", 1, { page });
  });
  test("7-st room option", async ({ page }) => {
    await testPrice("623251683275207962", 1, { page });
  });
  test("8-st room option", async ({ page }) => {
    await testPrice("570325193548210419", 1, { page });
  });
  test("9-st room option", async ({ page }) => {
    await testPrice("708259216851565596", 1, { page });
  });
  test("10-st room option", async ({ page }) => {
    await testPrice("47799836", 1, { page });
  });
  test("11-st room option", async ({ page }) => {
    await testPrice("51168487", 1, { page });
  });
  test("12-st room option", async ({ page }) => {
    await testPrice("668014570938455905", 1, { page });
  });

  test("13-st room option", async ({ page }) => {
    await testPrice("570817594388233012", 1, { page });
  });
  test("14-st room option", async ({ page }) => {
    await testPrice("50895934", 1, { page });
  });

  test("15-st room option", async ({ page }) => {
    await testPrice("41884759", 1, { page });
  });

  test("16-st room option", async ({ page }) => {
    await testPrice("31807082", 1, { page });
  });

  test("17-st room option", async ({ page }) => {
    await testPrice("30464623", 1, { page });
  });
});
