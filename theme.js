const root = document.documentElement;
const btn = document.getElementById('theme-toggle');

const saved = localStorage.getItem('theme');
const system = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark' : 'light';
const theme = saved ?? system;

root.setAttribute('data-theme', theme);
btn.textContent = theme === 'dark' ? '☀️' : '🌙';

btn.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  btn.textContent = next === 'dark' ? '☀️' : '🌙';
});
