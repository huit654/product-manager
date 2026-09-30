import ProductItem from './ProductItem'

export default function ProductList({ products, loading, error, onEdit, onDelete }) {
  if (loading) {
    return <p className="state-message">Chargement des produits...</p>
  }

  if (error) {
    return <p className="state-message state-message--error">Erreur : {error}</p>
  }

  if (products.length === 0) {
    return <p className="state-message">Aucun produit trouvé.</p>
  }

  return (
    <ul className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
