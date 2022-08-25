import ancientsData from './data/ancients.js';

const azathoth = document.getElementById('0');
const cthulthu = document.getElementById('1');
const iogSothoth = document.getElementById('2');
const shubNiggurath = document.getElementById('3');

azathoth.style.backgroundImage = `url(${ancientsData[0].cardFace})`;
cthulthu.style.backgroundImage = `url(${ancientsData[1].cardFace})`;
iogSothoth.style.backgroundImage = `url(${ancientsData[2].cardFace})`;
shubNiggurath.style.backgroundImage = `url(${ancientsData[3].cardFace})`;

const getStackByAncient = (ancientNum) => {
    const stack = [];

    const cardsNumber = [
        {
            green: ancientsData[ancientNum].firstStage.greenCards,
            brown: ancientsData[ancientNum].firstStage.brownCards,
            blue: ancientsData[ancientNum].firstStage.blueCards
        },
        {
            green: ancientsData[ancientNum].secondStage.greenCards,
            brown: ancientsData[ancientNum].secondStage.brownCards,
            blue: ancientsData[ancientNum].secondStage.blueCards
        },
        {
            green: ancientsData[ancientNum].thirdStage.greenCards,
            brown: ancientsData[ancientNum].thirdStage.brownCards,
            blue: ancientsData[ancientNum].thirdStage.blueCards
        }
    ]
    console.log(cardsNumber);
}

const ancientsContainer = document.querySelector('.ancients-container');

ancientsContainer.addEventListener('click', (event) => {
    if (event.target.className === 'card ancient') {
        azathoth.classList.remove('ancient-active');
        cthulthu.classList.remove('ancient-active');
        iogSothoth.classList.remove('ancient-active');
        shubNiggurath.classList.remove('ancient-active');

        event.target.classList.add('ancient-active');
        
        getStackByAncient(event.target.id)
    }

})