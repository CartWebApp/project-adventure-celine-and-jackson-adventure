// health bar //
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

window.addEventListener('load', () => {
    updateHealthBar();
    showPage('menu');
});

// menu //
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
        'Hush-cave': 'url(cave.png)'
       
    };
    document.body.style.backgroundImage = bgImages[pageId] || 'url(Home-menu_screen.jpg)';

    // Animated story text //
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

//Inventory
const inventory = [];


function addItem(item) {
    const existingItem = inventory.find(i => i.name === item.name);
    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        inventory.push(item);
    }
    updateInventoryUI();
}


function removeItem(itemName, quantity = 1) {
    const itemIndex = inventory.findIndex(i => i.name === itemName);
    if (itemIndex !== -1) {
        inventory[itemIndex].quantity -= quantity;
        if (inventory[itemIndex].quantity <= 0) {
            inventory.splice(itemIndex, 1);
        }
    }
    updateInventoryUI();
}


function updateInventoryUI() {
    const inventoryContainer = document.getElementById('inventory-container');
    inventoryContainer.innerHTML = ''; 
    inventory.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.name} (x${item.quantity})`;
        inventoryContainer.appendChild(itemElement);
    });
}


document.addEventListener('keydown', (event) => {
    if (event.key === 'e') { 
        const inventoryContainer = document.getElementById('inventory-container');
        inventoryContainer.style.display = inventoryContainer.style.display === 'none' ? 'block' : 'none';
    }
    
});

// inventory slots




