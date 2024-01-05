import type { Page } from "@playwright/test";

import { Skibd } from "./skibd";
import { Hilton } from "./hilton";
import { Hampton } from "./hampton";
import { CrestedButteAirbNB } from "./airbNB";
import { VRBO } from "./vrbo";
export class Components {
  public skibd: Skibd;
  public hilton: Hilton;
  public hampton: Hampton;
  public cbAirbNB: CrestedButteAirbNB;
  public vrbo: VRBO;

  constructor(page: Page) {
    this.skibd = new Skibd(page);
    this.hilton = new Hilton(page);
    this.hampton = new Hampton(page);
    this.cbAirbNB = new CrestedButteAirbNB(page);
    this.vrbo = new VRBO(page);
  }
}
