import "./style/style.scss";
import { cardClicked, startGame, initGame } from "./logic";

window.cardClicked = cardClicked;
window.startGame = startGame;

initGame();
