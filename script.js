// script.js

const touchArea = document.getElementById('touchArea');
const instruction = document.getElementById('instruction');

// Object to keep track of active touch indicators
const touchIndicators = {};
let touchTimeout;

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
        indicator.style.left = `${touch.clientX}px`;
        indicator.style.top = `${touch.clientY}px`;
        indicator.id = `touch-${touch.identifier}`;
        touchArea.appendChild(indicator);
        touchIndicators[touch.identifier] = indicator;
    }
    // Clear any existing timeout and set a new one
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(selectRandomWinner, 3000);
}

// Function to handle touch move
function handleTouchMove(event) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        // Update the position of the existing indicator
        const indicator = touchIndicators[touch.identifier];
        if (indicator) {
            indicator.style.left = `${touch.clientX}px`;
            indicator.style.top = `${touch.clientY}px`;
        }
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
        }
    }
    // Clear the timeout if the user lifts their finger before 3 seconds
    clearTimeout(touchTimeout);
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
touchArea.addEventListener('touchstart', handleTouchStart, false);
touchArea.addEventListener('touchmove', handleTouchMove, false);
touchArea.addEventListener('touchend', handleTouchEnd, false);
touchArea.addEventListener('touchcancel', handleTouchEnd, false);
