const imageContainer = document.getElementById("image-container");
const loaderOverlay = document.getElementById("overlay");
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let count = 6;
const apiKey = "Sevrp67J-2sXn4sip-D8oKrr6k7eMSBEp8az65VxQOE";
let apiUrl = (count) =>
    `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;
// Check if all images are loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        loaderOverlay.style.display = "none";
        count = 30;
    }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to Link Unsplash
        const item = document.createElement("a");
        setAttributes(item, {
            href: photo.links.html,
            target: "_blank",
        });
        // Create <img> for photo
        const img = document.createElement("img");
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Event Listener, check when each is finished loading
        img.addEventListener("load", imageLoaded);
        // Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl(count));
        if (!response.ok) {
            const serverError = await response.json();
            const error = new Error(serverError.errors[0]);
            throw error;
        }
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        alert(error);
    }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener("scroll", () => {
    if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 1000 &&
        ready
    ) {
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();
