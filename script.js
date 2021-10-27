const arrayData = [1, 2, 3, 4, 6, 7, 8, 9];

let card1 = "";
let card2 = "";

async function cardClicked(element) {
  if (element.target.getAttribute("clicked") === "true") return;

  //developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
  //developer.mozilla.org/en-US/docs/Web/API/Element/classList

  if (card1 === "") {
    card1 = element.composedPath()[1];
    card1.classList.add("flipped-card");
    card1.setAttribute("clicked", "true");
  } else {
    card2 = element.composedPath()[1];
    card2.classList.add("flipped-card");
    card2.setAttribute("clicked", "true");
  }

  if (card1 && card2) {
    cardChecker();
  }
}

function cardChecker() {
  if (card1.getAttribute("name") === card2.getAttribute("name")) {
    card1 = "";
    card2 = "";
    console.log("card match");
  } else {
    console.log("card not match");
    setTimeout(() => {
      card1.classList.remove("flipped-card");
      card2.classList.remove("flipped-card");
      card1.setAttribute("clicked", "false");
      card2.setAttribute("clicked", "false");
      card1 = "";
      card2 = "";
    }, 300);
  }
}

function mixArray(a, b, c, d) {
  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  //Fisher-Yates shuffle algorithm
  //array,placeholder,placeholder,placeholder

  c = a.length;
  while (c)
    (b = (Math.random() * (--c + 1)) | 0),
      (d = a[c]),
      (a[c] = a[b]),
      (a[b] = d);
}

function displayCard() {
  const doubledArrayData = [...arrayData, ...arrayData];
  mixArray(doubledArrayData);
  const container = document.querySelector(".card-container");
  doubledArrayData.forEach((value) => {
    container.innerHTML += `
      <div class="card">
        <div
          class="card-inner"
          name="${value}"
          clicked="false"
          onclick="cardClicked(event)"
        >
          <div class="card-front">${value}</div>
          <div class="card-back"></div>
        </div>
      </div>
    `;
  });
}
displayCard();
