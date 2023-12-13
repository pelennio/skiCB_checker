import * as graph from "../graphBuilder.js";
// place where you need it
import { Dates } from "../../components/dates.js";
// var checkInDate = "2024-11-18",
//   checkOutDate = "2024-11-26";

const dates = new Dates();
const checkInDate = dates.checkInDate;
const checkOutDate = dates.checkOutDate;

const any = "The Woodcreek West Retreat - Fireplace, Hot Tub!";
const csvPath = "../curent_prices/cbAirbNB.csv";
const details = `The price for the stay from ${checkInDate} to ${checkOutDate}`;
let placeholder = document.querySelector("#search-details");
placeholder.innerHTML = details;

graph.parseData(
  csvPath,
  graph.createGraph,
  "Price for the stay",
  any,
  "#chart"
);
graph.lastPrice(csvPath, graph.createGraphSmall, "#small-chart1");
