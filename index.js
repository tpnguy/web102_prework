/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    games.forEach(game => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('game-card');
        const name = document.createElement('h3');
        const description = document.createElement('p');
        const newImg = document.createElement('img');
        const backers = document.createElement('p');

        description.innerHTML = `${game.description}`;
        name.innerText = `${game.name}`;
        backers.innerText = `Backers: ${game.backers}`
        newImg.src = `${game.img}`
        newImg.classList.add('game-img');

        newDiv.appendChild(newImg);
        newDiv.appendChild(name); 
        newDiv.appendChild(description);
        newDiv.appendChild(backers); 
        gamesContainer.append(newDiv);
    });

        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers

const totalContributions = GAMES_JSON.reduce((acc, next) => {
    return acc + next.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas

let displayContributions = totalContributions.toLocaleString('en-US');
contributionsCard.innerHTML = `${displayContributions}`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalMoney = GAMES_JSON.reduce((acc, next) => {
    return acc + next.pledged;
}, 0);
let displayMoney = totalMoney.toLocaleString('en-US');
raisedCard.innerHTML = `$${displayMoney}`;
// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

let totalGames = 0;

for (let key in GAMES_JSON){
    totalGames++;
};

gamesCard.innerHTML = `${totalGames}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    
    // use filter() to get a list of games that have not yet met their goal
    let filterUnfunded = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal; 
    });
    // use the function we previously created to add the unfunded games to the DOM
    console.log(filterUnfunded);
    addGamesToPage(filterUnfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let filterFunded = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal; 
    });
    console.log(filterFunded);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(filterFunded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
    // add all games from the JSON data to the DOM
}
filterFundedOnly();


// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click', filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click', showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedCount = GAMES_JSON.reduce((first, next) =>{
    return (next.pledged < next.goal) ? first += 1 : first;
},0);
// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${displayMoney} has been raised for ${totalGames > 0 ? totalGames + " games" : totalGames + " game"}. Currently, ${unfundedCount <= 1 ? unfundedCount + " game remains unfunded." : unfundedCount + " games remain unfunded."} We need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container

const descriptionText = document.createElement('p');
descriptionText.innerText = `${displayStr}`

descriptionContainer.appendChild(descriptionText);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

const [number1, number2, ...theRest] = sortedGames; 

const firstGame = document.createElement('p');
const secondGame = document.createElement('p');
firstGame.innerText = `${number1.name}`;
secondGame.innerText = `${number2.name}`;

firstGameContainer.appendChild(firstGame);
secondGameContainer.appendChild(secondGame);
// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item