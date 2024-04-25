// Get the container for all article sections
const articleSectionsContainer = document.getElementById('all-routes');

// Loop through the routes array and generate HTML for each section
routes.forEach((record, index) => {
    // Generate HTML for each section dynamically
    const sectionHTML = `
        <!-- container for route brief information and image -->
        <article class="article-section">
            <!-- photo from place where route is located -->
            <img src="${record.img}" alt="${record.alt}">
            <!-- section with brief information about route and like button -->
            <div class="section-content">
                <!-- Container for name of route and like button -->
                <div class="section-heading">
                    <!-- Tittle with name of route -->
                    <h2>${record.name}</h2>
                     <!-- unfilled like button with function to like/unlike routes -->
                    <button id="${record.id}-like-btn" class="like-btn" onclick='like("${record.id}")'>
                        <!-- Heart SVG Icon -->
                        <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
                        </svg>
                    </button>
                </div>
                <!-- Bolder text for the starting point of the route -->
                <b>Start:</b> ${record.start}
                <!-- Bolder text for the ending point of the route -->
                <br><b>End:</b> ${record.end}
                <!-- Bolder text for the distance of the route -->
                <br><b>Distance:</b> ${record.distance}
                <!-- Regular text for short description of the route -->
                <br>${record.about}
            </div>
            <!-- Button to open more information about the route-->
            <button class="more-info-btn center" onclick="generateMoreInfo('${record.id}')">More</button>
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

            // Check if button exists
            if (button !== null) {
                // Add the "liked" class to the button if condition above is fulfilled
                button.classList.add("liked");
            }
        });
    }
}

// Call the function to add "liked" class after appending the elements,
// to make the heart button filled if the route was previously liked
addLikedClassToButtons();

// Function to handle like button clicks
function like(recordId){ // example: recordId='namibia'
    // Retrieve the array of liked routes from session storage
    let likes = JSON.parse(sessionStorage.getItem('likes'));
    // examples: likes = ['namibia', 'salar-de-uyuni'], likes = null

    // Create an empty array if no liked routes exist yet
    if (likes === null) likes = [];

    // Get the like button element by ID
    let likeButton = document.getElementById(`${recordId}-like-btn`);

    // Toggle the "liked" class on the button and if class was added, then add the record ID to the likes array
    if (likeButton.classList.toggle("liked")) {
        likes.push(recordId); // Add the record ID to the likes array
    // else ("liked" class was removed from the button classList) remove the record ID from the likes array
    } else {
        // Find the record ID in the likes array
        // variable to store the route ID, that the user wants to unlike, position in the array of liked routes
        let i;
        // iterate through the array of likes
        for (i = 0; i < likes.length; i++) {
            // check if the value in likes[i] is the same that in recordId
            if (likes[i] === recordId)
                // break if condition above is fulfilled
                break;
        }

        // Remove the record ID from the likes array
        likes.splice(i,1); //At position i, remove 1 item
    }

    // Store the updated likes array in session storage
    sessionStorage.setItem('likes', JSON.stringify(likes));
}