const panels = document.querySelectorAll(".panel");
let nextPanelIndex = 0;

function toggleOpen() {
	this.classList.toggle("open");
}

function toggleActive(e) {
	if (e.propertyName.includes("flex")) {
		this.classList.toggle("open-active");
	}
}

let switchPanel = (event) => {
	if (event.code == "ArrowLeft" || event.code == "ArrowRight") {
		let openPanels = document.getElementsByClassName("open");

		if (openPanels.length == 1) {
			let indexElement = removePanelClass(panels);

			if (event.code == "ArrowLeft") {
				openNewPanelByLeft(indexElement);
			} else {
				openNewPanelByRight(indexElement);
			}
		}
	}
};

document.addEventListener("keydown", switchPanel);
panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
	panel.addEventListener("transitionend", toggleActive)
);

let removePanelClass = (panels) => {
	for (let elementOfPanels in panels) {
		if (panels[elementOfPanels].classList.contains("open")) {
			panels[elementOfPanels].classList.remove("open");
			return elementOfPanels;
		}
	}
};
let openNewPanelByLeft = (indexElement) => {
	nextPanelIndex = indexElement - 1 < 0 ? panels.length - 1 : indexElement - 1;
	panels[nextPanelIndex].classList.add("open");
};
let openNewPanelByRight = (indexElement) => {
	nextPanelIndex = +indexElement + 1 < panels.length ? +indexElement + 1 : 0;
	panels[nextPanelIndex].classList.add("open");
};
