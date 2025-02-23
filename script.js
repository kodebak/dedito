// script.js

const touchArea = document.getElementById('touchArea');
const instruction = document.getElementById('instruction');

let activeTouches = [];
let inactivityTimer;

// Function to handle touch start
function handleTouchStart(event) {
    event.preventDefault();
    instruction.classList.add('fade-out');
    instruction.classList.remove('fade-in');

    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        indicator.style.left = `${touch.clientX}px`;
        indicator.style.top = `${touch.clientY}px`;
        indicator.id = `touch-${touch.identifier}`;
        touchArea.appendChild(indicator);
        activeTouches.push({ touch, indicator });
    }

    resetInactivityTimer();
}

// Function to handle touch move
function handleTouchMove(event) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        const touchData = activeTouches.find(t => t.touch.identifier === touch.identifier);
        if (touchData) {
            touchData.indicator.style.left = `${touch.clientX}px`;
            touchData.indicator.style.top = `${touch.clientY}px`;
        }
    }
    resetInactivityTimer();
}

// Function to handle touch end
function handleTouchEnd(event) {
    event.preventDefault();
    instruction.classList.add('fade-in');
    instruction.classList.remove('fade-out');

    for (let i = 0; i < event.changedTouches.length; i++) {
        const touch = event.changedTouches[i];
        const touchData = activeTouches.find(t => t.touch.identifier === touch.identifier);
        if (touchData) {
            touchData.indicator.classList.add('fade-out');
            touchData.indicator.addEventListener('animationend', () => {
                touchData.indicator.remove();
            });
            activeTouches = activeTouches.filter(t => t.touch.identifier !== touch.identifier);
        }
    }
    resetInactivityTimer();
}

// Function to reset the inactivity timer
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(selectWinner, 3000);
}

// Function to select a random winner
function selectWinner() {
    if (activeTouches.length > 0) {
        const randomIndex = Math.floor(Math.random() * activeTouches.length);
        const winner = activeTouches[randomIndex];
        winner.indicator.classList.add('winner');
        setTimeout(() => {
            winner.indicator.classList.remove('winner');
        }, 1000);
    }
}

// Attach event listeners
touchArea.addEventListener('touchstart', handleTouchStart, false);
touchArea.addEventListener('touchmove', handleTouchMove, false);
touchArea.addEventListener('touchend', handleTouchEnd, false);
touchArea.addEventListener('touchcancel', handleTouchEnd, false);
