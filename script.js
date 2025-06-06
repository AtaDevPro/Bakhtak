"use strict";

// انتخاب المنت ها
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0EL = document.getElementById("score--0");
const score1EL = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// شرایط شروع
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add("hidden");

let scores = [0, 0];
let playing = true;
let currentScore = 0;
let activePlayer = 0;

// تغییر بازیکن
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// شروع دکمه تاس انداختن
btnRoll.addEventListener("click", function () {
  if (playing) {
    // ساختن عدد رندوم
    const dice = Math.trunc(Math.random() * 6) + 1;

    // نمایش تاس
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;

    // شرط 1 بودن یا نه
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// شروع دکمه ثبت امتیاز
btnHold.addEventListener("click", function () {
  if (playing) {
    // اضافه کردن امتیاز فعلی به امتیاز نهایی
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // چک کردن اینکه برنده شده است یا نه
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEL.classList.add("hidden");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // تغییر بازیکن
      switchPlayer();
    }
  }
});

// شروع دکمه بازی جدید
btnNew.addEventListener("click", function () {
  diceEL.classList.add("hidden");

  scores = [0, 0];
  playing = true;
  currentScore = 0;
  activePlayer = 0;

  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
});
