import story from "./story.js";

const textBox = document.getElementById('gameCanvas');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalBtn = document.getElementById('modal-btn');
modalBtn.onclick = () => closeModal();

displayModal('Welcome to the Adventure Game! Click "Play" to start your journey.', 'OK', 'warning'); //modal test

const SLOT_COUNT = 9;
const player = {
    health: 100,
    maxHealth: 100,
    inventory: Array(SLOT_COUNT).fill(null),
};

function updateHealthBar() {
    const healthBars = document.querySelectorAll('#health-bar, #health_bar');
    healthBars.forEach(bar => {
        let fill = bar.querySelector('.health-fill');
        if (!fill) {
            fill = document.createElement('div');
            fill.className = 'health-fill';
            bar.appendChild(fill);
        }
        fill.style.width = (player.health / player.maxHealth) * 100 + '%';

        let text = bar.querySelector('.health-text');
        if (!text) {
            text = document.createElement('div');
            text.className = 'health-text';
            bar.appendChild(text);
        }
        text.innerText = player.health + '/' + player.maxHealth;
    });

}

function takeDamage(amount) {
    player.health += amount;
    if (player.health < 0) player.health = 0;
    updateHealthBar();
    console.log(`Player took ${amount} damage, health is now ${player.health}`);
    displayModal(`You took ${Math.abs(amount)} damage!`, 'Continue', 'alert');

    if (player.health <= 0) {
        console.log('Player died!');
        displayModal('You have died! Returning to menu.', 'Return to Menu', 'alert');
        // resetGame();
        showPage('menu');
    }
}

function heal(amount) {
    player.health += amount;
    if (player.health > player.maxHealth) player.health = player.maxHealth;
    updateHealthBar();
    console.log(`Player healed for ${amount}, health is now ${player.health}`);
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
        'menu': 'url("Images/Home-menu_screen.jpg")',
        'ordinary-world': 'url("Images/Home-menu_screen.jpg")'
    };
    document.body.style.backgroundImage = bgImages[pageId] || document.body.style.backgroundImage;

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

//Inventory
let inventoryOpen = false;
let selectedSlot = -1;

function openInventory() {
    inventoryOpen = true;
    document.getElementById('inventory-window').classList.add('open');
    renderInventory();
}

function closeInventory() {
    inventoryOpen = false;
    document.getElementById('inventory-window').classList.remove('open');
    document.getElementById('inventory-tooltip').style.display = 'none';
}

function addItem(item) {
    const existingIdx = player.inventory.findIndex(s => s && s.name === item.name);
    if (existingIdx !== -1) {
        player.inventory[existingIdx].qty += item.qty;
    } else {
        const emptyIdx = player.inventory.findIndex(s => s === null);
        if (emptyIdx === -1) { console.log('Inventory full!'); return; }
        player.inventory[emptyIdx] = { ...item };
    }
    if (inventoryOpen) renderInventory();
}

function removeItem(itemName, qty = 1) {
    const idx = player.inventory.findIndex(s => s && s.name === itemName);
    if (idx === -1) return;
    player.inventory[idx].qty -= qty;
    if (player.inventory[idx].qty <= 0) player.inventory[idx] = null;
    if (inventoryOpen) renderInventory();
}

function renderInventory() {
    const slotEls = document.querySelectorAll('.inventory-slot');
    slotEls.forEach((el, i) => {
        const item = player.inventory[i];
        el.innerHTML = '';
        el.className = 'inventory-slot';

        if (item) {
            el.classList.add('filled');
            const icon = document.createElement('span');
            icon.className = 'slot-icon';
            icon.textContent = item.icon;
            el.appendChild(icon);

            if (item.qty > 1) {
                const qty = document.createElement('span');
                qty.className = 'slot-qty';
                qty.textContent = item.qty;
                el.appendChild(qty);
            }

            el.addEventListener('mouseenter', () => {
                document.getElementById('tooltip-name').textContent = item.name;
                document.getElementById('tooltip-desc').textContent = item.desc;
                document.getElementById('inventory-tooltip').style.display = 'block';
            });
            el.addEventListener('mouseleave', () => {
                document.getElementById('inventory-tooltip').style.display = 'none';
            });
        }

        if (selectedSlot === i) el.classList.add('selected');
        el.onclick = () => { selectedSlot = selectedSlot === i ? -1 : i; renderInventory(); };
    });

}

document.addEventListener('keydown', (e) => {
    if (e.key === 'e' || e.key === 'E') {
        inventoryOpen ? closeInventory() : openInventory();
    }
});

function characterRender() {
    //ToDo: render character sprite on canvas
}

let box = document.getElementById('story-box');
let choice = document.getElementById('choice');
let storyLine = ['intro'];

function resetGame() {
    storyLine = ['intro'];
    player.health = player.maxHealth;
    player.inventory.fill(null);
    updateHealthBar();
    if (inventoryOpen) renderInventory();
}

function choiceBtn(choiceText, decision) {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.innerHTML = choiceText;
    choice.appendChild(btn);

    btn.addEventListener("click", function() {
        if (decision.healthChange) {
            if (decision.healthChange < 0) {
                displayModal(`You took ${Math.abs(decision.healthChange)} damage!`, 'Continue', 'alert');
                takeDamage(decision.healthChange);
            } else if (decision.healthChange > 0) {
                displayModal(`You healed ${decision.healthChange} health!`, 'Continue', );
                heal(decision.healthChange);
            }
            if (player.health <= 0) {
                displayModal('You have died! Returning to menu.', 'Return to Menu', 'alert');
                return;
            }
        }

        // Add inventory items
        if (decision.inventory) {
            const itemData_1 = typeof decision.inventory === 'string'
                ? { name: decision.inventory, icon: '🗡️', desc: `A ${decision.inventory}.`, qty: 1 }
                : { name: decision.inventory.name, icon: decision.inventory.icon || '🗡️', desc: decision.inventory.desc || `A ${decision.inventory.name}.`, qty: decision.inventory.qty || 1 };
            
            addItem(itemData_1);
        } else if (decision.inventory == 'chestplate') {
        const itemData_2 = typeof decision.inventory === 'string'
            ? { name: decision.inventory, icon: '🎽', desc: `A ${decision.inventory}.`, qty: 1} :
            { name: decision.inventory.name, icon: decision.inventory.icon || '🎽', desc: decision.inventory.desc || `A ${decision.inventory.name}.`, qty: decision.inventory.qty || 1 };
   
   addItem(itemData_2);
        }

        // Check special button actions
        const normalized = choiceText.toLowerCase();
        if (normalized.includes('return to menu')) {
            resetGame();
            showPage('menu');
            return;
        }
        if (normalized.includes('exit')) { // this does not actually close the window, security seetings prevent that, but it will stop the game from progressing.
            window.close();
            return;
        }

        // Advance to next scene
        if (decision.next) {
            storyLine.push(decision.next);
            displaystory();
            return;
        }
    });

}

function createStory(text) {
    const item = document.createElement("p");
    item.textContent = Array.isArray(text) ? text.join(' ') : text;
    box.appendChild(item);
}



export function displaystory() {
    const currentText = storyLine[storyLine.length - 1];
    const currentScene = story[currentText];


   

    if (!currentScene) return;

    box.innerHTML = "";
    choice.innerHTML = "";

    const textParts = Array.isArray(currentScene.text) ? currentScene.text : [currentScene.text];
    textParts.forEach(part => createStory(part));

    const storyPage = document.getElementById('ordinary-world');
    if (currentScene.background && storyPage && storyPage.style.display !== 'none') {
        document.body.style.backgroundImage = `url("${currentScene.background}")`;
    }

    currentScene.choices.forEach(decision => choiceBtn(decision.text, decision));
    updateHealthBar();
    if (inventoryOpen) renderInventory();
    // setTimeout(() => {
    //     const storyBox = document.getElementById('#story-box');
    //     if(storyBox){storyBox.forEach((box, index) => {
    //         const text = box.textContent.trim();
    //         setTimeout(() => typeText(box, text, 50), index * 1000);
    //     })}; 
    // }, 500);

}

document.getElementById('inventory-close').onclick = () => closeInventory();
document.getElementById('inventory-toggle').onclick = (e) => {
    console.log('Inventory toggle clicked'); //testing
    inventoryOpen ? closeInventory() : openInventory();
};
if(document.getElementById('playBtn')) {
    document.getElementById('playBtn').onclick = () => {
        showPage('ordinary-world');
        document.getElementById('hud').style.display = 'flex';
    };
}

function displayModal(text, btnText = 'Close', type = 'info') {
    modalBtn.textContent = btnText;
    modalText.textContent = text;
    modal.classList.add('active', type);

}

function closeModal() {
    modal.classList = '';
}

