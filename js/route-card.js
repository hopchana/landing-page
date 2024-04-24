// Get the container for all article sections
const articleSectionsContainer = document.getElementById('all-routes');

// Loop through the routes array and generate HTML for each section
routes.forEach((record, index) => {
    // Generate HTML for each section dynamically
    const sectionHTML = `
        <article class="article-section">
            <img src="${record.img}" alt="${record.alt}">
            <div class="section-content">
                <div class="section-heading">
                    <h2>${record.name}</h2>
                    <button id="${record.id}-like-btn" class="like-btn" onclick='like("${record.id}")'>
                        <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
                        </svg>
                    </button>
                </div>
                <strong>Start:</strong> ${record.start}
                <br><strong>End:</strong> ${record.end}
                <br><strong>Distance:</strong> ${record.distance}
                <br>${record.about}
            </div>
            <button class="more-info-btn" onclick="generateMoreInfo('${record.id}')">More</button>
        </article>
    `;

    // Append the generated HTML to the container
    articleSectionsContainer.innerHTML += sectionHTML;
});

// Function to add the "liked" class to buttons for previously liked routes
function addLikedClassToButtons() {
    // Retrieve the array of liked routes from session storage
    let likes = JSON.parse(sessionStorage.getItem('likes'));

    // Check if there are liked routes
    if (likes) {
        // Iterate over each liked route
        likes.forEach((like) => {
            // Get the button element corresponding to the liked route
            let button = document.getElementById(`${like}-like-btn`);

            // Add the "liked" class to the button if it exists
            if (button !== null) {
                button.classList.add("liked");
            }
        });
    }
}

// Call the function to add "liked" class after appending the elements
addLikedClassToButtons();

// Function to handle like button clicks
function like(recordId){
    // Retrieve the array of liked routes from session storage
    let likes = JSON.parse(sessionStorage.getItem('likes'));

    // Create an empty array if no liked routes exist yet
    if (likes === null) likes = [];

    // Get the like button element by ID
    let likeButton = document.getElementById(`${recordId}-like-btn`);

    // Toggle the "liked" class on the button and add or remove the record ID from the likes array
    if (likeButton.classList.toggle("liked")) {
        likes.push(recordId); // Add the record ID to the likes array
    } else {
        // Find and remove the record ID from the likes array
        let i;
        for (i = 0; i < likes.length; i++) {
            if (likes[i] === recordId) break;
        }
        likes.splice(i,1);
    }

    // Store the updated likes array in session storage
    sessionStorage.setItem('likes', JSON.stringify(likes));
}
