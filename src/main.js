import "./style/style.scss";
import "sweetalert2/src/sweetalert2.scss";

import { cardClicked, startGame, initGame } from "./logic";

window.cardClicked = cardClicked;
window.startGame = startGame;

initGame();
