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
    const p = document.createElement('p');
    const div = document.getElementById('gridsize');
    p.textContent = `${Math.sqrt(pixelsNum)} x ${Math.sqrt(pixelsNum)}`;
    div.appendChild(p);
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
    var random = document.querySelector('#random-button');
        random.addEventListener('click', buttonclick); 
    var darker = document.querySelector('#darker-button');
        darker.addEventListener('click', buttonclick);    
    var black = document.querySelector('#black-button');
        black.addEventListener('click', buttonclick); 
    
}

function calcPixSize(pixelsNum) {
    const pixeldimen = Math.sqrt(fieldSize/pixelsNum) - 2;
    var pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.width = `${pixeldimen}px`;
        pixel.style.height = `${pixeldimen}px`;
    });
}
function buttonclick(e) {
    addborder(this);
}

function addborder(button) { 
    var random = document.getElementById('random-button');
    var darker = document.getElementById('darker-button');
    var black = document.getElementById('black-button');
    while(darker.classList.contains("clicked") || black.classList.contains("clicked") || random.classList.contains("clicked")) {
        darker.classList.remove("clicked");
        random.classList.remove("clicked");
        black.classList.remove("clicked");
    }
    button.classList.add("clicked");
}
function slider(e) {
    remove();
    generateGrid(Math.pow(e.target.value, 2));
}

function hover(e) {
    if(document.getElementById('random-color').checked) {
        const randomColor = Math.random().toString(16).substring(2,8);
        this.style.backgroundColor = "#" + randomColor;
    }
    else if(document.getElementById('darker-color').checked) {
        if(this.style.backgroundColor != "") {
            var color = rgbconvert(this.style.backgroundColor);
            this.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        } else {
            const randomColor = Math.random().toString(16).substring(2,8);
            this.style.backgroundColor = "#" + randomColor;
        }
    } else {
        this.style.backgroundColor = "black";
    }
}
function rgbconvert(rgb) {
    var regex = /\d+/g;
    var newArr = rgb.match(regex).map(value => parseInt(value) - (.1*255));
    return newArr;
}
function clear(e) {
    var pixels = document.querySelectorAll('.pixel');
    pixels.forEach(pixel => {
        pixel.style.backgroundColor = "";
    });
}
function remove() {
    const container = document.querySelector('.field');
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const div = document.getElementById('gridsize');
    if(div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function newgrid(e) {
    do {
       var gridsize = prompt("Enter new grid size (Max: 50)");
    }
    while(gridsize > 50 || gridsize < 0) 
    var bar = document.getElementById('range')
    bar.value = gridsize;
    remove();
    generateGrid(Math.pow(gridsize, 2));
}
generateGrid(16);




