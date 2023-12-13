import * as graph from "../graphBuilder.js";
const csvPath = "../curent_prices/skicb-price.csv";

graph.lastPrice(csvPath, graph.createGraphSmall, "#small-chart1");
graph.parseData(
  csvPath,
  graph.createGraph,
  "Standard Price",
  "STANDARD ROOM RATE",
  "#chart1"
);
graph.parseData(
  csvPath,
  graph.createGraph,
  "Book early deal",
  "BWE",
  "#chart2"
);

graph.parseData(
  csvPath,
  graph.createGraph,
  "PASS HOLDER EXCLUSIVE CYBER SALE",
  "PASS HOLDER EXCLUSIVE CYBER SALE",
  "#chart3"
);

graph.parseData(
  csvPath,
  graph.createGraph,
  "EXTENDED SNOWCATION",
  "EXTENDED SNOWCATION",
  "#chart4"
);

graph.parseData(
  csvPath,
  graph.createGraph,
  "EARLY SKI",
  "EARLY SKI SEASON OFFER",
  "#chart5"
);
