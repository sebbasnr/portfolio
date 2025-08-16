document.addEventListener('DOMContentLoaded', () => {
    console.log('Settings popup script loaded');
    const settingsButton = document.querySelector('.settings-button');
    const settingsPopup = document.getElementById('settingsPopup');
    const closeBtn = settingsPopup?.querySelector('.close-btn');
    const themeOptions = document.querySelectorAll('.theme-option');
    const effectOptions = document.querySelectorAll('.effect-option');
    const languageOptions = document.querySelectorAll('.language-option');
    const settingsContent = settingsPopup?.querySelector('.settings-content');
    
    const savedEffect = localStorage.getItem('visualEffects') || 'enabled';
    document.body.setAttribute('data-visual-effects', savedEffect);
    
    effectOptions.forEach(option => {
        if (option.dataset.effect === savedEffect) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    if (!settingsButton || !settingsPopup || !closeBtn || !settingsContent) {
        console.error('Missing required elements');
        return;
    }

    let isMenuOpen = false;

    function openMenu() {
        if (isMenuOpen) return;
        
        settingsPopup.style.display = 'flex';
        
        requestAnimationFrame(() => {
            settingsPopup.classList.add('active');
        });
        
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflowY = 'scroll'; 
        document.body.style.paddingRight = '0';
        document.documentElement.style.paddingRight = '0';
        isMenuOpen = true;
    }

    function closeMenu() {
        if (!isMenuOpen) return;
        
        settingsPopup.classList.remove('active');
        
        setTimeout(() => {
            if (!settingsPopup.classList.contains('active')) {
                settingsPopup.style.display = 'none';
                document.body.style.overflow = '';
                document.documentElement.style.overflowY = ''; 
                document.body.style.paddingRight = '';
                document.documentElement.style.paddingRight = '';
            }
        }, 300);
        
        isMenuOpen = false;
    }

    settingsButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
    });

    document.addEventListener('click', (e) => {
        if (isMenuOpen && 
            !settingsContent.contains(e.target) && 
            !settingsButton.contains(e.target)) {
            closeMenu();
        }
    });

    settingsContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });

    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const theme = option.dataset.theme;
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            document.body.className = '';
            if (theme === 'light') {
                document.body.classList.add('light-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.body.classList.add('dark-theme');
                localStorage.setItem('theme', 'dark');
            }
            
            if (typeof updateIconColor === 'function') {
                updateIconColor();
            }
        });
    });
    
    effectOptions.forEach(option => {
        option.addEventListener('click', () => {
            const effect = option.dataset.effect;
            const isEnabled = effect === 'enabled';
            
            effectOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            document.body.setAttribute('data-visual-effects', effect);
            localStorage.setItem('visualEffects', effect);
            
            const event = new CustomEvent('visualEffectsChanged', { 
                detail: { enabled: isEnabled } 
            });
            document.dispatchEvent(event);
        });
    });

});
