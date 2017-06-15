var app = angular.module('mineSweeper');

app.factory('msFac', function() {
	return {generateBoard: function() {
		var grid = [];
		for (var x = 0; x < 11; x++) {
			var newArrr = [];
			for (var y = 0; y < 11; y++) {
				var assigner = Math.floor(Math.random() * 10);
				if (assigner > 8) {newArrr.push(0);} else {newArrr.push(1);}
			}
			grid.push(newArrr);
		}
		return grid;
	},mapBoard: function(board) {
		for (var i = 0; i < board.length; i++) {
			for (var y = 0; y < board[i].length; y++) {
				if (board[i][y] === 0) {
					board[i].splice(y - 1, 1, 3);
					if (y < 9) {board[i].splice(y + 1, 1, 3);}
					if (i < 9) {
						board[i + 1].splice(y, 1, 3);
						board[i + 1].splice(y - 1, 1, 2);
					}
					if (i > 0) {
						board[i - 1].splice(y, 1, 3);
						board[i - 1].splice(y - 1, 1, 2);
					}
					if (i > 0 && y < 8) {
						board[i - 1].splice(y + 1, 1, 2);
					}
					if (i < 9 && y < 8) {
						board[i + 1].splice(y + 1, 1, 2);
					}
				}
			}
		}
		return board;
	}, objectifyBoard: function (board) {
		var nextLetter = letter => {
			let charCode = letter.charCodeAt(0);
			return String.fromCharCode((charCode - 96) % 26 + 97)
		}
		var idLetter = 'a';
		for (var i = 0; i < board.length; i++) {
			var idNum = 1;
			for (var y = 0; y < board[i].length; y++) {
				if (board[i][y] === 0) {
					board[i].splice(y,1,{isBomb: true, points: 0});
				}
				if (board[i][y] === 1) {
					board[i].splice(y,1,{isBomb: false, points: 1});
				}
				if (board[i][y] === 2) {
					board[i].splice(y,1,{isBomb: false, points: 2});
				}
				if (board[i][y] === 3) {
					board[i].splice(y,1,{isBomb: false, points: 3});

				}
				board[i][y].id = idLetter + idNum;
				board[i][y].revealed = false;
				idNum++;
			}
			idLetter = nextLetter(idLetter);
		}
		return board;
	}, revealed: function (board) {
		for (x = 0; x < board.length; x++) {
			for (y = 0; y < board.length; y ++) {
				board[x][y].revealed = true;
			}
		}
	}
}
});

