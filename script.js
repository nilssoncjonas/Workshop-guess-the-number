/**
 * Guess the number
 *
 * Skriv om ”gissa talet” till att ta emot och visa utfall i DOM. Använd
 * formulär-fält för att ta emot input från användaren, och när formuläret
 * skickas (submits) så jämför det gissade talet mot svaret och visa utfallet
 * i DOM istället för alert()-rutor.
 *
 * STEG 1
 * En input-box där man kan gissa på ett tal. En knapp för att gissa.
 *
 * STEG 1.1
 * Visa resultatet i en alert.
 *
 * STEG 1.2
 * Visa om resultatet var rätt eller inte i ett HTML-element.
 *
 * STEG 2
 * Visa antalet gissningar hittills i ett HTML-element.
 *
 * STEG 3
 * Visa om det gissade talet var för högt eller lågt i ett HTML-element.
 *
 * STEG 4
 * Skapa en knapp för att starta om spelet (ett nytt tal ska slumpas fram och
 * antalet gissningar ska nollställas).
 *
 */

 const cheatEl = document.querySelector('#cheat');
 const formGuessEl = document.querySelector('#formGuess');
 const inputGuessEl = document.querySelector('#inputGuess');
 const turnoutEl = document.querySelector('#turnout');
 const turnEl = document.querySelector('#turn')
 const highscoreEl = document.querySelector('#highScore')
 const highscorelistEl = document.querySelector('#highScoreList')
 const guessesEl = document.querySelector('#guesses')
 const newgameBtn = document.querySelector('#newgame-btn')
 const countdownEl= document.querySelector('#countdown')
 const resetbtn = document.querySelector('#reset-btn')
 

 // Get lucky knappen
formGuessEl.addEventListener('submit', e => {
    e.preventDefault();
    guessNumber(inputGuessEl.value)
    formGuessEl.reset()
})
// Give up knappen
resetbtn.addEventListener('click', e => {
    // newReset()
    turnoutEl.classList.add('alert-danger');
    turnoutEl.innerHTML = `Giving up... 😫 <br> Rätt nummer var: ${randomNumber}  `
    highscoreEl.classList.remove('alert-info');
    highscoreEl.innerHTML = '';
    highScoreList = [];;
    guesses = 0;
    turn = 1;
    setTimeout(()=>{
        turnoutEl.classList.remove('alert-danger');
        turnoutEl.innerHTML = ''
        highscorelistEl.innerHTML = 'Highscore: ';
        guessesEl.innerHTML ='...';
        turnEl.innerHTML = `${turn}`;

    },2000)

})


//  Get a random number between 1-10
 const getRandomNumber = function(max = 10) {
     return Math.ceil( Math.random() * max );
 }
 


 let randomNumber = getRandomNumber();
 console.log(`Talet som du ska gissa på är ${randomNumber}`);
 cheatEl.innerHTML = `${randomNumber}`
 
 let guesses = 0;
 let turn = 1;
 let highScoreList = [];
 function guessNumber() {
     
     let userGuess = inputGuessEl.value;
     
     while (userGuess === '0') {
         userGuess = turnoutEl.innerHTML = 'Avslutar spelet'
         turnoutEl.classList.add('alert-danger')
         highscoreEl.classList.remove('alert-info')
         highscoreEl.innerHTML = ''
         guesses = 0;
         turn = 1;
        } if (userGuess == randomNumber) {
            guesses++
            guessesEl.innerHTML = `${guesses}`
            turnoutEl.innerHTML = `🎉Grattis🎉 <br>du gissade på ${userGuess} och det är rätt.<br>`;
            turnoutEl.classList.remove('alert-danger')
            turnoutEl.classList.add('alert-success')
            highScoreList.push(guesses) // Pushar in antal försök till highscore listan
            highScore(); // startar highscore jämnförelse        
            countDown(); // startar 5 sek nedräkning till automstart

            
            
        } else if (userGuess < randomNumber) {
            wrongGuess();
            turnoutEl.innerHTML = `Du gissade på ${userGuess}, vilket är för lågt <br> 😒 <br> försök igen med ett högre tal`;

            
        } else if (userGuess > randomNumber) {
            wrongGuess();
            turnoutEl.innerHTML = `Du gissade på ${userGuess}, vilket är för högt <br> 😒 <br> försök igen med ett lägre tal`;
   
        }
    }
    
    function highScore() {    
        let score = Math.min(...highScoreList)
        if (guesses <= score){
            highscoreEl.innerHTML = `🎉Highscore🎉<br> Du har ett nytt bästa på ${guesses} försök! <br>✌🏼`
            highscoreEl.classList.add('alert-info') 
            highscorelistEl.innerHTML = `HighScore: ${highScoreList} `

        } else  {
            highscoreEl.innerHTML = `Du gissade rätt på ${guesses} försök,<br>
                                    tyvärr inget nytt highscore,<br>
                                    ditt Highscore sedan tidigare är ${score}! `
            highscoreEl.classList.add('alert-info')
            highscorelistEl.innerHTML = `HighScore: ${highScoreList},  ` // Skirver ut highscore till DOM
        }
    }
    
    
// Nedräkning tills nytt spel startar
const countDown = function() { // funktion som startar nedräkning
    let timeleft = 3; // 5 sekunder
    timer = setInterval(function(){ // nedräkningsfunktionen
        timeleft--; // minskar med 1
        countdownEl.classList.add('alert-secondary') // lägger till class
        countdownEl.textContent =`Ny omgång startar om ${timeleft}...` ; // skriver ut till DOM
        if(timeleft <= 0)
        newReset(); // startar en ny omgång när nedräkningen är klar
    },1000);
}

// Funktion som nollställer efter rätt gissning och när man klickar på new game
const newReset = function() {
    turnoutEl.classList.remove('alert-success') // Tar bort fäg class
    turnoutEl.classList.remove('alert-danger') // Tar bort fäg class
    highscoreEl.classList.remove('alert-info') // Tar bort fäg class
    highscoreEl.innerHTML = '' // skriver ut till DOM
    turnoutEl.innerHTML = '' // skriver ut till DOM
    turn++ // ökar rundan 
    turnEl.innerHTML = `${turn}`// Skriver ut rundan till DOM
    guesses = 0; //Nollställer antalet gissningar
    guessesEl.innerHTML = '...' // tömmer DOM elementet
    randomNumber = getRandomNumber(); //Skapar ett nytt random tal
    cheatEl.innerHTML = `${randomNumber}`
    countdownEl.classList.remove('alert-secondary')
    clearInterval(timer); // stoppar nedräkningen
    countdownEl.innerHTML = '' // tömmer Dom elementet
    console.log(`Nytt tal att gissa på är ${randomNumber}`)
}
    
// Körs när man gissat fel
const wrongGuess = function() {
    turnoutEl.classList.add('alert-danger') // lägger till färg class
    guesses++ // ökar med 1 efter varje felgissning
    guessesEl.innerHTML = `${guesses}` // skriver ut gissningarna till DOM
}