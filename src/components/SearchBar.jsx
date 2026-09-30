const CATEGORIES = ['', 'Céréales', 'Épicerie', 'Hygiène', 'Boissons', 'Autres']

export default function SearchBar({ search, onSearchChange, category, onCategoryChange }) {
  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Rechercher un produit..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="searchbar__input"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="searchbar__select"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat === '' ? 'Toutes les catégories' : cat}
          </option>
        ))}
      </select>
    </div>
  )
}
