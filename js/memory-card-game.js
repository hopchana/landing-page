// Select all card elements
const cards = document.querySelectorAll(".card");

// Initialize variables
let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

// Function to handle flipping of cards
function flipCard({target: clickedCard}) {
    // Check if the clicked card is not already flipped and the deck is not disabled
    if (cardOne !== clickedCard && !disableDeck) {
        // Add the "flip" class to the clicked card
        clickedCard.classList.add("flip");

        // If cardOne is not set, assign it to the clicked card
        if (!cardOne) {
            return cardOne = clickedCard;
        }

        // Assign the clicked card to cardTwo and disable the deck
        cardTwo = clickedCard;
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

        // If all cards are matched, shuffle the cards
        if (matched === 8) {
            setTimeout(() => {
                return shuffleCard();
            }, 1300);
        }

        // Remove the click event listeners from the matched cards
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);

        // Reset cardOne and cardTwo
        cardOne = cardTwo = "";

        // Enable the deck
        return disableDeck = false;
    }

    // If the flipped cards do not match, add shake animation
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // After a delay, remove the shake animation and flip the cards back
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

// Function to shuffle the cards
function shuffleCard() {
    // Reset variables and initialize an array with card pairs
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];

    // Shuffle the array randomly
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);

    // Iterate over each card and reset its state
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `img/games/memory-card-game/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

// Call the shuffleCard function to initialize the game
shuffleCard();

// Add event listeners to each card to handle flipping
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});
