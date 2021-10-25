const arrayData = [1, 2, 3];

let card1 = "";
let card2 = "";

async function cardClicked(element) {
  if (element.target.getAttribute("clicked") === "true") return;

  if (card1 === "") {
    card1 = element.target;
    card1.setAttribute("class", "frontClicked");
    card1.setAttribute("clicked", "true");
  } else {
    card2 = element.target;
    card2.setAttribute("class", "frontClicked");
    card2.setAttribute("clicked", "true");
  }

  if (card1 && card2) {
    cardChecker();
  }
}

function cardChecker() {
  if (card1.getAttribute("name") === card2.getAttribute("name")) {
    card1.setAttribute("class", "frontTrue");
    card2.setAttribute("class", "frontTrue");
    card1 = "";
    card2 = "";
    console.log("card match");
  } else {
    console.log("card not match");
    setTimeout(() => {
      card1.setAttribute("class", "front");
      card2.setAttribute("class", "front");
      card1.setAttribute("clicked", "false");
      card2.setAttribute("clicked", "false");
      card1 = "";
      card2 = "";
    }, 200);
  }
}

function displayCard() {
  const doubledArrayData = [...arrayData, ...arrayData];
  const container = document.querySelector(".container");
  doubledArrayData.forEach((value) => {
    container.innerHTML += `<div class="front" name="${value}" clicked="false" onclick="cardClicked(event)">
          ${value}
        </div>`;
  });
}
displayCard();
