// script.js

const touchArea = document.getElementById('touchArea');

// Object to keep track of active touch indicators
const touchIndicators = {};

// Handle touch start events
function handleTouchStart(event) {
    event.preventDefault();
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

// Handle touch move events
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

// Handle touch end and touch cancel events
function handleTouchEnd(event) {
    event.preventDefault();
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
