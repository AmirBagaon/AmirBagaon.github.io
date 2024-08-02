document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinButton = document.getElementById('spinButton');

    const wheelSegments1 = ["יוהנס", "תומאס", "ג'יימס", "ווילבור ואורוויל", "ניקולה"];
    const wheelSegments2 = ["גוטנברג", "אדיסון", "וואט", "רייט", "?"];
    const segmentColors = ["#FF6347", "#FFD700", "#ADFF2F", "#00FA9A", "#1E90FF"];
    let currentSegments = wheelSegments1;
    let spinning = false;
    let rotation = 0;
    let spinTime = 0;
    let spinTimeTotal = 0;
    let mode = 1;
    let randomOffset = 0;

    function drawWheel(segments) {
        const segmentAngle = 2 * Math.PI / segments.length;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "bold 24px Guttman Stam";

        for (let i = 0; i < segments.length; i++) {
            const angle = i * segmentAngle;
            ctx.beginPath();
            ctx.arc(250, 250, 250, angle, angle + segmentAngle, false);
            ctx.lineTo(250, 250);
            ctx.fillStyle = segmentColors[i];
            ctx.fill();
            ctx.save();
            ctx.translate(250 + Math.cos(angle + segmentAngle / 2) * 200, 250 + Math.sin(angle + segmentAngle / 2) * 200);
            ctx.rotate(angle + segmentAngle / 2 + Math.PI / 2);
            ctx.fillStyle = "#0a192f";
            ctx.textAlign = "center";
            ctx.fillText(segments[i], 0, 0);
            ctx.restore();
        }
    }

    function rotateWheel() {
        const segmentAngle = 2 * Math.PI / currentSegments.length;
        spinTime += 30;
        if (spinTime >= spinTimeTotal) {
            spinning = false;
            const degrees = rotation * 180 / Math.PI + 90;
            const arcd = segmentAngle * 180 / Math.PI;
            const index = Math.floor((360 - (degrees + randomOffset) % 360) / arcd);
            console.log(`Result: ${currentSegments[index]}`); // Display result
            return;
        }
        const easeOut = easeOutQuart(spinTime, 0, 1, spinTimeTotal);
        rotation = (easeOut * 10 + randomOffset) % (2 * Math.PI);
        drawWheel(currentSegments);
        ctx.save();
        ctx.translate(250, 250);
        ctx.rotate(rotation);
        ctx.drawImage(canvas, -250, -250, 500, 500);
        ctx.restore();
        requestAnimationFrame(rotateWheel);
    }

    function easeOutQuart(t, b, c, d) {
        t /= d;
        t--;
        return -c * (t * t * t * t - 1) + b;
    }

    function switchSegments() {
        currentSegments = (mode === 1) ? wheelSegments2 : wheelSegments1;
        mode = (mode === 1) ? 2 : 1;
    }

    spinButton.addEventListener('click', () => {
        if (spinning) return;
        spinning = true;
        spinTime = 0;
        spinTimeTotal = Math.random() * 3000 + 4000; // Random spin time between 3000ms and 7000ms
        rotation = Math.random() * 10;
        randomOffset = Math.random() * 2 * Math.PI; // Random offset to ensure different stopping points
        switchSegments(); // Switch segments once at the start of the spin
        requestAnimationFrame(rotateWheel);
    });

    drawWheel(currentSegments);
});
