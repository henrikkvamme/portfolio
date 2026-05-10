(function () {
  try {
    var stored = window.localStorage.getItem('theme');
    var mode =
      stored === 'light' || stored === 'dark' || stored === 'system'
        ? stored
        : 'system';
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var resolved = mode === 'system' ? (prefersDark ? 'dark' : 'light') : mode;
    var root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(resolved);
    root.style.colorScheme = resolved;
  } catch (e) {}
})();
