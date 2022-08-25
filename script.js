import ancientsData from './data/ancients.js';

const azathoth = document.querySelector('.azathoth');
const cthulthu = document.querySelector('.cthulthu');
const iogSothoth = document.querySelector('.iog-sothoth');
const shubNiggurath = document.querySelector('.shub-niggurath');

azathoth.style.backgroundImage = `url(${ancientsData[0].cardFace})`;
cthulthu.style.backgroundImage = `url(${ancientsData[1].cardFace})`;
iogSothoth.style.backgroundImage = `url(${ancientsData[2].cardFace})`;
shubNiggurath.style.backgroundImage = `url(${ancientsData[3].cardFace})`;