import type { Page } from "@playwright/test";

import { Skibd } from "./skibd";
export { Skibd };

import { Hilton } from "./hilton";
export { Hilton };

export class Components {
  public skibd: Skibd;
  public hilton: Hilton;

  constructor(page: Page) {
    this.skibd = new Skibd(page);
    this.hilton = new Hilton(page);
  }
}
