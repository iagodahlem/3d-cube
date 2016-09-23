'use strict';

(function(window, document) {

	const cube = document.querySelector('.js-cube');

	const ARROW_KEYS = {
		LEFT: 37,
		UP: 38,
		RIGHT: 39,
		DOWN: 40,
	};

	const rotate = ({ element, rotateX, rotateY }) => {
		element.style.cssText = `transform: rotateX(${rotateX}deg), rotateY(${--rotateY}deg)`;
	}

	const rotateLeft = () => {
		const degs = getAngle(cube);
		let rotateX = degs.rotateX ? degs.rotateX : 0;
		let rotateY = degs.rotateY ? degs.rotateY : 0;
		cube.style.cssText = `transform: rotateX(${rotateX}deg), rotateY(${--rotateY}deg)`;
	};

	const rotateUp = () => {
		const rotateX = getAngle(cube).rotateX;
		let deg = !rotateX ? 0 : rotateX;
		cube.style.transform = `rotateX(${++deg}deg)`;
	};

	const rotateDown = () => {
		const rotateX = getAngle(cube).rotateX;
		let deg = !rotateX ? 0 : rotateX;
		cube.style.transform = `rotateX(${--deg}deg)`;
	};

	const rotateRight = () => {
		const rotateY = getAngle(cube).rotateY;
		let deg = !rotateY ? 0 : rotateY;
		cube.style.transform = `rotateY(${++deg}deg)`;
	};

	const getAngle = (element) => {
		const style = window.getComputedStyle(element);
		const transform = style.getPropertyValue('transform');

		const values = transform.split('(')[1].split(')')[0].split(',');
		const pi = Math.PI;
		const sinB = parseFloat(values[8]);
		const b = Math.round(Math.asin(sinB) * 180 / pi);
		const cosB = Math.cos(b * pi / 180);
		const matrixVal10 = parseFloat(values[9]);
		const a = Math.round(Math.asin(-matrixVal10 / cosB) * 180 / pi);

		return {
			rotateX: a,
			rotateY: b,
		};
	};

	document.addEventListener('keydown', (event) => {
		if (event.keyCode === ARROW_KEYS.LEFT) {
			rotateLeft();
		} else if (event.keyCode === ARROW_KEYS.UP) {
			rotateUp();
		} else if (event.keyCode === ARROW_KEYS.RIGHT) {
			rotateRight();
		} else if (event.keyCode === ARROW_KEYS.DOWN) {
			rotateDown();
		}
	});

})(window, document);
