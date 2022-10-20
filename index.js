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

// changing color of column elements depending on the column color
function setElementColor(element, color) {
  const colorBrightness = chroma(color).luminance();

  element.style.color = colorBrightness > 0.5 ? 'black' : 'white';
};

// refresh colors by space
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    setRandomColors();
  }
});

// change icon by click
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('col__btn') || target.classList.contains('fa-solid')) {
    const el = target.tagName.toLowerCase() === 'i' ? target : target.children[0];
    el.classList.toggle('fa-lock-open');
    el.classList.toggle('fa-lock');
  };
});

setRandomColors();