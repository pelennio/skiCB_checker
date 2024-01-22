class Counter extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const hotelCollection = document.getElementsByClassName("dataSet");
    var num1 = hotelCollection.length;
    var curEl = this.closest(".dataSet");
    var find = function () {
      var elementsArray = [].slice.call(hotelCollection);
      for (var index = 0; index < elementsArray.length; index++) {
        if (curEl == elementsArray[index]) {
          return index + 1;
        }
      }
      return false;
    };

    this.innerHTML = `
    <div class="hotelCount">${find()} of ${num1}</div>
    `;
  }
}

customElements.define("hotel-counter", Counter);
