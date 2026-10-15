(() => {
  // Discourage casual saving; public web images cannot be copy-protected.
  const artworkSelector = 'main img, main canvas';
  document.querySelectorAll('main img').forEach(image => {
    image.draggable = false;
  });
  for (const eventName of ['contextmenu', 'dragstart']) {
    document.addEventListener(eventName, event => {
      if (event.target instanceof Element && event.target.closest(artworkSelector)) {
        event.preventDefault();
      }
    });
  }
})();
