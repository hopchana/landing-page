// Function to open the side navigation bar
function openNav() {
    document.getElementById("sidenav").style.width = "100%";
}

// Function to close the side navigation bar
function closeNav() {
    document.getElementById("sidenav").style.width = "0";
}

// Function to check the screen width and open/close the side navigation accordingly
function checkScreenWidth() {
    // Check if the screen width is at least 480px
    if (window.matchMedia("(min-width: 480px)").matches) {
        openNav(); // If yes, open the side navigation
    } else {
        closeNav(); // If not, close the side navigation
    }
}

// Check the screen width when the page loads
checkScreenWidth();

// Listen for resize events and check screen width again
window.addEventListener('resize', checkScreenWidth);
