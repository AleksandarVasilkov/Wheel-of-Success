const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');

let missed = 0;

const overlay = document.getElementById('overlay');
const startButton = document.querySelector('.btn__reset');

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

const phrases = [
    "Practice makes perfect",
    "Better late than never",
    "Better safe than sorry",
    "Great minds think alike",
    "No pain no gain"
  ];

  function getRandomPhraseAsArray(arr) {
    
    const randomIndex = Math.floor(Math.random() * arr.length);
    
    
    const randomPhrase = arr[randomIndex];
  
    const charArray = randomPhrase.split('');
  
    return charArray;
  }
  
  
  const randomPhraseArray = getRandomPhraseAsArray(phrases);
  console.log(randomPhraseArray);
  
  function addPhraseToDisplay(arr) {
    const phraseList = document.querySelector('#phrase ul');
  
    
    phraseList.innerHTML = '';
  
    for (let i = 0; i < arr.length; i++) {
      const character = arr[i];
      const li = document.createElement('li');
      li.textContent = character;
  
      if (character !== ' ') {
        li.classList.add('letter');
      }
  
      phraseList.appendChild(li);
    }
  }
  
  
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);

  
  function checkLetter(button) {
    const letterElements = document.querySelectorAll('.letter');
    let match = null;
  
    for (let i = 0; i < letterElements.length; i++) {
      const letterElement = letterElements[i];
      const letter = letterElement.textContent.toLowerCase();
  
      if (letter === button.textContent.toLowerCase()) {
        letterElement.classList.add('show');
        match = letter;
      }
    }
  
    return match;
  }

  

keyboard.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const button = event.target;
  
      
      button.classList.add('chosen');
      button.disabled = true;
  
      const letterFound = checkLetter(button);
  
      
      if (letterFound === null) {
         missed++;
  
        
        const tries = document.querySelectorAll('.tries')[missed - 1];
  
        
        const heartImage = tries.querySelector('img');
        heartImage.src = 'images/lostHeart.png';
      }
  
      
      checkWin();
    }

    startButton.addEventListener('click', () => {
        
        resetGame();
      
        
        overlay.style.display = 'none';
      });
  });

  function resetGame() {
    
    const phraseList = document.querySelector('#phrase ul');
    phraseList.innerHTML = '';
  
    
    const buttons = keyboard.querySelectorAll('button');
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      button.classList.remove('chosen');
      button.disabled = false;
    }
  
    
    missed = 0;
    const tries = document.querySelectorAll('.tries');
    for (let i = 0; i < tries.length; i++) {
      const heartImage = tries[i].querySelector('img');
      heartImage.src = 'images/liveHeart.png';
    }
  
    
    const newPhraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhraseArray);
  }
  
  
   function checkWin() {
    const letterElements = document.querySelectorAll('.letter');
    const showElements = document.querySelectorAll('.show');
  
    
    if (letterElements.length === showElements.length) {
      
      overlay.className = 'win';
      overlay.style.display = 'flex';
      overlay.querySelector('.title').textContent = 'Congratulations, you win!';
    } else if (missed >= 5) {
      
      overlay.className = 'lose';
      overlay.style.display = 'flex';
      overlay.querySelector('.title').textContent = 'Sorry, you lose!';
    }
  }
  
  