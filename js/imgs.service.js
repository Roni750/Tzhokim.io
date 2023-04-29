'use strict'

let gNextId = 20

const gImgs = [
    { id: 1, url: 'img/various/1.jpg', keywords: ['vip', 'celeb'], size: { width: null, height: null } },
    { id: 2, url: 'img/various/2.jpg', keywords: ['animals'], size: { width: null, height: null } },
    { id: 3, url: 'img/various/3.jpg', keywords: ['animals', 'cute'], size: { width: null, height: null } },
    { id: 4, url: 'img/various/4.jpg', keywords: ['cats', 'animals'], size: { width: null, height: null } },
    { id: 5, url: 'img/various/5.jpg', keywords: ['cute'], size: { width: null, height: null } },
    { id: 6, url: 'img/various/6.jpg', keywords: ['aliens', 'funny'], size: { width: null, height: null } },
    { id: 7, url: 'img/various/7.jpg', keywords: ['funny'], size: { width: null, height: null } },
    { id: 8, url: 'img/various/8.jpg', keywords: ['tell me more', 'sarcastic'], size: { width: null, height: null } },
    { id: 9, url: 'img/various/9.jpg', keywords: ['evil', 'cute'], size: { width: null, height: null } },
    { id: 10, url: 'img/various/10.jpg', keywords: ['vip', 'celeb'], size: { width: null, height: null } },
    { id: 11, url: 'img/various/11.jpg', keywords: ['funny'], size: { width: null, height: null } },
    { id: 12, url: 'img/various/12.jpg', keywords: ['israeli'], size: { width: null, height: null } },
    { id: 13, url: 'img/various/13.jpg', keywords: ['vip'], size: { width: null, height: null } },
    { id: 14, url: 'img/various/14.jpg', keywords: ['funny', 'sarcastic'], size: { width: null, height: null } },
    { id: 15, url: 'img/various/15.jpg', keywords: ['funny'], size: { width: null, height: null } },
    { id: 16, url: 'img/various/16.jpg', keywords: ['funny'], size: { width: null, height: null } },
    { id: 17, url: 'img/various/17.jpg', keywords: ['vip', 'celeb'], size: { width: null, height: null } },
    { id: 18, url: 'img/various/18.jpg', keywords: ['movies', 'funny'], size: { width: null, height: null } },
    { id: 19, url: 'img/various/19.jpg', keywords: ['hide the pain', 'funny'], size: { width: null, height: null } }
]

function getKeywords() {
    const keywords = []
    gImgs.forEach((img) => {
        gImgs.keywords.forEach((keyword) => {
            if (!keywords.includes(keyword)) {
                keywords.push(keyword)
            }
        });
    });
    return keywords;
}