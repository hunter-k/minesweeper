var app = angular.module('mineSweeper');

app.controller('mineSweeperCon', function($scope, msFac, $timeout) {
	$scope.paused = true;
	$scope.newGame = function () {
		console.log('clicked');
		var board = msFac.generateBoard();
		var mappedBoard = msFac.mapBoard(board);
		$scope.grid = msFac.objectifyBoard(mappedBoard);
		$scope.score = 0;
		$scope.paused = true;
		$scope.stop();
		$scope.counter = 60;
		$scope.countdown(); 
	}

	$scope.clicked = function (curObj,x,y) {
		if (!curObj.revealed) {	
			$scope.paused = false;
			if (curObj.isBomb === true) {
				$scope.grid[x][y].revealed = true;
				alert("you lose!");
				msFac.revealed($scope.grid);
				$scope.paused = true;
			}
			if (curObj.points === 1) {
				$scope.grid[x][y].revealed = true;
				$scope.score++;
				clearAreaHelper(x,y,$scope.grid);
			}
			if (curObj.points === 3) {
				$scope.grid[x][y].revealed = true;
				$scope.score = $scope.score + 4;
			}
			if (curObj.points === 2) {
				$scope.grid[x][y].revealed = true;
				$scope.score = $scope.score + 3;
			}
		}
	}

	clearAreaHelper = function (x,y,board){
		clearArea(x, y - 1, board);
		clearArea(x, y + 1, board);
		clearArea(x + 1, y - 1, board);
		clearArea(x + 1, y + 1, board);

		clearArea(x - 1, y - 1, board);
		clearArea(x - 1, y, board);
		clearArea(x - 1, y + 1, board);
		clearArea(x + 1, y, board);

	}

	clearArea = function (x,y,board) {
		if (board[x][y].points != 1) {
			console.log('I am not 1');
			return;
		} 
		if (x > 11 || y < 0 || x < 0 || y > 11) {
			console.log('I cant even');
			return;
		}
		board[x][y].revealed = true;
	}

	$scope.counter = 60;
	var stopped;

	$scope.countdown = function() {
		stopped = $timeout(function() {
			if(!$scope.paused) {$scope.counter--;}
			if ($scope.counter === -1) {
				msFac.revealed($scope.grid);
				alert("Time is up!");
			}   
			$scope.countdown();   
		}, 1000);
	};


	$scope.stop = function(){
		$timeout.cancel(stopped);

	} 


	$scope.newGame();
});
