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
let fullStack = [];

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

const stg1G = document.querySelector('#stg-1-g');
const stg1Br = document.querySelector('#stg-1-br');
const stg1Bl = document.querySelector('#stg-1-bl');
const stg2G = document.querySelector('#stg-2-g');
const stg2Br = document.querySelector('#stg-2-br');
const stg2Bl = document.querySelector('#stg-2-bl');
const stg3G = document.querySelector('#stg-3-g');
const stg3Br = document.querySelector('#stg-3-br');
const stg3Bl = document.querySelector('#stg-3-bl');

const stageLabels = document.querySelectorAll('.stage-label');

const getCounter = () => {
    stg1G.textContent = cardsNumber[0].green;
    stg1Bl.textContent = cardsNumber[0].blue;
    stg1Br.textContent = cardsNumber[0].brown;
    stg2G.textContent = cardsNumber[1].green;
    stg2Bl.textContent = cardsNumber[1].blue;
    stg2Br.textContent = cardsNumber[1].brown;
    stg3G.textContent = cardsNumber[2].green;
    stg3Bl.textContent = cardsNumber[2].blue;
    stg3Br.textContent = cardsNumber[2].brown;
    
    stageLabels[0].classList.add('stage-active');
}

const getNormalStack = (cardsData, color, stageStack, stageNum) => {
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

const getEasyStack = (cardsData, color, stageStack, stageNum) => {
function isCardNotHard(item) {
    return item.difficulty !== 'hard' ? true : false;
}
    const easyCardData = cardsData.filter(isCardNotHard)
    if (cardsNumber[stageNum][color] !== 0) {
        let counter = 1;
        while (counter <= cardsNumber[stageNum][color]) {
            const randomCard = [];
            easyCardData.map((item, index, array) => {
                randomCard.push(array[getRandomNum(0, easyCardData.length - 1)]);
            })

            if (!(firstStageStack.includes(randomCard[0])) && !(secondStageStack.includes(randomCard[0])) && !(thirdStageStack.includes(randomCard[0]))) {
                stageStack.push(randomCard[0]);
                counter++;
            }
        }
    }
}

const getHardStack = (cardsData, color, stageStack, stageNum) => {
    function isCardNotEasy(item) {
        return item.difficulty !== 'easy' ? true : false;
    }
        const hardCardData = cardsData.filter(isCardNotEasy)
        if (cardsNumber[stageNum][color] !== 0) {
            let counter = 1;
            while (counter <= cardsNumber[stageNum][color]) {
                const randomCard = [];
                hardCardData.map((item, index, array) => {
                    randomCard.push(array[getRandomNum(0, hardCardData.length - 1)]);
                })
    
                if (!(firstStageStack.includes(randomCard[0])) && !(secondStageStack.includes(randomCard[0])) && !(thirdStageStack.includes(randomCard[0]))) {
                    stageStack.push(randomCard[0]);
                    counter++;
                }
            }
        }
    }

const getFullStack = (stack1, stack2, stack3 ) => {
    const temp = stack3.concat(stack2);
    const result = temp.concat(stack1);
    return result;
}

const pickAncient = document.querySelector('.pick-ancient');

pickAncient.addEventListener('click', (event) => {
    const currentAncient = document.querySelector('.current-ancient');
    const gameContainer = document.querySelector('.game-container');
    if (event.target.className === 'card ancient') {
        pickAncient.classList.add('inactive');
        currentAncient.classList.remove('inactive');
        currentAncient.style.backgroundImage = `url(${ancientsData[event.target.id].cardFace})`;
        gameContainer.classList.remove('inactive');
        
        getCardsNumberByAncient(event.target.id);
        getCounter();       
    }
})

const difficultyContainer = document.querySelector('.difficulty-container');
const difficultyInfo = document.querySelector('.difficulty-info');
const shuffleButton = document.querySelector('.shuffle');
const reloadButton = document.querySelector('.reload');

difficultyContainer.addEventListener('click', (event) => {  
    if(event.target.className === 'difficulty normal') {
        event.target.classList.add('difficulty-active');
        shuffleButton.classList.remove('inactive');
        difficultyContainer.classList.add('inactive');
        difficultyInfo.textContent = 'Средний уровень сложности';

        getNormalStack(greenCardsData, 'green', firstStageStack, 0);
        getNormalStack(brownCardsData, 'brown', firstStageStack, 0);
        getNormalStack(blueCardsData, 'blue', firstStageStack, 0);
        
        getNormalStack(greenCardsData, 'green', secondStageStack, 1);
        getNormalStack(brownCardsData, 'brown', secondStageStack, 1);
        getNormalStack(blueCardsData, 'blue', secondStageStack, 1);
       
        getNormalStack(greenCardsData, 'green', thirdStageStack, 2);
        getNormalStack(brownCardsData, 'brown', thirdStageStack, 2);
        getNormalStack(blueCardsData, 'blue', thirdStageStack, 2);
    } else if (event.target.className === 'difficulty easy') {
        event.target.classList.add('difficulty-active');
        shuffleButton.classList.remove('inactive');
        difficultyContainer.classList.add('inactive');
        difficultyInfo.textContent = 'Легкий уровень сложности';

        getEasyStack(greenCardsData, 'green', firstStageStack, 0);
        getEasyStack(brownCardsData, 'brown', firstStageStack, 0);
        getEasyStack(blueCardsData, 'blue', firstStageStack, 0);
        
        getEasyStack(greenCardsData, 'green', secondStageStack, 1);
        getEasyStack(brownCardsData, 'brown', secondStageStack, 1);
        getEasyStack(blueCardsData, 'blue', secondStageStack, 1);
       
        getEasyStack(greenCardsData, 'green', thirdStageStack, 2);
        getEasyStack(brownCardsData, 'brown', thirdStageStack, 2);
        getEasyStack(blueCardsData, 'blue', thirdStageStack, 2);
    } else if (event.target.className === 'difficulty hard') {
        event.target.classList.add('difficulty-active');
        shuffleButton.classList.remove('inactive');
        difficultyContainer.classList.add('inactive');
        difficultyInfo.textContent = 'Трудный уровень сложности';

        getHardStack(greenCardsData, 'green', firstStageStack, 0);
        getHardStack(brownCardsData, 'brown', firstStageStack, 0);
        getHardStack(blueCardsData, 'blue', firstStageStack, 0);
        
        getHardStack(greenCardsData, 'green', secondStageStack, 1);
        getHardStack(brownCardsData, 'brown', secondStageStack, 1);
        getHardStack(blueCardsData, 'blue', secondStageStack, 1);
       
        getHardStack(greenCardsData, 'green', thirdStageStack, 2);
        getHardStack(brownCardsData, 'brown', thirdStageStack, 2);
        getHardStack(blueCardsData, 'blue', thirdStageStack, 2);
    }
});

let secondStageCardsNumber;
let thirdStageCardsNumber;

shuffleButton.addEventListener('click', () => {
    const cardsContainer = document.querySelector('.cards-container');
    const counterContainer = document.querySelector('.counter-container');
    cardsContainer.classList.remove('inactive');
    counterContainer.classList.remove('inactive');
    shuffleButton.classList.add('inactive');
    reloadButton.classList.remove('inactive');

    shuffleStack(firstStageStack);
    shuffleStack(secondStageStack);
    shuffleStack(thirdStageStack);

    fullStack = getFullStack(firstStageStack, secondStageStack, thirdStageStack);

    secondStageCardsNumber = cardsNumber[1].green + cardsNumber[1].brown + cardsNumber[1].blue;
    thirdStageCardsNumber = cardsNumber[2].green + cardsNumber[2].brown + cardsNumber[2].blue;
})

const deck = document.querySelector('.deck');
let currentCard;
const getCardFromStack = () => {
    const currentCardContainer = document.querySelector('.current-card');
    
    if (!(fullStack.length === 1)) {
        currentCard = fullStack.pop();
        currentCardContainer.style.backgroundImage = `url(${currentCard.cardFace})`;
    } else {
        currentCard = fullStack.pop();
        currentCardContainer.style.backgroundImage = `url(${currentCard.cardFace})`;
        deck.classList.add('inactive');
    }
}

const updateCounter = () => {
    if (fullStack.length >= (secondStageCardsNumber + thirdStageCardsNumber)) {
        if (currentCard.color === 'green') {
            let greenCardsNumber = stg1G.textContent;
            greenCardsNumber--;
            stg1G.textContent = greenCardsNumber;
        } else if (currentCard.color === 'brown') {
            let brownCardsNumber = stg1Br.textContent;
            brownCardsNumber--;
            stg1Br.textContent = brownCardsNumber;
        } else if (currentCard.color === 'blue') {
            let blueCardsNumber = stg1Bl.textContent;
            blueCardsNumber--;
            stg1Bl.textContent = blueCardsNumber;
        }
    } else if ((fullStack.length >= (thirdStageCardsNumber)) && (fullStack.length < (secondStageCardsNumber + thirdStageCardsNumber)) ) {
        stageLabels[0].classList.remove('stage-active');
        stageLabels[1].classList.add('stage-active');
        if (currentCard.color === 'green') {
            let greenCardsNumber = stg2G.textContent;
            greenCardsNumber--;
            stg2G.textContent = greenCardsNumber;
        } else if (currentCard.color === 'brown') {
            let brownCardsNumber = stg2Br.textContent;
            brownCardsNumber--;
            stg2Br.textContent = brownCardsNumber;
        } else if (currentCard.color === 'blue') {
            let blueCardsNumber = stg2Bl.textContent;
            blueCardsNumber--;
            stg2Bl.textContent = blueCardsNumber;
        }
    } else if (fullStack.length <= thirdStageCardsNumber) {
        stageLabels[1].classList.remove('stage-active');
        stageLabels[2].classList.add('stage-active');
        if (currentCard.color === 'green') {
            let greenCardsNumber = stg3G.textContent;
            greenCardsNumber--;
            stg3G.textContent = greenCardsNumber;
        } else if (currentCard.color === 'brown') {
            let brownCardsNumber = stg3Br.textContent;
            brownCardsNumber--;
            stg3Br.textContent = brownCardsNumber;
        } else if (currentCard.color === 'blue') {
            let blueCardsNumber = stg3Bl.textContent;
            blueCardsNumber--;
            stg3Bl.textContent = blueCardsNumber;
        }
    }
}

deck.addEventListener('click', () => {
    getCardFromStack();
    updateCounter();
})

reloadButton.addEventListener('click', () => {
    location.reload()
})