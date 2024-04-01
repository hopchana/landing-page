const articleSectionsContainer = document.getElementById('all-routes');

// Loop through tabRecords and generate HTML for each section
tabRecords.forEach((record, index) => {
    const sectionHTML = `
        <article class="article-section">
            <img src="${record.img}" alt=${record.alt}"">
            <div class="section-content">
                <div class="section-heading">
                    <h2>${record.name}</h2>
                    <button id="${record.id}-like-btn" class="like-btn" onclick='like("${record.id}")'>
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
    let likes = JSON.parse(sessionStorage.getItem('likes'));
    if (likes) {
        likes.forEach((like) => {
            let button = document.getElementById(`${like}-like-btn`);
            if (button !== null) {
                button.classList.add("liked");
            }
        });
    }
}

// Call the function after appending the elements
addLikedClassToButtons();

const likeButtons = document.querySelectorAll(".like-btn");

function like(recordId){
    let likes = JSON.parse(sessionStorage.getItem('likes'));
    if (likes === null) likes = []; //pracujemy z tablicą obiektów
    let likeButton = document.getElementById(`${recordId}-like-btn`);
    if (likeButton.classList.toggle("liked")) {
        likes.push(recordId); //dodaj nowy obiekt do listy
    } else {
        let i;
        for (i = 0; i < likes.length; i++) {
            if (likes[i] === recordId) break;
        }
        likes.splice(i,1);
    }
    sessionStorage.setItem('likes', JSON.stringify(likes));
}

// function readAll() {
//     let likes = JSON.parse(localStorage.getItem('likes'));
//     if (likes!=null) {
//         let data = "";
//         for (let i = 0; i < likes.length; i++) {
//             data += "<tr>" +
//                 "<td><button onclick='deleteItem("+i+")'> X </button></td>" +
//                 "<td>" + items[i].name + "</td>" +
//                 "<td>" + items[i].price + "</td>" +
//                 "<td>" + items[i].color + "</td>" +
//                 "<td>" + items[i].quantity + "</td>" +
//                 "</tr>";
//         }
//         data += "</table>";
//         basketData.innerHTML = data;
//     }
//     else {
//         basketData.innerHTML = "<h3>Koszyk jest pusty</h3>";
//     }
// }
//
// function deleteItem(i) {
//     let likes = JSON.parse(localStorage.getItem('liked'));
//     //usuń i-ty element z listy zadań:
//     likes.splice(i,1);
//     //zapisz zaktualizowaną listę w localStorage:
//     localStorage.setItem('liked', JSON.stringify(likes)); //zapisz listę
// }
