import translations from "./translations/translations_services.js";
import translations_categories from "./translations/translations_categories.js";
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


// Select all filter items
let itemsFilter = document.querySelectorAll("#filter .box");

let itemSelect = "category_1";


// Add click event listener to each filter item
itemsFilter.forEach((item) => {
    item.addEventListener("click", () => {
        // Remove the "active" class from all filter items that do not match the selected item
        itemsFilter.forEach(ele => {
            if (ele.getAttribute("data-category") !== item.getAttribute("data-category"))
                ele.classList.remove("active");
        });

        itemSelect = item.getAttribute("data-category")

        // Add the "active" class to the selected filter item
        item.classList.add("active");
        if (localStorage.getItem("lang"))
            setLanguage(localStorage.getItem("lang"));
        else
            setLanguage(("en"));
        
    });
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
        // Get the translation key from data-i18n attribute
        const translationKey = element.getAttribute("data-i18n");

        // Set innerHTML of non-form elements to translated text
        element.innerHTML = translations[language][translationKey];
        if (element.innerHTML === "undefined")
            element.innerHTML = translationsConstant[language][translationKey];
        if (element.innerHTML === "undefined")
            element.innerHTML = translations_categories[language][itemSelect][translationKey];

    });
};
