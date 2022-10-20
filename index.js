// Get random color for our column

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
    const color = generateColor();
    col.style.backgroundColor = color;
    colTitle.textContent = color;
  });
};

setRandomColors();