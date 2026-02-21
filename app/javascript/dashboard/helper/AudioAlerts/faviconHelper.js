export const showBadgeOnFavicon = () => {
  // [UNICHAT] Disable dynamic badge favicon to prevent Chatwoot logo leakage
  // const favicons = document.querySelectorAll('.favicon');
  // favicons.forEach(favicon => {
  //   const newFileName = `/favicon-badge-${favicon.sizes[[0]]}.png`;
  //   favicon.href = newFileName;
  // });
};

export const initFaviconSwitcher = () => {
  // const favicons = document.querySelectorAll('.favicon');

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // [UNICHAT] Keep branding consistent
      // favicons.forEach(favicon => {
      //   const oldFileName = `/favicon-${favicon.sizes[[0]]}.png`;
      //   favicon.href = oldFileName;
      // });
    }
  });
};
