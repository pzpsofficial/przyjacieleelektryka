const gameContainer = document.querySelector('.section-gra');
const infoPanel = document.querySelector('.info-panel');
let game = document.querySelector('.game');
const score = document.querySelector('.score');
const gameBtn = document.querySelector('.game-btn');

const startSound = new Audio(
  require('../imgs/zapsplat_multimedia_game_sound_retro_car_racing_start_beeps_001_34949.mp3')
);
startSound.volume = 0.1;

const gameConfig = {
  timeToStart: 10,
  timeToAnswer: 4000,
  imgs: [
    {
      id: 1,
      url: require('../imgs/cards/1.jpg'),
      description:
        'Piknik naukowy w Elektryku to wydarzenie, podczas którego uczniowe mogą zaprezentować swoje talenty i wynalazki.',
    },
    {
      id: 2,
      url: require('../imgs/cards/2.jpg'),
      description:
        'Projekt ten umożliwia naszej młodzieży zdobycie umiejętności wykonywania samodzielnych projektów programistycznych.',
    },
    {
      id: 3,
      url: require('../imgs/cards/3.jpg'),
      description:
        'Tematem ma być promocja pszczelarstwa oraz znaczenie pszczół dla życia na Ziemi. Dla uczniów przygotowano liczne konkursy oraz nagrody.',
    },
    {
      id: 4,
      url: require('../imgs/cards/4.jpg'),
      description:
        'Stowarzyszenie wydało 1500 szt folderów z wycieczkami rowerowymi oraz 10 plansz w dużym formacie z których każda zawiera propozycję jednej wycieczki.',
    },
    {
      id: 5,
      url: require('../imgs/cards/5.jpg'),
      description:
        'Młodzież zaprezentowała swoje umiejętności, zdobyte podczas warsztatów poetyckich i teatralnych.',
    },
    {
      id: 6,
      url: require('../imgs/cards/6.jpg'),
      description:
        'W ramach memoriału odbył się turniej dla dzieci i młodzieży szkolnej oraz dla seniorów.',
    },
    {
      id: 7,
      url: require('../imgs/cards/7.jpg'),
      description:
        'Młodzież debatowała w trzech obszarach tematycznych, w ramach których nasi szkolni eksperci przygotowali po trzy tematy/tezy do dyskusji.',
    },
    {
      id: 8,
      url: require('../imgs/cards/8.jpg'),
      description:
        'Projekt jest skierowany do młodych programistów, którzy będą mieli szanse sprawdzić swoje umiejętności dziedzinie programowania.',
    },
  ],
};

const shuffleImgs = () => {
  gameConfig.imgs = gameConfig.imgs.sort(() => Math.random() - 0.5);
};

const state = {
  isPlaying: false,
  timerInterval: null,
  timeToAnswerInterval: null,
  score: 0,
  isListening: false,
};

const renderInfoPanel = () => {
  const markup = `
        <h3>Czas do rozpoczęcia gry: <span class="timer">${gameConfig.timeToStart}</span></h3>
    `;
  infoPanel.innerHTML = '';
  infoPanel.insertAdjacentHTML('afterbegin', markup);
};

const renderCards = () => {
  const markup = gameConfig.imgs
    .map((img) => {
      return `
            <div id=${img.id} class="img-container">
                <img src="${img.url}" alt="Image" />
            </div>
        `;
    })
    .join(' ');
  game.innerHTML = '';
  game.insertAdjacentHTML('afterbegin', markup);
};

const renderScoreSection = () => {
  const markup = `
        <h3>Twój wynik to: <span class="score"></span> ${state.score}</h3>
    `;
  score.innerHTML = '';
  score.insertAdjacentHTML('afterbegin', markup);
};

const reverseCards = () => {
  const allImgs = document.querySelectorAll('.img-container');

  allImgs.forEach((img) => img.classList.toggle('hide'));
};

const timer = () => {
  gameConfig.timeToStart = 10;
  const timerSpan = document.querySelector('.timer');
  state.timerInterval = setInterval(() => {
    gameConfig.timeToStart = gameConfig.timeToStart - 1;

    if (gameConfig.timeToStart === 3) {
      startSound.play();
    }

    if (gameConfig.timeToStart === 0) {
      clearInterval(state.timerInterval);
      reverseCards();
      renderScoreSection();
      gamePlay();
    }

    timerSpan.textContent = gameConfig.timeToStart;
  }, 1000);
};

const endGame = () => {
  const markup = `
  <h3>Gratulujemy! Właśnie zakończyłeś swoją grę 👏👏👏</h3>
  `;
  infoPanel.textContent = '';
  infoPanel.insertAdjacentHTML('afterbegin', markup);

  const scoreMarkup = `
    <h3>Wynik jaki uzyskałeś to: ${state.score}</h3>
    <div class="score__buttons">
      <button class="btn restart-btn">Restart</button>
    </div>
  `;
  score.innerHTML = '';
  score.insertAdjacentHTML('afterbegin', scoreMarkup);

  document.querySelector('.restart-btn').addEventListener('click', () => {
    restartGame();
  });
};

let allImgs;
let usedPhotos = [];
let num;

const gamePlay = () => {
  allImgs = document.querySelectorAll('.img-container');

  const newItem = () => {
    if (usedPhotos.length === gameConfig.imgs.length) return endGame();

    const makeNum = () => {
      num = Math.floor(Math.random() * gameConfig.imgs.length);
      if (usedPhotos.includes(num)) {
        console.log('Już Cię mam');
        return makeNum();
      }
    };

    makeNum();

    const markup = `
    <img class="infoImg" src="${gameConfig.imgs[num].url}" />

  `;
    infoPanel.innerHTML = '';
    infoPanel.insertAdjacentHTML('afterbegin', markup);
  };

  newItem();

  const gameListener = (e) => {
    const el = e.target;
    if (
      !el.classList.contains('img-container') ||
      el.classList.contains('correct') ||
      el.classList.contains('bad')
    )
      return;

    if (el.children[0].src === document.querySelector('.infoImg').src) {
      console.log('Matched');
      state.score++;
      renderScoreSection();
      el.classList.remove('hide');
      el.classList.add('correct');
      usedPhotos.push(num);
      console.log(usedPhotos);
      newItem();
    } else {
      console.log('Did not match');
      let goodAnswer;
      allImgs.forEach((el) => {
        if (el.children[0].src === document.querySelector('.infoImg').src) {
          goodAnswer = el;
        }
      });
      el.classList.remove('hide');
      setTimeout(() => {
        el.classList.add('hide');
      }, 750);

      goodAnswer.classList.remove('hide');
      goodAnswer.classList.add('bad');

      usedPhotos.push(num);

      console.log(usedPhotos);
      newItem();
    }
  };

  if (state.isListening === false) {
    game.addEventListener('click', gameListener);
    state.isListening = true;
  }
};

const initGame = () => {
  state.isPlaying = true;

  // Shuffle imgs
  shuffleImgs();

  // Render info panel
  renderInfoPanel();

  // Render images
  renderCards();

  // Start timer
  timer();
};

const restartGame = () => {
  allImgs = undefined;
  usedPhotos = [];
  state.isPlaying = false;
  state.timerInterval = null;
  state.timeToAnswerInterval = null;
  state.score = 0;
  gameConfig.timeToStart = 10;
  renderScoreSection();
  initGame();
};

gameBtn.addEventListener('click', () => {
  initGame();
});
