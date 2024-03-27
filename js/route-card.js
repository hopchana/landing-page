const tabRecords = [
    {
        id: 'namibia',
        img: 'img/namibia-1.jpg',
        alt: 'Zebras in Namibia',
        name: 'Southern Namibia',
        start: 'Windhoek',
        end: 'Felix Unite',
        distance: '621 miles (1000km)',
        about: 'Namibia has the second lowest population density in the world. ' +
            'Most of its people are in the north, so the south is empty indeed. ' +
            'Not surprisingly, it’s dry and unforgiving land. Towns and amenities are few and far between. ' +
            'Roads are mostly loose gravel. But it’s also unutterably gorgeous. '
    },
    {
        id: 'cuba',
        img: 'img/cuba.jpg',
        alt: 'Breathtaking Panoramic View of La Farola, Cuba',
        name: 'La Farola, Cuba',
        start: 'Cajobabo',
        end: 'Baracoa',
        distance: '34 miles (55km)',
        about: 'Hailed as one of the seven modern engineering marvels of Cuba, ' +
            'La Farola (the lighthouse road) links the beach hamlet of Cajobabo on the arid Caribbean coast ' +
            'with the nation’s beguiling oldest city, Baracoa.'
    },
    {
        id: 'bolivia',
        img: 'img/bolivia.jpg',
        alt: 'Cycling on the salt flats of Bolivia makes for an unforgettable experience',
        name: 'Salar De Uyuni, Bolivia',
        start: 'Uyuni',
        end: 'Sabaya',
        distance: '186 miles (300km)',
        about: 'Cycling atop the salt crust of Bolivia’s Salar de Uyuni ' +
            '– and the more petite but perfectly-formed Salar de Coipasa – is an undisputed highlight of many ' +
            'a South America journey. It’s a high-altitude ride that takes five or six days, segmented by an opportunity ' +
            'to resupply with water and food at the midway settlement of Llica.'
    }
];

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


