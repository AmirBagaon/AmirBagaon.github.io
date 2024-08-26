document.addEventListener('DOMContentLoaded', function() {
    const fireworks = document.querySelectorAll('.firework');
    
    function animateFirework(firework) {
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;
        firework.style.setProperty('--x', `${x}px`);
        firework.style.setProperty('--y', `${y}px`);
        firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        
        firework.style.animation = 'none';
        firework.offsetHeight; // Trigger reflow
        firework.style.animation = null;
    }

    fireworks.forEach(firework => {
        animateFirework(firework);
        setInterval(() => animateFirework(firework), 2000);
    });
});