const SECTION_GRID = document.querySelector('.section-grid');
const CHARACTERS = ['arya', 'bran', 'cersei', 'daenerys', 'jaime', 'jon', 'missandei', 'samwell', 'sansa', 'tyrion'];
let firstCard = '';
let secondCard = '';

function checkCard(){
    const FIRST_CARD = firstCard.getAttribute('data-character');
    const SECOND_CARD = secondCard.getAttribute('data-character');

    if(FIRST_CARD === SECOND_CARD){
        firstCard.firstChild.classList.add('revealed-card');
        secondCard.firstChild.classList.add('revealed-card');

        firstCard = '';
        secondCard = '';

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

    SECTION_GRID.appendChild(GRID_CARD);
    GRID_CARD.appendChild(CARD_FRONT);
    GRID_CARD.appendChild(CARD_BACK);
}
function createCharacters(){
    const DUPLICATE_CHARACTERS = [...CHARACTERS, ...CHARACTERS];
    const SHUFFLED_CHARACTER = DUPLICATE_CHARACTERS.sort(()=> Math.random() - 0.5);

    SHUFFLED_CHARACTER.map((eachCharacter)=>{
        createCard(eachCharacter);
    })
}
createCharacters();
