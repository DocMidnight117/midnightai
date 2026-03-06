const year = document.querySelector('#year');
const socialsOpenButtons = document.querySelectorAll('[data-socials-open]');
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

const hamburgerBtn = document.querySelector('[data-menu-toggle]');
const navOverlay = document.querySelector('[data-nav-overlay]');
const navDrawer = document.querySelector('[data-nav-drawer]');
const drawerCloseBtn = document.querySelector('[data-drawer-close]');

if (hamburgerBtn && navOverlay && navDrawer && drawerCloseBtn) {
  const openDrawer = () => {
    navDrawer.classList.add('is-open');
    navOverlay.classList.add('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    navDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    drawerCloseBtn.focus();
  };

  const closeDrawer = () => {
    navDrawer.classList.remove('is-open');
    navOverlay.classList.remove('is-open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    hamburgerBtn.focus();
  };

  hamburgerBtn.addEventListener('click', openDrawer);
  drawerCloseBtn.addEventListener('click', closeDrawer);
  navOverlay.addEventListener('click', closeDrawer);

  navDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navDrawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

if (socialsOpenButtons.length > 0 && socialsModal && socialsCloseButton) {
  let lastFocusedElement = null;

  const getFocusableElements = () =>
    Array.from(
      socialsModal.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
    );

  const closeSocials = () => {
    socialsModal.classList.remove('is-open');
    socialsOpenButtons.forEach((b) => b.setAttribute('aria-expanded', 'false'));
    socialsModal.setAttribute('aria-hidden', 'true');

    if (lastFocusedElement instanceof HTMLElement) {
      lastFocusedElement.focus();
    }
  };

  socialsOpenButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // If triggered from inside the mobile drawer, close the drawer first
      if (navDrawer && navDrawer.contains(btn)) {
        navDrawer.classList.remove('is-open');
        navOverlay && navOverlay.classList.remove('is-open');
        hamburgerBtn && hamburgerBtn.setAttribute('aria-expanded', 'false');
        navDrawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }

      const willOpen = !socialsModal.classList.contains('is-open');
      if (!willOpen) {
        closeSocials();
        return;
      }

      lastFocusedElement = document.activeElement;
      socialsModal.classList.add('is-open');
      socialsOpenButtons.forEach((b) => b.setAttribute('aria-expanded', 'true'));
      socialsModal.setAttribute('aria-hidden', 'false');
      socialsCloseButton.focus();
    });
  });

  socialsCloseButton.addEventListener('click', closeSocials);

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const clickedInsideModal = socialsModal.contains(target);
    const clickedOpenButton = Array.from(socialsOpenButtons).some((b) => b.contains(target));

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
