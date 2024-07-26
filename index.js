let rules = document.querySelector('.rules');
let ruleList = document.querySelector('.rule-list');
let closeList = document.querySelector('.close-list');




// function for displaying the game rules
function gameRules(){
if (ruleList.style.display === "none" || ruleList.display === ""){
    ruleList.innerHTML = `
            <li>Change the names of the players for the game to begin</li>
            <li>Player 1 will start the game.</li>
            <li>Player 2 will play right after</li>
            <li>The winner of the game is the one who rolls an odd number</li>
            <li>You get a "WHAT ARE THE ODDS" when both players roll an odd number</li>
            <li>A tie is when both players roll an even number</li>
           
        `;
    ruleList.style.display = "block";
    closeList.style.display= "block";
}else{
    ruleList.style.display ="none";
    closeList.style.display= "none";
}
}
// ruleList.appendChild(rule-list);
// closeList.appendChild(ruleList);
// funtion to close the game rules list

function closeGameRules(){
    ruleList.style.display = "none";
       closeList.style.display = "none";
}

rules.addEventListener('click', gameRules);
closeList.addEventListener('click', closeGameRules);
gameRules();
closeGameRules();





