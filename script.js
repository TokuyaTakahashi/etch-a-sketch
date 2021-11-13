const fieldSize = 560 * 560;
function generateGrid(pixelsNum) {
    const container = document.querySelector('.field');
    for(var i = 0; i < pixelsNum; i++) {
        const div = document.createElement('div');
        div.classList.add('pixel');
        container.appendChild(div);
    }
    calcPixSize(pixelsNum);
    eventListeners();
}

function eventListeners () {
    var pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => pixel.addEventListener('mouseover', hover));
    var clearbutton = document.querySelector('#clear');
        clearbutton.addEventListener('click',clear);
    var newgridbutton = document.querySelector('#new-grid');
        newgridbutton.addEventListener('click', newgrid);
    var bar = document.getElementById('range');
        bar.oninput = slider;
    var random = document.querySelector('#random-color');
        random.addEventListener('click', randomColor);    
}

function calcPixSize(pixelsNum) {
    const pixeldimen = Math.sqrt(fieldSize/pixelsNum) - 2;
    var pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.width = `${pixeldimen}px`;
        pixel.style.height = `${pixeldimen}px`;
    });
}

function slider(e) {
    const container = document.querySelector('.field');
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    generateGrid(Math.pow(e.target.value, 2));
}
function randomColor(e) {
    var pixels = document.querySelectorAll('randomColor');
}
function hover(e) {
    if(document.getElementById('random-color').checked) {
        const randomColor = Math.floor(Math.random()*16777215).toString(16);
        this.style.backgroundColor = "#" + randomColor;
    } else {
        this.style.backgroundColor = "black";
    }
}

function clear(e) {
    var pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = "";
    });
}

function newgrid(e) {
    var gridsize = prompt("Enter new grid size");
    const container = document.querySelector('.field');
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    generateGrid(Math.pow(gridsize, 2));
}
generateGrid(16*16);




