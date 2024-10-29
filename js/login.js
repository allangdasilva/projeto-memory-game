const FORM_LOGIN = document.querySelector('.form-login');
const INPUT_TEXT = document.querySelector('.input-text-login');

function formText(event){
    const INPUT_SUBMIT = document.querySelector('.input-submit-login');

    if(event.target.value.length > 2){
        INPUT_SUBMIT.removeAttribute('disabled');
        return;
    }
    INPUT_SUBMIT.setAttribute('disabled', '') ;
}

function formSubmit(event){
    event.preventDefault();
    localStorage.setItem('player', INPUT_TEXT.value);
    window.location = 'pages/game.html';
}

FORM_LOGIN.addEventListener('submit', formSubmit);
INPUT_TEXT.addEventListener('input', formText);