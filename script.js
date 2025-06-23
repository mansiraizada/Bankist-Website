const navToggle = document.getElementById('nav-toggle');
      const navLinks = document.getElementById('nav-links');

      navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav__links--open');
      });

      // Close mobile nav when clicking on a link
      navLinks.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav__link')) {
          navLinks.classList.remove('nav__links--open');
        }
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('.nav__link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });

      // Learn more button scroll
      document.querySelector('.btn--scroll-to')?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#section--1').scrollIntoView({
          behavior: 'smooth'
        });
      });

      // Operations tabs functionality
      const tabsContainer = document.querySelector('.operations__tab-container');
      
      if (tabsContainer) {
        tabsContainer.addEventListener('click', function(e) {
          const clicked = e.target.closest('.operations__tab');
          if (!clicked) return;

          // Remove active classes
          document.querySelectorAll('.operations__tab').forEach(tab => 
            tab.classList.remove('operations__tab--active')
          );
          document.querySelectorAll('.operations__content').forEach(content => 
            content.classList.remove('operations__content--active')
          );

          // Add active class to clicked tab
          clicked.classList.add('operations__tab--active');

          // Show corresponding content
          const tabNumber = clicked.dataset.tab;
          document.querySelector(`.operations__content--${tabNumber}`)
            .classList.add('operations__content--active');
        });
      }

      // Simple slider functionality
      let currentSlide = 0;
      const slides = document.querySelectorAll('.slide');
      const maxSlides = slides.length;

      // Create dots
      const dotsContainer = document.querySelector('.dots');
      if (dotsContainer) {
        slides.forEach((_, i) => {
          const dot = document.createElement('button');
          dot.classList.add('dots__dot');
          if (i === 0) dot.classList.add('dots__dot--active');
          dot.dataset.slide = i;
          dotsContainer.appendChild(dot);
        });
      }

      // Update slider position
      const updateSlider = (slide) => {
        slides.forEach((s, i) => {
          s.style.transform = `translateX(${100 * (i - slide)}%)`;
        });

        // Update dots
        document.querySelectorAll('.dots__dot').forEach(dot => 
          dot.classList.remove('dots__dot--active')
        );
        document.querySelector(`.dots__dot[data-slide="${slide}"]`)
          ?.classList.add('dots__dot--active');
      };

      // Initialize slider
      updateSlider(0);

      // Next slide
      document.querySelector('.slider__btn--right')?.addEventListener('click', () => {
        currentSlide = currentSlide === maxSlides - 1 ? 0 : currentSlide + 1;
        updateSlider(currentSlide);
      });

      // Previous slide
      document.querySelector('.slider__btn--left')?.addEventListener('click', () => {
        currentSlide = currentSlide === 0 ? maxSlides - 1 : currentSlide - 1;
        updateSlider(currentSlide);
      });

      // Dots navigation
      dotsContainer?.addEventListener('click', (e) => {
        if (e.target.classList.contains('dots__dot')) {
          currentSlide = +e.target.dataset.slide;
          updateSlider(currentSlide);
        }
      });

      // Modal functionality
      const modal = document.querySelector('.modal');
      const overlay = document.querySelector('.overlay');
      const btnCloseModal = document.querySelector('.btn--close-modal');
      const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

      const openModal = function(e) {
        e.preventDefault();
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
      };

      const closeModal = function() {
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
      };

      btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
      btnCloseModal?.addEventListener('click', closeModal);
      overlay?.addEventListener('click', closeModal);

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
          closeModal();
        }
      });

      // Auto-slide for testimonials
      setInterval(() => {
        currentSlide = currentSlide === maxSlides - 1 ? 0 : currentSlide + 1;
        updateSlider(currentSlide);
      }, 5000);
