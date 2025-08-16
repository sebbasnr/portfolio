document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const settingsButton = document.querySelector('.settings-button');
  const settingsPopup = document.getElementById('settingsPopup');
  const closeBtn = settingsPopup?.querySelector('.close-btn');
  const themeOptions = document.querySelectorAll('.theme-option');
  const languageOptions = document.querySelectorAll('.language-option');
  const popupContent = settingsPopup?.querySelector('.settings-content');
  
  // Validación de elementos
  if (!settingsButton || !settingsPopup || !closeBtn || !popupContent) {
    console.error('No se encontraron todos los elementos necesarios');
    return;
  }

  // Estado del menú basado en el DOM
  const isOpen = () => settingsPopup.classList.contains('active');

  // Función para abrir el menú
  function openMenu() {
    if (isOpen()) return;
    
    settingsPopup.style.display = 'flex';
    // Pequeño retraso para la transición CSS
    requestAnimationFrame(() => {
      settingsPopup.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
  }

  // Función para cerrar el menú
  function closeMenu() {
    if (!isOpen()) return;
    
    settingsPopup.classList.remove('active');
    // Esperar a que termine la animación antes de ocultar
    setTimeout(() => {
      settingsPopup.style.display = 'none';
      document.body.style.overflow = '';
    }, 300);
  }

  // Toggle del menú con el botón de configuración
  settingsButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    isOpen() ? closeMenu() : openMenu();
  });

  // Cerrar con el botón de cerrar
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
  });

  // Cerrar con la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      closeMenu();
    }
  });

  // Cerrar al hacer clic fuera del contenido
  document.addEventListener('click', (e) => {
    if (!isOpen()) return;
    
    const clickOnButton = settingsButton.contains(e.target);
    const clickInContent = popupContent.contains(e.target);
    
    if (!clickOnButton && !clickInContent) {
      closeMenu();
    }
  });

  // Prevenir que los clics dentro del contenido cierren el menú
  popupContent.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Actualizar botones de tema
  function updateThemeButtons() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    themeOptions.forEach(option => {
      if (option.getAttribute('data-theme') === currentTheme) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  }

  // Manejar opciones de tema
  themeOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const theme = option.getAttribute('data-theme');
      localStorage.setItem('theme', theme);
      document.dispatchEvent(new Event('themeChanged'));
    });
  });

  // Manejar opciones de idioma
  languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      languageOptions.forEach(opt => opt.classList.remove('active'));
      option.classList.add('active');
    });
  });

  // Inicialización
  updateThemeButtons();
  document.addEventListener('themeChanged', updateThemeButtons);
});