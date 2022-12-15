"use strict";

// Виборка елементів для взаємодії
const item = document.querySelector(".js-item");
const box = document.querySelector(".js-list");
const playerSymbol = document.querySelector(".js-player");
const button = document.querySelector(".js-btn");
const allTaxtContent = document.querySelectorAll(".js-item");
const allItems = document.querySelectorAll(".js-item");

// Прослуховування подій
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
let availableStep = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player = "X";

function onItemClick(evt) {
	const field = evt.target;
	const id = field.dataset.id;
	if (!field.classList.contains("js-item")) return;
	if (field.textContent) return;

	field.textContent = player;
	historyPlayerX.push(+id);
	removeNotAvailableStep(+id);
	if (checkWon(historyPlayerX)) {
		return Notiflix.Report.success("Congratulations! 🎉", "Winner player 'X'🥇", "Okay");
	}

	stepRobot(); // крок робить робот

	if (availableStep.length === 0) {
		setTimeout(nobodyWon(), 1000);
	}
}

function checkWon(array) {
	return winCombinations.some(elem => elem.every(id => array.includes(id)));
}

function onStartagainClick() {
	historyPlayerX = [];
	historyPlayerO = [];
	availableStep = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	player = "X";
	for (const item of allTaxtContent) {
		item.innerHTML = "";
	}
}

function getRandomItem(list) {
	return list[Math.floor(Math.random() * list.length)];
}

function removeNotAvailableStep(id) {
	const selectedItemIndex = availableStep.indexOf(id);
	availableStep.splice(selectedItemIndex, 1);
}

function stepRobot() {
	const nextStepId = getRandomItem(availableStep);
	for (const item of allItems) {
		if (+item.dataset.id === nextStepId) {
			setTimeout(() => (item.textContent = "O"), 700);
			historyPlayerO.push(nextStepId);
			removeNotAvailableStep(nextStepId);
			if (checkWon(historyPlayerO)) {
				return Notiflix.Report.failure("You lost! 🤔", "Try again", "Okay");
			}
		}
	}
}

function nobodyWon() {
	if (!checkWon(historyPlayerO) && !checkWon(historyPlayerX)) {
		return Notiflix.Report.info("Nobody won 🎭", "Try again", "Okay");
	}
}
