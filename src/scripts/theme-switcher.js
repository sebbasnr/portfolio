document.addEventListener('DOMContentLoaded', () => {
  const themeButtons = document.querySelectorAll('.theme-option');
  const body = document.body;

  const applyTheme = (theme) => {
    if (theme === 'light') {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
    themeButtons.forEach(button => {
      if (button.dataset.theme === theme) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });

    if (window.updateIconColor) {
      window.updateIconColor();
    }
  };

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const newTheme = button.dataset.theme;
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  });
});
