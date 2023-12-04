import type { Page } from "@playwright/test";

import { Skibd } from "./skibd";
import { Hilton } from "./hilton";
import { Hampton } from "./hampton";
export { Skibd, Hilton, Hampton };

export class Components {
  public skibd: Skibd;
  public hilton: Hilton;
  public hampton: Hampton;

  constructor(page: Page) {
    this.skibd = new Skibd(page);
    this.hilton = new Hilton(page);
    this.hampton = new Hampton(page);
  }
}
