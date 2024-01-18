import * as graph from "../graphBuilder.js";
import * as graph1 from "../graphBuilder1.js";
const csvPath = "../curent_prices/skicb-price.csv";
const csvPathOld = "../curent_prices/skicb-price-old.csv";

const package1 = {
  name: "The Grand Lodge Crested Butte Hotel and Suites",
  link: "https://www.skicb.com/Plan-Your-Trip/stay/details/The-Grand-Lodge-Crested-Butte-Hotel-and-Suites?location=50422320&arrivaldate=12%2F19%2F2024&departuredate=12%2F26%2F2024&adultcount=3&childcount=1&childagearray=9",
  imgSource:
    "https://digital.snow.com/api/imgproxy/fetch?url=unsafe/resize:fit:600:450/dpr:1/plain/https://images.vrinntopia.com/photos//50422320/50422320-5-240e1aa1.jpg",
  address: "PO Box 5700, Mt. Crested Butte CO",
  addressMap: "https://maps.app.goo.gl/fEMeXQDVxo8m4YXt9",
};
graph1.setGraphsPerStay(".option_1", package1, csvPath);

///////
graph.lastPrice(csvPathOld, graph.createGraphSmall, "#small-chart1");
graph.parseData(
  csvPathOld,
  graph.createGraph,
  "Standard Price",
  "STANDARD ROOM RATE",
  "#chart1"
);
graph.parseData(
  csvPathOld,
  graph.createGraph,
  "Book early deal",
  "BWE",
  "#chart2"
);

graph.parseData(
  csvPathOld,
  graph.createGraph,
  "PASS HOLDER EXCLUSIVE CYBER SALE",
  "PASS HOLDER EXCLUSIVE CYBER SALE",
  "#chart3"
);

graph.parseData(
  csvPathOld,
  graph.createGraph,
  "EXTENDED SNOWCATION",
  "EXTENDED SNOWCATION",
  "#chart4"
);

graph.parseData(
  csvPathOld,
  graph.createGraph,
  "EARLY SKI",
  "EARLY SKI SEASON OFFER",
  "#chart5"
);
