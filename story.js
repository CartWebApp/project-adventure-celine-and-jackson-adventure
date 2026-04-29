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

        text: ["You take a stroll through the Hush Forest...","You notice a cave that shouldn't be there as you've hiked through that forest since you were a kid."],
        
        choices: [
            {text: "Enter Cave", next: "cave"}
        ],
        background: "ordinary_world.jpg"
    },

    cave: {

        text: "You enter the cave, and as you walk further, you find an old chest.",
        choices: [
            { text: "open", next: "open" }
        ],
        background: "cave.png"
    },

    open: {
        text: ["As you traverse further into the cave, you encounter a mysterious stone","Touch the stone?"],

        choices: [
            { text: "Yes", next: "touch" },
            { text: "No", next: "leave" }
        ],
        background: "cave.png"      
    },

    touch: {

        text: ["You touch the stone. Suddenly, you are hit with a bright flash of light.","As the light begins to fade, and you regain your vision, nothing seemed to change. You exit the cave...","'Where am I?'","'This isn't the forest.'","You head back into the cave and grab the stone and try to use it again in hopes that it would bring you back.","Nothing happens, but then a voice resonates from the stone.","'All charges used, catalyst empty, now self destructing in 10 seconds.'","Boulder or Tree?"], 
        choices: [
            { text: "Boulder", next: "Boulder" },
            { text: "Tree", next: "Tree" }
        ],
        background: "forest_landscape_2.jpg"
    },

    Boulder: {

        text: ["You choose to hide behind the boulder...","The stone explodes, but the boulder provides protection, so you survive unscathed.","As you look to where the stone once was, you see something shine on the ground, a sword.","Pick up the Sword?"],
        choices: [
            { text: "Yes", next: "Pickup" },
            { text: "No", next: "Emptyhanded"}
        ],
        background: "forest_landscape_2.jpg"        
    },

   
    Pickup: {

        text: "You pick up the sword and head off in search of a way out of this strange world.", 
        choices: [
            { text: "set out on journey", next: "setout"}
        ],
        background: "forest_landscape_2.jpg"
    },
    setout: {
        text: "After a while, you spot a large cave in the distance.",
        choices: [
            { text: "go to the cave", next: "cave_2" }
        ],
        background: "forest_landscape.jpg"
    }, 
    cave_2: {
        text: ["You make it to the cave.","After some time, you find a chest similar to the one you saw where you found the chestplate."],
        choices: [
            { text: "open chest", next: "GoodEnding"}
        ],
        background: "cave_2.png"
    },

    GoodEnding: {

        text: ["You've defeated the dragon and returned home.","Thank you for playing!"],
        choices: [
            { text: "Return to Menu" },
            { text: "exit" }
        ]
    },

    Tree: {

            text: ["You choose to climb up the tree.","Instead of protecting you, the explosion from the stone sets the tree on fire, taking you with it."],
            choices: [
                { text: "Return to Menu" },
                { text: "exit" }
            ]
        },

    SecretEnding: {

        text: ["As you go through the Mighty Caverns, fending off monsters, you find a door tucked away in a corner.","You enter and find a purple portal.","'What is that? Wait...'","'Could it be? A way out!?'"],
        choices: [
            { text: "Return to Menu" },
            { text: "exit" }
        ]
    }
}

let box = document.getElementById('story-box');
let choice = document.getElementsByClassName('choices');
let storyLine = ["intro"];

function choiceBtn (choiceText, choose) {
    let btn = document.createElement("button");

    btn.className = "btn";

    btn.innerHTML = choiceText;

    btn.addEventListener("click", function() {
        storyLine.push(choose);
        displaystory();
    });

    choice.appendChild(btn);


}

function createStory(text) {
    let Item = document.createElement("p");

    for(let part of text) {
    Item.innerText += part;
}
    box.appendChild(Item);
}

function displaystory() {
    let currentText = storyLine[storyLine.length - 1];
    console.log(currentText,story[currentText]);

    
    
    box.innerHTML = "";
    choice.innerHTML = "";

    
        createStory(story[currentText].text);
    

    for(let decision of story[currentText].choices) {
        choiceBtn(decision[0], decision[1]);
    }

}

displaystory();

