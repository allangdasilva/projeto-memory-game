const SECTION_GRID = document.querySelector('.section-grid');
const CHARACTERS = ['arya', 'bran', 'cersei', 'daenerys', 'jaime', 'jon', 'missandei', 'samwell', 'sansa', 'tyrion'];
let firstCard = '';
let secondCard = '';
let seconds = 0;
let minutes = 0;

function checkEndGame(){
    const REVEALED_CARDS = document.querySelectorAll('.revealed-card');

    if(REVEALED_CARDS.length === 20){
        clearInterval(this.loop);
        restartGame();
    }
}
function checkCard(){
    const FIRST_CARD = firstCard.getAttribute('data-character');
    const SECOND_CARD = secondCard.getAttribute('data-character');

    if(FIRST_CARD === SECOND_CARD){
        firstCard.firstChild.classList.add('revealed-card');
        secondCard.firstChild.classList.add('revealed-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
        return;
    }else{
        setTimeout(() => {
            firstCard.classList.remove('rotate-card');
            secondCard.classList.remove('rotate-card');

            firstCard = '';
            secondCard = '';
        }, 600);
        
    }
}
function rotateCard(event){
    if(event.target.parentNode.className.includes('revealed-card')){
        return;
    }
    if(firstCard === ''){
        event.target.parentNode.classList.add('rotate-card');
        firstCard = event.target.parentNode;
    }else if(secondCard === ''){
        event.target.parentNode.classList.add('rotate-card');
        secondCard = event.target.parentNode;

        checkCard();
    }
}
function createElement(tag, attrValue){
    const ELEMENT_DIV = document.createElement(tag);
    ELEMENT_DIV.setAttribute('class', attrValue);
    return ELEMENT_DIV;
}
function createCard(eachCharacter){
    const GRID_CARD = createElement('div', 'grid-card');
    const CARD_FRONT = createElement('div', 'card-face card-front');
    const CARD_BACK = createElement('div', 'card-face card-back');

    GRID_CARD.setAttribute('data-character', eachCharacter)
    CARD_FRONT.style.backgroundImage = `url(../images/${eachCharacter}.png`;

    CARD_BACK.addEventListener('click', rotateCard)

    GRID_CARD.appendChild(CARD_FRONT);
    GRID_CARD.appendChild(CARD_BACK);

    return GRID_CARD;
}
function createCharacters(){
    const DUPLICATE_CHARACTERS = [...CHARACTERS, ...CHARACTERS];
    const SHUFFLED_CHARACTER = DUPLICATE_CHARACTERS.sort(()=> Math.random() - 0.5);

    SHUFFLED_CHARACTER.map((eachCharacter)=>{
        const CARD = createCard(eachCharacter);
        SECTION_GRID.appendChild(CARD);
    })
}
function playerName(){
    const PLAYER_NAME = document.querySelector('.name');

    const PLAYER_STORAGE  = localStorage.getItem('player');

    PLAYER_NAME.innerHTML = PLAYER_STORAGE;
}
function playerTime(){
    const PLAYER_TIME = document.querySelector('.time');
    PLAYER_TIME.innerHTML = '0' + minutes + ':' + '0' + seconds;

    this.loop = setInterval(() => {
        seconds++;

        if(seconds === 60){
            minutes++;
            seconds = 0;
        }
        if(seconds < 10){
            PLAYER_TIME.innerHTML = '0' + minutes + ':' + '0' + seconds;
        }else{
            PLAYER_TIME.innerHTML = '0' + minutes + ':' + seconds;
        }
        if(minutes >= 10 && seconds < 10){
            PLAYER_TIME.innerHTML = minutes + ':' + '0' + seconds;
        }else if(minutes >= 10 && seconds >= 10){
            PLAYER_TIME.innerHTML = minutes + ':' + seconds;
        }
    }, 1000);
}
function restartGame(){
    const RESTART_GAME = document.querySelector('.restart-game');
    const SPAN_PLAYER_TIME = document.querySelector('#player-time');
    const PLAY_AGAIN_BTN = document.querySelector('#play-again-btn');

    if(minutes === 0){
        SPAN_PLAYER_TIME.innerHTML = `${seconds < 10 ? '0' + seconds : seconds} segundos`;
    } else {
        SPAN_PLAYER_TIME.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds} min`;
    };
    RESTART_GAME.classList.remove('restart-game-hidden');

    PLAY_AGAIN_BTN.addEventListener('click', ()=>{
        window.location.reload();
    });
}
window.addEventListener('load', ()=>{
    createCharacters();
    playerName();
    playerTime();
})
