

const story = {
    intro: {

        text: ["You take a stroll through the Hush Forest...","You notice a cave that shouldn't be there as you've hiked through that forest since you were a kid."],
        
        choices: [
            {text: "Enter Cave", next: "cave"}
        ],
        background: "Images/ordinary_world.jpg"
    },

    cave: {

        text: "You enter the cave, and as you walk further, you find an old chest.",
        choices: [
            { text: "open", next: "open" }
        ],
        background: "Images/cave.png"
    },

    open: {
        text: "You found a chestplate! Seems to be in good condition... How did it end up in a cave?",
        choices: [
            { text: "equip", next: "take", inventory: {icon: '🎽', desc: 'A Chestplate'}}
        ]
    },

    take: {
        text: ["As you traverse further into the cave, you encounter a mysterious stone...","Touch the stone?"],

        choices: [
            { text: "Yes", next: "touch" },
            { text: "No", next: "leave" }
        ],
        background: "Images/cave.png"      
    },

    touch: {

        text: ["You touch the stone. Suddenly, you are hit with a bright flash of light.","As the light begins to fade, and you regain your vision, nothing seemed to change. You exit the cave...","'Where am I?'","'This isn't the forest.'","You head back into the cave and grab the stone and try to use it again in hopes that it would bring you back.","Nothing happens, but then a voice resonates from the stone.","'All charges used, catalyst empty, now self destructing in 10 seconds.'","Boulder or Tree?"], 
        choices: [
            { text: "Boulder", next: "Boulder", images: "Images/explosion.gif"},
            { text: "Tree", next: "Tree", healthChange: [-100, -100], images: "Images/explosion.gif"}
        ],
        background: "Images/forest_landscape_2.jpg"
    },

    Boulder: {

        text: ["You choose to hide behind the boulder...","The stone explodes, but the boulder provides protection, so you survive unscathed.","As you look to where the stone once was, you see something shine on the ground, a sword.","Pick up the Sword?"],
        choices: [
            { text: "Yes", next: "Pickup", inventory: "Sword" },
            { text: "No", next: "Emptyhanded" }
        ],
        background: "Images/forest_landscape_2.jpg"        
    },

   
    Pickup: {

        text: "You pick up the sword and head off in search of a way out of this strange world.", 
        choices: [
            { text: "set out on journey", next: "setout_1"}
        ],
        background: "Images/forest_landscape_2.jpg"
    },
    Emptyhanded: {

        text: "You leave the sword behind and head off in search of a way out of this strange world.", 
        choices: [
            { text: "set out on journey", next: "setout_2"}
        ],
        background: "Images/forest_landscape_2.jpg"
    },
    setout_1: {
        text: "After a while, you spot a large cave in the distance, but monsters are guarding it.",
        choices: [
            { text: "go to the cave", next: "cave_2a", healthChange: [0, -99] }
        ],
        background: "Images/forest_landscape.jpg"
    }, 
    cave_2a: {
        text: ["You make it to the cave.","After some time, you find a chest similar to the one you saw where you found the chestplate."],
        choices: [
            { text: "open chest", next: "open_2a", healthChange: [100, 100] }
        ],
        background: "Images/cave_2.png",
    },

    open_2a: {

        text: "You found a health potion! Your health has been fully restored!",
        choices: [
            { text: "continue", next: "GoodEnding",healthChange: [0 , -50]},
            { text: "door", next: "SecretEnding" }
        ],
        
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

    setout_2: {

        text: "After a while, you spot a large cave in the distance, but it is guarded by monsters.",
        choices: [
            { text: "go to the cave", next: "cave_2b", healthChange: [-1, -99] }
        ],
        background: "Images/forest_landscape.jpg"
    },

    cave_2b: {

        text: ["Miraculously, you make it to the cave.","After some time, you find a chest similar to the one you saw where you found the chestplate."],
        choices: [
            { text: "open chest", next: "open_2b"}
        ],
        background: "Images/cave_2.png"
    },

    open_2b: {

        text: "You found a health potion! Your health has been fully restored!",
        choices: [
            { text: "continue", next: "BadEnding", healthChange: 100 },
            { text: "door", next: "SecretEnding" }
        ],
    },

    BadEnding: {
        text: ["After you avoid the monsters, you reach a large room.","On the ground, you find a familiar looking stone.","You rush towards the stone, but a dragon appears.","You try to fight off the monster, but because you don't have anything to defend yourself with, you get eaten."],
        choices: [
            { text: "Return to Menu", healthChange: -100 },
            { text: "exit"}
        ]
    },

    SecretEnding: {

        text: ["As you go through the Mighty Caverns, fending off monsters, you find a door tucked away in a corner.","You enter and find a purple portal.","'What is that? Wait...'","'Could it be? A way out!?'"],
        choices: [
            { text: "Return to Menu" },
            { text: "exit" }
        ],
        background: "Images/Cave_3.png"
    },

    leave: {
        text: ["Thinking it is just a regular rock with light bouncing off it, you leave the rock alone...","And you continue your forest stroll."],
        choices: [
            { text: "Continue stroll", next: "continue"}
        ]
    },

    continue: {
        text: "As you walk through the forest, a sinkhole appears and you fall in...",
        choices: [
            {text: "fall", next: "fall"}
        ],
        background: "Images/ordinary_world.jpg"
    },
    fall: {
        text: ["You hit the ground and somehow survive.","You look around and you spot a strange portal."],
        choices: [
            {text: "Go through", next: "go"}
        ],
        background: "Images/Home-menu_screen.jpg"
    },
    go: {
        text: ["You step through the portal and find yourself in a strange, vibrant world...","The air feels different, and the sky is painted with colors you've never seen before."],
        choices: [
            {text: "explore", next: "explore"}
        ],
        background: "Images/forest_landscape_2.jpg"
    },
    explore: {
        text: "You set out to explore this strange world.",
        choices: [
            {text: "setout", next: "setout_2"}
        ],
    }
}

export default story;