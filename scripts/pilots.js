const FLAGS = {
  'British': '🇬🇧',
  'Dutch': '🇳🇱',
  'Mexican': '🇲🇽',
  'Spanish': '🇪🇸',
  'Monegasque': '🇲🇨',
  'Australian': '🇦🇺',
  'German': '🇩🇪',
  'Finnish': '🇫🇮',
  'French': '🇫🇷',
  'Canadian': '🇨🇦',
  'Thai': '🇹🇭',
};

let open_btn = document.querySelector(".open__btn");
let close_btn = document.querySelector(".close__btn");
let burger_menu = document.querySelector(".burger__menu");

open_btn.addEventListener('click', function () {
  burger_menu.classList.add("open");
});

close_btn.addEventListener('click', function () {
  burger_menu.classList.remove("open");
});

async function loadDrivers() {
  const container = document.querySelector('.pilots');
  container.textContent = 'Загрузка...';

  try {
    const url = 'https://api.jolpi.ca/ergast/f1/2026/drivers.json';
    const response = await fetch(url);

    const data = await response.json();
    const drivers = data.MRData.DriverTable.Drivers;

    container.textContent = '';
    drivers.forEach(driver => {
      if (driver.permanentNumber != undefined){
        container.appendChild(createCard(driver));
      }
    });

  } catch (error) {
    container.textContent = 'Ошибка: ' + error.message;
  }
}
loadDrivers();

function createCard(driver) {
  const card = document.createElement('div');
  card.className = 'driver-card';

  const name = document.createElement('h2');
  name.textContent = driver.givenName + ' ' + driver.familyName;

  const team = document.createElement('p');
  team.textContent = (FLAGS[driver.nationality] || '') + ' ' + driver.nationality;
  
  const btn = document.createElement('button');
  btn.innerHTML = "<a href='"+ driver.url +"'>Открыть на Википедии</a>";

  const number = document.createElement('span');
  number.className = 'driver-number';
  number.textContent = '#' + driver.permanentNumber;

  card.appendChild(number);
  card.appendChild(name);
  card.appendChild(team);
  card.appendChild(btn);

  return card;
}