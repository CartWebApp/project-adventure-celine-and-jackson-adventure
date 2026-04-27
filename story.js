// const story = {
//     intro: {
//         text: "You wake up in a dark room. You can't remember how you got here. You see a door to your left and a window to your right.",
//         choices: [
//             { text: "Go through the door", next: "door" },
//             { text: "Look out the window", next: "window" }
//         ],
//         background: "dark_room.jpg"   
//     }
// }

const story = {
    intro: {

        text: "You take a stroll through the Hush Forest...",
        text: "You notice a cave that shouldn't be there as you've hiked through that forest since you were a kid.",
        background: "ordinary_world.jpg"
    },

    cave: {

        text: "You enter the cave, and as you walk further, you find an old chest.",

        text: "As you traverse further into the cave, you encounter a mysterious stone",
        text: "Touch the stone?",
        choices: [
            { text: "Yes", next: "touch" },
            { text: "No", next: "leave" }
        ],
        background: "cave.png"       
    },

    touch: {

        text: "You touch the stone. Suddenly, you are hit with a bright flash of light.",
        text: "As the light begins to fade, and you regain your vision, nothing seemed to change. You exit the cave...",
        text: "'Where am I?'",
        text: "'This isn't the forest.'",
        text: "You head back into the cave and grab the stone and try to use it again in hopes that it would bring you back.",
        text: "Nothing happens, but then a voice resonates from the stone.",
        text: "'All charges used, catalyst empty, now self destructing in 10 seconds.'",
        text: "Boulder or Tree?",
        choices: [
            { text: "Boulder", next: "Boulder" },
            { text: "Tree", next: "Tree" }
        ],
        background: "forest_landscape_2.jpg"
    },

    Boulder: {

        text: "You choose to hide behind the boulder...",
        text: "The stone explodes, but the boulder provides protection, so you survive unscathed.",
        text: "As you look to where the stone once was, you see something shine on the ground, a sword.",
        text: "Pick up the Sword?",
        choices: [
            { text: "Yes", next: "Pickup" },
            { text: "No", next: "Emptyhanded"}
        ],
        background: "forest_landscape_2.jpg"
    },

   
    Pickup: {

        text: "You pick up the sword and head off in search of a way out of this strange world.",
        text: "After a while, you spot a large cave in the distance.",


        text: "You make it to the cave.",
        text: "After some time, you find a chest similar to the one you saw where you found the chestplate.",
    },

    GoodEnding: {

        text: "You've defeated the dragon and returned home.",
        text: "Thank you for playing!",
    },

    Tree: {

            text: "You choose to climb up the tree.",
            text: "Instead of protecting you, the explosion from the stone sets the tree on fire, taking you with it.",
        },

    SecretEnding: {

        text: "As you go through the Mighty Caverns, fending off monsters, you find a door tucked away in a corner.",
        text: "You enter and find a purple portal.",
        text: "'What is that? Wait...'",
        text: "'Could it be? A way out!?'",
        choices: []
    }
}

let box = document.getElementById('story-box');
let choice = document.getElementById('choice');
let storyLine = ["intro"];

function choiceBtn (choiceText, choose) {
    let btn = document .createElement("btn");

    btn.innerHTML = choiceText;
    choice.appendChild(btn);

    btn.addEventListener("click", function() {
        storyLine.push(choose);
        displaystory();
    });
}

function createStory(text) {
    let Item = document.createElement("p");

    Item.innerText = text;

    box.appendChild(Item);
}

function displaystory() {
    let currentText = storyLine[storyLine.length - 1];
    
    box.innerHTML = "";
    choice.innerHTML = "";

    for(let part of storyLine) {
        createStory(story[part].text);
    }

    for(let decision of story[currentText].choices) {
        choiceBtn(decision[0], decision[1]);
    }
}

displaystory();
