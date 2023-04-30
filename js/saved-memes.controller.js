'use strict'

let gSavedMemes = []
let gSavedMemeId = 0
const KEY = 'my-memesDB'

function showMemes() {
    if (isMobile()) onToggleMenu(undefined , 'off')
    hide('canvas-container')
    hide('control-box-area')
    hide('gallery-container')
    hide('about')
    hide('actions')
    removeActiveClass('about-title')
    removeActiveClass('templates-title')
    document.querySelector('.my-memes').classList.remove('hide')
    document.querySelector('.templates-title').classList.remove('active')
    document.querySelector('.my-memes-title').classList.add('active')
    gSavedMemes = getSavedMemes()
    renderMeme()
}

function renderMeme() {
    let strHtml = ''
    gSavedMemes.map(meme => {
        const memeContent = encodeURIComponent(JSON.stringify(meme.memeContent))
        strHtml += `<div class="meme-container flex column"><a href="#" class="jump-to-top"><img class="meme-num-${meme.id}" src="${meme.data}" data-img="${meme.memeContent.selectedImgId}" onclick="renderMemeFromMyMemes('${memeContent}')"/></a>
        <button class="remove-btn" onclick="onRemoveFromMyMemes(${meme.id})">Remove</button></div>`
    })
    document.querySelector('.my-memes').innerHTML = strHtml
}

function renderMemeFromMyMemes(selectedMeme) {
    document.querySelector('.playground-area').classList.remove('hide')
    const memeContent = JSON.parse(decodeURIComponent(selectedMeme))
    gCurrImgId = memeContent.selectedImgId
    returnImgValues()
    initCanvas()

    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')

    const elImg = new Image()
    console.log("memeContent.selectedImgId", memeContent.selectedImgId)
    gCurrImgId = memeContent.selectedImgId
    elImg.src = `img/square/${memeContent.selectedImgId}.jpg`

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line, idx) => {
            drawText(memeContent.lines[idx].txt, idx, line.pos.x, line.pos.y)
        })
    }
    showControlBox()
}

function onRemoveFromMyMemes(memeId) {
    removeFromMyMemes(getMemeIdxFromId(memeId))
}

function saveMemeToStorage(memeDataUrl) {
    const newMeme = {
        id: gSavedMemeId++,
        data: memeDataUrl,
        memeContent: gMeme
    }
    newMeme.memeContent.selectedImgId = gCurrImgId
    gSavedMemes.push(newMeme)
    saveToStorage(KEY, gSavedMemes)
}

function getSavedMemes() {
    return loadFromStorage(KEY)
}
