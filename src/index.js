const winRows = [];
let move_counter = 0;

let arr_undo = [];
let arr_redo = [];

if (localStorage.getItem("move")) {
  turn = +localStorage.getItem("move");
}
if (localStorage.getItem("UndoArray")) {
  arr_undo = JSON.parse(localStorage.getItem("UndoArray"));
}
if (localStorage.getItem("RedoArray")) {
  arr_redo = JSON.parse(localStorage.getItem("RedoArray"));
}
if (localStorage.getItem("UndoArray")) {
  for (let i in arr_undo) {
    document.getElementById(arr_undo[i].id).classList.add(arr_undo[i].type);
  }
}
//create dynamic massive from cells amount;
let size = Math.sqrt(document.querySelectorAll(".cell").length);
let arr = new Array(),
  x,
  y;
let c = 0;
for (x = 0; x < size; x++) {
  arr[x] = new Array();
  for (y = 0; y < size; y++) {
    arr[x][y] = c;
    c++;
  }
}

//X or 0 print func
function print(e) {
  if (e.target.className === "cell") {
    if (move_counter % 2 === 0) {
      e.target.classList.add("ch");
      arr_undo.push(new History(e.target.id, "ch"));
    }
    if (move_counter % 2 !== 0) {
      e.target.classList.add("r");
      arr_undo.push(new History(e.target.id, "r"));
    }
    check();
    move_counter++;

    localStorage.setItem("move", move_counter);
    localStorage.setItem("UndoArray", JSON.stringify(arr_undo));
    arr_redo = [];
    localStorage.setItem("RedoArray", JSON.stringify(arr_redo));
    if (!document.querySelector(".won-title").classList.contains("hidden")) {
      localStorage.clear();
    }
  }

  //undo enable
  if (move_counter > 0) {
    document.querySelector(".undo-btn").disabled = false;
  }
  if (move_counter <= 0) {
    document.querySelector(".undo-btn").disabled = true;
  }
}
window.addEventListener("click", print);

//Undo
document.querySelector(".undo-btn").addEventListener("click", function(event) {
  let obj_undo = arr_undo.pop();
  document.getElementById(obj_undo.id).classList.remove(obj_undo.type);
  move_counter--;
  arr_redo.push(obj_undo);

  document.querySelector(".redo-btn").disabled = false;
});

//Redo
document.querySelector(".redo-btn").addEventListener("click", function(event) {
  let obj_redo = arr_redo.pop();
  document.getElementById(obj_redo.id).classList.add(obj_redo.type);
  move_counter++;
  arr_undo.push(obj_redo);

  if (arr_redo.length == 0) {
    document.querySelector(".redo-btn").disabled = true;
  }
});

//Constructor func
function History(id, type) {
  this.id = id;
  this.type = type;
}

function win(x, y) {
  document.querySelector(".won-title").classList.remove("hidden");

  if (move_counter % 2 === 0) {
    let message_box = document.querySelector(".won-message");
    message_box.innerHTML = "Crosses won!";
  }
  if (move_counter % 2 !== 0) {
    let message_box = document.querySelector(".won-message");
    message_box.innerHTML = "Toes won!";
  }

  switch (x) {
    case 1:
      for (let i = 0; i < y.length; i++) {
        document.getElementById(`c-${y[i]}`).classList.add("horizontal", "win");
      }
      break;

    case 2:
      for (let i = 0; i < y.length; i++) {
        document.getElementById(`c-${y[i]}`).classList.add("vertical", "win");
      }
      break;

    case 3:
      for (let i = 0; i < y.length; i++) {
        document.getElementById(`c-${y[i]}`).classList.add("diagonal-right", "win");
      }
      break;

    case 4:
      for (let i = 0; i < y.length; i++) {
        document.getElementById(`c-${y[i]}`).classList.add("diagonal-left", "win");
      }
      break;
  }
}

function draw() {
  document.querySelector(".won-title").classList.remove("hidden");

  let message_box = document.querySelector(".won-message");
  message_box.innerHTML = `It's a draw!`;
}

document.querySelector(".restart-btn").addEventListener("click", function(event) {
  move_counter = 0;
  arr_undo = [];
  arr_redo = [];
  document.querySelector(".won-title").classList.add("hidden");
  for (let i = 0; i < document.querySelectorAll(".cell").length; i++) {
    document
      .getElementById(`c-${i}`)
      .classList.remove("ch", "r", "vertical", "horizontal", "diagonal-right", "diagonal-left", "win");
  }
});

function check() {
  let winCells = [];
  let player = move_counter % 2 === 0 ? "ch" : "r";

  //horizontal matches
  for (x = 0; x < size; x++) {
    matches = 0;
    for (y = 0; y < size; y++) {
      if (document.getElementById(`c-${arr[x][y]}`).classList.contains(player)) {
        matches++;
        winCells.push(arr[x][y]);
        if (matches >= size) {
          win(1, winCells);
        }
      } else {
        matches = 0;
        winCells = [];
      }
    }
  }
  //vertical matchs
  for (x = 0; x < size; x++) {
    matches = 0;
    for (y = 0; y < size; y++) {
      if (document.getElementById(`c-${arr[y][x]}`).classList.contains(player)) {
        matches++;
        winCells.push(arr[y][x]);
        if (matches >= size) {
          win(2, winCells);
        }
      } else {
        matches = 0;
        winCells = [];
      }
    }
  }
  //top left to bottom right matches
  winCells = [];
  matches = 0;
  for (x = 0; x < size; x++) {
    if (document.getElementById(`c-${arr[x][x]}`).classList.contains(player)) {
      winCells.push(arr[x][x]);
      matches++;
      if (matches >= size) {
        win(3, winCells);
      }
    } else {
      winCells = [];
      matches = 0;
    }
  }
  //top right to bottom left matches
  winCells = [];
  matches = 0;
  for (x = size - 1; x >= 0; x--) {
    if (document.getElementById(`c-${arr[x][Math.abs(size - 1 - x)]}`).classList.contains(player)) {
      winCells.push(arr[x][Math.abs(size - 1 - x)]);
      matches++;
      if (matches >= size) {
        win(4, winCells);
      }
    } else {
      winCells = [];
      matches = 0;
    }
  }
  if (arr_undo.length >= document.querySelectorAll(".cell").length) {
    draw();
  }
}
