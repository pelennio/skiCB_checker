import { setGraphsPerStay } from "../graphBuilder1.js";
import { Dates } from "../../components/dates.js";

const dates = new Dates();
const checkInDate = dates.checkInDate;
const checkOutDate = dates.checkOutDate;
const csvPath = "../curent_prices/cbAirbNB.csv";
const details = `The price for the stay from ${checkInDate} to ${checkOutDate}`;
let placeholder = document.querySelector(".search-details");
placeholder.innerHTML = details;
async function getLink(propertyID) {
  let link = `https://www.airbnb.com/rooms/${propertyID}?adults=2&children=2&check_in=${checkInDate}&check_out=${checkOutDate}`;
  return link;
}
//for new tests
//https://www.airbnb.com/s/Mt-Crested-Butte--Colorado--USA/homes?flexible_trip_lengths%5B%5D=one_week&monthly_start_date=2024-02-01&monthly_length=3&query=Mt%20Crested%20Butte%2C%20CO&place_id=ChIJ_ew67ZttQIcRghQKyP89KzY&refinement_paths%5B%5D=%2Fhomes&tab_id=home_tab&date_picker_type=calendar&checkin=2024-12-19&checkout=2024-12-26&adults=2&children=2&source=structured_search_input_header&search_type=user_map_move&price_filter_input_type=0&price_filter_num_nights=7&channel=EXPLORE&ne_lat=38.89856079607466&ne_lng=-106.96540563507915&sw_lat=38.89447370838086&sw_lng=-106.96752406649836&zoom=18.209586056623746&zoom_level=18.209586056623746&search_by_map=true

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
  name: "Ski-In Ski-Out 2 bedroom Condo",
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

setGraphsPerStay(".option_1", package1, csvPath);
setGraphsPerStay(".option_2", package2, csvPath);
setGraphsPerStay(".option_3", package3, csvPath);
setGraphsPerStay(".option_4", package4, csvPath);
setGraphsPerStay(".option_5", package5, csvPath);
setGraphsPerStay(".option_6", package6, csvPath);
setGraphsPerStay(".option_7", package7, csvPath);
setGraphsPerStay(".option_8", package8, csvPath);
