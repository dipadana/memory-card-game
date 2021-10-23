let card1 = 0;
let card2 = 0;

function cardClicked(value) {
  if (card1 === 0) {
    card1 = value;
  } else {
    card2 = value;
  }

  if (card1 && card2) {
    cardChecker();
  }
}

function cardChecker() {
  if (card1 === card2) {
    console.log("card match");
    let card = document.querySelector(`.front[${card1}]`);
  } else {
    console.log("card not match");
  }
  card1 = 0;
  card2 = 0;
}
