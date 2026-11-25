// The light switch, and a film that loads from YouTube only when someone presses play.
const root = document.documentElement;
const button = document.querySelector('.mode');
const theme = document.querySelector('meta[name="theme-color"]');
const isDark = () => root.dataset.mode !== 'light';

function sync() {
  const dark = isDark();
  button.textContent = dark ? 'Light' : 'Dark';
  button.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} mode`);
  theme.content = dark ? '#1f1e1b' : '#fffff8';
}

button.addEventListener('click', () => {
  root.dataset.mode = isDark() ? 'light' : 'dark';
  try { localStorage.setItem('mode', root.dataset.mode); } catch {}
  sync();
});
sync();

for (const link of document.querySelectorAll('a.yt')) {
  link.addEventListener('click', (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button) return;
    event.preventDefault();
    const player = document.createElement('iframe');
    player.src = `https://www.youtube-nocookie.com/embed/${link.dataset.yt}?autoplay=1&rel=0`;
    player.title = link.dataset.title;
    player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    player.allowFullscreen = true;
    player.referrerPolicy = 'strict-origin-when-cross-origin';
    link.replaceWith(player);
    player.focus();
  });
}
