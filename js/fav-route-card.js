// Get the container for favorite route sections
const favSectionsContainer = document.getElementById('fav-routes');

// Retrieve liked routes from session storage
let likes = JSON.parse(sessionStorage.getItem('likes'));

// Check if there are liked routes and generate HTML for each section
if (likes !== null && likes.length > 0) {
    // go through likes array from browser
    for (let i = 0; i < likes.length; i++) {
        //go through routes array
        for (let j = 0; j < routes.length; j++) {
            if (likes[i] === routes[j].id) {
                let record = routes[j];
                // Generate HTML for each favorite route section
                let sectionHTML = `
                    <!-- container for route brief information and image -->
                    <article class="article-section">
                        <img src="${record.img}" alt="${record.alt}">
                        <!-- section with brief information about route and like button -->
                        <div class="section-content">
                            <!-- Container for name of route and like button -->
                            <div class="section-heading">
                                <!-- Tittle with name of route -->
                                <h2>${record.name}</h2>
                                <!-- filled like button with unlike function -->
                                <button id="${record.id}-like-btn" class="liked like-btn" onclick="unlike('${record.id}')">
                                      <!-- Heart SVG Icon -->
                                    <svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
                                    </svg>
                                </button>
                            </div>
                            <!-- Bold text with route start point-->
                            <b>Start:</b> ${record.start}
                            <!-- Bold text with route end point-->
                            <br><b>End:</b> ${record.end}
                            <!-- Bold text with route distance -->
                            <br><b>Distance:</b> ${record.distance}
                            <!-- Regular text with whort route description-->
                            <br>${record.about}
                        </div>
                        <!-- Button to open more information about the route-->
                        <button class="more-info-btn" onclick="generateMoreInfo('${record.id}')">More</button>
                    </article>
                `;
                // Append the HTML to the container
                favSectionsContainer.innerHTML += sectionHTML;
            }
        }
    }
} else {
    // If no liked routes, display text informing about it and suggest where user can add routes to favourites
    favSectionsContainer.innerHTML = `
        <!-- center message with center class -->
        <article class="center" id="nothing-is-here">
            <!-- Bold text with "problem" -->
            <b>Nothing is here</b>
            <!-- paragraph of regular text with suggestion -->
            <p>Try to like some routes in All routes tab</p>
            <!-- Button that navigates to All Routes page -->
                <button id="all-routes-btn" onclick="navigateToPage('all-routes.html')">All routes</button>
        </article>
    `;
}

// Function to unlike a route by removing it from the list of liked routes
function unlike(recordId){ // example: recordId='namibia'
    // Retrieve liked routes from session storage
    let likes = JSON.parse(sessionStorage.getItem('likes')); // example: likes = ['namibia', 'salar-de-uyuni']

    // Find the index of the record ID in the likes array
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

    // Update the likes array in session storage
    sessionStorage.setItem('likes', JSON.stringify(likes));

    // Reload the current page to reflect the changes
    location.reload();
}
