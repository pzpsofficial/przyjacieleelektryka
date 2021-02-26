import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Animacje dla sekcji hero

const herotl = gsap.timeline();

herotl
  .add(gsap.to('.overlay__content', { duration: 1, opacity: 1 }))
  .add(
    gsap.to('.overlay', {
      xPercent: -100,
      delay: 0.5,
      duration: 1,
      ease: 'circ',
    })
  )

  .add(
    gsap.fromTo(
      '.text',
      { yPercent: -150, opacity: 0 },
      { duration: 0.8, ease: 'circ', yPercent: 0, opacity: 1 }
    )
  )
  .add(
    gsap.fromTo(
      '.header',
      { yPercent: -100 },
      { duration: 0.5, ease: 'circ', yPercent: 0 }
    )
  );

// Animacje dla poszczególnych sekcji

setTimeout(() => {
  ScrollTrigger.create({
    trigger: '.text',
    start: 'top 8vh',
    onEnter: (self) => {
      document.querySelector('.header').classList.add('active');
    },
    onLeaveBack: (self) => {
      document.querySelector('.header').classList.remove('active');
    },
  });
}, 4000);

document.querySelectorAll('.section').forEach((section) => {
  let xImg;
  let xText;

  if (section.classList.contains('img-left')) {
    xImg = -100;
    xText = 100;
  }

  if (!section.classList.contains('img-left')) {
    xImg = 100;
    xText = -100;
  }

  gsap.fromTo(
    section.querySelector('.img'),
    { xPercent: xImg },
    {
      delay: 0.1,
      duration: 1,
      xPercent: 0,
      ease: 'expo',
      scrollTrigger: {
        trigger: section.querySelector('.img'),
        start: 'top center',
      },
    }
  );
  gsap.fromTo(
    section.querySelector('.content'),
    { xPercent: xText },
    {
      delay: 0.1,
      duration: 1,
      xPercent: 0,
      ease: 'expo',
      scrollTrigger: {
        trigger: section.querySelector('.img'),
        start: 'top center',
      },
    }
  );
});

gsap.fromTo(
  '.card',
  { yPercent: 20, opacity: 0 },
  {
    delay: 0.1,
    opacity: 1,
    duration: 0.5,
    yPercent: 0,
    stagger: 0.2,
    scrollTrigger: {
      trigger: '.card',
      start: 'top center',
    },
  }
);

gsap.fromTo(
  '.member',
  { yPercent: 50, opacity: 0 },
  {
    delay: 0.1,
    duration: 0.4,
    yPercent: 0,
    opacity: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.section-managment',
      start: 'top center',
    },
  }
);

gsap.fromTo(
  '.member-2',
  { yPercent: 50, opacity: 0 },
  {
    delay: 0.1,
    duration: 0.4,
    yPercent: 0,
    opacity: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.section-managment-komisja',
      start: 'top center',
    },
  }
);

gsap.fromTo(
  '.support__card',
  { yPercent: 50, opacity: 0 },
  {
    delay: 0.1,
    duration: 0.5,
    opacity: 1,
    yPercent: 1,
    stagger: 0.7,
    scrollTrigger: {
      trigger: '.section-support',
      start: 'top center',
    },
  }
);

gsap.fromTo(
  '.form',
  { yPercent: 50, opacity: 0 },
  {
    delay: 0.1,
    duration: 0.5,
    opacity: 1,
    yPercent: 1,
    scrollTrigger: {
      trigger: '.section-form',
      start: 'top center',
    },
  }
);

gsap.fromTo(
  '.reward_img',
  { yPercent: 50, opacity: 0 },
  {
    duration: 0.5,
    opacity: 1,
    yPercent: 0,
    scrollTrigger: {
      trigger: '.reward_img',
      start: 'top center',
    },
  }
);

gsap.fromTo(
  '.social__icon',
  { yPercent: 50, opacity: 0 },
  {
    duration: 0.5,
    opacity: 1,
    yPercent: 0,
    scrollTrigger: {
      trigger: '.section-social',
      start: 'top center',
    },
  }
);

gsap.fromTo(
  '.rewards-text',
  { yPercent: 50, opacity: 0 },
  {
    duration: 1,
    opacity: 1,
    yPercent: 0,
    scrollTrigger: {
      trigger: '.rewards-text',
      start: 'top center',
    },
  }
);
