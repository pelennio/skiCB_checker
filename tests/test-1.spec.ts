import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "https://www.airbnb.com/book/stays/42709896?numberOfAdults=2&numberOfChildren=2&checkin=2024-12-19&numberOfGuests=1&checkout=2024-12-26&guestCurrency=USD&productId=42709896&isWorkTrip=false&numberOfInfants=0&numberOfPets=0&code=HMJTXYSJWF&orderId=1060290872162033522"
  );
  await page.getByTestId("price-item-TAXES").getByText("$").click();
  await page.getByTestId("price-item-total").getByText("$").click();
});
