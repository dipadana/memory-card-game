const container = document.querySelector(".card-container");
const arrayData = [1, 2, 3, 4, 5, 6, 7, 8];
const totalSec = 5;

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

    calculateScore();
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

function calculateScore() {
  score += 100 / 8;
  document.querySelector("#scoreNumber").innerHTML = `Score: ${score}`;
  console.log(score);
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

  container.innerHTML = "";
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

function gameTime() {
  let sec = totalSec;
  const myTimer = setInterval(() => {
    sec -= 1;
    document.querySelector("#timeNumber").innerHTML = `Time: ${sec}`;
    if (sec === 0) {
      clearInterval(myTimer);
      alert(`Your score: ${score}`);
      initGame();
    }
  }, 1000);
}

function startGame() {
  document.querySelector("#scoreNumber").innerHTML = `Score: ${score}`;
  document.querySelector("#timeNumber").innerHTML = `Time: ${totalSec}`;
  gameTime();
  displayCard();
}

function initGame() {
  card1 = "";
  card2 = "";
  score = 0;
  document.querySelector("#scoreNumber").innerHTML = "";
  document.querySelector("#timeNumber").innerHTML = "";
  container.innerHTML = `
    <button onclick="startGame()">Start</button>
  `;
}
initGame();
