// Select all card elements
const cards = document.querySelectorAll(".card");

// Initialize variables
// variable to store number of matched cards
let matched = 0;
// variable to store two opened cards
let cardOne, cardTwo;
// variable to control the interactivity of the card deck in the game.
// initially set to false, it indicates that the deck is enabled and players can interact with the cards
let disableDeck = false;
let score = 0
let bestScore = parseInt(sessionStorage.getItem("best-score"));

let scoreElement = document.getElementById("score");
let bestScoreElement = document.getElementById("best-score");
if (!isNaN(bestScore)) {
    bestScoreElement.innerHTML = "Best score: " + bestScore;
    bestScoreElement.style.visibility = "initial";
}

// Function to handle flipping of cards
function flipCard({target: clickedCard}) {
    // increment score counter
    score++;
    // show updated score on page
    scoreElement.innerHTML = "Score: " + score;
    // Check if the clicked card is not already flipped and the deck is not disabled
    if (cardOne !== clickedCard && !disableDeck) {
        // Add the "flip" class to the clicked card
        clickedCard.classList.add("flip");

        // If cardOne is not set, assign it to the clicked card
        if (!cardOne) {
            // assign the value of clickedCard to the variable cardOne
            cardOne = clickedCard;
            //return the new value of cardOne
            return cardOne;
        }

        // Assign the clicked card to cardTwo
        cardTwo = clickedCard;
        // disable the deck
        disableDeck = true;

        // Get the image sources of the two flipped cards
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;

        // Call the function to check if the cards match
        matchCards(cardOneImg, cardTwoImg);
    }
}

// Function to check if the flipped cards match
function matchCards(img1, img2) {
    // If the images of the flipped cards match
    if (img1 === img2) {
        // Increment the matched counter
        matched++;

        // If all cards are matched, shuffle the cards after 1.3s
        if (matched === 8) {
            setTimeout(() => {
                cards.forEach(card => {
                    // make the card visible
                    card.classList.remove("invisible");
                });
            }, 300);

            setTimeout(() => {
                if (!isNaN(bestScore) && bestScore>0)
                    bestScore =  bestScore > score ? score : bestScore;
                else
                    bestScore = score;
                sessionStorage.setItem("best-score", bestScore.toString());
                bestScoreElement.innerHTML = "Best score: " + bestScore;
                bestScoreElement.style.visibility = "initial";
                return shuffleCard();
            }, 1300);
        } else {
            // Remove the click event listeners from the matched cards
            cardOne.removeEventListener("click", flipCard);
            cardTwo.removeEventListener("click", flipCard);

            setTimeout(() => {
                // Add the 'invisible' class to make the cards disappear
                cardOne.classList.add("invisible");
                cardTwo.classList.add("invisible");
            }, 600);

            setTimeout(() => {
                // Reset cardOne and cardTwo
                cardOne = cardTwo = "";

                // Enable the deck and exit the function
                return disableDeck = false;
            }, 630);
        }


    } else {
        // If the flipped cards do not match wait for 400ms
        setTimeout(() => {
            // add shake animation to cards
            cardOne.classList.add("shake");
            cardTwo.classList.add("shake");
        }, 400);

        // wait for 1.2s
        setTimeout(() => {
            // Remove the shake animation and flip the cards back
            cardOne.classList.remove("shake", "flip");
            cardTwo.classList.remove("shake", "flip");
            // Reset cardOne and cardTwo
            cardOne = cardTwo = "";
            // Enable the deck
            disableDeck = false;
        }, 1200);
    }


}

// Function to shuffle the cards
function shuffleCard() {
    score = 0;
    scoreElement.innerHTML = "Score: " + score;
    // Reset variables and initialize an array with card pairs
    // set matched to 0
    matched = 0;
    // Enable the deck
    disableDeck = false;
    // Reset cardOne and cardTwo
    cardOne = cardTwo = "";
    // array that represents pairs of matching cards
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    // Shuffle the array randomly
    // generate a random number between 0 and 1, check if it is greater than 0.5
    // if yes, switch the order of the two elements that are being compared
    // else the order of the two elements that are being compared should stay the same
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    // Iterate over each card and reset its state
    cards.forEach((card, i) => {
        // flip the card back
        card.classList.remove("flip");
        // variable that allows to directly manipulate the image source of each card
        let imgTag = card.querySelector(".back-view img");
        // set the src attribute of the image based on the shuffled array arr
        imgTag.src = `img/games/memory-card-game/img-${arr[i]}.png`;
        // Add event listener to the card to handle flipping
        card.addEventListener("click", flipCard);
    });
}

// Call the shuffleCard function to initialize the game for the first time
shuffleCard();

// Add event listeners to each card to handle flipping
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});