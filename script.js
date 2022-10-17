const Gameboard = (function () {
	let marks = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	function display() {
		const cells = document.querySelectorAll('.cell');

		for (let i = 0; i < marks.length; i++) {
			const mark = marks[i];

			if (mark == 'x' || mark == 'o') cells[i].textContent = mark;
			else cells[i].textContent = '';
		}
	}

	function setMarkIntoCell(mark, cell) {
		if (Game.getGameIsOver()) return;
		if (marks[cell.dataset.index] != 0) return 0;

		if (mark == 'x' || mark == 'o') marks[cell.dataset.index] = mark;
		display();
		return 1;
	}

	function clear() {
		marks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		display();
	}

	function getWinnerMark() {
		const parts = [
			marks.slice(0, 3), // row1
			marks.slice(3, 6), // row2
			marks.slice(6), // row3
			[marks[0], marks[3], marks[6]], // col1
			[marks[1], marks[4], marks[7]], // col2
			[marks[2], marks[5], marks[8]], // col3
			[marks[0], marks[4], marks[8]], // diagonal1
			[marks[2], marks[4], marks[6]], // diagonal2
		];

		let winnerMark;

		for (const part of parts) {
			if (allAreEqual(part)) {
				winnerMark = part[0];
				break;
			}
		}

		if (winnerMark) return winnerMark;
		if (winnerMark == undefined && gameboardIsFull()) return 'tie';
		if (winnerMark == undefined && !gameboardIsFull()) return 0;
	}

	function gameboardIsFull() {
		return marks.every((item) => item != 0);
	}

	function allAreEqual(array) {
		const result = array.every((item) => {
			if (item === array[0] && item != 0) {
				return true;
			}
		});

		return result;
	}

	return { setMarkIntoCell, clear, getWinnerMark };
})();

const Player = (name, mark) => {
	const getName = () => name;
	const getMark = () => mark;

	return { getName, getMark };
};

const Game = (function () {
	let player1;
	let player2;
	let currentPlayer;
	let gameIsOver;

	const getGameIsOver = () => gameIsOver;

	function start() {
		Gameboard.clear();

		gameIsOver = false;
		player1 = Player(1, 'o');
		player2 = Player(1, 'x');
		currentPlayer = player1;
	}

	function markCell(cell) {
		if (gameIsOver) return;

		const isMarked = Gameboard.setMarkIntoCell(
			currentPlayer.getMark(),
			cell
		);

		if (isMarked)
			currentPlayer = currentPlayer == player1 ? player2 : player1;

		switch (Gameboard.getWinnerMark()) {
			case 'o':
				console.log('Player1 (mark o) won!');
				gameIsOver = true;
				break;
			case 'x':
				console.log('Player2 (mark x) won!');
				gameIsOver = true;
				break;
			case 'tie':
				console.log('Tie!');
				gameIsOver = true;
				break;
		}
	}

	return { start, markCell, getGameIsOver };
})();

document.querySelectorAll('.cell').forEach((cell) =>
	cell.addEventListener('click', function () {
		Game.markCell(this);
	})
);

Game.start();
