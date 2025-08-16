document.addEventListener('DOMContentLoaded', () => {
  // Theme related elements
  const themeButtons = document.querySelectorAll('.theme-option');
  const body = document.body;
  const settingsNavIcon = document.getElementById('settings-nav-icon');
  const settingsButton = document.querySelector('.settings-button');
  const settingsPopup = document.getElementById('settingsPopup');
  const closeBtn = document.querySelector('.close-btn');
  const languageOptions = document.querySelectorAll('.language-option');

  // Update gear icon based on theme
  const updateGearIconTheme = () => {
    if (!settingsNavIcon) return;
    if (body.classList.contains('light-theme')) {
      settingsNavIcon.style.color = '#000000';
    } else {
      settingsNavIcon.style.color = '#ffffff';
    }
  };

  // Apply theme function
  const applyTheme = (theme) => {
    // Reset theme classes
    body.classList.remove('light-theme', 'dark-theme');
    
    if (theme === 'light') {
      body.classList.add('light-theme');
    } else {
      body.classList.add('dark-theme');
    }
    updateGearIconTheme();
    // Update active class on buttons
    themeButtons.forEach(button => {
      if (button.dataset.theme === theme) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
  };

  // Toggle Settings Popup
  function toggleSettings(show = null) {
    if (!settingsPopup) return;
    
    const isOpening = show === null ? !settingsPopup.classList.contains('active') : show;
    
    if (isOpening) {
      // Prepare for entry animation
      settingsPopup.style.display = 'flex';
      // Force reflow to ensure animation runs
      void settingsPopup.offsetHeight;
      settingsPopup.classList.add('active');
      settingsPopup.classList.remove('closing');
      document.body.style.overflow = 'hidden';
    } else {
      // Start exit animation
      settingsPopup.classList.add('closing');
      settingsPopup.classList.remove('active');
      
      // Restore styles after animation
      setTimeout(() => {
        if (settingsPopup) {
          settingsPopup.style.display = 'none';
          settingsPopup.classList.remove('closing');
        }
        document.body.style.overflow = '';
      }, 300); // Match this with your CSS animation duration
    }
  }

  // Initialize theme from localStorage or prefer-color-scheme
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // Default to dark theme if no preference is set
    return 'dark';
  };
  
  const preferredTheme = getPreferredTheme();
  applyTheme(preferredTheme);

  // Theme button event listeners
  themeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const newTheme = button.dataset.theme;
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  });

  // Settings popup event listeners
  if (settingsButton) {
    settingsButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSettings();
    });
  }

  if (settingsPopup) {
    // Close when clicking outside
    settingsPopup.addEventListener('click', (e) => {
      if (e.target === settingsPopup) {
        toggleSettings(false);
      }
    });
  }

  if (closeBtn) {
    // Close with close button
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSettings(false);
    });
  }

  // Language selection (if needed)
  if (languageOptions.length > 0) {
    languageOptions.forEach(option => {
      option.addEventListener('click', () => {
        languageOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        // Add language change logic here if needed
      });
    });
  }
});
