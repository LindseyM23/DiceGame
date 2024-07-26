// document.addEventListener('DOMContentLoaded', ()=>{

// let player1 = document.querySelector('.player1');
// let player2 = document.querySelector('.player2');
// let editNamesBtn = document.querySelector('.btn2');
// let rollTheDiceBtn = document.querySelector('.btn1');


// // this function allows players to edit their names 

// editNamesBtn.addEventListener('click',editNames);
// function editNames(){

// player1 = prompt("Change Player1 Name")
// player2 = prompt("Change Player2 Name")
// if(player1.length <1 || player2.length <1){
//     alert('Please enter a valid name');
//     return;
// }else{
// document.querySelector(".player1").innerHTML = player1;
// document.querySelector(".player2").innerHTML = player2;
// }
// }
// editNames;



// // this function allows the dice to be rolled and give results
// rollTheDiceBtn.addEventListener('click',rollTheDice);


// function rollTheDice(){
//     let diceNum1 = document.querySelector('.player1Dice');
//     let diceNum2 = document.querySelector('.player2Dice');
//     let result1 = document.querySelector('.results1');
//     let result2 = document.querySelector('.results2');
//     let result3 = document.querySelector('.results3');
// let rollingDiceText = document.querySelector('.rollingDiceText');

// if (!diceNum1 || !diceNum2 || !rollingDiceText || !result1 || !result2 || !result3) {
//     console.error('One or more elements not found');
//     return;
// }



//   rollingDiceText.innerHTML="Rolling..."
//     diceNum1.setAttribute("src","images/dice GIF.gif");
//     diceNum2.setAttribute("src","images/dice GIF.gif");
  

//     // this function sets a delay of the results
//     setTimeout(()=>{
//         let randomNumber1 = Math.floor(Math.random()*6)+1;
//         let randomNumber2 = Math.floor(Math.random()*6)+1;

//         diceNum1.setAttribute("src", `images/dice${randomNumber1}.png`);
//         diceNum2.setAttribute("src", `images/dice${randomNumber2}.png`);

    
//         let player1 = document.querySelector('.player1').innerText;
//         let player2 = document.querySelector('.player2').innerText;
       

//       rollingDiceText.innerHTML="";

//         if( randomNumber1 === randomNumber2){
//             result3.innerHTML = "It's a Draw!";
//             result2.innerHTML = "";
//             result1.innerHTML = "";
            
//         }
//         else if(randomNumber1<randomNumber2){
//             result2.innerHTML =`${player2} Wins`;
//             result3.innerHTML = "";
//             result1.innerHTML = "";
            
//         }
//         else{
//             result1.innerHTML =`${player1} Wins`;
//             result2.innerHTML = "";
//             result3.innerHTML = "";
            
//         }
//     },2000);

// }


// });

// origional code ends here





document.addEventListener('DOMContentLoaded', ()=>{
editNames;
// this function resets the game 
let newGameBtn = document.querySelector('.new-game');
    newGameBtn.addEventListener('click', resetGame);

    function resetGame() {
        // Reset player names
        document.querySelector(".player1").innerHTML = "Player1";
        document.querySelector(".player2").innerHTML = "Player2";
        player1 = '';
        player2 = '';

        // Reset scores
        player1Score = 0;
        player2Score = 0;

        // Reset dice images
        document.querySelector('.player1Dice').setAttribute("src", "images/dice6.png");
        document.querySelector('.player2Dice').setAttribute("src", "images/dice6.png");

        // Reset messages
        document.querySelector('.rollingDiceText').innerHTML = '';
        document.querySelector('.winnerText').innerHTML = '';

        // Reset current player
        currentPlayer = 1;

        // Re-enable the buttons
        toggleButtons();
    }





    let player1 = document.querySelector('.player1');
    let player2 = document.querySelector('.player2');
    let editNamesBtn = document.querySelector('.btn2');
  
    
    // this function allows players to edit their names 
    
    editNamesBtn.addEventListener('click',editNames);

    function editNames(){
    
    player1 = prompt("Change Player1 Name")
    player2 = prompt("Change Player2 Name")
    if(player1.length <1 || player2.length <1){
        alert('Please enter a valid name');
        return;
    } else
    document.querySelector(".player1").innerHTML = player1;
    document.querySelector(".player2").innerHTML = player2;

    // this fucntion saves the name to the local storage
    localStorage.setItem('Player1Name', player1);
    localStorage.setItem('Player2Name', player2);

    toggleButtons();
    updateTurnText();
    }

    editNames;



player1 ='';
player2 ='';

let currentPlayer = 1;
let player1Score = 0;
let player2Score = 0;

let rollTheDiceBtn = document.querySelector('.btn1');
let rollTheDiceBtn2= document.querySelector('.btn3');

rollTheDiceBtn.addEventListener('click',rollPlayer1Dice);
rollTheDiceBtn2.addEventListener('click',rollPlayer2Dice);

// these functions 145-169 sets up players to play at two different times, player 2 following player 1 
function rollPlayer1Dice(){
if (currentPlayer === 1){
    rollTheDice(1, (score) => {
        player1Score = score;
        currentPlayer = 2;
        toggleButtons();
        updateTurnText();


});
}
}
function rollPlayer2Dice(){
    if (currentPlayer === 2) {
        rollTheDice(2, (score) => {
            player2Score = score;
            currentPlayer = null;
            toggleButtons();
            determineWinner();
            updateTurnText();
        });
    }
}

// this fucntion takes us through how each player gets their results
// calls on the players buttons and add event listener to them

function rollTheDice(player, callback){
    let diceElement = document.querySelector(`.player${player}Dice`);
    let rollingDiceText = document.querySelector('.rollingDiceText');

    if (!diceElement){
        console.log('Dice element is not found');
        return;
    }
    // ${player}

    rollingDiceText.innerHTML = ` ${currentPlayer === 1 ? player1 : player2} is rolling...`;
    diceElement.setAttribute("src", "images/dice GIF.gif");

    setTimeout(()=>{
        let randomNumber = Math.floor(Math.random()*6) + 1;
        diceElement.setAttribute("src", `images/dice${randomNumber}.png`);

        currentPlayer = currentPlayer === 1 ? 2 : 1;
        // rollingDiceText.innerHTML = `It is Player ${currentPlayer}'s turn now!`;

        if (callback && typeof callback === 'function') {
            callback(randomNumber);
        } else {
            console.error('Callback function is not defined or not a function');
        }
        // toggleButtons();
        updateTurnText();
        
    },1000);
}
// this functions ables and disables the other button when its one players turn, so to make sure every player has their turn




function toggleButtons(){
    let player1Button = document.querySelector('.btn1');
    let player2Button = document.querySelector('.btn3');

    if (!player1 || !player2) {
        player1Button.disabled = true;
        player2Button.disabled = true;
    } else {
        player1Button.disabled = currentPlayer !== 1;
        player2Button.disabled = currentPlayer !== 2;
    }

}

// this fucntion updates turn of players 
function updateTurnText() {
    let rollingDiceText = document.querySelector('.rollingDiceText');


    if (!rollingDiceText) {
        console.error('Rolling Dice Text element not found');
        return;
    }
    if (currentPlayer === null) {
        rollingDiceText.innerHTML = `GAME OVER`;
    } else if (!player1 || !player2){
        rollingDiceText.innerHTML = `Please set player names before starting the game`;
    }
    
    
    else {
        // Display current player’s turn
        rollingDiceText.innerHTML = `It is ${currentPlayer === 1 ? player1 : player2}'s turn now!`;
    }
}


// this function works out who is the winner
function determineWinner(){
    let winnerText = document.querySelector('.winnerText');
  

    if (!winnerText){
        console.error('Winner text element not found');
        return;
    }


    if(player1Score % 2 !== 0 && player2Score % 2 === 0){
        winnerText.innerHTML =  `${player1} Wins`;
        winner = player1;

    }else if (player2Score % 2 !==0 && player1Score % 2 === 0){
        winnerText.innerHTML = `${player2} Wins`;
         winner = player2;

    }else if (player1Score % 2 === 0 && player2Score % 2 === 0){
        winnerText.innerHTML = "It is a tie!"
        winner = "TIE"
    }else if ( player1Score % 2 !==0 && player2Score % 2 !== 0){
        winnerText.innerHTML = "WHAT ARE THE ODDS!! Both players have ODD numbers"
        winner = "ODDS"
    }

    storeGameResult(player1, player2, winner);
        localStorage.setItem('gameResult', winner);
 



    // localStorage.setItem('gameWinner', winner);
    rollTheDiceBtn.disabled = true;
    rollTheDiceBtn2.disabled = true;

    updateTurnText();
}

toggleButtons();

});


function storeGameResult(player1, player2,winner){
    let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

    let gameResult = {
        player1: player1,
        player2: player2,
        result: winner,
    };

    gameHistory.push(gameResult);

    localStorage.setItem('gameHistory', JSON.stringify(gameHistory));
}


function displayGameHistory(){
    let gameHistoryBtn = document.querySelector('.gameHistory');
    let historyContainer = document.querySelector('.history');

    if (!gameHistoryBtn || !historyContainer) {
        console.error('Game History button or history container not found.');
        return;
    }



    gameHistoryBtn.addEventListener('click', ()=>{
        let gameHistory = JSON.parse(localStorage.getItem('gameHistory')) || [];

        historyContainer.innerHTML = '';


        if (gameHistory.length === 0 ){
            historyContainer.innerHTML = '<p>No game history.</p>';
        } else{

        let historyList = document.createElement('ul');

        gameHistory.forEach((game,index)=>{
            let listItem = document.createElement('li');
            listItem.className='gameHistoryList'
            listItem.textContent = `Game ${index +1}: ${game.player1} vs ${game.player2} - ${game.result}`; 

            historyList.appendChild(listItem);
        });
        historyContainer.appendChild(historyList);
    }
// buttons inside the list for clearingg the history and closing it
if (!document.querySelector('.closeHistory')){
        let closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        closeButton.className = 'closeHistory';

        closeButton.addEventListener('click', () => {
            historyContainer.innerHTML = '';
        });
        historyContainer.appendChild(closeButton);
    }
    if (!document.querySelector('.clearHistory')){
        let clearButton = document.createElement('button');
        clearButton.textContent = 'Clear History';
        clearButton.className = 'clearHistory';

        clearButton.addEventListener('click', () => {
            localStorage.removeItem('gameHistory');
            historyContainer.innerHTML = '<p>No game history.</p>';
        });
        // Append history list and buttons to the container
        // historyContainer.appendChild(historyList);
        historyContainer.appendChild(clearButton);
        // historyContainer.appendChild(historyList);
    

  
    // historyContainer.appendChild(closeButton);

}
});
// historyContainer.appendChild(closeButton);



}
displayGameHistory();



















// these functions are for the players to have turns 



// having the game played in intervals both for player 1 and 2
// 1. create a fucntion for roll dice one
// 2. call out the button fr player 1
// 3 call the gif for that player dice
// 4. return results 
// 5. store them in the local storage
// 6. alert player 2 to play after getting the results


// function for saving results
// create a function for sharing results
// 1. retrieve both results from players from local storage
// 2. give if statements to determine the winner
// 3. you display results

// view history section
// 1.create a new div that will number of game
// 2. player names
// 3. results all taken and displayed from the local storage