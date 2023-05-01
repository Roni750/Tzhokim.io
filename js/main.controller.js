'use strict'

let gCtx, gElCanvas, gCurrImgId, gCanvasWidth, gCanvasHeight

function onSelectTemplate(imgId) {
    hide('my-memes')
    hide('actions')
    document.querySelector('.playground-area').classList.remove('hide')
    document.querySelector('.canvas-container').classList.remove('hide')
    document.querySelector('.control-box-area').classList.remove('hide')
    gCurrImgId = imgId
    setSelectedImgId(imgId)
    returnImgValues()
    showControlBox()
    initCanvas()
    renderImg(imgId)
    setLinesPosByImgId(imgId)
}

function onFillColorChange(color) {
    setFillColor(color)
    renderImg(gCurrImgId)
}

function onStrokeColorChange(color) {
    setStrokeColor(color)
    renderImg(gCurrImgId)
}

function onFontSizeChange(button) {
    setFontSize(button)
    renderImg(gCurrImgId)
}

function onFontChange(chosenFont) {
    setFont(chosenFont)
    renderImg(gCurrImgId)
}

function onUpdateText(text) {
    updateText(text)
    renderImg(gCurrImgId)
}

function onPosChange(el) {
    setLinePos(el.value)
    renderImg(gCurrImgId)
}

function initCanvas() {
    const elCanvasContainer = document.querySelector('.canvas-container')
    elCanvasContainer.classList.remove('hide')
    const strHtml = `<h3 class="canvas-title">Generate a meme</h3>
    <canvas id="my-canvas" height="${gCanvasHeight}" width="500">
    </canvas>`
    elCanvasContainer.innerHTML = strHtml
}

function returnImgValues() {
    console.log("gCurrImgId", gCurrImgId)
    const currImage = getImgById(gCurrImgId)
    const { width, height } = currImage.size
    const imageWidth = width
    const imageHeight = height

    gCanvasHeight = (imageHeight * 500) / imageWidth
}

function renderImg(imgId) {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')

    const elImg = new Image()
    elImg.src = `img/various/${imgId}.jpg`

    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach((line, idx) => {
            drawText(gMeme.lines[idx].txt, idx, line.pos.x, line.pos.y)
        })
    }
}

function drawText(text, line = 0, x = 200, y = 50) {
    const lineHeight = 40
    const lines = text.split('\n')
    gCtx.lineWidth = 2
    gCtx.strokeStyle = gMeme.lines[line].strokeColor
    gCtx.fillStyle = gMeme.lines[line].color
    gCtx.font = `${gMeme.lines[line].size}px ${gMeme.lines[line].font}`
    gCtx.textAlign = gMeme.lines[line].align
    gCtx.textBaseline = 'top'

    for (let i = 0; i < lines.length; i++) {
        const lineTxt = lines[i]
        const lineY = y + (i * lineHeight)
        gCtx.fillText(lineTxt, x, lineY)
        gCtx.strokeText(lineTxt, x, lineY)
    }
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onSaveMeme() {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    saveMemeToStorage(imgContent)
}

function onAddLine() {
    addLine(gCurrImgId)
    document.querySelector('.punchline').value = ''
}

// * Routing pages functions/ DOM manipulation

function displayBtnMobileDevice() {
    const header = document.querySelector('header')
    const btn = header.querySelector('.nav-btn')
    addEventListener("resize", (event) => {
        if (window.innerWidth <= 480) {
            document.querySelector('.nav-bar').classList.add('hide')
            btn.classList.remove('hide')
        } else if (window.innerWidth > 480) {
            header.querySelector('.nav-bar').classList.remove('hide')
            btn.classList.add('hide')
        }
    })

    if (window.innerWidth > 480) {
        header.querySelector('.nav-btn').classList.add('hide')
    } else if (window.innerWidth < 480) {
        header.querySelector('.nav-bar').classList.add('hide')
        header.querySelector('.nav-btn').classList.remove('hide')
    }
}

function onToggleMenu(elBtn, off) {
    if (off === 'off') closeNavbar()
    else {
        const header = document.querySelector('header')
        const btn = header.querySelector('.nav-btn')
        if (elBtn.innerText == '☰') {
            header.querySelector('.nav-bar').classList.remove('hide')
            header.querySelector('.nav-bar').classList.add('nav-bar-mobile')
            btn.innerText = 'X'
            btn.style.color = 'white'
        } else if (elBtn.innerText == 'X') {
            closeNavbar()
        }
    }
}

function closeNavbar() {
    const header = document.querySelector('header')
    const btn = header.querySelector('.nav-btn')
    header.querySelector('.nav-bar').classList.add('hide')
    btn.innerText = '☰'
    btn.style.color = '#a9a9a9'
}

function showGallery() {
    if (isMobile()) onToggleMenu(undefined , 'off')
    document.querySelector('.actions').classList.remove('hide')
    if (gCurrImgId) returnImgValues()
    hide('control-box-area')
    hide('canvas-container')
    hide('my-memes')
    hide('about')
    removeActiveClass('templates-title')
    removeActiveClass('about-title')
    document.querySelector('.search-box').value = ''
    document.querySelector('.templates-title').classList.add('active')
    document.querySelector('.my-memes-title').classList.remove('active')
    const elGallery = document.querySelector('.gallery-container')
    elGallery.classList.remove('hide')

    resetMeme()
    renderGallery()
}

function injectDesktopNavbar() {
    const header = document.querySelector('header')
    header.querySelector('.nav-bar-mobile').classList.add('.nav-bar')
    header.querySelector('.nav-bar').classList.remove('.nav-bar-mobile')
}

function showAbout() {
    if (isMobile()) onToggleMenu(undefined , 'off')
    const elAbout = document.querySelector('.about')
    elAbout.classList.remove('hide')
    hide('actions')
    hide('gallery-container')
    hide('playground-area')
    hide('my-memes')
    addActiveClass('about-title')
    removeActiveClass('templates-title')
    removeActiveClass('my-memes-title')
}

function addActiveClass(className) {
    const el = document.querySelector(`.${className}`)
    el.classList.add('active')
}

function removeActiveClass(className) {
    const el = document.querySelector(`.${className}`)
    el.classList.remove('active')
}

function hide(className) {
    const el = document.querySelector(`.${className}`)
    el.classList.add('hide')
}

function isMobile() {
    const res = (window.innerWidth > 480) ? false : true
    return res
}

function onToggleLine() {
    document.querySelector('.punchline').value = ''
    toggleLine()
}

function onTextAlign(alignValue) {
    setTextAlign(alignValue.title)
    renderImg(gCurrImgId)
}


function showControlBox() {
    const elBoxArea = document.querySelector('.control-box-area')
    elBoxArea.classList.remove('hide')
    hide('gallery-container')
    if (gCurrImgId) {
        document.querySelector('.punchline').value = ''
    }
}

function shareToFacebook() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(encodedUploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    // Pack the image for delivery
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    // Send a post req with the image to the server
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        // If the request is not done, we have no business here yet, so return
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        // if the response is not ok, show an error
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR
        // Same as
        // const url = XHR.responseText

        // If the response is ok, call the onSuccess callback function, 
        // that will create the link to facebook using the url we got
        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}