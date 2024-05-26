const nav = document.getElementById("navMenu");
let currentNavUi;

// Remove all active classes from the nav
function removeNavActiveClass() {
    [...nav.getElementsByClassName("dropdown-arrow")].forEach((el) => {
        el.classList.remove("active");
    });
    [...nav.getElementsByTagName("ul")].forEach((el) => {
        el.classList.remove("active");
    });
}

// Show menu
function showMenu(toggleId, navId) {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    toggle.addEventListener("click", () => {
        // Add show-icon to show and hide menu icon
        toggle.classList.toggle("show-close-icon");
        // Add show-menu class to nav menu
        nav.classList.toggle("show-menu");
        removeNavActiveClass();
    })
}

showMenu("navToggle", "navMenu");

// @media check
const mql = window.matchMedia("(hover: none)");
mql.onchange = (e) => {
    // if (e.matches) {
    //     console.log("This is a non hover device");
    // } else {
    //     console.log("This is a hover device");
    // }
    removeNavActiveClass();
};

if (mql) {
    nav.addEventListener("click", (e) => {
        const currentEl = e.target;
        const isNavLink = currentEl.classList.contains("nav-link");
        const isDropdownLink = currentEl.classList.contains("dropdown-link");

        if (isNavLink || isDropdownLink) {
            currentNavUi = currentEl.parentElement.getElementsByTagName("ul")[0];
        }
        if (isNavLink) {
            const isActive = currentNavUi.classList.contains('active');
            if (!isActive) {
                removeNavActiveClass();
            }
            if (currentEl.nodeName === "DIV") {
                currentEl.getElementsByClassName("dropdown-arrow")[0].classList.toggle("active");
                currentNavUi.classList.toggle("active");
            }
        } else if (isDropdownLink) {
            if (currentEl.nodeName === "DIV") {
                currentNavUi.classList.toggle("active");
            }
        }
    });
}