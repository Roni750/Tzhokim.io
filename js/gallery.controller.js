'use strict'

function onInit() {
    document.querySelector('.templates-title').classList.add('active')
    renderGallery()
    getMemes()
}

function renderGallery() {
    let strHtml = ``
    gImgs.map(img => {
        strHtml += `<img src="/img/square/${img.id}.jpg" onclick="onSelectTemplate(${img.id})">`
    })
    let elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHtml 
}