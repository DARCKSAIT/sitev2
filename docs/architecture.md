# Nova Vox Interstellar – Architecture

## 1. Buts & contraintes
- Média francophone EVE Online : actualités, analyses marchés, cartes/batailles, témoignages.
- Rigueur éditoriale : faits sourcés, analyses séparées, corrections datées.
- Accessibilité & performance : thème sombre lisible, responsive, images WebP, JS minimal.
- Évolutif : déploiement statique GitHub Pages, migration possible vers WordPress auto‑hébergé.

## 2. Sitemap
- Accueil `/`
- Édition de la semaine `/edition-semaine/`
- Analyse financière `/analyse-financiere/`
- Témoignages `/temoignages/`
- Cartes & batailles `/cartes-batailles/`
- Archives `/archives/`
- Premium `/premium/`
- À propos `/a-propos/`
- Contact `/contact/`

## 4. Types de contenu
### Article générique
Champs principaux : `title`, `chapeau`, `image_une`, `category`, `tags`, `date_publication`, `auteur`, `sources`, `faits_verifies`, `analyse`, `impact_joueurs_fr`, `corrections`, `excerpt`, `slug`.

### Options spécifiques
- **Analyse PLEX** : `prix_7j`, `prix_30j`, `ecart_pct`, `sources_marche`.
- **Rapport de bataille** : `systeme`, `region`, `debut`, `fin`, `cotes`, `isk_perdus_total`, `vaisseaux_détruits`, liens `zKill`/`Dotlan`.
- **Témoignage pilote** : `pilote`, `corpo/alliance`, `zone`, `liens_killmails`.
