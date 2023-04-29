'use strict'

function onInit() {
    addActiveClass('templates-title')
    renderGallery()
    getMemes()
    setMemeSize()
    injectKeyWords()
}

function renderGallery() {
    let strHtml = ``
    gImgs.map(img => {
        strHtml += `<img src="img/various/${img.id}.jpg" onclick="onSelectTemplate(${img.id})" class="img img${img.id}">`
    })
    let elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHtml
}

function setMemeSize() {
    gImgs.forEach((img) => {
        let elImg = document.querySelector(`.img${img.id}`)
        img.size.width = elImg.naturalWidth
        img.size.height = elImg.naturalHeight
    })
}

function getKeywords() {
    const keywords = [];
    gImgs.map((img) => {
        img.keywords.forEach((keyword) => {
            if (!keywords.includes(keyword)) {
                keywords.push(keyword);
            }
        });
    });
    return keywords;
}

function injectKeyWords() {
    const elSearchBox = document.querySelector('.meme-templates')
    const keywords = getKeywords()
    let strHtml = ''
    keywords.map(keyword => {
        strHtml += `<option value="${keyword}">${keyword}</option>`
    })
    elSearchBox.innerHTML = strHtml
}

function onFilterBy(filterQuery) {
    filterBy(filterQuery)
}

function filterBy(filterQuery) {
    console.log("filterQuery", filterQuery)
    const res = gImgs.filter(img => img.keywords.includes(filterQuery))
    renderImgsByFilterQuery(res)
}

function renderImgsByFilterQuery(filteredMemes) {
    let strHtml = ``
    filteredMemes.map(img => {
        strHtml += `<img src="img/various/${img.id}.jpg" onclick="onSelectTemplate(${img.id})" class="img img${img.id}">`
    })

    let elGallery = document.querySelector('.gallery-container')
    elGallery.innerHTML = strHtml
    console.log("filteredMemes", filteredMemes)
}