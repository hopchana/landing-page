// function to validate form inputs and display appropriate error message if any of the inputs are invalid
function submitForm() {
    // retrieve the values of the form inputs
    // get the value of the start point input field
    let start = document.getElementById("start").value;
    // get the value of the end point input field
    let end = document.getElementById("end").value;
    // get the value of the distance input field
    let distance = document.getElementById("distance").value;
    // get the value of the name input field
    let name = document.getElementById("name").value;
    // get the value of the short description input field
    let shortDesc = document.getElementById("short-desc").value;
    // get the value of the long description input field
    let longDesc = document.getElementById("long-desc").value;
    // get a boolean indicating whether the terms have been accepted
    let accept = document.getElementById("accept").checked;
    // get a boolean indicating whether the name radio button is checked
    let nameRadioChecked = document.getElementById("name-radio").checked;
    //  a boolean indicating whether the anonymous radio button is checked
    let anonymousRadioChecked = document.getElementById("anonymous").checked;

    // string variable to store the text for alert
    let alertText = "";
    // a boolean variable indicating whether the form passed validation
    let isOK = true;

    // perform validation on the start and end points, checking if they are empty
    if (start.trim() === "" || end.trim() === "") {
        // add information that both start and end points should be provided to alert message
        alertText+="\nPlease provide both start and end points.";
        // indicate that the form has not passed validation
        isOK=false;
    // if start and end points are non-empty
    } else {
        // check if start point is shorter than 2 symbols
        if (start.trim().length < 2) {
            // add information that start point is too short to alert message
            alertText+="\nStart point should not be shorter than 2 symbols.";
            // indicate that the form has not passed validation
            isOK=false;
        }
        // check if end point is shorter than 2 symbols
        if (end.trim().length < 2) {
            // add information that end point is too short to alert message
            alertText+="\nEnd point should not be shorter than 2 symbols.";
            // indicate that the form has not passed validation
            isOK=false;
        }
    }

    // perform validation on the distance, checking if it is empty or not a number
    if (distance.trim() === "" || isNaN(distance)) {
        // add message that valid distance should be provided to the alert text
        alertText+="\nPlease provide a valid distance.";
        // indicate that the form has not passed validation
        isOK=false;
    }

    // Perform validation on the radio buttons, checking if either name or anonymous option is selected
    // If neither name nor anonymous option is selected
    if (!(anonymousRadioChecked || nameRadioChecked)) {
        // add message that asks user to choose how to mention them in the publication to the alert text
        alertText+="\nPlease choose how to mention you in the publication.";
        // indicate that the form has not passed validation
        isOK=false;
    }
    // If name option is selected and the name input field is empty
    else if (nameRadioChecked && name.trim() === "") {
        // add message that asks user to provide their name
        alertText+="\nPlease provide your name.";
        // indicate that the form has not passed validation
        isOK=false;
    }

    // Perform validation on the short and long descriptions, checking if they are empty or shorter than the required lengths
    // check if they are empty
    if (shortDesc.trim() === "" || longDesc.trim() === "") {
        // add message, that asks user to provide both short and long descriptions
        alertText+="\nPlease provide both short and long descriptions.";
        // indicate that the form has not passed validation
        isOK=false;
    }  else {
        if (shortDesc.trim().length < 100) {
            // add information, that short description should not be shorter than 100 symbols, to alert message
            alertText+="\nShort description should not be shorter than 100 symbols.";
            // indicate that the form has not passed validation
            isOK=false;
        }
        if (longDesc.trim().length < 500) {
            // add information, that long description should not be shorter than 500 symbols, to alert message
            alertText+="\nLong description should not be shorter than 500 symbols.";
            // indicate that the form has not passed validation
            isOK=false;
        }
    }

    // Perform validation on the acceptance of terms, checking if it is not checked
    if (!accept) {
        // add message, that asks user to accept the Terms of Use & Privacy Policy
        alertText+="\nPlease accept the Terms of Use & Privacy Policy.";
        // indicate that the form has not passed validation
        isOK=false;
    }

    // check if all validations pass
    if (isOK) {
        // display a success message
        alert("Form submitted successfully!");
        // Reset the form
        document.getElementById('write-for-us-form').reset();
        // update counter for long description textarea
        updateCounter('counter-long', 'long-desc');
        // update counter for short description textarea
        updateCounter('counter-short', 'short-desc')
    }
    // otherwise, display an error message with the specific validation issues, removing first \n
    else alert(alertText.substring(1))
    // Return the value of isOK
    return isOK;
}

// Function to enable/disable input field based on radio button
function inputDisabled(isEnabled) {
    // get a reference to the input field with the id "name"
    let nameElement = document.getElementById("name");
    // determine whether the input field should be disabled or enabled based on isEnabled parameter
    nameElement.disabled = isEnabled;
    // set to nameElement value an empty string, clearing its current value
    nameElement.value = "";
}

// Function to update character counter in a textarea
function updateCounter(counterId, textareaId) {
    // Get reference to the counter element
    let counter = document.getElementById(counterId);
    // Get reference to the textarea element
    let textarea = document.getElementById(textareaId);
    // Get current number of characters entered
    let currentLength = textarea.value.length;
    // Get maximum allowed characters
    let maxLength = textarea.maxLength;
    //  update counter element based on the number of characters in textarea
    counter.innerText = textarea.value.trim() === "" ? `0/${maxLength}` : `${currentLength}/${maxLength}`;
    // Change counter color based on character limit
    counter.style.color = currentLength >= (maxLength / 1.25).toFixed(0) ? 'red' : 'gray';
}