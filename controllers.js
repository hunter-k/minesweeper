var app = angular.module('mineSweeper');

app.controller('mineSweeperCon', function($scope, msFac, $timeout) {
	$scope.lost = false;
	$scope.paused = true;
	$scope.newGame = function () {
		console.log('clicked');
		var board = msFac.generateBoard();
		var mappedBoard = msFac.mapBoard(board);
		$scope.grid = msFac.objectifyBoard(mappedBoard);
		$scope.score = 0;
		$scope.paused = true;
		$scope.lost = false;
		$scope.stop();
		$scope.counter = 60;
		$scope.countdown(); 
	}

	$scope.clicked = function (curObj,x,y) {
		if (!curObj.revealed) {	
			$scope.paused = false;
			if (curObj.isBomb === true) {
				$scope.grid[x][y].revealed = true;
				$scope.counter = "You've Lost";
				$scope.lost = true;
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

		clearArea(x - 1, y, board);
		clearArea(x + 1, y, board);
	}

	clearArea = function (x,y,board) {
		if (x > 10 || y < 0 || x < 0 || y > 10) {
			return;
		}
		if (board[x][y].points != 1 || board[x][y].revealed === true) {
			return;
		} 
		board[x][y].revealed = true;
		clearAreaHelper(x,y,board);
	}

	$scope.counter = 60;
	var stopped;

	$scope.countdown = function() {
		stopped = $timeout(function() {
			if(!$scope.paused) {$scope.counter--;}
			if ($scope.counter === -1) {
				msFac.revealed($scope.grid);
				$scope.counter = "You've Lost";
				$scope.lost = true;
				$scope.paused = true;
			}   
			$scope.countdown();   
		}, 1000);
	};


	$scope.stop = function(){
		$timeout.cancel(stopped);

	} 


	$scope.newGame();
});
