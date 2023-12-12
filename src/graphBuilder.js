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
export function parseData(csvPath, createGraph, priceType, dealType, placer) {
  Papa.parse(csvPath, {
    download: true,
    complete: function (results) {
      createGraph(results.data, priceType, dealType, placer);
    },
  });
}

/**
 * @param {string} csvPath the path to the CSV file
 * @param {function} createGraphSmall the function for graph creating with only latest data
 * @param {string} placer web element the graph to be placed in
 */
export function lastPrice(csvPath, createGraphSmall, placer, filter) {
  Papa.parse(csvPath, {
    download: true,
    complete: function (results) {
      createGraphSmall(results.data, placer, filter);
    },
  });
}

export function createGraph(data, priceType, dealType, placer) {
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

export function createGraphSmall(data, placer, filter) {
  let dealName = [];
  let dealPrice = ["Last Price"];
  const lastDate = data[data.length - 1][0];
  console.log("lastDate: " + lastDate);

  for (var i = data.length - 1; i > 0; i--) {
    if (filter == undefined) {
      if (data[i][0] == lastDate) {
        dealName.push(data[i][2]);
        dealPrice.push(Number(data[i][6].split("$")[1]));
      } else {
        break;
      }
    } else {
      if (data[i][0] == lastDate) {
        if (data[i][2] == filter) {
          dealName.push(data[i][2]);
          dealPrice.push(Number(data[i][6].split("$")[1]));
        }
      } else {
        break;
      }
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
