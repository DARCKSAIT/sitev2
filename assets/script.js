const SITE_BASE = '';
console.log('Nova Vox Interstellar loaded');

function createCardArticle(p, heading = 'h2') {
  const card = document.createElement('article');
  card.className = 'card-article';
  card.innerHTML = `<${heading}><a href="${SITE_BASE}/posts/${p.slug}.html">${p.title}</a></${heading}>\n<p>${p.excerpt}</p>\n<small>${p.date_publication}</small>`;
  return card;
}

function blocContexte(html) {
  const section = document.createElement('section');
  section.className = 'bloc-contexte';
  section.innerHTML = `<h2>Contexte</h2>${html}`;
  return section;
}

function blocFaits(items) {
  const section = document.createElement('section');
  section.className = 'bloc-faits';
  const list = items.map(i => `<li>${i}</li>`).join('');
  section.innerHTML = `<h2>Faits vérifiés</h2><ul>${list}</ul>`;
  return section;
}

function blocAnalyse(html) {
  const section = document.createElement('section');
  section.className = 'bloc-analyse';
  section.innerHTML = `<h2>Analyse</h2>${html}`;
  return section;
}

function blocImpact(items) {
  const section = document.createElement('section');
  section.className = 'bloc-impact';
  const list = items.map(i => `<li>${i}</li>`).join('');
  section.innerHTML = `<h2>Impact pour les joueurs FR</h2><ul>${list}</ul>`;
  return section;
}

function banniereMaj(message) {
  const banner = document.createElement('div');
  banner.className = 'banniere-maj';
  banner.textContent = message;
  return banner;
}

window.NV = {
  createCardArticle,
  blocContexte,
  blocFaits,
  blocAnalyse,
  blocImpact,
  banniereMaj,
};

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main');
  if (!main) return;

  fetch(`${SITE_BASE}/posts/index.json`)
    .then(r => r.json())
    .then(data => {
      const latestContainer = document.getElementById('latest-posts');
      if (latestContainer) {
        const latest = [...data]
          .sort((a, b) => new Date(b.date_publication) - new Date(a.date_publication))
          .slice(0, 6);
        latest.forEach(p => {
          const card = createCardArticle(p, 'h3');
          latestContainer.appendChild(card);
        });
      }

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
        const card = createCardArticle(p);
        card.dataset.tags = p.tags.join(',');
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
