'use strict'

function removeFromMyMemes(meme) {
    gSavedMemes.splice(meme, 1)
    saveToStorage(KEY, gSavedMemes)
    showMemes()
}

function getMemeIdxFromId(memeId) {
    return gSavedMemes.findIndex(meme => meme.id === memeId)
}