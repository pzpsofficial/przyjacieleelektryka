import Typed from 'typed.js';

let options = {
  strings: ['Pszczoły', 'Młodzież', 'Talenty', 'Przyrodę', 'Potrzebujących'],
  typeSpeed: 100,
  backSpeed: 50,
  smartBackspace: false,
  startDelay: 1000,
  backDelay: 1000,
  loop: true,
  shuffle: true,
};

let typed = new Typed('.typed', options);
