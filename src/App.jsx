import { useState } from 'react'
import { useProducts } from './hooks/useProducts'
import SearchBar from './components/SearchBar'
import ProductForm from './components/ProductForm'
import ProductList from './components/ProductList'

export default function App() {
  const {
    products,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts()

  // null = mode "ajout" ; un objet produit = mode "modification"
  const [editingProduct, setEditingProduct] = useState(null)

  async function handleSubmit(productData) {
    if (editingProduct) {
      const ok = await updateProduct(editingProduct.id, productData)
      if (ok) setEditingProduct(null)
    } else {
      await addProduct(productData)
    }
  }

  function handleDelete(id) {
    if (window.confirm('Supprimer ce produit ?')) {
      deleteProduct(id)
    }
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Gestion de produits</h1>
        <p>Ajoute, modifie, recherche et filtre tes produits.</p>
      </header>

      <main className="app__layout">
        <section className="app__form-panel">
          <ProductForm
            initialProduct={editingProduct}
            onSubmit={handleSubmit}
            onCancel={() => setEditingProduct(null)}
          />
        </section>

        <section className="app__list-panel">
          <SearchBar
            search={search}
            onSearchChange={setSearch}
            category={category}
            onCategoryChange={setCategory}
          />
          <ProductList
            products={products}
            loading={loading}
            error={error}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  )
}
