const videoElement = document.getElementById("video");
const startButton = document.getElementById("button");
const selectButton = document.getElementById("select");
startButton.disabled = true;
startButton.classList.add("disabled");
// Prompt to select media streem, pass to video element, then play
selectButton.addEventListener("click", async () => {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
        startButton.disabled = false;
        startButton.classList.remove("disabled");
    } catch (error) {
        // Catch error here
    }
});
// async function selectMediaStream() {}
startButton.addEventListener("click", async () => {
    // Disable button
    startButton.disabled = true;
    // Start picture in picture
    await videoElement.requestPictureInPicture();
    // Reset button
    startButton.disabled = false;
});
