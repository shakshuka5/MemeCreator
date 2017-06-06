'use strict'

var gImgs = [ {id: 0, url: 'assets/4.png', keywords: ['toy', 'story'], isFiltered: true},
              {id: 1, url: 'assets/6.png', keywords: ['happy'], isFiltered: true},
              {id: 2, url: 'assets/3.jpg', keywords: ['trump', 'happy'], isFiltered: true}];
var gState = {selectedImgId: 5,txts: [{text: 'I never eat Falafel',size: 4,align: 'left',color: 'red'}]};

function imageClicked (indx) {
    console.log('clicked ' + indx);
    console.log(gImgs[indx-1]);
    // return gImgs[indx-1];
    editImage(gImgs[indx-1]);
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

}
