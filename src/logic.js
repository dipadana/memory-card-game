import { mixArray } from "./helpers";
import { arrayData } from "./data";
import Swal from "sweetalert2/dist/sweetalert2.js";

// Init first component of the game
document.getElementById("app").innerHTML = `
        <p class="title-game">Memory Card Game</p>
        <div style="width: 100%; display:flex; justify-content: space-around;">
          <p class="score-time-game" id="scoreNumber"></p>
          <p class="score-time-game" id="timeNumber"></p>
        </div>
        <div class="card-container"></div>
      `;

const container = document.querySelector(".card-container");
const totalSec = 30;

let card1 = "";
let card2 = "";
let score = 0;
let myTimer; //Variables for timer container, see function startGame() for more info

function displayCard() {
  const doubledArrayData = [...arrayData, ...arrayData];
  mixArray(doubledArrayData);

  container.innerHTML = "";
  doubledArrayData.forEach((value, i) => {
    container.innerHTML += `
      <div class="card">
        <div
          class="card-inner"
          name="${value.title}"
          id="IDC${Date.now() + i}"
          clicked="false"
          onclick="cardClicked(event)"
        >
          <div disabled="true" class="card-front">
            <img class="card-image" src="${value.image}" alt="${value.title}">
          </div>
          <div class="card-back"></div>
        </div>
      </div>
    `;
  });
}

function cardClicked(element) {
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

    // If card match and call calculateScore function
    // and sum all function
    calculateScore();
  } else {
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
  if (score === 100) {
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "You Win!",
        text: `Perfect Score ${score}`,
        heightAuto: false,
      });
      initGame();
    }, 300); // Its take 300ms to make sure card flipped, same as transisition time in card.scss line 25 in class "card-inner"
  }
}

function gameTime() {
  let sec = totalSec;
  return setInterval(() => {
    sec -= 1;
    document.querySelector("#timeNumber").innerHTML = `Time: ${sec}`;
    if (sec === 0) {
      clearInterval(myTimer);
      Swal.fire({
        icon: "info",
        title: "Your Score",
        text: `${score}`,
        heightAuto: false,
      });
      initGame();
    }
  }, 1000);
}

function startGame() {
  document.querySelector("#scoreNumber").innerHTML = `Score: ${score}`;
  document.querySelector("#timeNumber").innerHTML = `Time: ${totalSec}`;
  myTimer = gameTime();
  displayCard();
}

function initGame() {
  clearInterval(myTimer);
  card1 = "";
  card2 = "";
  score = 0;
  document.querySelector("#scoreNumber").innerHTML = "";
  document.querySelector("#timeNumber").innerHTML = "";
  container.innerHTML = `
    <button class="game-button" onclick="startGame()">Start</button>
  `;
}

export { cardClicked, startGame, initGame };
