import ancientsData from './data/ancients.js';

import greenCardsData from './data/mythicCards/green/index.js';
import brownCardsData from './data/mythicCards/brown/index.js';
import blueCardsData from './data/mythicCards/blue/index.js';

const azathoth = document.getElementById('0');
const cthulthu = document.getElementById('1');
const iogSothoth = document.getElementById('2');
const shubNiggurath = document.getElementById('3');

azathoth.style.backgroundImage = `url(${ancientsData[0].cardFace})`;
cthulthu.style.backgroundImage = `url(${ancientsData[1].cardFace})`;
iogSothoth.style.backgroundImage = `url(${ancientsData[2].cardFace})`;
shubNiggurath.style.backgroundImage = `url(${ancientsData[3].cardFace})`;

const currentCard = document.querySelector('.current-card');

const firstStageStack = [];

const getStackByAncient = (ancientNum) => {
    
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

    const getRandomNum = (min, max) => {
        const minN = Math.ceil(min);
        const maxN = Math.floor(max);
        return Math.floor(Math.random() * (maxN - minN + 1)) + minN;
    }

    const getCards = (cardsData, color) => {
        if (cardsNumber[0][color] !== 0) {
            let counter = 1;
            while (counter <= cardsNumber[0][color]) {
                const randomCard = [];
                cardsData.map((item, index, array) => {
                    randomCard.push(array[getRandomNum(0, cardsData.length - 1)]);
                })
    
                if (!firstStageStack.includes(randomCard)) {
                    firstStageStack.push(randomCard[0])
                    counter++;
                }
            }
        }
    }

    getCards(greenCardsData, 'green');
    getCards(brownCardsData, 'brown');
    getCards(blueCardsData, 'blue');
    console.log(firstStageStack);
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
