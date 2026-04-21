// health bar
let maxHealth = 100;
let currentHealth = 100;

function updateHealthBar() {
    const healthBars = document.querySelectorAll('#health-bar, #health_bar');
    healthBars.forEach(bar => {
        let fill = bar.querySelector('.health-fill');
        if (!fill) {
            fill = document.createElement('div');
            fill.className = 'health-fill';
            bar.appendChild(fill);
        }
        fill.style.width = (currentHealth / maxHealth) * 100 + '%';

        let text = bar.querySelector('.health-text');
        if (!text) {
            text = document.createElement('div');
            text.className = 'health-text';
            bar.appendChild(text);
        }
        text.innerText = currentHealth + '/' + maxHealth;
    });
}

function takeDamage(amount) {
    currentHealth -= amount;
    if (currentHealth < 0) currentHealth = 0;
    updateHealthBar();

    if (currentHealth <= 0) {
       
        console.log('Player died!');
        
    }
}

function heal(amount) {
    currentHealth += amount;
    if (currentHealth > maxHealth) currentHealth = maxHealth;
    updateHealthBar();
}

// Initialize health bar on load
window.addEventListener('load', () => {
    updateHealthBar();
    showPage('menu');
});

// menu

function typeText(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    const timer = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(timer);
    }, speed);
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';

    
    const bgImages = {
        'menu': 'url(Home-menu_screen.jpg)',
        'ordinary-world': 'url(Ordinary_world.jpg)',
       
    };
    document.body.style.backgroundImage = bgImages[pageId] || 'url(Home-menu_screen.jpg)';

    // Animate story text
    setTimeout(() => {
        const page = document.getElementById(pageId);
        const storyBoxes = page.querySelectorAll('#story-box');
        storyBoxes.forEach((box, index) => {
            const text = box.textContent.trim();
            setTimeout(() => typeText(box, text, 50), index * 1000);
        });
    }, 500);
}

window.addEventListener('load', () => {
    showPage('menu');
});




