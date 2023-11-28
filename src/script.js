/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
  Papa.parse("/curent_prices/price.csv", {
    download: true,
    complete: function (results) {
      console.log(results.data);
      createGraph(results.data);
    },
  });
}

function createGraph(data) {
  var date = [];
  var price = ["Price"];
  let lastTotalPrice;
  let lastTotalPrice2;
  let dealPrice = ["DealPrice"];

  for (var i = 1; i < data.length; i++) {
    if (data[i][2] == "STANDARD ROOM RATE") {
      date.push(data[i][0]);
      lastTotalPrice = Number(data[i][3].split("$")[1]);
      price.push(lastTotalPrice);
    } else if (data[i][2] == "BWE") {
      date.push(data[i][0]);
      lastTotalPrice2 = Number(data[i][3].split("$")[1]);
      dealPrice.push(lastTotalPrice2);
    }
  }

  console.log(date);
  console.log(price);

  var chart = c3.generate({
    bindto: "#chart",
    data: {
      columns: [price, dealPrice],
    },
    axis: {
      x: {
        type: "category",
        categories: date,
        tick: {
          multiline: false,
          culling: {
            max: 15,
          },
        },
      },
    },
    zoom: {
      enabled: true,
    },
    legend: {
      position: "right",
    },
  });
}

parseData(createGraph);
