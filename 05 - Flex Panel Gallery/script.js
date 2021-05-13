const panels = document.querySelectorAll(".panel");

function toggleOpen() {
	console.log("Hello");
	this.classList.toggle("open");
}

function toggleActive(e) {
	console.log(e.propertyName);
	if (e.propertyName.includes("flex")) {
		this.classList.toggle("open-active");
	}
}

panels.forEach((panel) => panel.addEventListener("click", toggleOpen));
panels.forEach((panel) =>
	panel.addEventListener("transitionend", toggleActive)
);

document.addEventListener("keydown", function (event) {
	if (event.code == "ArrowLeft" || event.code == "ArrowRight") {
		let openPanel = document.getElementsByClassName("open");

		if (openPanel.length == 1) {
			let openPanelArray = document.getElementsByClassName("panel");
			let openElement = removePanelClass(openPanelArray);

			if (event.code == "ArrowLeft") {
				openNewPanelByLeft(openElement);
			} else {
				openNewPanelByRight(openElement);
			}
		} else return;
	}
});

let removePanelClass = (openPanelArray) => {
	let allPanelArray = [];
	for (let arrayPanel in openPanelArray) {
		if (openPanelArray[arrayPanel].classList.contains("open")) {
			openPanelArray[arrayPanel].classList.remove("open");
			allPanelArray.push(openPanelArray);
			allPanelArray.push(openPanelArray[arrayPanel]);
			allPanelArray.push(arrayPanel);
			return allPanelArray;
		} else continue;
	}
};
let openNewPanelByLeft = (openElement) => {
	let openElementArray = openElement[0];
	let openPanelElement = openElement[1];
	let openElementIndex = openElement[2];

	if (openPanelElement.classList.contains("panel1")) {
		openElementArray[4].classList.add("open");
	} else {
		openElementArray[openElementIndex - 1].classList.add("open");
	}
};

let openNewPanelByRight = (openElement) => {
	let openElementArray = openElement[0];
	let openPanelElement = openElement[1];
	let openElementIndex = openElement[2];

	if (openPanelElement.classList.contains("panel5")) {
		openElementArray[0].classList.add("open");
	} else {
		openElementArray[+openElementIndex + 1].classList.add("open");
	}
};
