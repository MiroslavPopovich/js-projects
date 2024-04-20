const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const autherText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
// Get Quotes From API
let apiQuotes = [];
// Show Loading
function showLoader() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// Hide Loading
function hideLoader() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}
// Show New Quote
function onNewQuote() {
    showLoader();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // CVheck if Author field is blank and replace it weith "Unknown"
    if (!quote.author) {
        autherText.textContent = "Unknown";
    } else {
        autherText.textContent = quote.author;
    }
    // Check Quote length to determine the styling
    if (quote.text.length > 100) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    // Set a Quote and hide Loader
    quoteText.textContent = quote.text;
    hideLoader();
}
// Get Quotes
async function getQuotes() {
    showLoader();
    const apiUrl = `https://jacintodesign.github.io/quotes-api/data/quotes.json`;

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        onNewQuote();
    } catch (error) {
        alert(error);
    }
}
// Tweet Quote
function onTweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${autherText.textContent}`;
    window.open(twitterUrl, "_blank");
}
// Event Listeners
newQuoteBtn.addEventListener("click", onNewQuote);
twitterBtn.addEventListener("click", onTweetQuote);
// On Load
getQuotes();
