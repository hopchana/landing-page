/*==================== Black theme ====================*/
// Theme toggle button and icon classes
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-toggle-right";

// Previously selected theme and icon (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Function to get the current theme and icon
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme) ? "bx-toggle-left" : "bx-toggle-right";

// Apply previously selected theme and icon
if (selectedTheme) {
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
    themeButton.classList[selectedIcon === "bx-toggle-left" ? "add" : "remove"](iconTheme);
}

// Toggle theme when the button is clicked
themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // Save the theme and icon preference
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});


/*==================== Footer ====================*/
// Footer content setup
let footer = document.getElementById("footer");
footer.innerHTML = `<div class="footer-wrapper">
            <div class="footer-columns">
                <div class="link-columns">
                    <!-- Company links -->
                    <section>
                        <h3>Company</h3>
                        <ul>
                        <!-- Links to various pages -->
                            <li>
                                <a href="#" title="About">About World on wheels</a>
                            </li>
                            <li>
                                <a href="write-for-us.html" title="Write For Us">
                                    Write For Us
                                </a>
                            </li>
                            <li>
                                <a href="sources.html" title="Sources">
                                    Sources
                                </a>
                            </li>
                            <li>
                                <a href="#" title="Privacy Policy">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </section>
                    <!-- Top destinations links -->
                    <section>
                        <h3>Top destinations</h3>
                        <ul>
                         <!-- Links to more-info pages -->
                            <li>
                                <a href="more-info.html?name=namibia">Southern Namibia</a>
                            </li>
                            <li>
                                <a href="more-info.html?name=la-farola">La Farola, Cuba</a>
                            </li>
                            <li>
                                <a href="more-info.html?name=salar-de-uyuni">Salar De Uyuni, Bolivia</a>
                            </li>
                        </ul>
                    </section>
                    <!-- Games links -->
                    <section>
                        <h3>Games</h3>
                        <ul>
                        <!-- Links to games -->
                            <li>
                                <a href="memory-card-game.html" title="Memory Card Game">Memory Card Game</a>
                            </li>
                            <li>
                                <a href="#" title="---">---</a>
                            </li>
                            <li>
                                <a href="#" title="---">---</a>
                            </li>
                            <li>
                                <a href="#" title="---">--</a>
                            </li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
        <!-- Footer bottom section -->
        <div class="footer-bottom">
            <div class="footer-bottom-wrapper">
                <!-- Display current year -->
                © <span id="year"></span> Anastasiia Hopchuk
            </div>
        </div>`;
// Update the year dynamically
document.getElementById("year").innerHTML = new Date().getFullYear().toString();

// Function to navigate to a page
function navigateToPage(pageUrl) {
    window.location.href = pageUrl;
}

// Function to generate more info for a specific route
function generateMoreInfo(name) {
    window.location.href = `more-info.html?name=${name}`;
}

// Function to enable/disable input field based on radio button
function inputDisabled(id) {
    document.getElementById("name").disabled = id;
    document.getElementById("name").value = "";
}

// Function to update character counter in a textarea
function updateCounter(counterId, textareaId) {
    // Get references to the textarea and counter elements
    let counter = document.getElementById(counterId);
    let textarea = document.getElementById(textareaId);
    // Get current number of characters entered
    let currentLength = textarea.value.length;
    // Get maximum allowed characters
    let maxLength = parseInt(textarea.getAttribute('maxlength'));
    // Update counter text
    counter.textContent = `${currentLength}/${maxLength}`;
    // Change counter color based on character limit
    if (currentLength >= (maxLength / 1.25).toFixed(0))
        counter.style.color = 'red';
    else
        counter.style.color = 'gray';
}
