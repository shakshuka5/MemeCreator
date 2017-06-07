'use strict'

var gImgs = [   { id: 0, url: 'assets/4.png', keywords: ['hamudi', 'toy', 'story'], isFiltered: true },
                { id: 1, url: 'assets/6.png', keywords: ['hamudi', 'happy', 'hamudi'], isFiltered: true },
                { id: 2, url: 'assets/3.jpg', keywords: ['hamudi', 'trump', 'happy', 'smugged','hamu'], isFiltered: true },
                { id: 3, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 4, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 5, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 6, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 7, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead', 'ham', 'puki'], isFiltered: true },
                { id: 8, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 9, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 10, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 11, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 12, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 13, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 14, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true },
                { id: 15, url: 'assets/7.jpg', keywords: ['hamudi', 'redhead'], isFiltered: true }];

var gMapKeys = {};
var gState = { selectedImgId: -1, txts: [{ text: '', size: 0, align: '', color: '' , font:''}] };


function initPage() {
    createMapKeys();
    renderImageGallery();
    document.querySelector('.search-section').addEventListener('input', function (e) {
        // console.log("keyup event detected! coming from this element:", e.target.value);
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
    console.log(gImgs[idx]);
    gState.selectedImgId = gImgs[idx].id;
    console.log('selected image id: ' + gState.selectedImgId);
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

function uploadImage() {
    var elInput = document.querySelector('.url-box');
    console.log(elInput.value);
}

function setKeywordSearch(displayed) {
    var elInput = document.querySelector('.keywords-box');
    var strHTML = elInput.innerHTML;
    if(displayed){
         strHTML = `<button class="touch-btn" onclick="setKeywordSearch(0)">search Keywords</button>`;
        //  <button onclick="setKeywordSearch(0)">search Keywords</button>
    } else {
        var searchedWord = '';
        strHTML = `<button class="touch-btn" onclick="setKeywordSearch(1)">search Keywords</button>`;
        for (var pref in gMapKeys) {
            searchedWord += (pref + ' ');
            var wordFontSize = setFontSize(pref);
            console.log(wordFontSize);
            strHTML += `<span class="key-word" onclick="searchKeywordList('${pref}')" style="font-size:${wordFontSize}">${pref}</span>`;
        }
    }
    elInput.innerHTML = strHTML;
    // var elInput = document.querySelector('.keywords-box');
    // var searchedWord = '';
    // var strHTML = elInput.innerHTML;
    // for (var pref in gMapKeys) {
    //     searchedWord += (pref + ' ');
    //     var wordFontSize = setFontSize(pref);
    //     console.log(wordFontSize);
    //     strHTML += `<span class="key-word" onclick="searchKeywordList('${pref}')" style="font-size:${wordFontSize}">${pref}</span>`;
    // }
    // elInput.innerHTML = strHTML;
}

function setFontSize(searchStr) {
    var percent = getWordPercentage(searchStr);
    var fontSize = '20px';

    if (percent > 40) {
        fontSize = '50px';
    } else if (percent < 80 && percent > 30) {
        fontSize = '30px';
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
    console.log('pecent= ' + pecent);
    return pecent;
}

function searchUpdtImage(searchStr) {
    if (gMapKeys[searchStr]) {
        // console.log('searching for: ' + searchStr);

        for(var i=0; i<gImgs.length; i++) {
            for(var j=0; j< gImgs[i].keywords.length; j++) {
                if (gImgs[i].keywords[j] === searchStr){
                    gImgs[i].isFiltered = true;
                    break;
                } else {
                    gImgs[i].isFiltered = false;
                } 
            }
        }
    } else {
        gImgs.forEach(function(img) {
            img.isFiltered = true;
        }, this);
    }
}

function searchKeywordList(searchStr) {
    searchUpdtImage(searchStr);
    renderImageGallery();
}

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

