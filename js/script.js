function scrollToSection(sectionId) {
    let section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
}

function generateMoreInfo(name) {
    window.location.href = `more-info.html?name=${name}`;
}


window.onload = function() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', window.location.href, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 404) {
            window.location.href = '404.html'; // Redirect to the custom 404 page
        }
        }
    };
    xhr.send();
};

document.getElementById("year").innerHTML = new Date().getFullYear();