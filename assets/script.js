const SITE_BASE = '';
console.log('Nova Vox Interstellar loaded');

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (!main) return;

  fetch('../posts/index.json')
    .then(r => r.json())
    .then(data => {
      const currentSection = window.location.pathname.split('/').filter(Boolean).pop();
      const categories = new Set(data.map(p => p.category));
      if (currentSection !== 'archives' && !categories.has(currentSection)) return;

      const search = document.createElement('input');
      search.type = 'search';
      search.id = 'tag-filter';
      search.placeholder = 'Filtrer par tag';
      main.appendChild(search);

      const list = document.createElement('div');
      list.id = 'posts-list';
      main.appendChild(list);

      const posts = currentSection === 'archives' ? data : data.filter(p => p.category === currentSection);
      posts.forEach(p => {
        const card = document.createElement('article');
        card.className = 'post-card';
        card.dataset.tags = p.tags.join(',');
        card.innerHTML = `<h2><a href="../posts/${p.slug}.html">${p.title}</a></h2>\n<p>${p.excerpt}</p>\n<small>${p.date_publication}</small>`;
        list.appendChild(card);
      });

      const cards = Array.from(list.children);
      search.addEventListener('input', () => {
        const q = search.value.trim().toLowerCase();
        cards.forEach(card => {
          const tags = card.dataset.tags.toLowerCase();
          card.style.display = q === '' || tags.includes(q) ? '' : 'none';
        });
      });
    })
    .catch(err => console.error('Erreur chargement index', err));
});
