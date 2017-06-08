'use strict'

var LS_MEME_USER = 'ourMemeUserContact';

var gImgs = [   { id: 0, url: 'assets/1.jpg', keywords: ['pink', 'hamudi'], isFiltered: true },
                { id: 1, url: 'assets/2.jpg', keywords: ['hamudi', 'happy', 'hamudi'], isFiltered: true },
                { id: 2, url: 'assets/3.jpg', keywords: ['hamudi', 'trump', 'happy', 'smugged','hamu'], isFiltered: true },
                { id: 3, url: 'assets/4.jpg', keywords: ['hamudi', 'toy', 'story'], isFiltered: true },
                { id: 4, url: 'assets/5.jpg', keywords: ['hamudi', 'alert'], isFiltered: true },
                { id: 5, url: 'assets/6.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 6, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 7, url: 'assets/8.jpg', keywords: ['hamudi', 'redhead', 'puki', 'man'], isFiltered: true },
                { id: 8, url: 'assets/9.jpg', keywords: ['hamudi', 'redhead', 'girl'], isFiltered: true },
                { id: 9, url: 'assets/10.jpg', keywords: ['hamudi', 'man'], isFiltered: true },
                { id: 10, url: 'assets/11.jpg', keywords: ['hamudi', 'man'], isFiltered: true },
                { id: 11, url: 'assets/12.jpg', keywords: ['hamudi', 'man'], isFiltered: true },
                { id: 12, url: 'assets/13.jpg', keywords: ['hamudi', 'man'], isFiltered: true },
                { id: 13, url: 'assets/14.jpg', keywords: ['hamudi', 'man'], isFiltered: true },
                { id: 14, url: 'assets/15.jpg', keywords: ['hamudi', 'man'], isFiltered: true },
                { id: 15, url: 'assets/16.jpg', keywords: ['hamudi', 'man'], isFiltered: true }];

var gMapKeys = {};
var gState = { selectedImgId: -1, screen: {}, img: {}, canvas: {}, txts: [] };//UPDATED  var gCardsDisp;


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
    var strHTML = elInput.innerHTML;
    if(displayed){
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
    saveUsers (detailsStr);
}

function getUserDetail() {
    var elInput = document.querySelectorAll('.contact-details');
    var contactStr = '';
    for(var i=0; i<elInput.length; i++) {
        contactStr += elInput[i].value + ' ';
    }
    return contactStr;
}

// saves the user details to localStorage using JSON.stringify()
function saveUsers (detailsStr) {
    var usersJSON = JSON.stringify(detailsStr);
    localStorage.setItem(LS_MEME_USER, usersJSON);
}



/////////////////////////////////////////////////////////////////////////////////////////
// ASSAF (EDITOR)


function editImage(selImg) {
    initEditor(selImg);
}


function setScreenDetails() {
    gState.screen.width = 600;// shall be REAL screen width 
}

function setCanvasDetalis() {
    gState.canvas.el = document.getElementById("image-canvas");
    gState.canvas.ctx = gState.canvas.el.getContext('2d');
    gState.canvas.width = gState.screen.width - 20;
    gState.canvas.height = Math.floor(gState.canvas.width * gState.img.aspectRatio);
    gState.canvas.el.width = gState.canvas.width;
    gState.canvas.el.height = gState.canvas.height;

}

function setImgDetails(selImg) {
    gState.img.el = document.getElementById("hidden-image");
    gState.img.src = selImg.url;
    gState.img.el.src = selImg.url;
    // console.log('sel image',selImg.url,gState.img.src)
    // var el= document.getElementById("hidden-image");
    // console.log('sel image src',gState.img.src); 
    gState.img.aspectRatio = gState.img.el.height / gState.img.el.width;
    gState.img.width = gState.img.el.width;
    gState.img.height = gState.img.el.height;
    gState.img.imgX = 0;
    gState.img.imgY = 0;
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
                <!-- <button id="delete-row"         class="text-prop text-props-button fa fa-trash"       onclick="handleText(${idx},this)"></button>-->
                <button id="text-up"         class="text-prop text-props-button fa fa-arrow-up"        onclick="handleText(${idx},this)"></button>
                <button id="text-down"         class="text-prop text-props-button fa fa-arrow-down"        onclick="handleText(${idx},this)"></button>
                <!-- <button id="text-color"         class="text-prop text-props-button fa fa-tint"        onclick="handleText(${idx},this)"></button>-->
                <input type="color" id="color-picker-${idx}" class="text-prop" name="color" form="frmRegister" />
                <!--<button id="text-shadow-on" class="text-prop text-props-button FAPLACE"           onclick="handleText(${idx},this)">SHON</button>
                <button id="text-shadow-off"    class="text-prop text-props-button FAPLACE"         onclick="handleText(${idx},this)">SHOFF</button>
                <!--<button id="select-font"        class="text-prop text-props-button fa fa-font"      onclick="handleText(${idx},this)"></button>
                <button id="select-font"        class="text-prop text-props-button fa fa-font"      onclick="clickSelect(${idx},this)"></button>-->
                <select  id="font-dropdown-${idx}"  class="drop-down-fonts text-prop" onchange="dropSelectTest(${idx},this.value)">-->
                <option class="font-impact" value="Impact, Charcoal, sans-serif">Impact</option>
                <option class="font-courier" value="Courier, Charcoal, sans-serif">Courier</option>
                <option class="font-arial-black" value="Arial Black, Charcoal, sans-serif">Arial Black</option>
                <option class="font-comic-sans-ms" value="Comic Sans MS, Charcoal, sans-serif">Comic Sans Ms</option>
                </select>   
                <button id="text-size-decrease" class="text-prop text-props-button fa fa-minus"       onclick="handleText(${idx},this)"></button>
                <button id="text-size-increase" class="text-prop text-props-button fa fa-plus"        onclick="handleText(${idx},this)"></button>
                <button id="align-left"         class="text-prop text-props-button fa fa-align-left"  onclick="handleText(${idx},this)"></button>
                <button id="align-center"       class="text-prop text-props-button fa fa-align-center"onclick="handleText(${idx},this)"></button>
                <button id="align-right"        class="text-prop text-props-button fa fa-align-right" onclick="handleText(${idx},this)"></button> 
            </div>
        </div>`
    }
    elLine.innerHTML = strHtml;
}

function getColorVal(colorValue) {

    alert(colorValue);
}


function clickSelect(idx, elObject) {
    var eldrop = document.getElementById(`font-dropdown-${idx}`);
    console.log(eldrop);
    eldrop.click();
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
    console.log(canvasWidth, canvasHeight, elImg, ctx)
}


function initEditor(selImg) { //load start
    showElementById('image-editor');
    var elLine = document.getElementById('inputs-zone');
    elLine.innerHTML = '';
    gState.txts = [];
    gState.txts.push(textLineDefault());
    gState.txts.push(textLineDefault());
    setScreenDetails(); // move to to of file
    setImgDetails(selImg);
    setCanvasDetalis();
    gState.txts[0].textX = gState.canvas.width / 2; // move the two pushes above and therse 4 to another function 
    gState.txts[0].textY = 50;
    gState.txts[1].textX = gState.canvas.width / 2;
    gState.txts[1].textY = gState.canvas.height - 20;
    drawImageOnCanvas();
    createHtmlLineControls();
    renderCanvas();

    //improve to all lines
    document.getElementById(`color-picker-0`).addEventListener('input', function (e) {
        gState.txts[0].fillStyle = e.target.value;
        renderCanvas();
    }, false);
    document.getElementById(`color-picker-1`).addEventListener('input', function (e) {
        gState.txts[1].fillStyle = e.target.value;
        renderCanvas();
    }, false);

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

function dropSelectTest(lineIdx, font) {
    console.log(lineIdx, font)
    gState.txts[lineIdx].fontType = font;
    renderCanvas();

    // document.getElementById(`font-dropdown-${idx}`).value;
    // console.log(elObject, document.getElementById("mySelect").value);
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

