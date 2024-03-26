function openNav() {
    document.getElementById("sidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

function checkScreenWidth() {
    if (window.matchMedia("(min-width: 480px)").matches) {
        openNav(); // Call your function
    } else closeNav();
}

// Initial check when the page loads
checkScreenWidth();

// Listen for resize events and check screen width again
window.addEventListener('resize', checkScreenWidth);