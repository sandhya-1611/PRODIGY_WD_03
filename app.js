const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

const boxes = document.querySelectorAll(".box")
let gridGame;
let currentPlayer;
let winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//function to initialise the game
function initGame() {
    currentPlayer = "X";
    gridGame = ["", "", "", "", "", "", "", "", ""];
    //Removing the new GAme button
    newGameBtn.classList.remove("active");
    //Player which start the game
    gameInfo.innerHTML = "Current Player - " + currentPlayer;

    //Removing all the already placed value when the button is clicked
    boxes.forEach((box,index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents = "all";
        box.classList.remove("win");
    });
}

//allocating the X or O and Handling the game
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {

        handleclick(index);
    })
});

//Handling the function which occurs at the time of click
function handleclick(index) {
    if (gridGame[index] === "") {
        boxes[index].style.pointerEvents = "none";
        boxes[index].innerText = currentPlayer;
        gridGame[index] = currentPlayer;

        //Swaping turn
        swapTurn();
        //Check Winngings
        checkGameOver();
    }
}

//SWapping the turn of user if X the O or Vice Versa
function swapTurn() {
    if (currentPlayer == "X") {
        currentPlayer = "O";
        gameInfo.innerHTML = "Current Player - " + currentPlayer;
    }
    else {
        currentPlayer = "X"
        gameInfo.innerHTML = "Current Player - " + currentPlayer;
    }
}

//Checking for thr completion of the using using the Winningpositions 2-D array
function checkGameOver(){
    let answer="";
    winningPositions.forEach((position) => {
        if( (gridGame[position[0]] !=="" || gridGame[position[1]]!=="" || gridGame[position[2]]!=="") && (gridGame[position[0]] === gridGame[position[1]] && gridGame[position[1]] === gridGame[position[2]]) ){

            //Checking whether the winner is X/O
            if(gridGame[position[0]]==="X"){
                answer="X"
            }
            else{
                answer="O"
            }
                //Since we got the winner so stop all the clicking actions so that user cannot enter new Value at new place
                    boxes.forEach((box)=>{
                        box.style.pointerEvents="none";
                    })
            //Highlighting the winner BOxes with green color
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")

        }
    });


    //Updating the Winner Name in the UI
    if(answer!==""){
        gameInfo.innerText="Winner Player - "+answer;
        newGameBtn.classList.add("active");
        return;
    }

    //When there is NO winner means game is tied
    let fillcount=0;
    gridGame.forEach((box) => {
        if(box!==""){
            fillcount++;
        }
    });

    if(fillcount===9){
        //Updating on the UI about Game tied
        gameInfo.innerText="Game Tied"
        //activation of new Game button
        newGameBtn.classList.add("active");
    }
}
//Initializing the game at the Time of Start
initGame();

//Make the UI ssame as in Start on the click of New Game button
newGameBtn.addEventListener('click',initGame);