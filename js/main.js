'use strict'

var gImgs = [{ id: 0, url: 'assets/4.png', keywords: ['toy', 'story'], isFiltered: true },
{ id: 1, url: 'assets/6.png', keywords: ['happy'], isFiltered: true },
{ id: 2, url: 'assets/3.jpg', keywords: ['trump', 'happy'], isFiltered: true },
{ id: 3, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true }];
var gState = { selectedImgId: 5, txts: [{ text: 'I never eat Falafel', size: 4, align: 'left', color: 'red' }] };

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
    console.log('image selected', selImg);
    initEditor(selImg);
}


var canvas = document.getElementById("image-canvas");
var ctx = canvas.getContext('2d');
var deviceWidth = 600; // fix to VARIABLE
var canvasWidth = deviceWidth - 40;
var img;
var aspectRatio;
var canvasHeight;
var imgx = 0;
var imgy = 0;
var el = {};
var gFontSize = 30;
var gFontType = "Impact, Charcoal, sans-serif";

function initEditor(selImg) { //load start

    img = document.getElementById("hidden-image");

    img.src = selImg.url;

    aspectRatio = img.height / img.width;
    canvasHeight = Math.floor(canvasWidth * aspectRatio);
    el.topline = document.getElementById("topline");
    el.bottomline = document.getElementById("bottomline");


    canvas.width = canvasWidth;
    canvas.height = canvasHeight;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, imgx, imgy, canvas.width, canvas.height);




}

function writeText(text, x, y) {
    var f = gFontSize; // Font size (in pt)
    for (; f >= 0; f -= 1) {
        ctx.font = "bold " + f + "pt " + gFontType;
        if (ctx.measureText(text).width < canvasWidth - 10) {
            ctx.fillText(text, x, y);
            ctx.strokeText(text, x, y);
            break;
        }
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, imgx, imgy, canvas.width, canvas.height);

    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    writeText(el.topline.value, canvasWidth / 2, 50);
    writeText(el.bottomline.value, canvasWidth / 2, canvasHeight - 20);

};

function inputWrite(text) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, imgx, imgy, canvas.width, canvas.height);
    console.log(text.value);
    ctx.font = "bold " + gFontSize + "pt " + gFontType;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.fillText(el.topline.value, canvasWidth / 2, 50);
    ctx.fillText(el.bottomline.value, canvasWidth / 2, canvasHeight - 20);

    ctx.strokeText(el.topline.value, canvasWidth / 2, 50);
    ctx.strokeText(el.bottomline.value, canvasWidth / 2, canvasHeight - 20);

}

