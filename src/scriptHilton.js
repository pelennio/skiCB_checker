const any = "ENCLAVE GARDEN VIEW - 2 QUEEN BEDS";
parseData(createGraph, "Standard Price", any, "#chart");
lastPrace(createGraphSmall, "#chart5");

/*
 * Parse the data and create a graph with the data.
 */
function parseData(createGraph, priceType, dealType, placer) {
  Papa.parse("../curent_prices/hilton-price.csv", {
    download: true,
    complete: function (results) {
      createGraph(results.data, priceType, dealType, placer);
    },
  });
}

function lastPrace(createGraphSmall, placer) {
  Papa.parse("../curent_prices/hilton-price.csv", {
    download: true,
    complete: function (results) {
      createGraphSmall(results.data, placer);
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

///

function createGraphSmall(data, placer) {
  let dealName = [];
  let dealPrice = ["Last Price"];
  const lastDate = data[data.length - 1][0];
  console.log("lastDate: " + lastDate);

  for (var i = data.length - 1; i > 0; i--) {
    if (data[i][0] == lastDate) {
      dealName.push(data[i][2]);
      dealPrice.push(Number(data[i][6].split("$")[1]));
    } else {
      break;
    }
  }

  var chart2 = c3.generate({
    bindto: placer,
    title: {
      text: `Last prices for: ${lastDate}`,
    },
    data: {
      columns: [dealPrice],
      type: "bar",
    },
    axis: {
      y: {
        label: {
          text: "Price, $",
          position: "outer-middle",
        },
      },
      x: {
        type: "category",
        categories: dealName,

        tick: {
          multiline: false,
          culling: {
            max: 20,
          },
        },
      },
    },
    legend: {
      position: "bottom",
    },
  });
}
