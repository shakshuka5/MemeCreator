'use strict'

var LS_MEME_USER = 'ourMemeUserContact';

var gImgs = [{ id: 0, url: 'assets/1.jpg', keywords: ['pink', 'hamudi'], isFiltered: true },
{ id: 1, url: 'assets/2.jpg', keywords: ['hamudi', 'happy', 'hamudi'], isFiltered: true },
{ id: 2, url: 'assets/3.jpg', keywords: ['hamudi', 'trump', 'happy', 'smugged', 'hamu'], isFiltered: true },
{ id: 3, url: 'assets/4.jpg', keywords: ['hamudi', 'toy', 'story'], isFiltered: true },
{ id: 4, url: 'assets/5.jpg', keywords: ['hamudi', 'alert'], isFiltered: true },
{ id: 5, url: 'assets/6.jpg', keywords: ['hamudi', 'happy'], isFiltered: true },
{ id: 6, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
{ id: 7, url: 'assets/8.jpg', keywords: ['hamudi', 'serious', 'puki', 'man'], isFiltered: true },
{ id: 8, url: 'assets/9.jpg', keywords: ['hamudi', 'silly', 'girl'], isFiltered: true },
{ id: 9, url: 'assets/10.jpg', keywords: ['hamudi', 'man', 'yeh Baby!!'], isFiltered: true },
{ id: 10, url: 'assets/11.jpg', keywords: ['hamudi', 'man', 'serious'], isFiltered: true },
{ id: 11, url: 'assets/12.jpg', keywords: ['hamudi', 'man', 'serious', 'on the Phone...'], isFiltered: true },
{ id: 12, url: 'assets/13.jpg', keywords: ['hamudi', 'man'], isFiltered: true },
{ id: 13, url: 'assets/14.jpg', keywords: ['hamudi', 'man', 'serious'], isFiltered: true },
{ id: 14, url: 'assets/15.jpg', keywords: ['hamudi', 'man'], isFiltered: true },
{ id: 15, url: 'assets/16.jpg', keywords: ['hamudi', 'man'], isFiltered: true }];

///// Global vars /////////////////////////////////////////////// 

var gMapKeys = {};
var gState = { selectedImgId: -1, screen: {}, img: {}, canvas: {}, txts: [] };//UPDATED  var gCardsDisp;

///// EDITOR SETTINGS  /////////////////////////////////////////
var MEME_FONT_TYPE  = 'Impact, Charcoal, sans-serif';
var MEME_FONT_SIZE  = 0.08; // as part of the canvas height
var MEME_PADDING    = 0.03; // as part of the canvas height 
/////////////////////////////////////////////////////////////////


function initPage() {
    hideElementById('image-editor');//hide the EDITOR

    createMapKeys();
    renderImageGallery();
    document.querySelector('.search-section').addEventListener('input', function (e) {
        search4ImgsByKey();
    }, false);
}

function createMapKeys() {
    for (var i = 0; i < gImgs.length; i++) {
        for (var j = 0; j < gImgs[i].keywords.length; j++) {
            if (gMapKeys[gImgs[i].keywords[j]]) gMapKeys[gImgs[i].keywords[j]]++;
            else gMapKeys[gImgs[i].keywords[j]] = 1;
        }
    }
}

function imageClicked(idx) {
    gState.selectedImgId = gImgs[idx].id;
    editImage(gImgs[idx]);
}

function renderImageGallery() {
    var strHTML = '';
    gImgs.forEach(function (img, index) {
        if (img.isFiltered) {
            strHTML += `<img class="gallery-img" src="${img.url}" onclick="imageClicked(${index})">`;
        }
    }, this);
    var elImgContainer = document.querySelector('.images-container');
    elImgContainer.innerHTML = strHTML;
}

function search4ImgsByKey() {
    var elInput = document.querySelector('.search-box');
    var searchStr = elInput.value;

    searchUpdtImage(searchStr);
    renderImageGallery();
}

function setKeywordSearch(displayed) {
    var elInput = document.querySelector('.keywords-box');
    var elSearchBox = document.querySelector('.search-box');
    elSearchBox.value = '';

    var strHTML = elInput.innerHTML;
    if (displayed) {
        strHTML = `<button class="touch-btn" onclick="setKeywordSearch(0)">Select word...</button>`;
    } else {
        var searchedWord = '';
        strHTML = `<button class="touch-btn" onclick="setKeywordSearch(1)">Close...</button>`;
        strHTML += `<button class="touch-btn" onclick="clearSearch()">Clear</button>`;
        for (var pref in gMapKeys) {
            searchedWord += (pref + ' ');
            var wordFontSize = setFontSize(pref);
            strHTML += `<span class="key-word" onclick="searchKeywordList('${pref}')" style="font-size:${wordFontSize}">${pref}</span>`;
        }
    }
    elInput.innerHTML = strHTML;
}

function clearSearch() {
    setDisp2AllImages();
    renderImageGallery();
}

function setDisp2AllImages() {
    gImgs.forEach(function (img) {
        img.isFiltered = true;
    }, this);
}

function setDisp2None() {
    gImgs.forEach(function (img) {
        img.isFiltered = false;
    }, this);
}

function setFontSize(searchStr) {
    var percent = getWordPercentage(searchStr);
    var fontSize = '20px';

    if (percent > 40) {
        fontSize = '60px';
    } else if (percent < 80 && percent > 10) {
        fontSize = '40px';
    }
    return fontSize;
}

function getWordPercentage(word) {
    var pecent;
    var totalWordsCount = 0;

    for (var pref in gMapKeys) {
        totalWordsCount += gMapKeys[pref];
    }

    pecent = 100 * gMapKeys[word] / totalWordsCount;
    return pecent;
}

function searchUpdtImage(searchStr) {
    if (searchStr) {
        if (gMapKeys[searchStr]) {
            for (var i = 0; i < gImgs.length; i++) {
                for (var j = 0; j < gImgs[i].keywords.length; j++) {
                    if (gImgs[i].keywords[j] === searchStr) {
                        gImgs[i].isFiltered = true;
                        break;
                    } else {
                        gImgs[i].isFiltered = false;
                    }
                }
            }
        } else {
            setDisp2None();
        }
    } else {
        setDisp2AllImages();
    }
}

function searchKeywordList(searchStr) {
    searchUpdtImage(searchStr);
    renderImageGallery();
}

function saveContactDeatails() {
    console.log('saving to local storage...');
    var detailsStr = getUserDetail();
    saveUsers(detailsStr);
}

function getUserDetail() {
    var elInput = document.querySelectorAll('.contact-details');
    var contactStr = '';
    for (var i = 0; i < elInput.length; i++) {
        contactStr += elInput[i].value + ' ';
    }
    return contactStr;
}

// saves the user details to localStorage using JSON.stringify()
function saveUsers(detailsStr) {
    var usersJSON = JSON.stringify(detailsStr);
    localStorage.setItem(LS_MEME_USER, usersJSON);
}



////////////////////////////////////////////////////////////////////////////////
//////////                           EDITOR                       //////////////
////////////////////////////////////////////////////////////////////////////////

///// EDITOR NEW IMAGE SETUP 

function editImage(selImg) {
    initEditor(selImg);
}

function initEditor(selImg) { //SETUP system with NEW image
    showElementById('image-editor');
    var elLine = document.getElementById('inputs-zone');
    elLine.innerHTML = '';
    gState.txts = [];
    setScreenDetails(); 
    setImgDetails(selImg);
    setCanvasDetalis();
    setNewTextLine(-1);  //create first line
    setNewTextLine(0);   //create 2nd line
    for (var idx = 0; idx < gState.txts.length; idx++) {//listeners to color pickers
        createColorListener(idx);
    }
}



function setScreenDetails() {
    gState.screen.width = 600;// shall be REAL screen width 
 //   gState.screen.width = (screen.width < 700) ? 2.5 * screen.width : 600;// shall be REAL screen width 
    console.log('screen width', gState.screen.width);
}

function setCanvasDetalis() {
    gState.canvas.el = document.getElementById("image-canvas");
    gState.canvas.ctx = gState.canvas.el.getContext('2d');
    gState.canvas.width = gState.screen.width-4;
    gState.canvas.height = Math.floor(gState.canvas.width * gState.img.aspectRatio);
    gState.canvas.el.width = gState.canvas.width;
    gState.canvas.el.height = gState.canvas.height;
}

function setImgDetails(selImg) {
    gState.img.el = document.getElementById("hidden-image");
    gState.img.src = selImg.url;
    gState.img.el.src = selImg.url;
    gState.img.aspectRatio = gState.img.el.height / gState.img.el.width;
    gState.img.width = gState.img.el.width;
    gState.img.height = gState.img.el.height;
    gState.img.imgX = 0;
    gState.img.imgY = 0;
}

function textLineDefault() {
    var text = {
        text: '',
        fontSize: MEME_FONT_SIZE*gState.canvas.height,
        fontType: MEME_FONT_TYPE,
        color: 'white',
        textAlign: 'center',
        fillStyle: 'white',
        strokeStyle: 'black',
        lineWidth: 2,
        textX: Math.floor(gState.canvas.width/2),
        textY: null
    };
    return text;
}

function setYOfAllLines() { // set the line indexes of all lines 
    var lineY;
    var paddingY    = MEME_PADDING*gState.canvas.height;
    var fontHeight  = MEME_FONT_SIZE*gState.canvas.height;
    var bottomRowY  = paddingY+fontHeight;
    var topRowY     = gState.canvas.height-paddingY;
    var textZoneY   = topRowY - bottomRowY;
    var numOfLines  = gState.txts.length;
    var lineGapY    = textZoneY/(numOfLines-1)
    for (var idx = 0; idx < gState.txts.length; idx++) {
        lineY = Math.floor(bottomRowY + lineGapY * (idx));
        gState.txts[idx].textY = lineY;
    }
}

function setNewTextLine(requestingLineIdx) { // set new line "below" the requesting line index
    var newLineIdx = requestingLineIdx + 1;
    gState.txts.splice(newLineIdx, 0, textLineDefault());
    setYOfAllLines();
    createHtmlLineControls();
    renderCanvas();
}

/// EDITOR SCREEN PREPARING and SCREEN RENDERING FUNCTIONS

function createHtmlLineControls() {
    var elLine = document.getElementById('inputs-zone');
    var strHtml = '';
    for (var idx = 0; idx < gState.txts.length; idx++) {  /// need to move all "id" to another key (check what key can be set)
        strHtml +=
            `<div id="inputs-unit-${idx}" class="inputs-unit fa-lg">
            <input id="line-${idx}" class="line-input" placeholder="TYPE HERE" oninput="inputWrite(${idx},this)"></input>
            <div id="text-props-${idx}" class="text-props">
                <!-- <button id="delete-row"    class="text-prop text-props-button fa fa-trash"         onclick="handleText(${idx},this)"></button>-->
                <button id="text-up"            class="text-prop text-props-button fa fa-arrow-up"      onclick="handleText(${idx},this)"></button>
                <button id="text-down"          class="text-prop text-props-button fa fa-arrow-down"    onclick="handleText(${idx},this)"></button>
                <!-- <button id="text-color"    class="text-prop text-props-button fa fa-tint"          onclick="handleText(${idx},this)"></button>-->
                <input type="color" id="color-picker-${idx}" class="text-prop" name="color" form="frmRegister" />
                <!--<button id="text-shadow-on" class="text-prop text-props-button FAPLACE"             onclick="handleText(${idx},this)">SHON</button>
                <button id="text-shadow-off"    class="text-prop text-props-button FAPLACE"             onclick="handleText(${idx},this)">SHOFF</button>
                <!--<button id="select-font"    class="text-prop text-props-button fa fa-font"          onclick="handleText(${idx},this)"></button>
                <button id="select-font"        class="text-prop text-props-button fa fa-font"          onclick="clickSelect(${idx},this)"></button>-->
                <select id="font-dropdown-${idx}"  class="drop-down-fonts text-prop" onclick="dropdownClicked(${idx},this)" onchange="setFontType(${idx},this.value)">
                    <option class="font-impact" value="Impact, Charcoal, sans-serif">Impact</option>
                    <option class="font-courier" value="Courier, Charcoal, sans-serif">Courier</option>
                    <option class="font-arial-black" value="Arial Black, Charcoal, sans-serif">Arial Black</option>
                    <option class="font-comic-sans-ms" value="Comic Sans MS, Charcoal, sans-serif">Comic Sans Ms</option>
                </select>   
                <button id="text-size-decrease" class="text-prop text-props-button fa fa-minus"         onclick="handleText(${idx},this)"></button>
                <button id="text-size-increase" class="text-prop text-props-button fa fa-plus"          onclick="handleText(${idx},this)"></button>
                <button id="align-left"         class="text-prop text-props-button fa fa-align-left"    onclick="handleText(${idx},this)"></button>
                <button id="align-center"       class="text-prop text-props-button fa fa-align-center"  onclick="handleText(${idx},this)"></button>
                <button id="align-right"        class="text-prop text-props-button fa fa-align-right"   onclick="handleText(${idx},this)"></button> 
            </div>
        </div>`
    }
    elLine.innerHTML = strHtml;
}

 


function drawImageOnCanvas() {
    var canvasWidth = gState.canvas.width;
    var canvasHeight = gState.canvas.height;
    var elImg = gState.img.el;
    var imgX = gState.img.imgX;
    var imgY = gState.img.imgY;
    var ctx = gState.canvas.ctx;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(elImg, imgX, imgY, canvasWidth, canvasHeight);
}

function inputWrite(lineIdx, elText) {
    gState.txts[lineIdx].text = elText.value;
    renderCanvas();
}

function renderCanvas() {
    var ctx = gState.canvas.ctx;
    drawImageOnCanvas();

    for (var i = 0; i < gState.txts.length; i++) {
        var t = gState.txts[i];
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

///// Text properties change - hadling functions

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
        case 'text-up':
            console.log('text-up');
            gState.txts[lineIdx].textY--;;
            break;
        case 'text-down':
            console.log('text-down');
            gState.txts[lineIdx].textY++;;
            break;

    }
    renderCanvas();

}


function createColorListener(idx) {
    document.getElementById(`color-picker-${idx}`).addEventListener('input', function (e) {
        gState.txts[idx].fillStyle = e.target.value;
        renderCanvas();
    }, false);
}

function setFontType(lineIdx, font) {
    gState.txts[lineIdx].fontType = font;
    // gElFont[lineIdx].style.color = 'transparent';//"hack" to dropdown - didnt work well - abort
    // gDropdownInSelect[id] = false;
    renderCanvas();
}

// var gDropdownInSelect = []; // didnt work wel - abort
// //var gDropdownInSelect = false;
// var gElFont =[]; // tbd make local

// function dropdownClicked(id,el){
// console.log('ENTER FUNC',gDropdownInSelect[id],id,el);
// //    var el = document.getElementById(el.id);
//      gElFont[id] = document.getElementById(el.id);
//     if(!gDropdownInSelect[id]) {
//         gElFont[id].style.color = '#000';
//         gDropdownInSelect[id] = true;
//     }
//     else if (gDropdownInSelect[id]){
//         gElFont[id].style.color = 'transparent';
//         gDropdownInSelect[id] = false;
//     }
// }


/////     UTILS     ////////////////

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

// function findFontSize(ctx, text) { //NOT IN USE - FOR FUTURE 
//     var f = gFontSize; // Font size (in pt)
//     for (; f >= 0; f -= 1) {
//         ctx.font = "bold " + f + "pt " + gFontType;
//         if (ctx.measureText(text).width < canvasWidth - 10) {
//             return f;
//         }
//     }
// }