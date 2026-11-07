(() => {
  const canvas = document.getElementById('warrior-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  const poster = document.getElementById('warrior-poster');
  const buttons = [...document.querySelectorAll('[data-action]')];
  const pauseButton = document.getElementById('pause-previews');
  const status = document.getElementById('preview-status');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const cache = new Map();
  let data, action = 'All', frame = 0, elapsed = 0, previousTime = null;
  let paused = motionPreference.matches, completed = false, loading = false, ticket = 0;

  function updateControls() {
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.action === action)));
    pauseButton.textContent = paused ? 'Play' : completed ? 'Replay' : 'Pause';
    pauseButton.setAttribute('aria-pressed', String(paused));
    const label = data?.actions[action].label || 'Preview';
    status.textContent = loading ? `Loading ${label}…` : completed
      ? `${label} complete. Select an action to replay.`
      : `${label} ${paused ? 'paused.' : data.actions[action].loop ? 'playing · loops.' : 'playing · once.'}`;
    canvas.setAttribute('aria-label', `Demon Glutton ${label.toLowerCase()} preview`);
  }

  function draw() {
    const sample = data.actions[action].frames[frame];
    const image = cache.get(sample.src)?.image;
    if (!image) return;
    context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, data.width, data.height);
    context.drawImage(image, sample.x, sample.y, data.width, data.height, 0, 0, data.width, data.height);
  }

  function loadSheet(src) {
    if (cache.has(src)) return cache.get(src).promise;
    const image = new Image();
    const record = { image, promise: null };
    record.promise = new Promise((resolve, reject) => {
      image.onload = () => {
        if (image.naturalWidth % data.width || image.naturalHeight % data.height) {
          cache.delete(src); reject(new Error('Invalid animation dimensions'));
        } else resolve(image);
      };
      image.onerror = () => { cache.delete(src); reject(new Error('Animation could not load')); };
      image.src = src;
    });
    cache.set(src, record);
    return record.promise;
  }

  async function selectAction(name) {
    const request = ++ticket;
    action = name; loading = true; previousTime = null;
    updateControls();
    try {
      await Promise.all([...new Set(data.actions[name].frames.map(f => f.src))].map(loadSheet));
      if (request !== ticket) return;
      frame = 0; elapsed = 0; completed = false; loading = false;
      canvas.hidden = false; poster.hidden = true;
      draw(); updateControls();
    } catch {
      if (request !== ticket) return;
      loading = false; paused = true;
      canvas.hidden = true; poster.hidden = false;
      status.textContent = 'Preview could not load. Select an action to retry.';
    }
  }

  function tick(time) {
    if (data && !paused && !completed && !loading && !document.hidden) {
      if (previousTime !== null) {
        elapsed += Math.min(time - previousTime, 100);
        const animation = data.actions[action];
        let changed = false;
        while (elapsed >= animation.frames[frame].duration) {
          elapsed -= animation.frames[frame].duration;
          if (frame + 1 < animation.frames.length) frame++;
          else if (animation.loop) frame = 0;
          else { completed = true; elapsed = 0; updateControls(); break; }
          changed = true;
        }
        if (changed) draw();
      }
      previousTime = time;
    } else previousTime = null;
    requestAnimationFrame(tick);
  }

  buttons.forEach(button => button.addEventListener('click', () => selectAction(button.dataset.action)));
  pauseButton.addEventListener('click', () => {
    if (completed) { paused = false; selectAction(action); }
    else { paused = !paused; previousTime = null; updateControls(); }
  });
  motionPreference.addEventListener('change', event => {
    if (event.matches) { paused = true; previousTime = null; if (data) updateControls(); }
  });
  fetch('assets/bestiary-pack-03/glutton.json').then(response => {
    if (!response.ok) throw new Error('Preview unavailable');
    return response.json();
  }).then(async manifest => {
    data = manifest;
    canvas.width = data.width; canvas.height = data.height;
    await selectAction(data.default);
    buttons.forEach(button => button.disabled = false);
    pauseButton.disabled = false;
    requestAnimationFrame(tick);
  }).catch(() => {
    status.textContent = 'Animation controls could not load. Please reload the page.';
  });
})();
