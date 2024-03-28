// Loop through tabRecords and generate HTML for each section
const favSectionsContainer = document.getElementById('fav-routes');
if (sessionStorage.length) {
    tabRecords.forEach((record, index) => {
        if (sessionStorage.getItem(`${record.id}-like-btn`) !== null) {
            const sectionHTML = `
        <article class="article-section">
            <img src="${record.img}" alt=${record.alt}"">
            <div class="section-content">
                <div class="section-heading">
                    <h2>${record.name}</h2>
                    <button id="${record.id}-like-btn" class="liked like-btn">
                        <svg viewBox="0 0 24 24"
                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path  d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"/>
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

            favSectionsContainer.innerHTML += sectionHTML;
        }
    });
} else {
    favSectionsContainer.innerHTML = `<article id="nothing-is-here"><b>Nothing is here</b><br>Try to like some routes in All routes tab<div><button id="all-routes-btn" onclick="navigateToPage('all-routes.html')">All routes</button></div></article>`
}

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
        sessionStorage.removeItem(likeButton.id);
        // Reload the current page
        location.reload();

    });
});