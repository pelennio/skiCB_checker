import { setGraphsPerStay } from "../graphBuilder1.js";
import { Dates } from "../../components/dates.js";

const dates = new Dates();
const checkInDate = dates.checkInDate;
const checkOutDate = dates.checkOutDate;
const csvPath = "../curent_prices/cbAirbNB.csv";
const details = `The price for the stay from ${checkInDate} to ${checkOutDate}`;
let placeholder = document.querySelector(".search-details");
placeholder.innerHTML = details;

//reformat date to use in search link
async function formatDate(date) {
  const [month, day, year] = date.split("/");
  const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
    2,
    "0"
  )}`;
  return formattedDate;
}
console.log(await formatDate(checkInDate));

const linkPlaceholder = document.querySelector(".web-site-search-link");
const link = `https://www.airbnb.com/s/Crested-Butte-Mountain-Resort--Mount-Crested-Butte--CO/homes?place_id=ChIJO4oGmYZtQIcR-qDfkW5kg6Y&refinement_paths%5B%5D=%2Fhomes&checkin=${await formatDate(
  checkInDate
)}&checkout=${await formatDate(
  checkOutDate
)}&date_picker_type=calendar&adults=2&children=2&guests=4&search_type=AUTOSUGGEST`;
linkPlaceholder.innerHTML = "New search on AitbNB site";
linkPlaceholder.setAttribute("href", link);

async function getLink(propertyID) {
  let link = `https://www.airbnb.com/rooms/${propertyID}?adults=2&children=2&check_in=${checkInDate}&check_out=${checkOutDate}`;
  return link;
}

`https://www.airbnb.com/s/Mt-Crested-Butte--Colorado--USA/homes?flexible_trip_lengths%5B%5D=one_week&monthly_start_date=${checkInDate}&monthly_length=3&query=Mt%20Crested%20Butte%2C%20CO&place_id=ChIJ_ew67ZttQIcRghQKyP89KzY&refinement_paths%5B%5D=%2Fhomes&tab_id=home_tab&date_picker_type=calendar&checkin=${checkInDate}&checkout=${checkOutDate}&adults=2&children=2&source=structured_search_input_header&search_type=user_map_move&price_filter_input_type=0&price_filter_num_nights=7&channel=EXPLORE&ne_lat=38.89856079607466&ne_lng=-106.96540563507915&sw_lat=38.89447370838086&sw_lng=-106.96752406649836&zoom=18.209586056623746&zoom_level=18.209586056623746&search_by_map=true`;

const package1 = {
  name: "The Woodcreek West Retreat - Fireplace, Hot Tub!",
  link: await getLink("42709896"),
  imgSource:
    "https://a0.muscache.com/im/pictures/02bf1e62-3345-4b6d-9109-1e13c44f4b1e.jpg",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package2 = {
  name: "Ski in/out,50Ft from Lift,Sleeps 7.Luxury Remodel!",
  link: await getLink("738343714490717816"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-738343714490717816/original/f6f21996-3b72-4fa1-9dcf-67a4aef99d65.jpeg?im_w=720",
  address: "12 Snowmass Rd, Crested Butte, CO 81224",
  addressMap: "https://maps.app.goo.gl/pCwnYjQRV9hZYGWV7",
};

const package3 = {
  name: "Easy Mountain",
  link: await getLink("45972067"),
  imgSource:
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-45972067/original/a2e38200-b96f-4c84-9b09-1fe783f62fbd.jpeg?im_w=960",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package4 = {
  name: "The Ruby at Woodcreek - Walk to Slopes, Hot Tub",
  link: await getLink("717384652646959728"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-717384652646959728/original/b85ac0f7-9bd6-4a80-9539-0dde7a265710.jpeg?im_w=720",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package5 = {
  name: "Crested Butte Mountain Retreat",
  link: await getLink("976942999049228298"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-976942999049228298/original/7e2cc637-6617-45b9-b3c7-6c784f6c129d.png?im_w=720",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package6 = {
  name: "Ski-In Ski-Out 2 bedroom Condo",
  link: await getLink("962961861588262265"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-962961861588262265/original/f6eb8ad4-83f4-4644-a8c2-fa7219bb7061.jpeg?im_w=720",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package7 = {
  name: "BR 2BA condo walking dist. to slopes w/ views!",
  link: await getLink("623251683275207962"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-623251683275207962/original/f663bf1b-8bc5-4b30-a043-d7f8b4a009f9.jpeg?im_w=720",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package8 = {
  name: "Ski In/Out at Base Area-Hot Tub, Walk to Lifts,Spa",
  link: await getLink("570325193548210419"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-570325193548210419/original/92ad8a20-ad0c-4769-b561-f8d24ed7b39a.jpeg?im_w=720",
  address: "not sure but close",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};
const package9 = {
  name: "The First Chair Lair",
  link: await getLink("708259216851565596"),
  imgSource:
    "https://a0.muscache.com/im/pictures/122ef94a-712c-4562-8000-7145dc54faad.jpg?im_w=1200",
  address: "not too close",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};
const package10 = {
  name: "Newly Remodeled 1 Bedroom, At the Mt. CB Base Area, Great Afternoon Deck!",
  link: await getLink("47799836"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-47799836/original/2559cf8b-fe1b-42f9-850c-0d7fa005c48f.jpeg?im_w=1200",
  address: "Axtell",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
  note: "https://crestedbuttelodging.com/vacation-rentals/m/properties/axtel-319?checkin=2025-12-19&checkout=2025-12-26",
};

const package11 = {
  name: "Ski-In, Ski-Out Condo. Steps from the lift!",
  link: await getLink("51168487"),
  imgSource:
    "https://a0.muscache.com/im/pictures/prohost-api/Hosting-51168487/original/6bbad3c9-ab9b-41eb-b363-55b8b255bc26.jpeg?im_w=1200",
  address: "Mt. CB Base Area",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package12 = {
  name: "Lovely 2 BR condo with amazing views",
  link: await getLink("668014570938455905"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-668014570938455905/original/79b02862-163b-4fa7-8c60-f3fb01621388.jpeg?im_w=1200",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package13 = {
  name: "The East River Rendezvous; Hot Tub, Walk to Lifts",
  link: await getLink("570817594388233012"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-570817594388233012/original/ab784ac8-e6ef-4943-bcbc-0f65acf4799b.jpeg?im_w=960",
  address: "400 Gothic Rd, Crested Butte, CO 81225",
  addressMap: "https://maps.app.goo.gl/CdS5hjMfCL4dPPSB9",
};

const package14 = {
  name: "Refreshing 1 bedroom @ the Base of the Resort!",
  link: await getLink("50895934"),
  imgSource:
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NTA4OTU5MzQ%3D/original/493f76b0-18ce-49c7-81ee-1ff1691129eb.jpeg?im_w=960",
  address: "Axtell",
  addressMap: "https://maps.app.goo.gl/4nP88CMCNanBXpwTA",
  note: "https://crestedbuttelodging.com/vacation-rentals/m/properties/axtel-319?checkin=2025-12-19&checkout=2025-12-26",
};

const package15 = {
  name: "See the lifts at this 1 bedroom @ the base!",
  link: await getLink("41884759"),
  imgSource:
    "https://a0.muscache.com/im/pictures/miso/Hosting-41884759/original/659026e0-ab04-4bc2-8464-d06cd40f6403.jpeg?im_w=960",
  address: "Axtell",
  addressMap: "https://maps.app.goo.gl/4nP88CMCNanBXpwTA",
  note: "https://crestedbuttelodging.com/vacation-rentals/m/properties/axtell-314?checkin=2025-12-19&checkout=2025-12-26",
};
const package16 = {
  name: "1 Br Loft W/ Deck - Sleeps 5",
  link: await getLink("31807082"),
  imgSource:
    "https://a0.muscache.com/im/pictures/18cabc4e-1aca-427f-aecf-7415291997d3.jpg?im_w=960",
  address: "Axtell",
  addressMap: "https://maps.app.goo.gl/4nP88CMCNanBXpwTA",
  note: "https://www.redawning.com/rental-property/1-br-loft-deck-sleeps-5-people-crested-butte",
};

const package17 = {
  name: "SkiTopia- A Mountain Lovers Paradise!",
  link: await getLink("30464623"),
  imgSource:
    "https://a0.muscache.com/im/pictures/bbd7856d-b97f-4d36-92f7-01826affc908.jpg?im_w=960",
  address: "Axtell",
  addressMap: "https://maps.app.goo.gl/4nP88CMCNanBXpwTA",
  // note: "https://www.redawning.com/rental-property/1-br-loft-deck-sleeps-5-people-crested-butte",
};

setGraphsPerStay(".option_1", package1, csvPath);
setGraphsPerStay(".option_2", package2, csvPath);
setGraphsPerStay(".option_3", package3, csvPath);
setGraphsPerStay(".option_4", package4, csvPath);
setGraphsPerStay(".option_5", package5, csvPath);
setGraphsPerStay(".option_6", package6, csvPath);
setGraphsPerStay(".option_7", package7, csvPath);
setGraphsPerStay(".option_8", package8, csvPath);
setGraphsPerStay(".option_9", package9, csvPath);
setGraphsPerStay(".option_10", package10, csvPath);
setGraphsPerStay(".option_11", package11, csvPath);
setGraphsPerStay(".option_12", package12, csvPath);
setGraphsPerStay(".option_13", package13, csvPath);
setGraphsPerStay(".option_14", package14, csvPath);
setGraphsPerStay(".option_15", package15, csvPath);
