const arrayData = [1, 2, 3, 4, 5, 6, 7, 8];

let card1 = "";
let card2 = "";
let score = 0;

async function cardClicked(element) {
  //developer.mozilla.org/en-US/docs/Web/API/Event/composedPath
  //developer.mozilla.org/en-US/docs/Web/API/Element/classList
  const selectedCard = element.composedPath()[1];

  if (card1 === "") {
    card1 = selectedCard;
    card1.classList.add("flipped-card");
  } else if (
    card2 === "" &&
    card1.getAttribute("id") !== selectedCard.getAttribute("id")
  ) {
    card2 = selectedCard;
    card2.classList.add("flipped-card");

    if (card1 && card2) {
      cardChecker();
    }
  }
}

function cardChecker() {
  if (card1.getAttribute("name") === card2.getAttribute("name")) {
    card1 = "";
    card2 = "";
    console.log("card match");

    score += 100 / 8;
    console.log(score);
  } else {
    console.log("card not match");
    setTimeout(() => {
      card1.classList.remove("flipped-card");
      card2.classList.remove("flipped-card");
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
  doubledArrayData.forEach((value, i) => {
    container.innerHTML += `
      <div class="card">
        <div
          class="card-inner"
          name="${value}"
          id="IDC${Date.now() + i}"
          clicked="false"
          onclick="cardClicked(event)"
        >
          <div disabled="true" class="card-front">${value}</div>
          <div class="card-back"></div>
        </div>
      </div>
    `;
  });
}
displayCard();
