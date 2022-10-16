const Gameboard = (function () {
	let marks = new Array(9);

	marks[0] = 'x';
	marks[5] = 'o';
	marks[3] = 'x';
	marks[8] = 'o';

	function display() {
		const cells = document.querySelectorAll('.cell');

		for (let i = 0; i < marks.length; i++) {
			const mark = marks[i];

			if (mark == 'x') cells[i].textContent = 'x';
			else if (mark == 'o') cells[i].textContent = 'o';
			else cells[i].textContent = '';
		}
	}

	function setMarkIntoCell(mark, cell) {
		if (mark == 'x' || mark == 'o') marks[cell.dataset.index] = mark;
	}

	function clear() {
		marks = new Array(9);
	}

	return { display, setMarkIntoCell, clear };
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

	function start() {
		Gameboard.clear();
		Gameboard.display();

		player1 = Player(1, 'o');
		player2 = Player(1, 'x');
		currentPlayer = player1;
	}

	function markCell(cell) {
		Gameboard.setMarkIntoCell(currentPlayer.getMark(), cell);
		Gameboard.display();
		currentPlayer = currentPlayer == player1 ? player2 : player1;
	}

	return { start, markCell };
})();

Gameboard.display();

document.querySelectorAll('.cell').forEach((cell) =>
	cell.addEventListener('click', function () {
		Game.markCell(this);
	})
);
