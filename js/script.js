/*==================== Black theme ====================*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-toggle-right";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme)
        ? "bx-toggle-left"
        : "bx-toggle-right";

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
    );
    themeButton.classList[selectedIcon === "bx-toggle-left" ? "add" : "remove"](
        iconTheme
    );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    // We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
});


/*==================== Footer ====================*/
let footer = document.getElementById("footer");
footer.innerHTML = `<div class="footer-wrapper">
            <div class="footer-columns">
                <div class="link-columns">
                    <section>
                        <h3>Company</h3>
                        <ul>
                            <li>
                                <a href="#" title="About">About Bike the world</a>
                            </li>
                            <li>
                                <a href="write-for-us.html" title="Write For Us">
                                    Write For Us
                                </a>
                            </li>
                            <li>
                                <a href="#" title="Terms and Conditions">
                                    Terms and Conditions
                                </a>
                            </li>
                            <li>
                                <a href="#" title="Privacy Policy">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h3>Top destinations</h3>
                        <ul>
                            <li>
                                <a href="more-info.html?name=namibia" title="Namibia">Namibia</a>
                            </li>
                            <li>
                                <a href="more-info.html?name=la-farola" title="Cuba">Cuba</a>
                            </li>
                            <li>
                                <a href="more-info.html?name=bolivia" title="Bolivia">Bolivia</a>
                            </li>
                        </ul>
                    </section>
                    <section>
                        <h3>Games</h3>
                        <ul>
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
        <!-- bottom part section -->
        <div class="footer-bottom">
            <div class="footer-bottom-wrapper">
                © <span id="year"></span> Anastasiia Hopchuk
            </div>
        </div>`;
document.getElementById("year").innerHTML = new Date().getFullYear().toString();

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

function inputDisabled(id) {
    document.getElementById("name").disabled = id;
    document.getElementById("name").value="";
}

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
    if (currentLength>=(maxLength/1.25).toFixed(0))
        counter.style.color='red';
    else
        counter.style.color='gray';
}