const content = document.getElementById("time");
const clock = document.getElementById("Clock");
const timer = document.getElementById("Timer");
const clockTab = document.getElementById("clockTab");
const timerTab = document.getElementById("timerTab");

/* ---------- CLOCK ---------- */
const getClock = () => {
  const now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");

  content.textContent = hours + ":" + minutes + ":" + seconds;
};
getClock();
setInterval(getClock, 1000);

/* ---------- ТАБ СОЛИХ ---------- */
const showClock = () => {
  clock.classList.replace("ClockHide", "ClockShow");
  timer.classList.replace("TimerShow", "TimerHide");
  clockTab.classList.add("active");
  timerTab.classList.remove("active");
};
const showTimer = () => {
  clock.classList.replace("ClockShow", "ClockHide");
  timer.classList.replace("TimerHide", "TimerShow");
  timerTab.classList.add("active");
  clockTab.classList.remove("active");
};

/* ---------- TIMER ---------- */
const timerText = document.getElementById("timerText");
const barFill = document.getElementById("barFill");
const startBtn = document.getElementById("startBtn");

let total = 300; // нийт секунд
let left = 300; // үлдсэн секунд
let timerId = null; // setInterval-ийн дугаар (зогсоохдоо хэрэгтэй)

const render = () => {
  let minutes = String(Math.floor(left / 60)).padStart(2, "0");
  let seconds = String(left % 60).padStart(2, "0");
  timerText.textContent = minutes + ":" + seconds;

  // Үлдсэн хувиар bar-ын өргөнийг өөрчилнө
  barFill.style.width = (left / total) * 100 + "%";

  if (left <= 10 && left > 0) {
    timer.classList.add("danger");
  } else {
    timer.classList.remove("danger");
  }
};

const pauseTimer = () => {
  clearInterval(timerId);
  timerId = null;
  startBtn.textContent = "Start";
};

const setTimer = (sec) => {
  pauseTimer();
  total = sec;
  left = sec;
  timer.classList.remove("done");
  render();
};

const tick = () => {
  left = left - 1;
  render();
  if (left <= 0) {
    pauseTimer();
    timer.classList.add("done");
  }
};

const toggleTimer = () => {
  if (timerId !== null) {
    pauseTimer();
  } else {
    if (left <= 0) {
      setTimer(total);
    }
    timerId = setInterval(tick, 1000);
    startBtn.textContent = "Pause";
  }
};

const resetTimer = () => {
  setTimer(total);
};

render();
