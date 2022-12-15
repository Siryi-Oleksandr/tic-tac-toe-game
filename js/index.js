"use strict";

const item = document.querySelector(".js-item");
const box = document.querySelector(".js-list");
const playerSymbol = document.querySelector(".js-player");
const button = document.querySelector(".js-btn");
const allTaxtContent = document.querySelectorAll(".js-item");

box.addEventListener("click", onItemClick);
button.addEventListener("click", onStartagainClick);

const winCombinations = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];

let historyPlayerX = [];
let historyPlayerO = [];
let player = "X";

function onItemClick(evt) {
	const field = evt.target;
	const id = field.dataset.id;
	if (!field.classList.contains("js-item")) return;
	if (field.textContent) return;

	field.textContent = player;

	if (player === "X") {
		historyPlayerX.push(+id);

		if (checkWon(historyPlayerX)) {
			Notiflix.Report.success("Congratulations! 🎉", "Winner player 'X'🥇", "Okay");
		}
	} else {
		historyPlayerO.push(+id);

		if (checkWon(historyPlayerO)) {
			Notiflix.Report.success("Congratulations! 🎉", "Winner player 'O'🥇", "Okay");
		}
	}
	player = player === "X" ? "O" : "X"; //перевірка яке значення записувати в поле field
	playerSymbol.textContent = player;

	if ([...historyPlayerO, ...historyPlayerX].length === 9) {
		nobodyWon();
	}
}

function checkWon(array) {
	return winCombinations.some(elem => elem.every(id => array.includes(id)));
}

function onStartagainClick() {
	historyPlayerX = [];
	historyPlayerO = [];
	player = "X";
	for (const item of allTaxtContent) {
		item.innerHTML = "";
	}
}

function nobodyWon() {
	if (!checkWon(historyPlayerO) && !checkWon(historyPlayerX)) {
		Notiflix.Report.info("Nobody won 🎭", "Try again", "Okay");
	}
}
