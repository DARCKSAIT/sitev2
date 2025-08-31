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
});
