let lottieInstance = null;

export async function loadLottie() {
  if (lottieInstance) {
    return lottieInstance;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js';
    script.onload = () => {
      lottieInstance = window.lottie;
      resolve(lottieInstance);
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export async function loadLottieAnimation(options) {
  const lottie = await loadLottie();
  if (lottie) {
    return lottie.loadAnimation(options);
  }
  return null;
}