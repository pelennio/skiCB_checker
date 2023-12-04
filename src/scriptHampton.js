import * as graph from "./graphBuilder.js";
const any = "2 Queen Room Fridge and Microwave";
const csvPath = "../curent_prices/hampton-price.csv";

graph.parseData(csvPath, graph.createGraph, "Honor Price", any, "#chart");
graph.lastPrace(csvPath, graph.createGraphSmall, "#chart5");

/*
 * Parse the data and create a graph with the data.
 */
/**
 * @param {string} csvPath the path to the CSV file
 * @param {function} createGraph the function for graph creating
 * @param {string} priceType the deal we tracking or a room type to be shown as a legend
 * @param {string} dealType the deal we tracking or a room type
 * @param {string} placer web element the graph to be placed in
 */
function parseData(csvPath, createGraph, priceType, dealType, placer) {
  Papa.parse(csvPath, {
    download: true,
    complete: function (results) {
      createGraph(results.data, priceType, dealType, placer);
    },
  });
}

function createGraph(data, priceType, dealType, placer) {
  let date = [];
  let price = [priceType];

  for (var i = 1; i < data.length; i++) {
    if (data[i][2] == dealType) {
      date.push(data[i][0]);
      price.push(Number(data[i][6].split("$")[1]));
    }
  }

  var chart = c3.generate({
    bindto: placer,
    title: {
      text: priceType,
    },
    data: {
      columns: [price],
    },
    axis: {
      y: {
        label: {
          // ADD
          text: "Price, $",
          position: "outer-middle",
        },
      },
      x: {
        type: "category",
        categories: date,
        groups: price,

        tick: {
          multiline: false,
          culling: {
            max: 20,
          },
        },
      },
    },
    zoom: {
      enabled: true,
    },
    legend: {
      position: "bottom",
    },
  });
}
