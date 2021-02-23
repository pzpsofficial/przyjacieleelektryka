const gameContainer = document.querySelector('.section-gra');
const infoPanel = document.querySelector('.info-panel');
const game = document.querySelector('.game');
const score = document.querySelector('.score');
const gameBtn = document.querySelector('.game-btn');

const startSound = new Audio(
  require('../imgs/zapsplat_multimedia_game_sound_retro_car_racing_start_beeps_001_34949.mp3')
);
const winSound = new Audio(require('../imgs/cartoon_success_fanfair.mp3'));
const loseSound = new Audio(
  require('../imgs/zapsplat_cartoon_fail_negative_descending_musical_tuba_marimba_oboe_18126.mp3')
);
winSound.volume = 0.5;

const gameConfig = {
  timeToStart: 10,
  timeToAnswer: 3000,
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

const state = {
  isPlaying: false,
  timerInterval: null,
  timeToAnswerInterval: null,
  score: 0,
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

const gamePlay = () => {
  let num = Math.floor(Math.random() * gameConfig.imgs.length);
  console.log(num);
  const markup = `
    <img src="${gameConfig.imgs[num].url}" />
    <div class="bar"></div>
  `;
  infoPanel.innerHTML = '';
  infoPanel.insertAdjacentHTML('afterbegin', markup);

  const bar = document.querySelector('.bar');

  state.timeToAnswerInterval = setInterval(() => {
    bar.style.width = `${0.3 * gameConfig.timeToAnswer}px`;

    if (gameConfig.timeToAnswer < 0) {
      clearInterval(state.timeToAnswerInterval);
    }

    gameConfig.timeToAnswer -= 1000;
  }, 1000);

  game.addEventListener('click', (e) => {
    const el = e.target;
    if (
      !el.classList.contains('img-container') ||
      el.classList.contains('correct')
    )
      return;

    if (Number(el.getAttribute('id')) === num + 1) {
      state.score++;
      renderScoreSection();
      el.classList.remove('hide');
      el.classList.add('correct');
      winSound.play();
    } else {
      loseSound.play();
    }
  });
};

const initGame = () => {
  state.isPlaying = true;

  // Render info panel
  renderInfoPanel();

  // Render images
  renderCards();

  // Start timer
  timer();
};

gameBtn.addEventListener('click', () => {
  initGame();
});
