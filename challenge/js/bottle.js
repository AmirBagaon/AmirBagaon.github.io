document.addEventListener('DOMContentLoaded', () => {
    const bottle = document.getElementById('bottle');
    const startButton = document.getElementById('startAnimation');

    startButton.addEventListener('click', () => {
        bottle.classList.add('move');
    });
});
