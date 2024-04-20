// Loop through tabRecords and generate HTML for each section
const favSectionsContainer = document.getElementById('fav-routes');
let likes = JSON.parse(sessionStorage.getItem('likes'));
if (likes !==null && likes.length>0) {
    for (let i = 0; i < likes.length; i++) {
        for (let j = 0; j < routes.length; j++) {
            if (likes[i]===routes[j].id)
            {
                let record = routes[j];
                let sectionHTML = `
                <article class="article-section">
                    <img src="${record.img}" alt=${record.alt}"">
                    <div class="section-content">
                        <div class="section-heading">
                            <h2>${record.name}</h2>
                            <button id="${record.id}-like-btn" class="liked like-btn" onclick="unlike('${record.id}')">
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
        }
    }
} else {
    favSectionsContainer.innerHTML = `<article id="nothing-is-here"><b>Nothing is here</b><br>Try to like some routes in All routes tab<div><button id="all-routes-btn" onclick="navigateToPage('all-routes.html')">All routes</button></div></article>`
}

function unlike(recordId){
    let likes = JSON.parse(sessionStorage.getItem('likes'));
    let i;
    for (i = 0; i < likes.length; i++) {
        if (likes[i] === recordId) break;
    }
    likes.splice(i,1);
    sessionStorage.setItem('likes', JSON.stringify(likes));

    // Reload the current page
    location.reload();
}