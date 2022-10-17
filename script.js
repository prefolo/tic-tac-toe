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
		const cells = document.querySelectorAll('.cell');
		cells.forEach((cell) => cell.classList.remove('winner-cell'));

		marks = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		display();
	}

	function getWinnerMark() {
		const parts = [
			{ values: marks.slice(0, 3), indexes: [0, 1, 2] }, // row1
			{ values: marks.slice(3, 6), indexes: [3, 4, 5] }, // row2
			{ values: marks.slice(6), indexes: [6, 7, 8] }, // row3
			{ values: [marks[0], marks[3], marks[6]], indexes: [0, 3, 6] }, // col1
			{ values: [marks[1], marks[4], marks[7]], indexes: [1, 4, 7] }, // col2
			{ values: [marks[2], marks[5], marks[8]], indexes: [2, 5, 8] }, // col3
			{ values: [marks[0], marks[4], marks[8]], indexes: [0, 4, 8] }, // diagonal1
			{ values: [marks[2], marks[4], marks[6]], indexes: [2, 4, 6] }, // diagonal2
		];

		let winnerMark;

		for (const part of parts) {
			if (allAreEqual(part.values)) {
				winnerMark = part.values[0];
				highlightCells(part.indexes);
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

	function highlightCells(indexes) {
		const cells = document.querySelectorAll('.cell');

		for (const i of indexes) {
			cells[i].classList.add('winner-cell');
		}
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
		displayResult('');

		gameIsOver = false;
		player1 = Player(1, 'o');
		player2 = Player(2, 'x');
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
				displayResult('Player1 (mark o) won!');
				gameIsOver = true;
				break;
			case 'x':
				displayResult('Player2 (mark x) won!');
				gameIsOver = true;
				break;
			case 'tie':
				displayResult('Tie!');
				gameIsOver = true;
				break;
		}
	}

	function displayResult(msg) {
		document.querySelector('#result-container').textContent = msg;
	}

	return { start, markCell, getGameIsOver };
})();

document.querySelectorAll('.cell').forEach((cell) =>
	cell.addEventListener('click', function () {
		Game.markCell(this);
	})
);

document.querySelector('#restart-btn').addEventListener('click', Game.start);

Game.start();
