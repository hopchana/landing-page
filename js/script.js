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