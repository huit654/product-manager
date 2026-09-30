import { useState, useEffect, useCallback } from 'react'
import { productsApi } from '../services/api'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  // Recharge la liste depuis l'API en tenant compte des filtres actuels
  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await productsApi.getAll({ search, category })
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [search, category])

  useEffect(() => {
    // Petit debounce pour éviter un appel API à chaque frappe clavier
    const timeout = setTimeout(fetchProducts, 300)
    return () => clearTimeout(timeout)
  }, [fetchProducts])

  const addProduct = useCallback(async (product) => {
    setError(null)
    try {
      await productsApi.create(product)
      await fetchProducts()
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [fetchProducts])

  const updateProduct = useCallback(async (id, updates) => {
    setError(null)
    try {
      await productsApi.update(id, updates)
      await fetchProducts()
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [fetchProducts])

  const deleteProduct = useCallback(async (id) => {
    setError(null)
    try {
      await productsApi.remove(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [])

  return {
    products,
    loading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    refresh: fetchProducts
  }
}
