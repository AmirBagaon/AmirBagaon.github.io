document.addEventListener('DOMContentLoaded', () => {
    const rotateButton = document.getElementById('rotateButton');
    const rotatableImage = document.getElementById('rotatableImage');
    let rotation = 0;

    rotateButton.addEventListener('click', () => {
        rotation = (rotation + 180) % 360; // Keep rotation within 0-359 degrees
        rotatableImage.style.transform = `rotate(${rotation}deg)`;
    });
});
