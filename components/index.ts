import type { Page } from "@playwright/test";

import { Skibd } from "./skibd";

export { Skibd };

export class Components {
  public skibd: Skibd;

  constructor(page: Page) {
    this.skibd = new Skibd(page);
  }
}
