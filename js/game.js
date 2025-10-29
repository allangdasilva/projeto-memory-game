const SECTION_GRID = document.querySelector(".section-grid");
const CHARACTERS = [
  "arya",
  "bran",
  "cersei",
  "daenerys",
  "jaime",
  "jon",
  "missandei",
  "samwell",
  "sansa",
  "tyrion",
];
let firstCard = "";
let secondCard = "";
let seconds = 0;
let minutes = 0;
let hours = 0;

function checkTime(time) {
  return time < 10 ? "0" : "";
}

function handleRanking() {
  let data = localStorage.getItem("ranking");

  if (data) {
    let rankingList = JSON.parse(data);

    const RANKING_UL = document.querySelector(".ranking-list");

    rankingList.forEach((r, index) => {
      const RANKING_LI = document.createElement("li");
      RANKING_LI.innerHTML = `${index + 1}. ${checkTime(r.hours)}${
        r.hours
      }:${checkTime(r.minutes)}${r.minutes}:${checkTime(r.seconds)}${
        r.seconds
      }`;
      RANKING_LI.classList.add("ranking-time");
      RANKING_UL.appendChild(RANKING_LI);
    });
  }
}
function checkEndGame() {
  const REVEALED_CARDS = document.querySelectorAll(".revealed-card");

  if (REVEALED_CARDS.length === 20) {
    clearInterval(this.loop);

    let currentRanking = localStorage.getItem("ranking");

    let ranking = [];
    if (currentRanking) {
      ranking = JSON.parse(currentRanking);
    }
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    ranking.push({ hours, minutes, seconds, totalSeconds });

    ranking.sort((a, b) => a.totalSeconds - b.totalSeconds);
    ranking = ranking.slice(0, 5);

    const updatedRanking = JSON.stringify(ranking);

    localStorage.setItem("ranking", updatedRanking);

    restartGame();
  }
}
function checkCard() {
  const FIRST_CARD = firstCard.getAttribute("data-character");
  const SECOND_CARD = secondCard.getAttribute("data-character");

  if (FIRST_CARD === SECOND_CARD) {
    firstCard.firstChild.classList.add("revealed-card");
    secondCard.firstChild.classList.add("revealed-card");

    firstCard = "";
    secondCard = "";

    checkEndGame();
    return;
  } else {
    setTimeout(() => {
      firstCard.classList.remove("rotate-card");
      secondCard.classList.remove("rotate-card");

      firstCard = "";
      secondCard = "";
    }, 600);
  }
}
function rotateCard(event) {
  if (event.target.parentNode.className.includes("revealed-card")) {
    return;
  }
  if (firstCard === "") {
    event.target.parentNode.classList.add("rotate-card");
    firstCard = event.target.parentNode;
  } else if (secondCard === "") {
    event.target.parentNode.classList.add("rotate-card");
    secondCard = event.target.parentNode;

    checkCard();
  }
}
function createElement(tag, attrValue) {
  const ELEMENT_DIV = document.createElement(tag);
  ELEMENT_DIV.setAttribute("class", attrValue);
  return ELEMENT_DIV;
}
function createCard(eachCharacter) {
  const GRID_CARD = createElement("div", "grid-card");
  const CARD_FRONT = createElement("div", "card-face card-front");
  const CARD_BACK = createElement("div", "card-face card-back");

  GRID_CARD.setAttribute("data-character", eachCharacter);
  CARD_FRONT.style.backgroundImage = `url(../images/${eachCharacter}.jpg`;

  CARD_BACK.addEventListener("pointerdown", rotateCard);

  GRID_CARD.appendChild(CARD_FRONT);
  GRID_CARD.appendChild(CARD_BACK);

  return GRID_CARD;
}
function createCharacters() {
  const DUPLICATE_CHARACTERS = [...CHARACTERS, ...CHARACTERS];
  const SHUFFLED_CHARACTER = DUPLICATE_CHARACTERS.sort(
    () => Math.random() - 0.5
  );

  SHUFFLED_CHARACTER.map((eachCharacter) => {
    const CARD = createCard(eachCharacter);
    SECTION_GRID.appendChild(CARD);
  });
}
function playerName() {
  const PLAYER_NAME = document.querySelector(".name");

  const PLAYER_STORAGE = localStorage.getItem("player");

  PLAYER_NAME.innerHTML = PLAYER_STORAGE;
}
function playerTime() {
  const PLAYER_TIME = document.querySelector(".time");
  PLAYER_TIME.innerHTML = "00";

  this.loop = setInterval(() => {
    seconds++;

    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }

    if (!hours && !minutes) {
      PLAYER_TIME.innerHTML = `${checkTime(seconds)}${seconds}`;
    } else if (!hours && minutes) {
      PLAYER_TIME.innerHTML = `${checkTime(minutes)}${minutes}:${checkTime(
        seconds
      )}${seconds}`;
    } else {
      PLAYER_TIME.innerHTML = `${checkTime(hours)}${hours}:${checkTime(
        minutes
      )}${minutes}:${checkTime(seconds)}${seconds}`;
    }
  }, 1000);
}
function restartGame() {
  const RESTART_GAME = document.querySelector(".restart-game");
  const SPAN_PLAYER_TIME = document.querySelector("#player-time");
  const PLAY_AGAIN_BTN = document.querySelector("#play-again-btn");

  if (!hours && !minutes) {
    SPAN_PLAYER_TIME.innerHTML = `${checkTime(seconds)}${seconds}`;
  } else if (!hours && minutes) {
    SPAN_PLAYER_TIME.innerHTML = `${checkTime(minutes)}${minutes}:${checkTime(
      seconds
    )}${seconds}`;
  } else {
    SPAN_PLAYER_TIME.innerHTML = `${checkTime(hours)}${hours}:${checkTime(
      minutes
    )}${minutes}:${checkTime(seconds)}${seconds}`;
  }
  RESTART_GAME.classList.remove("restart-game-hidden");

  PLAY_AGAIN_BTN.addEventListener("click", () => {
    window.location.reload();
  });
}
window.addEventListener("load", () => {
  const player = localStorage.getItem("player");
  if (!player) {
    window.location = "/projeto-memory-game/";
  }
  createCharacters();
  playerName();
  playerTime();
  handleRanking();
});
