export default function ProductItem({ product, onEdit, onDelete }) {
  const stockLabel =
    product.stock === 0 ? 'Rupture' : product.stock < 5 ? 'Stock faible' : 'En stock'

  const stockClass =
    product.stock === 0 ? 'badge--danger' : product.stock < 5 ? 'badge--warning' : 'badge--ok'

  return (
    <li className="product-item">
      <div className="product-item__info">
        <span className="product-item__name">{product.name}</span>
        <span className="product-item__category">{product.category || 'Sans catégorie'}</span>
      </div>

      <div className="product-item__meta">
        <span className="product-item__price">{product.price.toLocaleString()} FCFA</span>
        <span className={`badge ${stockClass}`}>
          {stockLabel} ({product.stock})
        </span>
      </div>

      <div className="product-item__actions">
        <button className="btn btn--small" onClick={() => onEdit(product)}>
          Modifier
        </button>
        <button className="btn btn--small btn--danger" onClick={() => onDelete(product.id)}>
          Supprimer
        </button>
      </div>
    </li>
  )
}
