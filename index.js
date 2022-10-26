(() => {
  const cols = document.querySelectorAll('.col');
  
  // Get random color for our column
  // also we can use random() method from chroma lib to get random color
  function generateColor() {
    const hexCodes = '0123456789ABCDEF';
    let color = '';
  
    for (let i = 0; i < 6; i++) {
      color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
    };
  
    return `#${color.toLowerCase()}`;
  };
  
  function setRandomColors(isInitial) {
    const colors = isInitial ? getColorsFromHash() : [];
  
    cols.forEach((col, index) => {
      const isLocked = col.querySelector('i').classList.contains('fa-lock');
      const colTitle = col.querySelector('.col__title');
      const colBtn = col.querySelector('.col__btn');
  
      if (isLocked) {
        colors.push(colTitle.textContent);
        return
      };
  
      const color = isInitial
        ? colors[index]
          ? colors[index]
          : generateColor()
        : generateColor();
  
      if (!isInitial) {
        colors.push(color);
      };
  
      col.style.backgroundColor = color;
      colTitle.textContent = color;
  
      setElementColor(colTitle, color);
      setElementColor(colBtn, color);
    });
  
    updateHash(colors);
  };
  
  // changing color of column elements depending on the column color
  function setElementColor(element, color) {
    const colorBrightness = chroma(color).luminance();
  
    element.style.color = colorBrightness > 0.5 ? 'black' : 'white';
  };
  
  // refresh colors by press space
  document.addEventListener('keydown', (e) => {
    e.preventDefault();
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
  
      el.classList.contains('fa-lock') 
        ? showAndHideModal(document.querySelector('.modal__block')) 
        : showAndHideModal(document.querySelector('.modal__unblock'));
  
    } else if (target.classList.contains('col__title')) {
      copyToClipboard(target.textContent);
      showAndHideModal(document.querySelector('.modal__copy'));
    };
  });
  
  // Refresh hash by refreshing colors
  function updateHash(colors = []) {
    document.location.hash = colors.map(color => color.substring(1)).join('-');
  };
  
  // We can get color from hash
  function getColorsFromHash() {
    if (document.location.hash.length > 1) {
      return document.location.hash.substring(1).split('-').map(color => `#${color}`);
    }
    return [];
  };
  
  // Copy color
  function copyToClipboard(text) {
    return navigator.clipboard.writeText(text)
  };
  
  function showAndHideModal(modal) {
    modal.classList.add('open');
    setTimeout(() => modal.classList.remove('open'), 2000);
  };
  
  setRandomColors(true);
})()