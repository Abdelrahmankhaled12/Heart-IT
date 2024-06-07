// Selecting the buttonScroll element and the header element from the DOM
let buttonScroll = document.querySelector(".buttonScroll");
let header = document.getElementById("header");

// Event handler for window scroll event
window.onscroll = function () {
    // If the vertical scroll position is greater than or equal to 400 pixels
    if (window.scrollY >= 400) {
        // Make the buttonScroll visible
        buttonScroll.style.opacity = "1";
    } else {
        // Otherwise, hide the buttonScroll
        buttonScroll.style.opacity = "0";
    }

    if (header) {
        // If the vertical scroll position is greater than or equal to 100 pixels
        if (window.scrollY >= 100) {
            // Add the 'show' class to the header element
            header.classList.add("show");
        } else {
            // Otherwise, remove the 'show' class from the header element
            header.classList.remove("show");
        }
    }
};

// Event handler for window click event
window.onclick = function () {
    // Event handler for buttonScroll click event
    buttonScroll.onclick = function () {
        // Scroll to the top of the page smoothly when buttonScroll is clicked
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
};

// Event listener for 'showMenu' button click event
document.getElementById("showMenu").addEventListener("click", function () {
    // Add the 'showMenuMobile' class to the 'menuMobile' element when 'showMenu' button is clicked
    document.getElementById("menuMobile").classList.add("showMenuMobile");
});

// Event listener for 'buttonClose' button click event
document.getElementById("buttonClose").addEventListener("click", function () {
    // Remove the 'showMenuMobile' class from the 'menuMobile' element when 'buttonClose' button is clicked
    document.getElementById("menuMobile").classList.remove("showMenuMobile");
});

// Event listener for 'outMenu' button click event
document.getElementById("outMenu").addEventListener("click", function () {
    // Remove the 'showMenuMobile' class from the 'menuMobile' element when 'outMenu' button is clicked
    document.getElementById("menuMobile").classList.remove("showMenuMobile");
});


// Initialize variable to keep track of whether language dropdown is open or closed
let openLanguages = false;

// Get references to language dropdown and language button elements
const languageDropdown = document.getElementById("ul_language");
const languageButton = document.getElementById("language");

// Add event listener to detect clicks anywhere on the document
document.addEventListener("click", function (event) {
    const targetElement = event.target;

    // Check if the click is outside language button and dropdown
    if (!languageButton.contains(targetElement) && !languageDropdown.contains(targetElement)) {
        // If click is outside, close the dropdown
        openLanguages = false;
        languageDropdown.style.opacity = "0";
    }
});

// Add event listener to toggle dropdown visibility when language button is clicked
languageButton.addEventListener("click", function () {
    if (openLanguages) {
        // If dropdown is open, close it
        openLanguages = false;
        languageDropdown.style.opacity = "0";
    } else {
        // If dropdown is closed, open it
        openLanguages = true;
        languageDropdown.style.opacity = "1";
    }
});

