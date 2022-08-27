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

const getRandomNum = (min, max) => {
    const minN = Math.ceil(min);
    const maxN = Math.floor(max);
    return Math.floor(Math.random() * (maxN - minN + 1)) + minN;
}

const shuffleStack = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array; 
}
const cardsNumber = [];
const firstStageStack = [];
const secondStageStack = [];
const thirdStageStack = [];

const getCardsNumberByAncient = (ancientNum) => {
    
    cardsNumber.push({
        green: ancientsData[ancientNum].firstStage.greenCards,
        brown: ancientsData[ancientNum].firstStage.brownCards,
        blue: ancientsData[ancientNum].firstStage.blueCards
    });
        
    cardsNumber.push({
            green: ancientsData[ancientNum].secondStage.greenCards,
            brown: ancientsData[ancientNum].secondStage.brownCards,
            blue: ancientsData[ancientNum].secondStage.blueCards
        });

    cardsNumber.push({
        green: ancientsData[ancientNum].thirdStage.greenCards,
        brown: ancientsData[ancientNum].thirdStage.brownCards,
        blue: ancientsData[ancientNum].thirdStage.blueCards
    });  
}

const getStackByDifficulty = (cardsData, color, stageStack, stageNum) => {
    if (cardsNumber[stageNum][color] !== 0) {
        let counter = 1;
        while (counter <= cardsNumber[stageNum][color]) {
            const randomCard = [];
            cardsData.map((item, index, array) => {
                randomCard.push(array[getRandomNum(0, cardsData.length - 1)]);
            })

            if (!(firstStageStack.includes(randomCard[0])) && !(secondStageStack.includes(randomCard[0])) && !(thirdStageStack.includes(randomCard[0]))) {
                stageStack.push(randomCard[0]);
                counter++;
            }
        }
    }
}

const pickAncient = document.querySelector('.pick-ancient');
const currentAncient = document.querySelector('.current-ancient');
const gameContainer = document.querySelector('.game-container');

pickAncient.addEventListener('click', (event) => {
    if (event.target.className === 'card ancient') {
        pickAncient.classList.add('inactive');
        currentAncient.classList.remove('inactive');
        currentAncient.style.backgroundImage = `url(${ancientsData[event.target.id].cardFace})`;
        gameContainer.classList.remove('inactive');
        
        getCardsNumberByAncient(event.target.id);
        console.log(cardsNumber);       
    }
})

const difficultyContainer = document.querySelector('.difficulty-container');

const shuffleButton = document.querySelector('.shuffle');

difficultyContainer.addEventListener('click', (event) => {
    if(event.target.className === 'difficulty normal') {
        event.target.classList.add('difficulty-active');
        shuffleButton.classList.remove('inactive');

        getStackByDifficulty(greenCardsData, 'green', firstStageStack, 0);
        getStackByDifficulty(brownCardsData, 'brown', firstStageStack, 0);
        getStackByDifficulty(blueCardsData, 'blue', firstStageStack, 0);
        
        getStackByDifficulty(greenCardsData, 'green', secondStageStack, 1);
        getStackByDifficulty(brownCardsData, 'brown', secondStageStack, 1);
        getStackByDifficulty(blueCardsData, 'blue', secondStageStack, 1);
       
        getStackByDifficulty(greenCardsData, 'green', thirdStageStack, 2);
        getStackByDifficulty(brownCardsData, 'brown', thirdStageStack, 2);
        getStackByDifficulty(blueCardsData, 'blue', thirdStageStack, 2);
    }
});

const cardsContainer = document.querySelector('.cards-container');
const counterContainer = document.querySelector('.counter-container');

shuffleButton.addEventListener('click', () => {
    cardsContainer.classList.remove('inactive');
    counterContainer.classList.remove('inactive');

    shuffleStack(firstStageStack);
    shuffleStack(secondStageStack);
    shuffleStack(thirdStageStack);
    console.log(firstStageStack);
    console.log(secondStageStack);
    console.log(thirdStageStack);
})

const currentCard = document.querySelector('.current-card');