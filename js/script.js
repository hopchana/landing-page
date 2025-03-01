/*==================== Black theme ====================*/
// Theme toggle button and icon classes
// The theme toggle button element with the id "theme-button"
const themeButton = document.getElementById("theme-button");
// The class name "dark-theme" for the dark theme
const darkTheme = "dark-theme";
// The class name "bx-toggle-right" for the default icon theme
const iconTheme = "bx-toggle-right";

// Retrieve selected theme from the local storage (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
// Retrieve selected icon from the local storage (if user selected)
const selectedIcon = localStorage.getItem("selected-icon");

// Apply previously selected theme and icon to the webpage by adding or removing the corresponding classes
if (selectedTheme) {
    // check if the selectedTheme is "dark"
    // if it is, add the darkTheme class to the body of the document, otherwise, remove it
    document.body.classList[selectedTheme === darkTheme ? "add" : "remove"](darkTheme);
    // check if the selectedIcon is iconTheme
    // If it is, add the iconTheme class to the themeButton, otherwise, remove it.
    themeButton.classList[selectedIcon === iconTheme ? "add" : "remove"](iconTheme);
}

// event listener to toggle theme when the button is clicked
themeButton.addEventListener("click", () => {
    // Toggle the dark theme on body element
    document.body.classList.toggle(darkTheme);
    // Toggle the icon theme on themeButton button
    themeButton.classList.toggle(iconTheme);

    // Save the theme preference
    localStorage.setItem("selected-theme", getCurrentTheme());
    // Save the icon preference
    localStorage.setItem("selected-icon", getCurrentIcon());
});

// Function to get the current theme based on the presence of darkTheme class on the body element
function getCurrentTheme() {
    return document.body.classList.contains(darkTheme) ? darkTheme : "light-theme";
}

// Function to get the icon of the theme button based on the presence of "bx-toggle-right" class on the themeButton button
function getCurrentIcon() {
    return themeButton.classList.contains(iconTheme) ? iconTheme : "bx-toggle-left";
}


/*==================== Footer ====================*/
// Footer content setup
let footer = document.getElementById("footer");
footer.innerHTML = `
    <!-- grid for footer columns -->
    <div class="footer-columns">
        <!-- Company links -->
        <section>
            <h3>Company</h3>
            <ul>
                <!-- Links to various pages -->
                <li>
                    <a href="#">About World on wheels</a>
                </li>
                <li>
                    <!-- Link to Write for us page -->
                    <a href="write-for-us.html">Write For Us</a>
                </li>
                <li>
                    <!-- Link to page with sources -->
                    <a href="sources.html">Sources</a>
                </li>
                <li>
                    <a href="#" >Privacy Policy</a>
                </li>
            </ul>
        <!-- end of the Company links -->
        </section>
        <!-- Top destinations links -->
        <section>
            <h3>Top routes</h3>
            <ul>
             <!-- Links to more-info pages -->
                <li>
                    <!-- Link to page about Southern Namibia route -->
                    <a href="more-info.html?name=namibia">Southern Namibia</a>
                </li>
                <li>
                    <!-- Link to page about La Farola, Cuba route -->
                    <a href="more-info.html?name=la-farola">La Farola, Cuba</a>
                </li>
                <li>
                    <!-- Link to page about Salar De Uyuni, Bolivia route -->
                    <a href="more-info.html?name=salar-de-uyuni">Salar De Uyuni, Bolivia</a>
                </li>
            </ul>
        <!-- end of the Top destinations links -->
        </section>
        <!-- Games links -->
        <section>
            <h3>Games</h3>
            <ul>
            <!-- Links to games -->
                <li>
                    <!-- Link to page with Memory Card Game -->
                    <a href="memory-card-game.html" title="Memory Card Game">Memory Card Game</a>
                </li>
            </ul>
        <!-- end of the Games links -->
        </section>
    <!-- end of the grid for footer columns -->
    </div>
<!-- Footer bottom section -->
<div class="footer-bottom center">
        <!-- Display current year -->
        © <span id="year"></span> Anastasiia Hopchuk
</div>`;
// Update the year dynamically
// Get the current year using the Date object and the getFullYear() method.
// Convert the current year to a string.
// Find the element with the id "year" using the getElementById() method.
// Set the text of the element to the current year.
document.getElementById("year").innerHTML = new Date().getFullYear().toString();

// Function takes a pageUrl as input and navigates the browser window to the specified URL
function navigateToPage(pageUrl) {
    // make the browser window to navigate to the specified URL
    window.location.href = pageUrl;
}

// Function to generate more information for a specific route
// by redirecting the user to a new page with the route name as a query parameter
function generateMoreInfo(name) {
    // redirect user to the new page with the specified route name as a query parameter
    window.location.href = `more-info.html?name=${name}`;
}