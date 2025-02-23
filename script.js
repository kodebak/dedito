const touchArea = document.getElementById('touchArea');

touchArea.addEventListener('touchstart', handleTouchStart, false);
touchArea.addEventListener('touchend', handleTouchEnd, false);

let activeTouches = [];

function handleTouchStart(event) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        activeTouches.push(event.changedTouches[i]);
    }
}

function handleTouchEnd(event) {
    event.preventDefault();
    for (let i = 0; i < event.changedTouches.length; i++) {
        const idx = activeTouches.findIndex(touch => touch.identifier === event.changedTouches[i].identifier);
        if (idx !== -1) activeTouches.splice(idx, 1);
    }

    if (activeTouches.length === 0 && event.touches.length === 0) {
        const randomIndex = Math.floor(Math.random() * event.changedTouches.length);
        const selectedTouch = event.changedTouches[randomIndex];
        indicateWinner(selectedTouch);
    }
}

function indicateWinner(touch) {
    const indicator = document.createElement('div');
    indicator.className = 'indicator';
    indicator.style.left = `${touch.clientX}px`;
    indicator.style.top = `${touch.clientY}px`;
    document.body.appendChild(indicator);

    setTimeout(() => {
        document.body.removeChild(indicator);
    }, 1000);
}
