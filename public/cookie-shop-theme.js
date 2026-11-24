(function () {
  try {
    var savedTheme = localStorage.getItem('cookie-shop-theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = savedTheme === 'dark' ||
      (savedTheme !== 'light' && systemDark);

    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch {
    // The website remains usable if localStorage is unavailable.
  }
})();
