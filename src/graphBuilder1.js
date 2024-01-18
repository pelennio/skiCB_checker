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
async function parseData(csvPath, createGraph, priceType, dealType, placer) {
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
async function lastPrice(
  csvPath,
  createGraphSmall,
  placer,
  placerPerNight,
  placerTotal,
  filter
) {
  Papa.parse(csvPath, {
    download: true,
    complete: function (results) {
      createGraphSmall(
        results.data,
        placer,
        placerPerNight,
        placerTotal,
        filter
      );
    },
  });
}

async function createGraph(data, priceType, dealType, placer) {
  let date = [];
  let price = [priceType];

  for (var i = 1; i < data.length; i++) {
    if (data[i][2] == dealType) {
      date.push(data[i][0]);
      price.push(Number(data[i][5].split("$")[1]));
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
          fit: true,
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
      position: "bottom",
    },
  });
}

async function createGraphSmall(
  data,
  placer,
  placerPerNight,
  placerTotal,
  filter
) {
  let dealName = [];
  let dealPrice = ["Last Price"];
  const lastDate = data[data.length - 1][0];
  console.log("Building graph for - lastDate: " + lastDate);
  let lastNightPrice;
  let lastTotalPrice;

  for (var i = data.length - 1; i > 0; i--) {
    if (filter == undefined) {
      lastNightPrice = data[data.length - 1][3];
      console.log("SOME-1: " + lastNightPrice);
      break;
    } else {
      if (data[i][2] == filter) {
        lastNightPrice = data[i][3];
        lastTotalPrice = data[i][5];
        break;
      }
    }
  }

  const details = `The last price for night: ${lastNightPrice} `;
  let placeholder = document.querySelector(`${placerPerNight}`);
  const details1 = `The last total for the stay: ${lastTotalPrice} `;
  let placeholder1 = document.querySelector(`${placerTotal}`);
  placeholder.innerHTML = details;
  placeholder1.innerHTML = details1;

  for (var i = data.length - 1; i > 0; i--) {
    if (filter == undefined) {
      if (data[i][0] == lastDate) {
        dealName.push(data[i][2]);
        dealPrice.push(Number(data[i][5].split("$")[1]));
      } else {
        break;
      }
    } else {
      if (data[i][0] == lastDate) {
        if (data[i][2] == filter) {
          dealName.push(data[i][2]);
          dealPrice.push(Number(data[i][5].split("$")[1]));
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
          multiline: true,
          // culling: false,
          fit: true,
          culling: {
            max: 20,
          },
        },
      },
    },
    legend: {
      position: "inset",
    },
  });
}

export async function setGraphsPerStay(option, packageDetails, csvPath) {
  const title = document.querySelector(`${option} .propertyName`);
  title.innerHTML = packageDetails.name;
  title.setAttribute("href", packageDetails.link);
  const image = document.querySelector(`${option}  .image`);
  image.setAttribute("src", packageDetails.imgSource);
  const map = document.querySelector(`${option} .map`);
  map.innerHTML = packageDetails.address;
  map.setAttribute("href", packageDetails.addressMap);

  await parseData(
    csvPath,
    createGraph,
    "Price for the stay",
    packageDetails.name,
    `${option} .chart`
  );

  await lastPrice(
    csvPath,
    createGraphSmall,
    `${option} .small-chart`,
    `${option} .nightPrice`,
    `${option} .totalPrice`,
    packageDetails.name
  );
}
