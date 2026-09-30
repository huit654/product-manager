# Gestion de produits (React)

App CRUD simple : liste de produits, ajout, modification, suppression, recherche et filtre.

## Structure

```
src/
  components/
    ProductList.jsx   → affiche la liste (loading / erreur / vide)
    ProductItem.jsx    → une ligne produit (badge de stock + actions)
    ProductForm.jsx    → formulaire réutilisé pour ajouter ET modifier
    SearchBar.jsx       → champ de recherche + filtre catégorie
  hooks/
    useProducts.js      → tout l'état + la logique CRUD (fetch, loading, error)
  services/
    api.js              → seul fichier qui parle au backend (fetch)
  App.jsx                → assemble tout
  App.css                → styles
db.json                  → fausse base de données pour le backend de dev (json-server)
```

## Lancer le projet (2 terminaux)

Le frontend a besoin d'une API pour fonctionner. Pour tester tout de suite sans construire
de vrai backend, `json-server` transforme `db.json` en API REST complète (GET/POST/PATCH/DELETE).

**Terminal 1 — backend de dev (json-server) :**
```bash
npm install
npm run server
```
→ API disponible sur http://localhost:4000/products

**Terminal 2 — frontend :**
```bash
npm run dev
```
→ App disponible sur http://localhost:5173

## Brancher ton vrai backend plus tard

`src/services/api.js` est le seul fichier à connaître l'URL de l'API. Pour pointer vers un
vrai backend (Express, etc.), crée un fichier `.env` :

```
VITE_API_URL=https://mon-api.com/api
```

Tant que ton backend expose les mêmes routes (`GET/POST /products`, `PATCH/DELETE /products/:id`),
aucun autre fichier n'a besoin de changer.

## Ce qui est déjà géré

- Liste de produits avec recherche (debounce 300ms) et filtre par catégorie
- Ajouter / Modifier / Supprimer un produit
- États de chargement et d'erreur affichés proprement
- Badge de stock (Rupture / Stock faible / En stock)
- Un seul formulaire réutilisé pour l'ajout et la modification
