const images = [
    { id: 1, path: "../imgs/Cherries-1.jpg.webp", visible: false },
    { id: -1, path: "../imgs/Cherries-1.jpg.webp", visible: false },
    { id: 2, path: "./imgs/Cranberry-1.jpg.webp", visible: false },
    { id: -2, path: "./imgs/Cranberry-1.jpg.webp", visible: false },
    { id: 3, path: "../imgs/Dragon-Fruit.jpg.webp", visible: false },
    { id: -3, path: "../imgs/Dragon-Fruit.jpg.webp", visible: false },
    { id: 4, path: "../imgs/Plum-1.jpg.webp", visible: false },
    { id: -4, path: "../imgs/Plum-1.jpg.webp", visible: false },
    { id: 5, path: "../imgs/Strawberries-1.jpg.webp", visible: false },
    { id: -5, path: "../imgs/Strawberries-1.jpg.webp", visible: false },
    { id: 6, path: "../imgs/Watermelon-1.jpg.webp", visible: false },
    { id: -6, path: "../imgs/Watermelon-1.jpg.webp", visible: false },
    { id: 7, path: "../imgs/Raspberry-1.jpg.webp", visible: false },
    { id: -7, path: "../imgs/Raspberry-1.jpg.webp", visible: false },
  ];
  
  let firstCardIndex = null;
  let secondCardIndex = null;
  
  const settingsModal = document.getElementById("settings-modal");
  const settingsBtn = document.getElementById("settingsBtn");
  const cancelBtn = document.getElementById("cancelBtn");

  
  settingsBtn.addEventListener("click", showSettingsModal);
  
  function showSettingsModal() {
    settingsModal.classList.toggle("visible");
  }
  cancelBtn.addEventListener("click", hideSettingsModal);
  
  function hideSettingsModal() {
    settingsModal.classList.toggle("visible");
  }
  let numberOfCards = 0;
  
  const setRulesBtn = document.getElementById("rulesBtn");
  setRulesBtn.addEventListener("click", setSettings);
  const timerInput = document.getElementById("timer");
  const chancesInput = document.getElementById("chances");
  const numberOfCardsInput = document.getElementById("NumberOfCards");
  
  function setSettings() {
    settingsModal.classList.toggle("visible");
    numberOfCards = numberOfCardsInput.value;
    let timer = timerInput.value;
    let chances = chancesInput.value;
    setCardsOverScreen(numberOfCards, timer, chances);
  }
  
  const timerBtn = document.getElementById("timerBtn");
  const chancesBtn = document.getElementById("chancesLeft");
  const matchedPairs = document.getElementById("matchedPairs");
  
  const listOfCards = [];
  const clickSound = new Audio("../imgs/cardSound1.mp3");
  let timeLeft = 0;
  
  const cardsBox = document.getElementById("cardBox");
  
  function setCardsOverScreen(numberOfCards, timer, chances) {
    // Ensure we don't go beyond the length of the images array
    const numImages = Math.min(numberOfCards * 2, images.length);
  
    // Shuffle the images array
    const shuffledImages = shuffleArray(images.slice(0, numImages));
  
    for (let i = 0; i < numImages; i++) {
      const card = document.createElement("div");
      card.setAttribute("class", "card");
      card.setAttribute("data-id", shuffledImages[i].id);
  
      const cardFront = document.createElement("div");
      cardFront.setAttribute("class", "cardFront");
      const cardFrontImage = document.createElement("img");
      cardFrontImage.setAttribute("src", shuffledImages[i].path);
      cardFront.appendChild(cardFrontImage);
  
      const cardBack = document.createElement("div");
      cardBack.setAttribute("class", "cardBack");
      const cardBackH1 = document.createElement("h1");
      cardBackH1.textContent = "card";
      cardBack.appendChild(cardBackH1);
  
      card.appendChild(cardFront);
      card.appendChild(cardBack);
      cardsBox.appendChild(card);
  
      // Add a click event listener to each card
      card.addEventListener("click", function () {
        card.classList.toggle("flipped");
        const cardId = parseInt(card.getAttribute("data-id"), 10);
        setTimeout(() => passCardId(cardId), 500);
        clickSound.play();
      });
    }
  
    // Delay before flipping each card
    // Delay before flipping all cards
    setTimeout(() => {
      const allCards = document.querySelectorAll(".card");
      allCards.forEach((card) => {
        setTimeout(() => {
          card.classList.toggle("flipped");
        }, 5); // Adjust the delay duration as needed
      });
  
      // Delay before resetting the cards to their initial state
      setTimeout(() => {
        allCards.forEach((card) => {
          setTimeout(() => {
            card.classList.toggle("flipped");
          }, 500); // Adjust the delay duration as needed
        });
      }, 3000); // Adjust the delay before resetting all cards as needed
    }, 100); // Adjust the delay before flipping all cards as needed
  
    timerBtn.innerText = timer;
    chancesBtn.innerText = chances;
    matchedPairs.innerText = 0;
    timeLeft = timer;
    setTimeout(() => countdown(), 4000);
    



  }
  


  function countdown() {
    timerBtn.innerText = String(timeLeft);
  
    if (timeLeft > 0) {
      timeLeft--;
      setTimeout(() => countdown(), 1000);
    }else if(timeLeft ==-1){
        restartGame();
    } else {
      alert("Time's up! Game Over!");
      restartGame();
    }
  }
  
  function restartGame() {
    cardsBox.innerHTML = "";
    timerBtn.innerText = "Timer";
    chancesBtn.innerText = "Chances Left";
    matchedPairs.innerText = "Matched Pairs";
    timeLeft = -1;
  }
  
  function passCardId(cardId) {
    if (firstCardIndex === null) {
      // First card clicked
      firstCardIndex = cardId;
    } else {
      // Second card clicked, call the result handler
      secondCardIndex = cardId;
      handleClickedCardsResult(firstCardIndex, secondCardIndex);
    }
  }
  
  function handleClickedCardsResult(firstCardId, secondCardId) {
    console.log(`${firstCardId}`);
    console.log(`${secondCardId}`);
    const card1 = document.querySelector(`[data-id="${firstCardId}"]`);
    const card2 = document.querySelector(`[data-id="${secondCardId}"]`);
  
    if (Math.abs(firstCardId) != Math.abs(secondCardId)) {
      // Cards don't match
      firstCardIndex = null;
      secondCardIndex = null;
      chancesBtn.innerText =
        chancesInput.innerText = parseInt(chancesInput.innerText) - 1;
      console.log("Wrong guess");
      card1.classList.toggle("flipped");
      card2.classList.toggle("flipped");
      if (parseInt(chancesBtn.innerText) === 0) {
        alert("Game Over! You ran out of chances.");
        saveGameStatus("lose");
        restartGame();
      }
    } else {
      // Cards match
      cardsBox.removeChild(card1);
      cardsBox.removeChild(card2);
      console.log("Correct guess");
      matchedPairs.innerText = parseInt(matchedPairs.innerText) + 1;
      if (parseInt(matchedPairs.innerText) == numberOfCards) {
        alert("Congratulations! You matched all pairs!");
        saveGameStatus("win");
        restartGame();
      }
      firstCardIndex = null;
      secondCardIndex = null;
    }
  }
  
  // Function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function saveGameStatus(status) {
    // Retrieve existing game statuses from local storage
    let existingGameStatuses = JSON.parse(localStorage.getItem("gameStatuses")) || [];
  
    let gameStatus = {
      timeLeft: timerBtn.innerText,
      Status: status,
      chancesLeft: chancesBtn.innerText,
      pairsFound: matchedPairs.innerHTML,
      NumberOfCards: numberOfCardsInput.value,
    };
  
    // Add the new game status to the array
    existingGameStatuses.push(gameStatus);
  
    // Save the updated array back to local storage
    localStorage.setItem("gameStatuses", JSON.stringify(existingGameStatuses));
  }
  
  