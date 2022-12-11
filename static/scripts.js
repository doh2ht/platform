/* ==================== RangeDisplay ==================== */

// displays the value of a range input
// why isn't this in the HTML5 spec?
function RangeDisplay(input) {
  this.input = input;
  this.output = document.createElement('span');
  this.output.className = 'range-display';
  this.units = this.input.getAttribute('data-units') || '';
  // events
  var onChange = this.update.bind(this);
  this.input.addEventListener('change', onChange);
  this.input.addEventListener('input', onChange);
  // set initial output
  this.update();
  this.input.parentNode.appendChild(this.output);
}

RangeDisplay.prototype.update = function () {
  this.output.textContent = this.input.value + this.units;
};

/* ==================== init ==================== */

// init RangeDisplays
var ranges = document.querySelectorAll('input[type="range"]');
for (var i = 0; i < ranges.length; i++) {
  new RangeDisplay(ranges[i]);
}



var scene = document.querySelector('.scene');
var cube = document.querySelector('.cube');
var originX = 100;
var originY = 50;

function updatePerspectiveOrigin() {
  scene.style.perspectiveOrigin = originX + '% ' + originY + '%';
}

// perspective
var perspectiveRange = document.querySelector('.perspective-range');
var perspectiveDisplay = perspectiveRange.parentNode.querySelector('.range-display');
perspectiveRange.onchange = perspectiveRange.oninput = function () {
  var value = perspectiveRange.value + 'px';
  // set to none at max
  if (value == '1000px') {
    value = 'none';
    perspectiveDisplay.textContent = 'none';
  }
  scene.style.perspective = value;
};
perspectiveRange.onchange();

// origin x
var originXRange = document.querySelector('.origin-x-range');
originXRange.onchange = originXRange.oninput = function () {
  originX = originXRange.value;
  updatePerspectiveOrigin();
};
originXRange.onchange();

// origin y
var originYRange = document.querySelector('.origin-y-range');
originYRange.onchange = originYRange.oninput = function () {
  originY = originYRange.value;
  updatePerspectiveOrigin();
};
originYRange.onchange();


// spin cube
var spinCubeCheckbox = document.querySelector('.spin-cube-checkbox');
spinCubeCheckbox.onchange = function () {
  cube.classList.toggle('is-spinning', spinCubeCheckbox.checked);
};
spinCubeCheckbox.onchange();



document.querySelector('.perspective-range').addEventListener('input', function (event) {
  var gradient_value = 100 / event.target.attributes.max.value;
  event.target.style.background = 'linear-gradient(to right, #daff61 0%, #daff61 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
});

document.querySelector('.origin-x-range').addEventListener('input', function (event) {
  var gradient_value = 100 / event.target.attributes.max.value;
  event.target.style.background = 'linear-gradient(to right, #daff61 0%, #daff61 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
});

document.querySelector('.origin-y-range').addEventListener('input', function (event) {
  var gradient_value = 100 / event.target.attributes.max.value;

  event.target.style.background = 'linear-gradient(to right, #daff61 0%, #daff61 ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) ' + gradient_value * event.target.value + '%, rgb(236, 236, 236) 100%)';
});
