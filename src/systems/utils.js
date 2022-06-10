let timer;

function displayNotif(category, message, time) {
  clearInterval(timer);
  const div = document.querySelector('.notif');
  if (!div) {
    console.log('No notification module found');
    return;
  }
  div.classList.add(category);
  div.textContent = message;

  timer = setInterval(() => {
    div.classList.remove(category);
    clearInterval(timer);
  }, time);
}

async function fetchData(url) {
  const value = await fetch(url, { mode: 'cors' }).catch((err) => {
    displayNotif('error', err, 2000);
  });
  if (!value.ok) {
    displayNotif(
      'error',
      'There seems to be an error connecting to the API. Please try again later.',
      2000,
    );
  }
  const data = await value.json();

  return data;
}

async function fetchText(url) {
  const value = await fetch(url).catch((err) => {
    displayNotif('error', err, 2000);
  });
  if (!value.ok) {
    displayNotif(
      'error',
      'There seems to be an error connecting to the API. Please try again later.',
      2000,
    );
  }
  const data = await value.text();

  return data;
}

export { displayNotif, fetchData, fetchText };
