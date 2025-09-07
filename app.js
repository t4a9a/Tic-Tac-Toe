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
        if (turnO) {
            box.innerText = "O";
            box.classList.add("o"); // add O color
            turnO = false;
        } else {
            box.innerText = "X";
            box.classList.add("x"); // add X color
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
        box.classList.remove("x", "o"); // remove old colors

    }
};


const showWinner = (winner) => {
    if (winner === "X") {
        meg.innerText = "🎉 Congratulations, Winner is X 🎉";
        meg.style.color = "#ff0055";
        meg.style.textShadow = "0 0 10px #ff0055, 0 0 20px #ff0055, 0 0 40px #ff3385";
    } else if (winner === "O") {
        meg.innerText = "🎉 Congratulations, Winner is O 🎉";
        meg.style.color = "#00f5ff";
        meg.style.textShadow = "0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #33ffff";
    } else {
        meg.innerText = "😮 It's a Draw!";
        meg.style.color = "#ffd700";
        meg.style.textShadow = "0 0 10px #ffd700, 0 0 20px #ffea00, 0 0 40px #ffcc00";
    }

    megContainer.classList.remove("hide");
    disableBoxes();
};


const checkWinner = () => {
    for (let pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return; // stop once winner is found
            }
        }
    }

    // ✅ Check Draw (all boxes filled, no winner)
    let allFilled = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        showWinner("Draw");
    }
};


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
