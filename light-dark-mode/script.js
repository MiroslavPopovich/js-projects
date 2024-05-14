const DARK_THEME = "dark";
const LIGHT_THEME = "light";
const toggleSwitch = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

// Dark or Light Images
function imageMode(theme) {
    image1.src = `/img/undraw_proud_coder_${theme}.svg`;
    image2.src = `./img/undraw_feeling_proud_${theme}.svg`;
    image3.src = `./img/undraw_conceptual_idea_${theme}.svg`;
}

// Toggle Light/Dark Mode Styles
function toggleLightDarkMode(theme) {
    let [navBg, textBoxBg, toggoleIconText, toggleIconClasses] = [
        "rgb(255 255 255 / 50%)",
        "rgb(0 0 0 / 50%)",
        `${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`,
        ["fa-moon", "fa-sun"],
    ];
    if (theme === DARK_THEME) {
        [navBg, textBoxBg, toggoleIconText, toggleIconClasses] = [
            "rgb(0 0 0 / 50%)",
            "rgb(255 255 255 / 50%)",
            `${theme.charAt(0).toUpperCase() + theme.slice(1)} Mode`,
            ["fa-sun", "fa-moon"],
        ];
    }
    nav.style.backgroundColor = navBg;
    textBox.style.backgroundColor = textBoxBg;
    toggleIcon.children[0].textContent = toggoleIconText;
    toggleIcon.children[1].classList.replace(
        toggleIconClasses[0],
        toggleIconClasses[1]
    );
    imageMode(theme);
}
// Switch Theme Dynamically
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute("data-theme", DARK_THEME);
        localStorage.setItem("theme", DARK_THEME);
        toggleLightDarkMode(DARK_THEME);
    } else {
        document.documentElement.setAttribute("data-theme", LIGHT_THEME);
        localStorage.setItem("theme", LIGHT_THEME);
        toggleLightDarkMode(LIGHT_THEME);
    }
}
// Event Listener
toggleSwitch.addEventListener("change", switchTheme);
// Check Local Storage For Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === DARK_THEME) {
        toggleSwitch.checked = true;
        toggleLightDarkMode(DARK_THEME);
    }
} else {
    toggleSwitch.checked = false;
    toggleLightDarkMode(LIGHT_THEME);
}
