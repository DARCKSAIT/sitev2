# Nova Vox Interstellar — Information Architecture v0

## 1. Buts & contraintes
- Média FR EVE Online : actualités, analyses marchés (PLEX, minerais, hubs), cartes/batailles, témoignages.
- Rigueur : faits sourcés, analyses séparées, corrections datées/traçables.
- Accessibilité & perf : thème sombre lisible, responsive, images WebP, JS minimal.
- Évolutif : d’abord statique (GitHub Pages), possible migration WordPress auto‑hébergé.

## 2. Sitemap (navigation principale)
- Accueil (`/` ou `/PROJECT_BASE/index.html`)
- Édition de la semaine (`/edition-semaine/`)
- Analyse financière (`/analyse-financiere/`)
- Témoignages de pilotes (`/temoignages/`)
- Cartes & batailles (`/cartes-batailles/`)
- Archives (`/archives/`)
- Premium (`/premium/`)
- À propos (`/a-propos/`)
- Contact (`/contact/`)
- Recherche : champ sur Archives + entête site

## 3. Schéma d’URL (permalinks)
### a) Version statique (GitHub Pages)
- Article : `posts/{slug}.html`
- Rubrique : `{categorie}/index.html` (listes filtrées côté client)
- Archives : `archives/index.html`
- Pages : `a-propos/index.html`, `contact/index.html`, `premium/index.html`

### b) Version WordPress (référence)
- Article : `/{yyyy}/{mm}/{postname}/`
- Catégorie : `/categorie/{slug}/`
- Archives : `/archives/`

## 4. Types de contenu & champs
### 4.1 Article (générique)
- `title`, `chapeau`, `image_une`, `category`, `tags`, `date_publication`, `auteur`
- `sources[] {label, url}`, `faits_verifies[]`, `analyse`, `impact_joueurs_fr[]`
- `corrections[] {datetime, note}`, `excerpt`, `slug`

### 4.2 Spécifique Analyse PLEX (option)
- `prix_7j`, `prix_30j`, `ecart_pct`, `sources_marche[]`

### 4.3 Spécifique Rapport de bataille (option)
- `systeme`, `region`, `debut`, `fin`, `cotes`
- `isk_perdus_total`, `vaisseaux_detruits`, liens `zKill` / `Dotlan`

### 4.4 Témoignage pilote (option)
- `pilote`, `corpo/alliance`, `zone`, `liens_killmails[]`

## 5. Taxonomies
- Catégories : `edition-semaine`, `analyse-financiere`, `temoignages`, `cartes-batailles`
- Tags libres : alliances, régions, thèmes (PLEX, industrie, logistique, doctrines, events)
- Futur WP : taxonomies custom `region`, `alliance` (option)

## 6. Templates d’interface (composants)
- **Card Article** : badge catégorie, titre cliquable, date FR, extrait
- **Bloc Contexte** : publication (EVE Time + Paris), sources, correctifs
- **Bloc Faits vérifiés** : liste + hyperliens
- **Bloc Analyse** : texte avec disclaimer (hypothèses)
- **Bloc Impact FR** : puces actionnables
- **Bannière Mise à jour** : si `corrections.length > 0`

## 7. Pages & sections (structure contenu)
### 7.1 Accueil
- Héros : tagline + CTA « Voir toutes les publications »
- Dernières publications (6)
- Par rubriques : 3 colonnes (Édition / Analyse / Témoignages)
- Bloc méthode (rigueur, sources, corrections)
- Abonnement (RSS + lien Discord)

### 7.2 Rubriques (x4)
- Titre + liste d’articles triés par date (desc)
- Filtre rapide (client-side) par tag

### 7.3 Archives
- Recherche locale (titre/catégorie/sources) + liste complète triée date desc

### 7.4 Premium
- Processus : envoyer ISK → vérification manuelle puis accès à une page premium
- Avantages : analyses longues, dossiers, fils d’alertes
- Contenu premium hébergé sur une page dédiée

### 7.5 À propos
- Charte : sources obligatoires, séparation faits/analyse, journal des corrections
- Mentions : EVE © CCP Games, non affilié, contact

### 7.6 Contact
- Adresse courriel temporaire pour prise de contact

## 8. Règles éditoriales
- Datation : chaque article affiche EVE Time
- Sources : minimum un lien pour tout chiffre ; zKill/Dotlan/CCP privilégiés
- Corrections : liste chronologique en bas avec horodatage
- Neutralité : pas d’attaques personnelles ; ton factuel
- Transparence : séparer Faits / Analyse / Impact FR

## 9. Accessibilité, SEO, performance
- Thème sombre AA, `lang="fr"`, balises sémantiques, `alt` images
- `<title>` unique, `<meta>` description, balises Open Graph
- Images WebP ≤ 1600 px, lazy-load, scripts locaux uniquement
- RGPD : pas de trackers ; analytics possible via Plausible

## 10. Paramètres d’implémentation (statique)
- Chemins relatifs partout, variable `BASE_PATH` éventuelle
- `posts/index.json` pour lister les articles, rendu via `assets/script.js`
- Fichier `CNAME` à la racine, déploiement GitHub Pages (`pages.yml`)

## 11. Paramètres d’implémentation (WordPress futur)
- Permaliens : `/%year%/%monthnum%/%postname%/`
- Rôles : Auteur/Éditeur/Admin (plugin Members)
- Plugins : sécurité, cache, SEO, 2FA
- Page Premium restreinte par rôle ; gestion dons ISK manuelle pour l'instant

## 12. Design (tokens)
- Couleurs : fond `#0a0d12`, panel `#0f141b`, texte `#e6e9ef`, muted `#acb2ba`, accents `#21c7d9` / `#64edc3`
- Coins 12–14 px ; ombres douces ; typo Inter/Roboto‑like
- Grilles : 1–3 colonnes responsive ; `max-width: 1100px`

## 13. Roadmap (après v1)
- ESI pour automatiser la vérification des dons ISK → rôle Premium
- Graphiques auto (prix PLEX, minerais) → génération d’images statiques
- Migration WordPress auto‑hébergé (plugins, paywall local si besoin)
