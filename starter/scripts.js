const user0 = document.querySelector('.player--0');
const user1 = document.querySelector('.player--1');
const user0TotalScore = document.getElementById('score--0');
const user1TotalScore = document.getElementById('score--1');
const user0CurrentScore = document.getElementById('current--0');
const user1CurrentScore = document.getElementById('current--1');
const newGameBtn = document.querySelector('.btn--new');
const diceBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const imgDice = document.querySelector('.dice');

let currentScore, totalScore, activePlayer, isPlaying;

let initialState = function () {
  currentScore = 0;
  totalScore = [0, 0];
  activePlayer = 0;
  isPlaying = true;

  user0CurrentScore.textContent = 0;
  user0TotalScore.textContent = 0;
  user1CurrentScore.textContent = 0;
  user1TotalScore.textContent = 0;

  imgDice.classList.add('hidden');
  user0.classList.remove('player--winner');
  user1.classList.remove('player--winner');
  user0.classList.add('player--active');
  user1.classList.remove('player--active');
};

initialState();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  user0.classList.toggle('player--active');
  user1.classList.toggle('player--active');
};

diceBtn.addEventListener('click', function () {
  if (isPlaying) {
    const randomDice = Math.trunc(Math.random() * 6 + 1);
    imgDice.classList.remove('hidden');
    imgDice.src = `dice-${randomDice}.png`;

    if (randomDice !== 1) {
      currentScore += randomDice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

holdBtn.addEventListener('click', function () {
  console.log('Hi');
  if (isPlaying) {
    totalScore[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScore[activePlayer];

    if (totalScore[activePlayer] >= 10) {
      isPlaying = false;
      imgDice.classList.add('hidden');
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGameBtn.addEventListener('click', initialState);

