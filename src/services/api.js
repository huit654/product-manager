import seed from '../../db.json'

const STORAGE_KEY = 'product-manager:products'

// Petite pause pour garder un comportement asynchrone comme avec un vrai backend
const delay = (ms = 150) => new Promise((resolve) => setTimeout(resolve, ms))

function readProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // localStorage indisponible ou données corrompues : on repart des données initiales
  }
  const initial = seed.products ?? []
  writeProducts(initial)
  return initial
}

function writeProducts(products) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  } catch {
    // ignore (mode privé, quota dépassé...)
  }
}

export const productsApi = {
  // Accepte la recherche (nom, partielle) et le filtre par catégorie
  async getAll({ search = '', category = '' } = {}) {
    await delay()
    let products = readProducts()
    if (search) {
      const term = search.toLowerCase()
      products = products.filter((p) => String(p.name).toLowerCase().includes(term))
    }
    if (category) {
      products = products.filter((p) => p.category === category)
    }
    return products
  },

  async getOne(id) {
    await delay()
    const product = readProducts().find((p) => String(p.id) === String(id))
    if (!product) throw new Error('Erreur 404')
    return product
  },

  async create(product) {
    await delay()
    const products = readProducts()
    const created = { ...product, id: Date.now() }
    writeProducts([...products, created])
    return created
  },

  async update(id, updates) {
    await delay()
    const products = readProducts()
    const index = products.findIndex((p) => String(p.id) === String(id))
    if (index === -1) throw new Error('Erreur 404')
    const updated = { ...products[index], ...updates }
    products[index] = updated
    writeProducts(products)
    return updated
  },

  async remove(id) {
    await delay()
    writeProducts(readProducts().filter((p) => String(p.id) !== String(id)))
    return null
  }
}
