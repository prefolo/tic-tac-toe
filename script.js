Gameboard = (function () {
	const marks = new Array(9);

	marks[0] = 'x';
	marks[5] = 'o';
	marks[3] = 'x';
	marks[8] = 'o';

	function display() {
		const cells = document.querySelectorAll('.cell');

		for (let i = 0; i < marks.length; i++) {
			const mark = marks[i];

			if (mark == 'x') cells[i].textContent = 'x';

			if (mark == 'o') cells[i].textContent = 'o';
		}
	}

	return { display };
})();

Gameboard.display();
