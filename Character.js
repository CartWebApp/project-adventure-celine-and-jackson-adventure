
const textBox = document.getElementById('gameCanvas');
const modal = document.getElementById('modal');
const modalText = document.getElementById('modal-text');
const modalBtn = document.getElementById('modal-btn');

export function characterRender() {
    //ToDo: render character sprite on canvas
    let ctx = textBox.getContext('2d');
    let picture = new Image();
    picture.src = "Images/character.png";
    picture.onload = function() {
        ctx.drawImage(picture, 100, 100, 200, 200 );
    }
    
}
characterRender();