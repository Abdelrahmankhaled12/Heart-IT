import translations from "./translations/translations_portfolio.js";
import translationsConstant from "./translations/translations.js";

// Selecting the buttonScroll element and the header element from the DOM
let buttonScroll = document.querySelector(".buttonScroll");

// Wait for the DOM content to be fully loaded before executing the code
document.addEventListener("DOMContentLoaded", function () {
    // Execute the following code after a delay of 5000 milliseconds (5 seconds)
    setTimeout(() => {
        // Initialize the WOW.js library for animating elements
        new WOW().init();
        // Hide the loader element after 5 seconds
        document.getElementById("loader").style.display = "none";
        // Hide the effect element after 5 seconds
        document.getElementById("effect").style.display = "none";
        // Show the sections element after 5 seconds
        document.getElementById("sections").style.display = "block";
        // Otherwise, hide the buttonScroll
        buttonScroll.style.opacity = "0";
    }, 2000); // 2000 milliseconds = 2 seconds
});

// Select all elements with class "languageSelector"
const languageSelector = document.querySelectorAll(".languageSelector");

// Loop through each language selector element
languageSelector.forEach(item => {
    // Add click event listener to each language selector
    item.addEventListener("click", (event) => {
        // Call setLanguage function with the value attribute of the clicked item
        setLanguage(item.getAttribute("value"));

        // Store selected language in local storage
        localStorage.setItem("lang", item.getAttribute("value"));

        // Update the text of an element with id "textButtonLanguage" to match the clicked language
        document.getElementById("textButtonLanguage").innerHTML = item.innerHTML;
    });

    // Check if the current item's value attribute matches the stored language in local storage
    if (item.getAttribute("value") === localStorage.getItem("lang")) {
        // Update the text of an element with id "textButtonLanguage" to match the stored language
        document.getElementById("textButtonLanguage").innerHTML = item.innerHTML;
    }
});

// When the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Get the selected language from local storage or default to "en" (English)
    const language = localStorage.getItem("lang") || "en";

    // Call setLanguage function with the selected language
    setLanguage(language);
});

// Function to set the language of elements with data-i18n attribute
const setLanguage = (language) => {
    // Select all elements with data-i18n attribute
    const elements = document.querySelectorAll("[data-i18n]");

    // Loop through each element
    elements.forEach((element) => {
        // Check if the element is a form element (input, textarea) based on data-type attribute
        if (element.getAttribute("data-type") === "form") {
            // Get the translation key from data-i18n attribute
            const translationKey = element.getAttribute("data-i18n");

            // Set placeholder attribute of form elements to translated text
            element.placeholder = translationsConstant[language][translationKey];

        } else {
            // Get the translation key from data-i18n attribute
            const translationKey = element.getAttribute("data-i18n");

            // Set innerHTML of non-form elements to translated text
            element.innerHTML = translations[language][translationKey];
            if (element.innerHTML === "undefined")
                element.innerHTML = translationsConstant[language][translationKey];

        }
    });
};

// Select all elements with the class "iconGallery" and add a click event listener to each
document.querySelectorAll(".iconGallery").forEach((item) => {
    item.addEventListener("click", (e) => {
        // Get the gallery ID from the "data-gallery" attribute
        let galleryId = item.getAttribute("data-gallery");
        let galleryElement = document.getElementById(galleryId);

        // Set the display properties of the selected gallery
        galleryElement.style.opacity = "1";
        galleryElement.style.zIndex = "200000000";

        // Get all images within the selected gallery
        let images = document.querySelectorAll(`#${galleryId}-images img`);
        let index = 0;

        // Get the navigation buttons for the gallery
        let buttons = document.querySelectorAll(`#${galleryId}-buttons button`);
        
        // Add click event listener for the next button
        buttons[0].addEventListener("click", () => {
            images[index].style.opacity = 0; // Hide the current image
            index = (index + 1) % images.length; // Move to the next image
            images[index].style.opacity = 1; // Show the new image
        });

        // Add click event listener for the previous button
        buttons[1].addEventListener("click", () => {
            images[index].style.opacity = 0; // Hide the current image
            index = (index - 1 + images.length) % images.length; // Move to the previous image
            images[index].style.opacity = 1; // Show the new image
        });

        // Add click event listener for the close button
        document.getElementById(`${galleryId}-close`).addEventListener("click", () => {
            galleryElement.style.opacity = "0"; // Hide the gallery
            galleryElement.style.zIndex = "-1"; // Send the gallery to the background
        });
        
        document.getElementById(`${galleryId}-button`).addEventListener("click", () => {
            galleryElement.style.opacity = "0"; // Hide the gallery
            galleryElement.style.zIndex = "-1"; // Send the gallery to the background
        });
    });
});

// Select all filter items
let itemsFilter = document.querySelectorAll("#filter li");

// Add click event listener to each filter item
itemsFilter.forEach((item) => {
    item.addEventListener("click", () => {
        // Remove the "active" class from all filter items that do not match the selected item
        itemsFilter.forEach(ele => {
            if (ele.getAttribute("data-type") !== item.getAttribute("data-type"))
                ele.classList.remove("active");
        });
        
        // Add the "active" class to the selected filter item
        item.classList.add("active");

        // Show or hide the boxes in the gallery based on the filter type
        document.querySelectorAll("#boxes .box").forEach((box) => {
            if (item.getAttribute("data-type") === "All" || 
                box.getAttribute("data-type") === item.getAttribute("data-type")) {
                box.style.display = "block"; // Show the boxes that match the filter or all boxes if the filter is "All"
            } else {
                box.style.display = "none"; // Hide the boxes that do not match the filter
            }
        });
    });
});

