'use strict'

var gImgs = [{ id: 0, url: 'assets/4.png', keywords: ['toy', 'story'], isFiltered: true },
{ id: 1, url: 'assets/6.png', keywords: ['happy'], isFiltered: true },
{ id: 2, url: 'assets/3.jpg', keywords: ['trump', 'happy'], isFiltered: true },
{ id: 3, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true }];

var gState = { selectedImgId: 5, screen: {}, img:{}, canvas:{}, txts: [] };//UPDATED  


function initSite() {
    hideElementById('image-editor');

}


function imageClicked(indx) {
    console.log('clicked ' + indx);
    console.log(gImgs[indx - 1]);
    // return gImgs[indx-1];
    editImage(gImgs[indx - 1]);
}



function searchImage() {
    var elInput = document.querySelector('input');
    var searchStr = elInput.value;

    console.log('searching for: ' + searchStr);
}

// function onChangeInputSearch () {

// }




/////////////////////////////////////////////////////////////////////////////////////////

// for Assaf to implement
function editImage(selImg) {
    initEditor(selImg);
}


// var canvas = document.getElementById("image-canvas");
// var ctx = canvas.getContext('2d');
// var deviceWidth = 600; // fix to VARIABLE
// var canvasWidth = deviceWidth - 40;
// var img;
// var aspectRatio;
// var canvasHeight;
// var imgx = 0;
// var imgy = 0;
//var el = {};
//var textLine = [];

function setScreenDetails(){
gState.screen.width     = 600;// shall be REAL screen width 
}

function setCanvasDetalis(){
gState.canvas.el        = document.getElementById("image-canvas");
gState.canvas.ctx       = gState.canvas.el.getContext('2d');
gState.canvas.width     = gState.screen.width - 20;    
gState.canvas.height    = Math.floor(gState.canvas.width * gState.img.aspectRatio);
gState.canvas.el.width  = gState.canvas.width;    
gState.canvas.el.height = gState.canvas.height;

}

function setImgDetails(selImg){
gState.img.el           = document.getElementById("hidden-image");
gState.img.src          = selImg.url;
gState.img.el.src          = selImg.url;
console.log('sel image',selImg.url,gState.img.src)
var el= document.getElementById("hidden-image");
console.log('sel image src',gState.img.src); 
gState.img.aspectRatio  = gState.img.el.height / gState.img.el.width;
gState.img.width        = gState.img.el.width;
gState.img.height       = gState.img.el.height;
gState.img.imgX         = 0;
gState.img.imgY         = 0;   
}

function textLineDefault() {
    var text = {
        text: '',
        fontSize: 30,
        fontType: 'Impact, Charcoal, sans-serif',
        color: 'white',
        textAlign: 'center',
        fillStyle: 'white',
        strokeStyle: 'black',
        lineWidth: 2,
        textX: null,
        textY: null
    };
    return text;
}

function createHtmlLineControls() {
    var elLine = document.getElementById('inputs-zone');
    var strHtml = '';
    for (var idx = 0; idx < gState.txts.length; idx++) {
        strHtml +=
            `<div id="inputs-unit-${idx}" class="inputs-unit fa-lg">
            <input id="line-${idx}" placeholder="TYPE HERE" oninput="inputWrite(${idx},this)"></input>
            <div id="text-props-${idx}" class="text-props">
                <button id="delete-row"         class="text-props-button fa fa-trash"       onclick="handleText(${idx},this)"></button>
                <button id="text-color"         class="text-props-button fa fa-tint"        onclick="handleText(${idx},this)"></button>
                <!--<button id="text-shadow-on" class="text-props-button FAPLACE"           onclick="handleText(${idx},this)">SHON</button>
                <button id="text-shadow-off"    class="text-props-button FAPLACE"           onclick="handleText(${idx},this)">SHOFF</button>-->
                <button id="select-font"        class="text-props-button fa fa-font"        onclick="handleText(${idx},this)"></button>
                <button id="text-size-decrease" class="text-props-button fa fa-minus"       onclick="handleText(${idx},this)"></button>
                <button id="text-size-increase" class="text-props-button fa fa-plus"        onclick="handleText(${idx},this)"></button>
                <button id="align-left"         class="text-props-button fa fa-align-left"  onclick="handleText(${idx},this)"></button>
                <button id="align-center"       class="text-props-button fa fa-align-center"onclick="handleText(${idx},this)"></button>
                <button id="align-right"        class="text-props-button fa fa-align-right" onclick="handleText(${idx},this)"></button> 
            </div>
        </div>`
    }
    elLine.innerHTML = strHtml;
}

function    drawImageOnCanvas(){
    var canvasWidth     = gState.canvas.width;
    var canvasHeight    = gState.canvas.height;
    var elImg           = gState.img.el;
    var imgX            = gState.img.imgX;
    var imgY            = gState.img.imgY;
    var ctx             = gState.canvas.ctx;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(elImg, imgX, imgY, canvasWidth, canvasHeight);
    console.log(canvasWidth,canvasHeight,elImg,ctx)
}


function initEditor(selImg) { //load start
    showElementById('image-editor');
    var elLine = document.getElementById('inputs-zone');
    elLine.innerHTML = '';
gState.txts=[];
    console.log('GSTATE', gState);
    gState.txts.push(textLineDefault());
    gState.txts.push(textLineDefault());  
    setScreenDetails(); // move to to of file
         console.log('SCREEN', gState.screen);

    setImgDetails(selImg);
     console.log('IMAGE', gState.img);
     console.log('IMAGE in HTML', document.getElementById("hidden-image"));
   setCanvasDetalis();
     console.log('CANVAS', gState.canvas);
     console.log('CANVAS IN HTML', document.getElementById("image-canvas"));

    // img = document.getElementById("hidden-image");
    // img.src = selImg.url;
    // aspectRatio = img.height / img.width;
    // canvasHeight = Math.floor(canvasWidth * aspectRatio);
  
    // canvas.width = canvasWidth;
    // canvas.height = canvasHeight;


    gState.txts[0].textX = gState.canvas.width / 2;
    gState.txts[0].textY = 50;
    gState.txts[1].textX = gState.canvas.width / 2;
    gState.txts[1].textY = gState.canvas.height - 20;
    
    // gState.txts[0].textX = canvasWidth / 2;
    // gState.txts[0].textY = 50;
    // gState.txts[1].textX = canvasWidth / 2;
    // gState.txts[1].textY = canvasHeight - 20;


    drawImageOnCanvas();
    createHtmlLineControls();

}

function findFontSize(ctx, text) { //adjust font size to line - might not use
    var f = gFontSize; // Font size (in pt)
    for (; f >= 0; f -= 1) {
        ctx.font = "bold " + f + "pt " + gFontType;
        if (ctx.measureText(text).width < canvasWidth - 10) {
            return f;
        }
    }
};

function inputWrite(lineIdx, elText) {
    gState.txts[lineIdx].text = elText.value;
    renderCanvas();
}

function renderCanvas() {
    var ctx = gState.canvas.ctx;
    drawImageOnCanvas();
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.drawImage(img, imgX, imgY, canvas.width, canvas.height);

    for (var i = 0; i < gState.txts.length; i++) {
        var t = gState.txts[i];
       // t.text = gState.txts[i].text;
        // ctx.font = "bold " + t.fontSize + "pt " + t.fontType;
        // ctx.textAlign = t.textAlign;
        // ctx.fillStyle = t.fillStyle;
        // ctx.strokeStyle = t.strokeStyle;
        // ctx.lineWidth = t.lineWidth;

        // ctx.fillText(t.text, t.textX, t.textY);
        // ctx.strokeText(t.text, t.textX, t.textY);
        ctx.font = "bold " + t.fontSize + "pt " + t.fontType;
        ctx.textAlign = t.textAlign;
        ctx.fillStyle = t.fillStyle;
        ctx.strokeStyle = t.strokeStyle;
        ctx.lineWidth = t.lineWidth;

        ctx.fillText(t.text, t.textX, t.textY);
        ctx.strokeText(t.text, t.textX, t.textY);

        var dataURL = gState.canvas.el.toDataURL('image/jpeg');
        document.getElementById('save-link').href = dataURL;
    }
}

function handleText(lineIdx, elButton) {
    console.log('switch case elbutton', elButton.id, elButton);
    switch (elButton.id) {
        case 'text-size-increase':
            console.log('text-size-increase');
            gState.txts[lineIdx].fontSize++;
            break;
        case 'text-size-decrease':
            console.log('text-size-decrease');
            gState.txts[lineIdx].fontSize--;
            break;
        case 'align-right':
            console.log('align-right');
            gState.txts[lineIdx].textAlign = 'right';
            gState.txts[lineIdx].textX = gState.canvas.width - 10;
            break;
        case 'align-center':
            console.log('align-center');
            gState.txts[lineIdx].textAlign = 'center';
            gState.txts[lineIdx].textX = gState.canvas.width / 2;
            break;
        case 'align-left':
            console.log('align-left');
            gState.txts[lineIdx].textAlign = 'left';
            gState.txts[lineIdx].textX = 10;
            break;

    }
    renderCanvas();

}

///////////////////////// UTILS ////////////////

function hideElementById(elementId) {
    console.log('hide ele by ID:', elementId);
    var el = document.getElementById(elementId);
    el.classList.remove('hide-element');
    el.classList.remove('show-element');
    el.classList.add('hide-element');
}
function showElementById(elementId) {
    console.log('show ele by ID:', elementId);
    var el = document.getElementById(elementId);
    el.classList.remove('show-element');
    el.classList.remove('hide-element');
    el.classList.add('show-element');
}
