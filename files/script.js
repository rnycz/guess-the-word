const words = ["chrome", "firefox", "codepen", "javascript", "jquery", "twitter", "github", "opera", "sass",
"layout", "standards", "semantic", "designer", "developer", "module", "component", "website", "creative", "banner", "browser",
"screen", "mobile", "footer", "header", "typography", "responsive", "programmer", "border", "compass", "pixel", "development",
"document", "object", "ruby", "bootstrap", "python", "php", "pattern", "node", "element", "android", "california",
"application", "adobe", "apple", "google", "microsoft", "bookmark", "internet", "icon", "svg", "background", "property",
"syntax", "flash", "html", "font", "blog", "network", "server", "content", "database", "socket", "function", "variable",
"apache", "query", "proxy", "backbone", "angular", "email", "underscore", "cloud"];
const wordsUpper = [];
const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

words.forEach(el => {
    wordsUpper.push(el.toUpperCase());
})

const displayAlphabet = document.querySelector(".alphabet");
for(const el of alphabet){
    displayAlphabet.innerHTML += `
    <div class="alphabet-letter">${el}</div>
    `   
}
const randomWord = () =>{
    const randomNum = Math.floor(Math.random()*(wordsUpper.length));
    return wordsUpper[randomNum];
}

const options = {
    animationDuration: 3000,
    lives: 8,
}

const wordGuess = [];
let wordRandom = [];
let guessRemainCount = options.lives;

const guessWord = document.querySelector(".guess-word")
const alphabetLetter = document.querySelectorAll(".alphabet-letter");
const guessRemain = document.querySelector(".guess-remain");
const guessInfo = document.querySelector(".guess-info");

const newGame = () =>{
    guessRemainCount = options.lives;
    guessRemain.innerHTML = `Guesses remain: ${guessRemainCount}`;
    guessInfo.innerHTML = "What word is that?";
    wordGuess.length = 0;
    wordRandom = [...randomWord()];
    let wordLength = wordRandom.length;
    while(wordLength > 0){
        wordGuess.push("_");
        wordLength -= 1;
    }
    guessWord.innerHTML = wordGuess.join(" ");
    console.log(wordRandom)
    for(const el of alphabetLetter){
        el.style.removeProperty("opacity");
        el.style.removeProperty("pointer-events");
        el.style.removeProperty("background-color");
    }
}
newGame();
const startGame = document.querySelector(".start-game");
startGame.addEventListener("click", () =>{
    newGame();
});

const hideKeyboard = () =>{
    for(const el of alphabetLetter){
        el.style.pointerEvents = "none";
        el.style.opacity = 0.4;
    }
}

alphabetLetter.forEach((letter) =>{
    letter.addEventListener("click", () =>{
        const clickedLetter = letter.innerHTML;
        guessInfo.style.opacity = 0;
        guessRemain.style.opacity = 0;
        if(wordRandom.includes(clickedLetter)){
            guessInfo.innerHTML = "Good guess!";
            setTimeout(()=>{
                guessInfo.style.opacity = 1;
                guessRemain.style.opacity = 1;
            }, 400);
            for(let i=0; i<wordRandom.length; i++){
                if(clickedLetter === wordRandom[i]){
                    wordGuess[i] = wordRandom[i];
                    guessWord.innerHTML = wordGuess.join(" ");
                    letter.style.pointerEvents = "none";
                    letter.style.backgroundColor = "#005F1C";
                }
            }
        }else{
            guessRemainCount--;
            guessRemain.innerHTML = `Guesses remain: ${guessRemainCount}`;
            guessInfo.innerHTML = "Bad guess!";
            setTimeout(()=>{
                guessInfo.style.opacity = 1;
                guessRemain.style.opacity = 1;
            }, 400);
            letter.style.pointerEvents = "none";
            letter.style.backgroundColor = "#4E0000";
            if(guessRemainCount===0){
                guessInfo.innerHTML = `You lose. Try again! The word was ${wordRandom.join("")}`;
                hideKeyboard();
            }
        }
        if(!wordGuess.includes("_")){
            guessInfo.innerHTML = "YOU WIN! Start new game";
            hideKeyboard();
            winAnimation();
        }
    });
});

//confetti win animation
let endAnimation = Date.now() + options.animationDuration;
const winAnimation = () => {
  confetti({
    particleCount: 200,
    angle: 60,
    spread: 60,
    origin: { x: 0 }
  });
  confetti({
    particleCount: 200,
    angle: 120,
    spread: 60,
    origin: { x: 1 }
  });
  if (Date.now() < endAnimation) {
    requestAnimationFrame(winAnimation);
  }
}