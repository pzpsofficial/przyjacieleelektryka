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
    start: 'top-=300px top',
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
      duration: 1,
      xPercent: 0,
      ease: 'expo',
      scrollTrigger: {
        trigger: section.querySelector('.img'),
        start: 'top 20%',
      },
    }
  );
  gsap.fromTo(
    section.querySelector('.content'),
    { xPercent: xText },
    {
      duration: 1,
      xPercent: 0,
      ease: 'expo',
      scrollTrigger: {
        trigger: section.querySelector('.img'),
        start: 'top 20%',
      },
    }
  );
});
