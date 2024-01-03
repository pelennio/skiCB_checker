import * as graph from "../graphBuilder1.js";
// place where you need it
import { Dates } from "../../components/dates.js";

const dates = new Dates();
const checkInDate = dates.checkInDate;
const checkOutDate = dates.checkOutDate;
const packageName1 = "The Woodcreek West Retreat - Fireplace, Hot Tub!";
const packageName2 = "Ski in/out,50Ft from Lift,Sleeps 7.Luxury Remodel!";
const packageName3 = "Easy Mountain";
const csvPath = "../curent_prices/cbAirbNB.csv";
const details = `The price for the stay from ${checkInDate} to ${checkOutDate}`;
let placeholder = document.querySelector(".search-details");
placeholder.innerHTML = details;

graph.parseData(
  csvPath,
  graph.createGraph,
  "Price for the stay",
  packageName1,
  "#chart1"
);
graph.lastPrice(
  csvPath,
  graph.createGraphSmall,
  "#small-chart1",
  "#nightPrice1",
  packageName1
);

graph.parseData(
  csvPath,
  graph.createGraph,
  "Price for the stay",
  packageName2,
  "#chart2"
);
graph.lastPrice(
  csvPath,
  graph.createGraphSmall,
  "#small-chart2",
  "#nightPrice2",
  packageName2
);

graph.parseData(
  csvPath,
  graph.createGraph,
  "Price for the stay",
  packageName3,
  "#chart3"
);
graph.lastPrice(
  csvPath,
  graph.createGraphSmall,
  "#small-chart3",
  "#nightPrice3",
  packageName3
);
