'use strict'

let gMemes = []
let gMeme

function getMemes() {
    gMeme = _createMeme()
    if (!loadFromStorage(KEY)) {
        console.log("Nothing in storage", loadFromStorage(KEY))
    } else {
        console.log("Loaded from storage:", loadFromStorage(KEY))
        gMemes = loadFromStorage(KEY)
    }
    return gMemes
}

function getMeme() {
    return _createMeme()
}

function _createMeme() {
    return {
        selectedImgId: null,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'Punchline goes here',
                size: 40,
                align: 'center',
                color: 'white',
                strokeColor: 'black',
                font: 'Impact',
                pos: { 
                    x: 200,
                    y: 50
                 }
            }
        ]
    }
}

function setLinePos(posDirection) {
    console.log("posDirection", posDirection)
    if (posDirection === '+5') {
        // console.log(gMeme.lines[gMeme.selectedLineIdx].pos.y)
        gMeme.lines[gMeme.selectedLineIdx].pos.y += 5
    } else if (posDirection === '-5') {
        // console.log(gMeme.lines[gMeme.selectedLineIdx].pos.y)
        gMeme.lines[gMeme.selectedLineIdx].pos.y -= 5
    }
}

function setSelectedImgId(imgId) {
    gMeme.selectedImgId = imgId
}

function setFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function setFontSize(fontSize) {
    if (fontSize.className === 'a-downscale') {
        gMeme.lines[gMeme.selectedLineIdx].size -= 2
    } else {
        gMeme.lines[gMeme.selectedLineIdx].size += 2
    }
}

function setFont(chosenFont) {
    gMeme.lines[gMeme.selectedLineIdx].font = chosenFont
}

function setTextAlign(alignValue) {
    const currLine = gMeme.selectedLineIdx
    gMeme.lines[currLine].align = alignValue
    console.log("alignValue", alignValue)
}

function updateText(text) {
    const lineIdx = gMeme.selectedLineIdx
    gMeme.lines[lineIdx].txt = text.value || 'Please Update Text'
}

// function saveMeme() {
//     gMemes.push(gMeme)
//     saveToStorage(KEY, gMemes)
// }

function toggleLine() {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

function addLine() {
    console.log("gMeme", gMeme)
    gMeme.selectedLineIdx = gMeme.selectedLineIdx + 1
    var newLine = {
        txt: 'Text goes here',
        size: 40,
        align: 'center',
        color: 'white',
        strokeColor: 'black',
        font: 'Impact',
        pos: { 
            x: 200,
            y: 350
         }
    }
    gMeme.lines.push(newLine)
}

function getImgById(imgId) {
    return gImgs.find(meme => meme.id == imgId);
}

function resetMeme() {
    gMeme = _createMeme()
}