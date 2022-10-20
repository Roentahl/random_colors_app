// Get random color for our column
// also we can use random() method from chroma lib to get random color

const cols = document.querySelectorAll('.col');

function generateColor() {
  const hexCodes = '0123456789ABCDEF';
  let color = '';

  for (let i = 0; i < 6; i++) {
    color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  };

  return `#${color}`;
};

function setRandomColors() {
  cols.forEach(col => {
    const colTitle = col.querySelector('.col__title');
    const colBtn = col.querySelector('.col__btn');
    const color = generateColor();
    col.style.backgroundColor = color;
    colTitle.textContent = color;

    setElementColor(colTitle, color);
    setElementColor(colBtn, color);
  });
};

function setElementColor(element, color) {
  const colorBrightness = chroma(color).luminance();

  element.style.color = colorBrightness > 0.5 ? 'black' : 'white';
}

setRandomColors();