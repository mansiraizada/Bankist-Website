'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');

///////////////////////////////////////
// Mobile Navigation
const navToggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

const openMobileNav = function() {
  navLinks.classList.add('nav__links--open');
  // Prevent body scroll when menu is open
  document.body.style.overflow = 'hidden';
  
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
  spans[1].style.opacity = '0';
  spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
};

const closeMobileNav = function() {
  navLinks.classList.remove('nav__links--open');
  // Re-enable body scroll
  document.body.style.overflow = '';
  
  // Reset hamburger animation
  const spans = navToggle.querySelectorAll('span');
  spans[0].style.transform = '';
  spans[1].style.opacity = '';
  spans[2].style.transform = '';
};

const toggleMobileNav = function() {
  if (navLinks.classList.contains('nav__links--open')) {
    closeMobileNav();
  } else {
    openMobileNav();
  }
};

// Mobile navigation event listeners
if (navToggle) {
  navToggle.addEventListener('click', toggleMobileNav);
}

// Close mobile nav when clicking outside
document.addEventListener('click', function(e) {
  if (navLinks.classList.contains('nav__links--open') && 
      !nav.contains(e.target)) {
    closeMobileNav();
  }
});

// Close mobile nav on window resize (if switching to desktop)
window.addEventListener('resize', function() {
  if (window.innerWidth > 768 && navLinks.classList.contains('nav__links--open')) {
    closeMobileNav();
  }
});

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
  // Close mobile nav with Escape key
  if (e.key === 'Escape' && navLinks.classList.contains('nav__links--open')) {
    closeMobileNav();
  }
});

///////////////////////////////////////
// Button scrolling
if (btnScrollTo) {
  btnScrollTo.addEventListener('click', function (e) {
    const s1coords = section1.getBoundingClientRect();
    // console.log(s1coords);

    // console.log(e.target.getBoundingClientRect());

    // console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

    // console.log(
    //   'height/width viewport',
    //   document.documentElement.clientHeight,
    //   document.documentElement.clientWidth
    // );

    // Scrolling
    // window.scrollTo(
    //   s1coords.left + window.pageXOffset,
    //   s1coords.top + window.pageYOffset
    // );

    // window.scrollTo({
    //   left: s1coords.left + window.pageXOffset,
    //   top: s1coords.top + window.pageYOffset,
    //   behavior: 'smooth',
    // });

    section1.scrollIntoView({ behavior: 'smooth' });
  });
}

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

if (navLinks) {
  navLinks.addEventListener('click', function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains('nav__link')) {
      const id = e.target.getAttribute('href');
      
      // Only scroll if it's an internal link (starts with #)
      if (id && id.startsWith('#')) {
        const targetSection = document.querySelector(id);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
      
      // Close mobile navigation after clicking a link
      if (navLinks.classList.contains('nav__links--open')) {
        closeMobileNav();
      }
    }
  });
}

///////////////////////////////////////
// Tabbed component

if (tabsContainer) {
  tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');

    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('operations__tab--active'));
    tabsContent.forEach(c => c.classList.remove('operations__content--active'));

    // Activate tab
    clicked.classList.add('operations__tab--active');

    // Activate content area
    const contentElement = document.querySelector(`.operations__content--${clicked.dataset.tab}`);
    if (contentElement) {
      contentElement.classList.add('operations__content--active');
    }
  });
}

///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    if (logo) logo.style.opacity = this;
  }
};

// Passing "argument" into handler
// Only apply hover effects on desktop (avoid on touch devices)
if (window.innerWidth > 768) {
  nav.addEventListener('mouseover', handleHover.bind(0.5));
  nav.addEventListener('mouseout', handleHover.bind(1));
}

// Update hover effects on window resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    nav.addEventListener('mouseover', handleHover.bind(0.5));
    nav.addEventListener('mouseout', handleHover.bind(1));
  } else {
    nav.removeEventListener('mouseover', handleHover.bind(0.5));
    nav.removeEventListener('mouseout', handleHover.bind(1));
    // Reset opacity for mobile
    const navLinksAll = nav.querySelectorAll('.nav__link');
    const logo = nav.querySelector('img');
    navLinksAll.forEach(link => link.style.opacity = '');
    if (logo) logo.style.opacity = '';
  }
});

//Sticky navigation
// const scrollPosition = section1.getBoundingClientRect();
// window.addEventListener('scroll', function() {
//   if(window.scrollY > scrollPosition.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

//Intersection API
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
//Does not work
// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

if (header) {
  headerObserver.observe(header);
}

//Reveal section
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const revealObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSection.forEach(function (section) {
  revealObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadingImg = function(entries, observer) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadingImg, {
  root: null,
  threshold: 0.5,
  rootMargin: '200px'
});

imgTargets.forEach(function (img) {
  imgObserver.observe(img);
  img.classList.add('lazy-img');
});

//Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  // Guard clause - exit if no slides found
  if (!slides.length) return;

  let curSlide = 0;
  const maxSlide = slides.length;

//Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`);
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
    const activeDot = document.querySelector(`.dots__dot[data-slide="${slide}"]`);
    if (activeDot) activeDot.classList.add('dots__dot--active');
  };

  const gotoSlide = function(slide) {
    slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  };

//Next Slide
const nextSlide = function() {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  
  gotoSlide(curSlide);
  activateDot(curSlide);
};

//Previous Slide
const prevSlide = function() {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  gotoSlide(curSlide);
  activateDot(curSlide);
};

const init = function() {
  gotoSlide(0);
  if (dotContainer) {
    createDots();
    activateDot(0);
  }
};
init();

//Event Handlers
if (btnRight) btnRight.addEventListener('click', nextSlide);
if (btnLeft) btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function(e) {
  if(e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

if (dotContainer) {
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset;
      gotoSlide(slide);
      activateDot(slide);
    }
  });
}

// Auto-play slider (optional)
let autoSlideInterval;
const startAutoSlide = function() {
  autoSlideInterval = setInterval(nextSlide, 5000);
};

const stopAutoSlide = function() {
  clearInterval(autoSlideInterval);
};

// Start auto-slide
startAutoSlide();

// Pause auto-slide on hover (desktop only)
if (window.innerWidth > 768) {
  const sliderContainer = document.querySelector('.slider');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
  }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const handleSwipe = function() {
  const swipeThreshold = 50;
  const swipeDistance = touchEndX - touchStartX;
  
  if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
      prevSlide(); // Swipe right
    } else {
      nextSlide(); // Swipe left
    }
  }
};

const sliderContainer = document.querySelector('.slider');
if (sliderContainer) {
  sliderContainer.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  sliderContainer.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
}

};
slider();

document.addEventListener('DOMContentLoaded', function(e) {
  console.log('Page loaded', e);
});

window.addEventListener('load', function(e) {
  console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload', function(e) {
  e.preventDefault();
  console.log(e);
  e.returnValue = "No matter what we write here, we'll always get a generic message";
});
