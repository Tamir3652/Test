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
getClock(); // эхний 1 секунд хоосон харагдахгүй
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
const progress = document.getElementById("progress");
const startBtn = document.getElementById("startBtn");
const C = 2 * Math.PI * 90; // тойргийн урт

let total = 300;
let left = 300;
let timerId = null;

const format = (s) =>
  String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");

const render = () => {
  timerText.textContent = format(left);
  progress.style.strokeDashoffset = C * (1 - left / total);
  timer.classList.toggle("danger", left <= 10 && left > 0);
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
  left--;
  render();
  if (left <= 0) {
    pauseTimer();
    timer.classList.add("done");
  }
};

const toggleTimer = () => {
  if (timerId) return pauseTimer();
  if (left <= 0) setTimer(total);
  timerId = setInterval(tick, 1000);
  startBtn.textContent = "Pause";
};

const resetTimer = () => setTimer(total);

render();
