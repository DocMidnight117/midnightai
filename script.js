const menuButton = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-main-nav]');
const year = document.querySelector('#year');
const socialsOpenButton = document.querySelector('[data-socials-open]');
const socialsModal = document.querySelector('[data-socials-modal]');
const socialsCloseButton = document.querySelector('[data-socials-close]');
const topLinks = document.querySelectorAll('a[href="#top"]');

if (year) {
  year.textContent = String(new Date().getFullYear());
}

topLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });

    if (window.location.hash !== '#top') {
      history.replaceState(null, '', '#top');
    }
  });
});

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isHidden = nav.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', String(!isHidden));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.add('hidden');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

if (socialsOpenButton && socialsModal && socialsCloseButton) {
  let lastFocusedElement = null;

  const getFocusableElements = () =>
    Array.from(
      socialsModal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    );

  const closeSocials = () => {
    socialsModal.classList.remove('is-open');
    socialsOpenButton.setAttribute('aria-expanded', 'false');
    socialsModal.setAttribute('aria-hidden', 'true');

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  socialsOpenButton.addEventListener('click', () => {
    const willOpen = !socialsModal.classList.contains('is-open');
    if (!willOpen) {
      closeSocials();
      return;
    }

    lastFocusedElement = document.activeElement;
    socialsModal.classList.add('is-open');
    socialsOpenButton.setAttribute('aria-expanded', 'true');
    socialsModal.setAttribute('aria-hidden', 'false');
    socialsCloseButton.focus();
  });

  socialsCloseButton.addEventListener('click', closeSocials);

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const clickedInsideModal = socialsModal.contains(target);
    const clickedOpenButton = socialsOpenButton.contains(target);

    if (!clickedInsideModal && !clickedOpenButton && socialsModal.classList.contains('is-open')) {
      closeSocials();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && socialsModal.classList.contains('is-open')) {
      const focusableElements = getFocusableElements();
      if (!focusableElements.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    if (event.key === 'Escape' && socialsModal.classList.contains('is-open')) {
      closeSocials();
    }
  });
}
