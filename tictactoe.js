var turn = 0
var points = ["", "", "", "", "", "", "" ,"", ""]
var winStates = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
var turn = "player"
var AIShape = "x"
var playerShape = "o"
var choiceMove = 0

//Returns the index holding the maximum value
//min will switch the function to do this for minimum value
function maxIndex(arr, min) {
	var maxInd = 0
	var maxVal = arr[0]
	for (i = 1; i < arr.length; i++) {
		if ((min == false && arr[i] > maxVal) && (min == true && arr[i] < maxVal)) {
			maxInd = i;
			maxVal = arr[i];
		}
	}
	return maxInd
}


//Prints the input board
function printTicTacToe() {
  var i = 0;
  var j = 0;
  str = ""
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
      str += points[(i*3)+j] + " ";
    }
    str + "\n"
  }
  //alert(str);
}

//Check if the board is at a winstate
function checkWin(b) {
	var i;
	for (i = 0; i < 8; i++) {
		if (b[winStates[i][0]] == b[winStates[i][1]] == b[winStates[i][2]]) {
			return true
		}
	}
	return false
}

//Simulate a game
function simGame(board, simTurn, shape) {
	console.log(board + "SIMSituation")
	//Check if game is won by either player and return score
	if (checkWin(board)) {
		if (simTurn == "AI")
			return 10
		else
			return -10
	}

	var i;
	var j;
	var moves = []
	var scores = []

	//Get list of possible moves and their respective scores
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
		  var pos = (i*3)+j
		  if (points[pos] == "") {
				moves.push(pos)
				var simBoard = board;
				simBoard[moves[i]] = shape
				if (simTurn == "Player") {
					scores.push(simGame(simBoard, "AI", AIShape))
				} else {
					scores.push(simGame(simBoard, "Player", playerShape))
				}
		  }
		}
	}

	//if no moves available tie
	if (moves.length == 0)
		return 0

	//Tally best score
	if (simTurn == "AI") {
		choiceMove = maxIndex(scores,false)
	} else if (simTurn == "Player") {
		choiceMove = maxIndex(scores,true)
	}
	return scores[choiceMove]
}

function runGame() {
  printTicTacToe();
	turn = "AI"
  if (turn == "Player") {
	  points[0] = "o"
	  turn = "AI"
  } else {
	console.log(points)
	val = simGame(points, turn, AIShape)
	points[choiceMove] = "x"
	console.log(points)
	turn = "Player"
  }
}

window.onload = runGame();
