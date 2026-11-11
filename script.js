document.documentElement.classList.add('has-js');
const menuButton = document.querySelector('.nav-toggle');
const navigation = document.querySelector('#site-nav');
document.querySelector('[data-print-cv]')?.addEventListener('click', () => window.print());

if (menuButton && navigation) {
  function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.querySelector('span').textContent = '+';
    navigation.classList.remove('is-open');
  }
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(expanded));
    menuButton.querySelector('span').textContent = expanded ? '−' : '+';
    navigation.classList.toggle('is-open', expanded);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });
  window.matchMedia('(min-width: 521px)').addEventListener('change', closeMenu);
}

const filters = document.querySelector('.publication-filters');
const publications = [...document.querySelectorAll('.publication')];
const filterStatus = document.querySelector('#publication-status');
if (filters && publications.length) {
  filters.hidden = false;
  filters.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filters.querySelectorAll('button').forEach(item => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      publications.forEach(item => { item.hidden = filter !== 'all' && item.dataset.kind !== filter; });
      const visibleCount = publications.filter(item => !item.hidden).length;
      if (filterStatus) filterStatus.textContent = `${visibleCount} ${filter === 'all' ? 'publications and technical documents' : button.textContent.toLowerCase()} shown.`;
    });
  });
}
