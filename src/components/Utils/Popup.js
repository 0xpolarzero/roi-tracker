const Popup = {
  display: (message, elementIdentifier) => {
    const popup = document.createElement('div');
    popup.setAttribute('id', 'popup');

    for (const para of message) {
      const p = document.createElement('p');
      p.textContent = para;
      popup.appendChild(p);
    }

    document.querySelector(elementIdentifier).appendChild(popup);
  },
  hide: (elementIdentifier) => {
    const popup = document.querySelector(elementIdentifier);
    if (popup) {
      popup.remove();
    }
  },
};

export default Popup;
