// script.js

const touchArea = document.getElementById('touchArea');
const instruction = document.getElementById('instruction');

// Object to keep track of active touch indicators
const touchIndicators = {};

// Function to handle touch start
function handleTouchStart(event) {
    event.preventDefault();
    // Add the fade-out class after the DOM has been updated
    setTimeout(() => {
        instruction.classList.add('fade-out');
        instruction.classList.remove('fade-in');
    }, 0);
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
    // Add the fade-in class after the DOM has been updated
    setTimeout(() => {
        instruction.classList.add('fade-in');
        instruction.classList.remove('fade-out');
    }, 0);
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
}

// Attach event listeners
touchArea.addEventListener('touchstart', handleTouchStart, false);
touchArea.addEventListener('touchmove', handleTouchMove, false);
touchArea.addEventListener('touchend', handleTouchEnd, false);
touchArea.addEventListener('touchcancel', handleTouchEnd, false);
