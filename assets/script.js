const currentScript = document.currentScript;
const SITE_BASE = currentScript.getAttribute('data-base') || '';

async function loadPartials(){
  const header = document.getElementById('header');
  if(header){
    const res = await fetch(SITE_BASE + 'partials/header.html');
    header.innerHTML = await res.text();
    header.querySelectorAll('a[data-href]').forEach(a=>{
      a.href = SITE_BASE + a.getAttribute('data-href');
    });
  }
  const footer = document.getElementById('footer');
  if(footer){
    const res = await fetch(SITE_BASE + 'partials/footer.html');
    footer.innerHTML = await res.text();
  }
}

function createCard(article){
  const div = document.createElement('article');
  div.className = 'card-article';
  div.dataset.tags = article.tags.join(' ').toLowerCase();
  div.innerHTML = `<h2><a href="${SITE_BASE}posts/${article.slug}.html">${article.title}</a></h2>`+
                  `<p class="meta">${article.date_publication}</p>`+
                  `<p>${article.excerpt}</p>`;
  return div;
}

async function loadArticles(){
  const container = document.getElementById('articles');
  if(!container) return;
  const res = await fetch(SITE_BASE + 'posts/index.json');
  const posts = await res.json();
  const category = container.dataset.category;
  posts
    .filter(p => !category || p.category === category)
    .sort((a,b)=> new Date(b.date_publication) - new Date(a.date_publication))
    .forEach(p => container.appendChild(createCard(p)));
  const filter = document.getElementById('tag-filter');
  if(filter){
    filter.addEventListener('input', e => {
      const tag = e.target.value.toLowerCase();
      Array.from(container.children).forEach(card => {
        card.style.display = !tag || card.dataset.tags.includes(tag) ? '' : 'none';
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPartials().then(loadArticles);
  console.log('Nova Vox Interstellar loaded');
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

      let search;
      if (currentSection === 'archives') {
        search = document.getElementById('archives-search');
      } else {
        search = document.createElement('input');
        search.type = 'search';
        search.id = 'tag-filter';
        search.placeholder = 'Filtrer par tag';
        main.appendChild(search);
      }

      const list = document.createElement('div');
      list.id = 'posts-list';
      main.appendChild(list);

      const noResults = document.createElement('p');
      noResults.id = 'no-results';
      noResults.textContent = 'Aucun résultat';
      noResults.style.display = 'none';
      main.appendChild(noResults);

      const posts = currentSection === 'archives' ? data : data.filter(p => p.category === currentSection);
      posts.forEach(p => {
        const card = createCardArticle(p);
        card.dataset.tags = p.tags.join(',');
        card.dataset.search = `${p.title} ${p.category} ${(p.source || '')} ${(p.sources || []).join(' ')}`.toLowerCase();
        list.appendChild(card);
      });

      const cards = Array.from(list.children);
      const filterCards = () => {
        const q = search.value.trim().toLowerCase();
        let visible = 0;
        cards.forEach(card => {
          const text = currentSection === 'archives' ? card.dataset.search : card.dataset.tags.toLowerCase();
          const show = q === '' || text.includes(q);
          card.style.display = show ? '' : 'none';
          if (show) visible++;
        });
        noResults.style.display = visible === 0 ? '' : 'none';
      };
      search.addEventListener('input', filterCards);
    })
    .catch(err => console.error('Erreur chargement index', err));
});
