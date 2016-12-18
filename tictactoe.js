var turn = 0
var points = ["", "", "", "", "", "", "" ,"", ""]
var winStates = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
var turn = "player"
var AIShape = "x"
var playerShape = "o"
var choiceMove = 0
var realTable = document.getElementsByClassName('panel')


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
		if ((min == false && arr[i] > maxVal) || (min == true && arr[i] < maxVal)) {
			maxInd = i;
			maxVal = arr[i];
		}
	}

	return maxInd
}
function printTicTacToes(b) {
  var i = 0;
  var j = 0;
  str = ""
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 3; j++) {
			if (b[(i*3)+j] == "")
				str += " |"
			else
      	str += b[(i*3)+j] + "|";
    }
    str += "\n"
  }
	return str
  //alert(str);
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
	console.log(printTicTacToes(board) + "SIMSituation:" + simTurn)
	//Cxheck if game is won by either player and return score
	if (checkWin(board)) {
		console.log(simTurn + " LOSE!")
		if (simTurn == "Player")
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
		  if (board[pos] == "") {
				var simBoard = board.slice(0);
				simBoard[pos] = shape
				if (simTurn == "Player") {
					scores.push(simGame(simBoard, "AI", AIShape))
				} else {
					scores.push(simGame(simBoard, "Player", playerShape))
				}
				moves.push(pos)

		  }
		}
	}

	//if no moves available tie
	if (moves.length == 0)
		return 0


	//Tally best score
	if (simTurn == "AI") {
		bestInd = maxIndex(scores,false)
	} else if (simTurn == "Player") {
		bestInd = maxIndex(scores,true)
	}
	console.log(moves +' '+scores)

	choiceMove = moves[bestInd]
	console.log( simTurn + ' ' + choiceMove +' '+scores[bestInd])

	return scores[bestInd]
}

function runGame() {
  printTicTacToe();
	turn = "AI"
  if (turn == "Player") {
	  points[0] = "o"
	  turn = "AI"
  } else {
		var pointsClone = points.slice(0)
		console.log(printTicTacToe())
		val = simGame(pointsClone, turn, AIShape)
		points[choiceMove] = "x"
		detectBoard()
		console.log(printTicTacToe() + ":" + choiceMove)
		turn = "Player"
  }
}

function detectBoard() {
	var table = document.getElementsByClassName('panel')
	for (var i = 0; i < table.length; i++) {
		table.item(i).innerHTML = points[i];
	}
}

function transferBoard() {
	var table = document.getElementsByClassName('panel')
	for (var i = 0; i < table.length; i++) {
	  points[i] = table.item(i).innerHTML;
	}
}

function clickPanel(event) {
	var val = event.innerHTML;
	console.log(event.innerHTML)
	if (val == "") {
		val = playerShape;
	}
	event.innerHTML = val;

	transferBoard()
	runGame()
}

window.onload = detectBoard()
