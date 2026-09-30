// URL de base de l'API. Change cette valeur (ou ajoute un .env avec VITE_API_URL)
// pour pointer vers ton vrai backend plus tard.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

// Petit utilitaire pour transformer une réponse fetch en erreur exploitable
async function handleResponse(res) {
  if (!res.ok) {
    let message = `Erreur ${res.status}`
    try {
      const data = await res.json()
      message = data.message || message
    } catch {
      // corps de réponse vide ou non-JSON, on garde le message par défaut
    }
    throw new Error(message)
  }
  // 204 No Content (souvent utilisé par DELETE) n'a pas de corps
  if (res.status === 204) return null
  return res.json()
}

export const productsApi = {
  // GET /products — accepte des query params pour la recherche/filtre
  async getAll({ search = '', category = '' } = {}) {
    const params = new URLSearchParams()
    if (search) params.set('name_like', search) // json-server: recherche partielle
    if (category) params.set('category', category)

    const res = await fetch(`${API_URL}/products?${params.toString()}`)
    return handleResponse(res)
  },

  // GET /products/:id
  async getOne(id) {
    const res = await fetch(`${API_URL}/products/${id}`)
    return handleResponse(res)
  },

  // POST /products
  async create(product) {
    const res = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    return handleResponse(res)
  },

  // PATCH /products/:id (mise à jour partielle)
  async update(id, updates) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    })
    return handleResponse(res)
  },

  // DELETE /products/:id
  async remove(id) {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE'
    })
    return handleResponse(res)
  }
}
