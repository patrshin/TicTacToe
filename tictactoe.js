var turn = 0
var points = ["x", "", "o", "", "", "", "" ,"x", "x"]
var winStates = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
var turn = "player"
var AIShape = "x"
var playerShape = "o"
var choiceMove = 0


function equal() {
	var len = arguments.length;
	for (var i = 1; i < len; i++) {
		if (arguments[i] == null || arguments[i] !== arguments[i-1])
			return false
	}
	return true
}

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
			if (points[(i*3)+j] == "")
				str += " |"
			else
      	str += points[(i*3)+j] + "|";
    }
    str += "\n"
  }
	return str
  //alert(str);
}

//Check if the board is at a winstate
function checkWin(b) {
	var i;
	for (i = 0; i < 8; i++) {
		if (b[winStates[i][0]] != "" && equal(b[winStates[i][0]], b[winStates[i][1]],b[winStates[i][2]])) {
			return true
		}
	}
	return false
}

//Simulate a game
function simGame(board, simTurn, shape) {
	console.log(board + "SIMSituation:" + simTurn)
	//Check if game is won by either player and return score
	if (checkWin(board)) {
		console.log(simTurn + " LOSE!")
		if (simTurn == "AI")
			return -10
		else
			return 10
	}

	var i;
	var j;
	var moves = []
	var scores = []

	//Get list of possible moves and their respective scores
	for (i = 0; i < 3; i++) {
		for (j = 0; j < 3; j++) {
		  var pos = (i*3)+j
		  if (board[pos] == "") {
				moves.push(pos)
				var simBoard = board.slice(0);
				simBoard[pos] = shape
				if (simTurn == "Player") {
				return 0
				} else {
					scores.push(simGame(simBoard, "Player", playerShape))
				}
		  }
		}
	}

	//if no moves available tie
	if (moves.length == 0)
		return 0

	console.log(moves +'\n'+scores)

	//Tally best score
	if (simTurn == "Player") {
		bestInd = maxIndex(scores,false)
	} else if (simTurn == "AI") {
		bestInd = maxIndex(scores,true)
	}
	choiceMove = moves[bestInd]
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
	var pointsClone = points.slice(0)
	val = simGame(pointsClone, turn, AIShape)
	points[choiceMove] = "x"
	console.log(printTicTacToe() + ":" + choiceMove)
	turn = "Player"
  }
}

window.onload = runGame();
