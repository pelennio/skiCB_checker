/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph) {
  Papa.parse("../curent_prices/price.csv", {
    download: true,
    complete: function (results) {
      console.log(results.data);
      createGraph(results.data);
    },
  });
}

function createGraph(data) {
  var date = [];
  var price = ["Standard Price"];

  for (var i = 1; i < data.length; i++) {
    if (data[i][2] == "STANDARD ROOM RATE") {
      date.push(data[i][0]);
      price.push(Number(data[i][6].split("$")[1]));
    }
  }

  var chart = c3.generate({
    bindto: "#chart",
    title: {
      text: "Standard price",
    },
    data: {
      columns: [date, price],
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

///

function createGraph1(data) {
  var date = [];
  let dealPrice = ["Deal Price"];

  for (var i = 1; i < data.length; i++) {
    if (data[i][2] == "BWE") {
      date.push(data[i][0]);
      dealPrice.push(Number(data[i][6].split("$")[1]));
    }
  }

  var chart2 = c3.generate({
    bindto: "#chart2",
    title: {
      text: "Book early deal",
    },
    data: {
      columns: [date, dealPrice],
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
        groups: dealPrice,

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

parseData(createGraph);
parseData(createGraph1);
