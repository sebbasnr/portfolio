document.addEventListener('DOMContentLoaded', () => {
    // Initialize settings icon animation
    const settingsNavIcon = document.getElementById('settings-nav-icon');
    if (settingsNavIcon) {
        const settingsNavAnim = lottie.loadAnimation({
            container: settingsNavIcon,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/animated-icons/system-regular-63-settings-cog-hover-cog-1.json'
        });
    }
});
