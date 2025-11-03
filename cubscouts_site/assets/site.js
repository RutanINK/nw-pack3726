// assets/site.js
async function include(selector){
  const els = document.querySelectorAll(`[data-include="${selector}"]`);
  const res = await fetch(selector);
  const html = await res.text();
  els.forEach(el => el.outerHTML = html);
}

async function boot(){
  await Promise.all([include("/partials/header.html"), include("/partials/footer.html")]);
  const y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
}
document.addEventListener("DOMContentLoaded", boot);
