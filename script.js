let countdown = document.querySelector(".countdown");
let city = document.querySelector(".city");
let minuteHand = document.querySelector('.minute')
let hourHand = document.querySelector('.hour')

let open_btn = document.querySelector(".open__btn");
let close_btn = document.querySelector(".close__btn");
let burger_menu = document.querySelector(".burger__menu");

open_btn.addEventListener('click', function () {
  burger_menu.classList.add("open");
});

close_btn.addEventListener('click', function () {
  burger_menu.classList.remove("open");
});

function setClock() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const minDeg = (minutes / 60) * 360;
  const hourDeg = (hours / 12) * 360 + (minutes/60)*30;

  minuteHand.style.transform = `rotate(${minDeg}deg)`;
  hourHand.style.transform = `rotate(${hourDeg}deg)`;
}

async function startCountdown() {
  try {
    const response = await fetch('https://api.openf1.org/v1/meetings?year=2026');
    const data = await response.json();
    
    const currentDate = new Date();
    const races = data.filter(race => new Date(race.date_start) > currentDate);
    const nextRace = races[0];
    const raceStart = new Date(nextRace.date_start);
    city.textContent = nextRace.circuit_short_name
    
    function updateCountdown() {
      const now = new Date();
      const diff = raceStart - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      countdown.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      setClock()
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  } catch (error) {
    countdown.textContent = '00:00:00';
  }
}

startCountdown();
