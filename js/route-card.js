const articleSectionsContainer = document.getElementById('all-routes');

// Loop through tabRecords and generate HTML for each section
tabRecords.forEach((record, index) => {
    const sectionHTML = `
        <article class="article-section">
            <img src="${record.img}" alt=${record.alt}"">
            <div class="section-content">
                <div class="section-heading">
                    <h2>${record.name}</h2>
                    <button id="${record.id}-like-btn" class="like-btn">
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

    articleSectionsContainer.innerHTML += sectionHTML;
});


// Function to add "liked" class to buttons if they were previously liked
function addLikedClassToButtons() {
    tabRecords.forEach((record) => {
        const button = document.getElementById(`${record.id}-like-btn`);
        if (sessionStorage.getItem(`${record.id}-like-btn`) !== null && button !== null) {
            button.classList.add("liked");
        }
    });
}

// Call the function after appending the elements
addLikedClassToButtons();

const likeButtons = document.querySelectorAll(".like-btn");

likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
        if (likeButton.classList.toggle("liked"))
            sessionStorage.setItem(likeButton.id, 'like');
        else sessionStorage.removeItem(likeButton.id);
    });
});


