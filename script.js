// script.js

const touchArea = document.getElementById('touchArea');
const instruction = document.getElementById('instruction');
const countdownElement = document.getElementById('countdown');

// Object to keep track of active touch indicators
const touchIndicators = {};
let touchTimeout;
let countdownTimeout;
let countdownValue = 3;
let touchStartPositions = {};

// Function to handle touch start
function handleTouchStart(event) {
    event.preventDefault();
    instruction.classList.add('fade-out');
    instruction.classList.remove('fade-in');
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        // Create a new indicator for each touch point
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.style.left = `${touch.clientX - 25}px`; // Center the indicator
        indicator.style.top = `${touch.clientY - 25}px`; // Center the indicator
        indicator.id = `touch-${touch.identifier}`;
        touchArea.appendChild(indicator);
        touchIndicators[touch.identifier] = indicator;
        touchStartPositions[touch.identifier] = { x: touch.clientX, y: touch.clientY };
    }
    // Clear any existing timeout and set a new one
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(startCountdown, 3000);
}

// Function to handle touch move
function handleTouchMove(event) {
    event.preventDefault();
    let isInactive = true;
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        const indicator = touchIndicators[touch.identifier];
        if (indicator) {
            const startPos = touchStartPositions[touch.identifier];
            const distance = Math.sqrt(Math.pow(touch.clientX - startPos.x, 2) + Math.pow(touch.clientY - startPos.y, 2));
            if (distance > 5) { // Allowing minor movements
                isInactive = false;
            }
            indicator.style.left = `${touch.clientX - 25}px`; // Center the indicator
            indicator.style.top = `${touch.clientY - 25}px`; // Center the indicator
        }
    }
    // If all touches are inactive, start the countdown
    if (isInactive) {
        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(startCountdown, 3000);
    }
}

// Function to handle touch end
function handleTouchEnd(event) {
    event.preventDefault();
    instruction.classList.add('fade-in');
    instruction.classList.remove('fade-out');
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        // Remove the indicator when the touch ends
        const indicator = touchIndicators[touch.identifier];
        if (indicator) {
            indicator.classList.add('fade-out');
            indicator.addEventListener('animationend', () => {
                indicator.remove();
            });
            delete touchIndicators[touch.identifier];
            delete touchStartPositions[touch.identifier];
        }
    }
    // Clear the timeout if the user lifts their finger before 3 seconds
    clearTimeout(touchTimeout);
}

// Function to start the countdown
function startCountdown() {
    countdownValue = 3;
    countdownElement.textContent = countdownValue;
    countdownElement.style.opacity = 1;
    countdownTimeout = setInterval(updateCountdown, 1000);
}

// Function to update the countdown
function updateCountdown() {
    countdownValue--;
    if (countdownValue > 0) {
        countdownElement.textContent = countdownValue;
    } else {
        clearInterval(countdownTimeout);
        countdownElement.style.opacity = 0;
        selectRandomWinner();
    }
}

// Function to select a random winner
function selectRandomWinner() {
    const touchIds = Object.keys(touchIndicators);
    if (touchIds.length > 0) {
        const randomIndex = Math.floor(Math.random() * touchIds.length);
        const winnerId = touchIds[randomIndex];
        const winnerIndicator = touchIndicators[winnerId];
        winnerIndicator.classList.add('winner');
        // Remove the winner after 1 second
        setTimeout(() => {
            winnerIndicator.classList.remove('winner');
        }, 1000);
    }
}

// Attach event listeners
touchArea.addEventListener
::contentReference[oaicite:0]{index=0}
 
