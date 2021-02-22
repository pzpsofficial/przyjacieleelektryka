const gameContainer = document.querySelector('.section-gra');
const infoPanel = document.querySelector('.info-panel');
const game = document.querySelector('.game');
const score = document.querySelector('.score');
const gameBtn = document.querySelector('.game-btn');

const gameConfig = {
  timeToStart: 5,
  imgs: [
    {
      url: require('../imgs/cards/1.jpg'),
      description:
        'Piknik naukowy w Elektryku to wydarzenie, podczas którego uczniowe mogą zaprezentować swoje talenty i wynalazki.',
    },
    {
      url: require('../imgs/cards/2.jpg'),
      description:
        'Projekt ten umożliwia naszej młodzieży zdobycie umiejętności wykonywania samodzielnych projektów programistycznych.',
    },
    {
      url: require('../imgs/cards/3.jpg'),
      description:
        'Tematem ma być promocja pszczelarstwa oraz znaczenie pszczół dla życia na Ziemi. Dla uczniów przygotowano liczne konkursy oraz nagrody.',
    },
    {
      url: require('../imgs/cards/4.jpg'),
      description:
        'Stowarzyszenie wydało 1500 szt folderów z wycieczkami rowerowymi oraz 10 plansz w dużym formacie z których każda zawiera propozycję jednej wycieczki.',
    },
    {
      url: require('../imgs/cards/5.jpg'),
      description:
        'Młodzież zaprezentowała swoje umiejętności, zdobyte podczas warsztatów poetyckich i teatralnych.',
    },
    {
      url: require('../imgs/cards/6.jpg'),
      description:
        'W ramach memoriału odbył się turniej dla dzieci i młodzieży szkolnej oraz dla seniorów.',
    },
    {
      url: require('../imgs/cards/7.jpg'),
      description:
        'Młodzież debatowała w trzech obszarach tematycznych, w ramach których nasi szkolni eksperci przygotowali po trzy tematy/tezy do dyskusji.',
    },
    {
      url: require('../imgs/cards/8.jpg'),
      description:
        'Projekt jest skierowany do młodych programistów, którzy będą mieli szanse sprawdzić swoje umiejętności dziedzinie programowania.',
    },
  ],
};

const state = {
  isPlaying: false,
  timerInterval: null,
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
            <div class="img-container">
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

    if (gameConfig.timeToStart === 0) {
      clearInterval(state.timerInterval);
      reverseCards();
      renderScoreSection();
    }

    timerSpan.textContent = gameConfig.timeToStart;
  }, 1000);
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
