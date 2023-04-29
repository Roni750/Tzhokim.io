'use strict'

let gCtx, gElCanvas, gCurrImgId, gCanvasWidth, gCanvasHeight

function onSelectTemplate(imgId) {
    hide('my-memes')
    hide('actions')
    document.querySelector('.playground-area').classList.remove('hide')
    document.querySelector('.canvas-container').classList.remove('hide')
    document.querySelector('.control-box-area').classList.remove('hide')
    gCurrImgId = imgId
    returnImgValues()
    setSelectedImgId(imgId)
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

function showGallery() {
    if (gCurrImgId) returnImgValues()
    hide('control-box-area')
    hide('canvas-container')
    hide('my-memes')
    hide('about')
    removeActiveClass('templates-title')
    removeActiveClass('about-title')
    document.querySelector('.search-box').value = ''
    document.querySelector('.hide').classList.remove('hide')
    document.querySelector('.templates-title').classList.add('active')
    document.querySelector('.my-memes-title').classList.remove('active')
    const elGallery = document.querySelector('.gallery-container')
    elGallery.classList.remove('hide')

    resetMeme()
    renderGallery()
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

function showAbout() {
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
    const strHtml = `
    <div class="control-box-wrapper grid">
        <select class="font-selection" name="font" id="font-selection" onchange="onFontChange(this.value)">
            <option value="impact">Impact</option>                
            <option value="arial">Arial</option>                
            <option value="tahoma">Tahoma</option>                
        </select>
        <textarea class="punchline" oninput="onUpdateText(this)" rows="2" cols="50"></textarea>
        <!-- <input type="text" placeholder="Punchline goes here" class="punchline" oninput="onUpdateText(this)"> -->
        <div class="font-scale grid">
            <button class="a-upscale" onclick="onFontSizeChange(this)">A+</button>
            <button class="a-downscale" onclick="onFontSizeChange(this)">A-</button>
        </div>
        <div class="align-btns grid">
            <button class="btn-svg" title="right" onclick="onTextAlign(this)">
                <svg width="1rem" height="1rem" focusable="false">
                    <path
                        d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 110-2zm0 4h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 110-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 010-2zm0-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 010-2z"
                        fill-rule="evenodd">
                    </path>
                </svg>
            </button>
            <button class="btn-svg" title="center" onclick="onTextAlign(this)">
                <svg width="1rem" height="1rem" focusable="false">
                    <path
                        d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 110-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 110-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 010-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 010-2z"
                        fill-rule="evenodd">
                    </path>
                </svg>
            </button>
            <button class="btn-svg" title="left" onclick="onTextAlign(this)">
                <svg width="1rem" height="1rem" focusable="false">
                    <path
                        d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 110-2zm3 4h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 110-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 010-2zm-3-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 010-2z"
                        fill-rule="evenodd">
                    </path>
                </svg>
            </button>
        </div>
        <div class="color-selection grid">
            <div class="stroke-clr"><div class="button-replica"><label for="strokeClr">🖌️</label></div>
                <input type="color" id="strokeClr" class="stroke-color-picker" value="#ffffff" onchange="onStrokeColorChange(this.value)"/>
            </div>
            <div class="fill-clr"><div class="button-replica"><label for="fillClr">🎨</label></div>
                <input id="fillClr" type="color" class="fill-color-picker" value="#ffffff" onchange="onFillColorChange(this.value)"/>
            </div>
        </div>
        <button class="arrow-up" value="-5" onclick="onPosChange(this)">↑</button>
        <button class="arrow-down" value="+5" onclick="onPosChange(this)">↓</button>
        <button onclick="onSaveMeme(this)">Save</button>
        <button class="download-btn"><a href="#" class="btn" onclick="downloadImg(this)" download="my-meme.jpg">Download</a></button>
        <button class="add-line-btn" onclick="onAddLine()">Add Line</button>
        <button class="toggle-line-btn" onclick="onToggleLine()">Toggle</button>
        <button class="share-btn" onclick="shareToFacebook()">Share</button>
    </div>`
    elBoxArea.innerHTML = strHtml
    hide('gallery-container')
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