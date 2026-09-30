import { useState, useEffect } from 'react'

const EMPTY_PRODUCT = { name: '', category: '', price: '', stock: '' }

export default function ProductForm({ initialProduct, onSubmit, onCancel }) {
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const isEditing = Boolean(initialProduct)

  // Si on passe d'un mode "ajout" à un mode "modification" (ou l'inverse),
  // on réinitialise le formulaire avec les bonnes valeurs.
  useEffect(() => {
    setForm(initialProduct ? { ...initialProduct } : EMPTY_PRODUCT)
  }, [initialProduct])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name.trim()) return

    onSubmit({
      ...form,
      price: Number(form.price) || 0,
      stock: Number(form.stock) || 0
    })

    if (!isEditing) setForm(EMPTY_PRODUCT)
  }

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Modifier le produit' : 'Ajouter un produit'}</h2>

      <label>
        Nom
        <input
          type="text"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          required
        />
      </label>

      <label>
        Catégorie
        <input
          type="text"
          value={form.category}
          onChange={(e) => handleChange('category', e.target.value)}
        />
      </label>

      <div className="product-form__row">
        <label>
          Prix (FCFA)
          <input
            type="number"
            min="0"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => handleChange('stock', e.target.value)}
          />
        </label>
      </div>

      <div className="product-form__actions">
        <button type="submit" className="btn btn--primary">
          {isEditing ? 'Enregistrer' : 'Ajouter'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}
