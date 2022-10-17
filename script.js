const Gameboard = (function () {
	let marks = new Array(9);

	function display() {
		const cells = document.querySelectorAll('.cell');

		for (let i = 0; i < marks.length; i++) {
			const mark = marks[i];

			if (mark == 'x' || mark == 'o') cells[i].textContent = mark;
			else cells[i].textContent = '';
		}
	}

	function setMarkIntoCell(mark, cell) {
		if (marks[cell.dataset.index] != undefined) return 0;

		if (mark == 'x' || mark == 'o') marks[cell.dataset.index] = mark;
		display();
		return 1;
	}

	function clear() {
		marks = new Array(9);
		display();
	}

	return { setMarkIntoCell, clear };
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

		player1 = Player(1, 'o');
		player2 = Player(1, 'x');
		currentPlayer = player1;
	}

	function markCell(cell) {
		const isMarked = Gameboard.setMarkIntoCell(
			currentPlayer.getMark(),
			cell
		);

		if (isMarked)
			currentPlayer = currentPlayer == player1 ? player2 : player1;
	}

	return { start, markCell };
})();

document.querySelectorAll('.cell').forEach((cell) =>
	cell.addEventListener('click', function () {
		Game.markCell(this);
	})
);

Game.start();
