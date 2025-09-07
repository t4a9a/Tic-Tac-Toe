let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let megContainer = document.querySelector('.messageContainer');
let meg = document.querySelector("#message")
let turnO = true;

const winPattern = [ // winning conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
]
boxes.forEach((box) => { // logic to  print in boxes 
    box.addEventListener("click", () => {
        if (turnO) { //player o turn
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X"; // player x turn
            turnO = true;
        }
        box.disabled = true;

        checkWinner(); //function to check winner
    });
});

const resetGame = () => {
    turnO = true;
    enableBoxes();
    megContainer.classList.add("hide");
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) => { // winner function
    meg.innerText = `Congratulations, winner is ${winner}`;
    megContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText; //store value of boxes
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;


        if (pos1Val != "" && pos2Val != "" && pos3Val != "") { // check winning condition
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);