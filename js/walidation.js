function submitForm() {
    // Pobieramy wartości pól formularza
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let distance = document.getElementById("distance").value;
    let name = document.getElementById("name").value;
    let shortDesc = document.getElementById("short-desc").value;
    let longDesc = document.getElementById("long-desc").value;
    let accept = document.getElementById("accept").checked;
    let nameRadioChecked = document.getElementById("name-radio").checked;
    let anonymousRadioChecked = document.getElementById("anonymous").checked;
    let alertText = "";
    let isOK = true;

    // Walidacja startu i końca
    if (start.trim() === "" || end.trim() === "") {
        alertText+="\nPlease provide both start and end points.";
        isOK=false;
    } else {
        if (start.trim().length < 2) {
            alertText+="\nStart point should not be shorter than 2 symbols.";
            isOK=false;
        }
        if (end.trim().length < 2) {
            alertText+="\nEnd point should not be shorter than 2 symbols.";
            isOK=false;
        }
    }

    // Walidacja dystansu
    if (distance.trim() === "" || isNaN(distance)) {
        alertText+="\nPlease provide a valid distance.";
        isOK=false;
    }

    if (!(anonymousRadioChecked || nameRadioChecked)) {
        alertText+="\nPlease choose how to mention you in the publication.";
        isOK=false;
    }
    else if (nameRadioChecked && name.trim() === "") {
        alertText+="\nPlease provide your name.";
        isOK=false;
    }

    // Walidacja opisu krótkiego i długiego
    if (shortDesc.trim() === "" || longDesc.trim() === "") {
        alertText+="\nPlease provide both short and long descriptions.";
        isOK=false;
    }  else {
        if (shortDesc.trim().length < 100) {
            alertText+="\nShort description should not be shorter than 100 symbols.";
            isOK=false;
        }
        if (longDesc.trim().length < 500) {
            alertText+="\nLong description should not be shorter than 500 symbols.";
            isOK=false;
        }
    }

    // Walidacja akceptacji regulaminu
    if (!accept) {
        alertText+="\nPlease accept the Terms of Use & Privacy Policy.";
        isOK=false;
    }

    // Jeśli walidacja przebiegła pomyślnie, możemy wysłać formularz
    if (isOK) alert("Form submitted successfully!");
    else alert(alertText.substring(1))
    return isOK;
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
    let currentLength = textarea.value.trim().length;
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