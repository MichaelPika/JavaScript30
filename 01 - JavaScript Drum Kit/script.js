let recordPlayArr = [];

const record = document.getElementById("buttonPlay");
const clearSound = document.getElementById("buttonClear");
const keys = Array.from(document.querySelectorAll(".key"));

keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);
record.addEventListener("click", () => playSoundAll(0, recordPlayArr));
clearSound.addEventListener("click", () => clearPlayArr());

function removeTransition(e) {
	if (e.propertyName !== "transform") return;
	e.target.classList.remove("playing");
}

function playSound(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
	if (!audio) return;
	key.classList.add("playing");
	recordPlayArr.push(`${e.keyCode}`);
	audio.currentTime = 0;
	audio.play();
}

let clearPlayArr = () => {
	recordPlayArr = [];
};

let playSoundAll = (num, recordPlayArr) => {
	let firstmus = num;
	let audioRecord = document.querySelector(
		`audio[data-key="${recordPlayArr[firstmus]}"]`
	);
	audioRecord.play();
	num = firstmus + 1;
	audioRecord.onended = function () {
		playSoundAll(num, recordPlayArr);
	};
};
