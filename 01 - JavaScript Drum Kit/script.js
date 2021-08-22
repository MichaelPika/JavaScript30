let recordPlayArr = [];
let stopRecord = 0;
let count = 0;
const keys = Array.from(document.querySelectorAll(".key"));
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playSound);

document.addEventListener("click", function (event) {
	let idButtons = event.target.dataset.toggleId;
	if (idButtons === "buttonPlay" && recordPlayArr.length != 0) {
		playSoundAll(recordPlayArr);
	} else if (idButtons === "buttonClear") {
		clearPlayArr();
	}
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
	alert(++count);
	if (recordPlayArr.length != 0) {
		stopRecord = 1; //запретить ввод новых звуков
		let firstsound = recordPlayArr.shift(); // удалить 1 звук
		firstsound.play(); // включить 1 звук

		if (recordPlayArr.length > 0) {
			// если  звуки не закончились, то
			firstsound.onended = function () {
				//включить следующий
				playSoundAll(recordPlayArr); // передаём новый массив звуков
			};
		} else {
			stopRecord = 0; // разрешить ввод новых элементов
			recordPlayArr.length = 0;
		}
	}
};
