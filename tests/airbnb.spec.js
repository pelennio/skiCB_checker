const { test } = require("@playwright/test");
import { error } from "console";
import { Dates } from "../components/dates.js";
import { DatesCroatia } from "../components/dates.js";
import { Components } from "../components/index.js";
import { publish } from "../src/publisher1.js";
import { expect } from "@playwright/test";

test.describe("Price check: ", async () => {
  const csvPath = "curent_prices/cbAirbNB.csv";
  const dates = new Dates();
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
      if (res1 == 410) {
        throw new Error("The initial page cannot be loaded");
      }

      try {
        await component.cbAirbNB.translationModalClose.click({ timeout: 3000 });
        console.log("Hello");
      } catch (error) {
        console.log("There is no translation prompt");
      }

      try {
        const pricePromo = await component.cbAirbNB.dealHeader.innerText();
        const pricePerNight = await component.cbAirbNB.pricePerNight
          .first()
          .innerText({ timeout: 3000 });
        await component.cbAirbNB.reserveButton.click();
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
      } catch (error) {
        propertyUrl = await expect(component.cbAirbNB.errorShown).toBeVisible();
        console.log("The price for this dates are not available");
      }
    } catch (error) {
      console.log("Catched error ", error.message);
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
  //https://www.airbnb.com/s/Zagreb--Croatia/homes?flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2024-12-21&monthly_length=3&query=Zagreb%2C%20Croatia&refinement_paths%5B%5D=%2Fhomes&tab_id=home_tab&date_picker_type=calendar&checkin=2024-07-20&checkout=2024-07-27&adults=2&children=2&source=structured_search_input_header&search_type=user_map_move&price_filter_input_type=0&price_filter_num_nights=7&channel=EXPLORE&zoom_level=10.061783123394292&place_id=ChIJOcwCyZLWZUcRisL7KJYkRTo&ne_lat=44.50738461996349&ne_lng=15.815044206737838&sw_lat=43.778501284199436&sw_lng=15.253867019766346&zoom=10.061783123394292&search_by_map=true&min_bedrooms=3&l2_property_type_ids%5B%5D=1&amenities%5B%5D=7&price_max=300&monthly_end_date=2024-05-01
  test("12-st room option - Croatia", async ({ page }) => {
    await testPrice("11511490", 2, { page });
  });

  test("13-st room option - Croatia", async ({ page }) => {
    await testPrice("575138458935644028", 2, { page });
  });
});
