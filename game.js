const textBox = document.getElementById('gameCanvas');

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

    // Animated story text 
   displaystory();
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

addItem(item);
removeItem(itemName, 1);

// Pixel Character
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const sprite = new Image ();
sprite.src = 'Ready for Export.png'; 


const SPRITE_SIZE = 32; 
const SCALE = 2.5;
const ANIMATION_SPEED = 8; 


const player = {
    x: 50,
    y: 150,
    width: SPRITE_SIZE * SCALE,
    height: SPRITE_SIZE * SCALE,
    frameX: 0,
    frameY: 0,      
    gameFrame: 0,
    speed: 5,
    moving: false,
    facing: 1       
};


const keys = {};
window.addEventListener('keydown', e => keys[e.code] = true);
window.addEventListener('keyup', e => keys[e.code] = false);

function handleInput() {
    player.moving = false;

    if (keys['KeyD']) {
        player.x += player.speed;
        player.facing = 1;
        player.moving = true;
        player.frameY = 1; 
    } else if (keys['KeyA']) {
        player.x -= player.speed;
        player.facing = -1;
        player.moving = true;
        player.frameY = 1;
    } else {
        player.frameY = 0; 
    }
    if (keys['KeyRight']) {
        player.x += player.speed;
        player.facing = 1;
        player.moving = true;
        player.frameY = 1;
    } else if (keys['KeyLeft']) {
        player.x -= player.speed;
        player.facing = -1;
        player.moving = true;
        player.frameY = 1;
    } else {
        player.frameY = 0;
    }
    if (keys['KeySpace']) {
        player.y += player.speed;
        player.moving = true;
    } else {
        player.frameX = 0;
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    handleInput();

    const maxFrames = (player.frameY === 0) ? 6 : 7;
    
    if (player.moving || player.frameY === 0) {
        player.frameX = Math.floor(player.gameFrame / ANIMATION_SPEED) % maxFrames;
        player.gameFrame++;
    }


    ctx.save();
    if (player.facing === -1) {
     
        ctx.translate(player.x + player.width, player.y);
        ctx.scale(-1, 1);
        ctx.drawImage(
            sprite,
            player.frameX * SPRITE_SIZE, player.frameY * SPRITE_SIZE,
            SPRITE_SIZE, SPRITE_SIZE,
            0, 0,
            player.width, player.height
        );
    } else {
        ctx.drawImage(
            sprite,
            player.frameX * SPRITE_SIZE, player.frameY * SPRITE_SIZE,
            SPRITE_SIZE, SPRITE_SIZE,
            player.x, player.y,
            player.width, player.height
        );
    }
    ctx.restore();

    requestAnimationFrame(animate);
}

sprite.onload = animate;