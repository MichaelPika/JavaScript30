let recordPlayArr = [];
let stopRecord = 0;
let count = 0;
const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);

document.addEventListener("click", function (event) {
	let idButtons = event.target.dataset.toggleId;
	if (idButtons === "buttonPlay") {
		playSoundAll(recordPlayArr);
	} else if (idButtons === "buttonClear") {
		clearPlayArr();
	} else return;
});

function removeTransition(e) {
	if (e.propertyName !== "transform") return;
	e.target.classList.remove("playing");
}

function playSound(e) {
	const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
	const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
	if (!audio) return;
	if (!stopRecord) {
		key.classList.add("playing");
		recordPlayArr.push(audio);
		audio.currentTime = 0;
		audio.play();
	}
}

let clearPlayArr = () => {
	recordPlayArr.length = 0;
	stopRecord = 0;
};

let playSoundAll = (recordPlayArr) => {
	if (recordPlayArr.length != 0) {
		stopRecord = 1;
		let firstsound = recordPlayArr.shift();
		firstsound.play();
		if (recordPlayArr.length > 0) {
			firstsound.onended = function () {
				if (stopRecord != 0) {
					playSoundAll(recordPlayArr);
				}
			};
		} else {
			stopRecord = 0;
			recordPlayArr.length = 0;
		}
	}
	return;
};
