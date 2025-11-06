'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/navbar'
import NOSCursorEffect from '@/components/NOSCursorEffect'
import Link from 'next/link'

interface Product {
  id: number
  title: string
  description: string
  price: number
  thumbnail: string
  category: string
  rating: number
  stock: number
  brand: string
  discountPercentage: number
}

interface ApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [categories, setCategories] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalProducts, setTotalProducts] = useState(0)
  const itemsPerPage = 12

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [searchQuery, selectedCategory, sortBy, currentPage])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      
      let url = ''
      const skip = (currentPage - 1) * itemsPerPage

      // Search query takes priority
      if (searchQuery) {
        url = `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=${itemsPerPage}&skip=${skip}`
      } 
      // Category filter
      else if (selectedCategory !== 'all') {
        url = `https://dummyjson.com/products/category/${encodeURIComponent(selectedCategory)}?limit=${itemsPerPage}&skip=${skip}`
      } 
      // Default all products
      else {
        url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${skip}`
      }

      // Add sorting if not default
      if (sortBy !== 'default') {
        const [sortField, order] = sortBy.split('-')
        url += `&sortBy=${sortField}&order=${order}`
      }

      const response = await fetch(url)
      if (!response.ok) throw new Error('Failed to fetch products')
      
      const data: ApiResponse = await response.json()
      setProducts(data.products)
      setTotalProducts(data.total)
    } catch (err) {
      setError('Failed to fetch products. Please try again later.')
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories')
      const data = await response.json()
      setCategories(data)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchQuery(searchInput)
    setCurrentPage(1)
    setSelectedCategory('all')
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setSearchQuery('')
    setSearchInput('')
    setCurrentPage(1)
  }

  const handleSortChange = (sort: string) => {
    setSortBy(sort)
    setCurrentPage(1)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSearchInput('')
    setSelectedCategory('all')
    setSortBy('default')
    setCurrentPage(1)
  }

  const totalPages = Math.ceil(totalProducts / itemsPerPage)
  const hasNextPage = currentPage < totalPages
  const hasPrevPage = currentPage > 1

  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      <NOSCursorEffect />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">
              <span className="text-gradient">PRODUCTS</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Explore our comprehensive collection of premium automotive products and accessories
            </p>
          </motion.div>

          {/* Search, Filter & Sort */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-dark-light rounded-2xl p-6 mb-12"
          >
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products... (e.g., phone, laptop, perfume)"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-dark text-white px-6 py-4 rounded-lg border border-dark-lighter focus:border-primary focus:outline-none transition-colors pl-12 pr-24"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary hover:bg-primary-dark text-dark font-semibold px-4 py-2 rounded-lg transition-all"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Filters Row */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="bg-dark border border-dark-lighter text-white rounded-lg px-4 py-3"
              >
                <option value="all">All Categories</option>
                {(categories as any[]).map((cat) => {
                  const value =
                    typeof cat === 'string'
                      ? cat
                      : cat?.slug || cat?.value || ''
                  const base =
                    typeof cat === 'string'
                      ? cat
                      : cat?.name || cat?.slug || ''
                  const label = base ? formatLabel(base) : 'Unknown'
                  return (
                    <option key={value || base} value={value}>
                      {label}
                    </option>
                  )
                })}
              </select>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full bg-dark text-white px-4 py-3 rounded-lg border border-dark-lighter focus:border-primary focus:outline-none transition-colors cursor-pointer"
              >
                <option value="default">Sort By: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="title-asc">Name: A to Z</option>
              </select>

              {/* Clear Filters Button */}
              <button
                onClick={handleClearFilters}
                className="bg-dark hover:bg-dark-lighter text-gray-400 hover:text-white px-4 py-3 rounded-lg border border-dark-lighter hover:border-primary transition-all"
              >
                Clear Filters
              </button>
            </div>

            {/* Results Info */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-gray-400 text-sm">
              <div>
                Showing <span className="text-primary font-semibold">{products.length}</span> of{' '}
                <span className="text-primary font-semibold">{totalProducts}</span> products
                {searchQuery && (
                  <span className="ml-2">
                    for "<span className="text-white">{searchQuery}</span>"
                  </span>
                )}
                {selectedCategory !== 'all' && !searchQuery && (
                  <span className="ml-2">
                    in <span className="text-white">{selectedCategory}</span>
                  </span>
                )}
              </div>
              <div>
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-20">
              <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 border-4 border-primary/30 rounded-full" />
                <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="text-gray-400">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                onClick={fetchProducts}
                className="bg-primary hover:bg-primary-dark text-dark font-semibold px-6 py-2 rounded-full transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && products.length > 0 && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
              >
                {products.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="bg-dark-light rounded-xl overflow-hidden card-glow group"
                  >
                    {/* Product Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {product.stock < 10 && (
                        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          Low Stock
                        </div>
                      )}
                      {product.discountPercentage > 0 && (
                        <div className="absolute top-3 right-3 bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full">
                          -{product.discountPercentage.toFixed(0)}%
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-primary/90 text-dark text-xs font-bold px-3 py-1 rounded-full">
                        {product.category}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1">
                          {product.title}
                        </h3>
                      </div>

                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-600'
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-400">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>

                      {/* Price and Brand */}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">
                            ${product.price}
                          </p>
                          {product.brand && (
                            <p className="text-xs text-gray-500">{product.brand}</p>
                          )}
                        </div>
                        <button className="bg-primary hover:bg-primary-dark text-dark font-semibold px-4 py-2 rounded-lg transition-all hover:scale-105">
                          View
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center items-center gap-4"
                >
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={!hasPrevPage}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      hasPrevPage
                        ? 'bg-primary hover:bg-primary-dark text-dark hover:scale-105'
                        : 'bg-dark-lighter text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    ← Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                            currentPage === pageNum
                              ? 'bg-primary text-dark'
                              : 'bg-dark-lighter text-gray-400 hover:bg-dark-light hover:text-white'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={!hasNextPage}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                      hasNextPage
                        ? 'bg-primary hover:bg-primary-dark text-dark hover:scale-105'
                        : 'bg-dark-lighter text-gray-600 cursor-not-allowed'
                    }`}
                  >
                    Next →
                  </button>
                </motion.div>
              )}
            </>
          )}

          {/* No Results */}
          {!loading && !error && products.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-400 text-xl mb-4">No products found</p>
              <p className="text-gray-500 mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}"`
                  : 'Try adjusting your filters'}
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-primary hover:bg-primary-dark text-dark font-semibold px-6 py-3 rounded-full transition-all hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-dark-light">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-gradient">Ready to Get Started?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Explore our full collection and discover the perfect products for your needs
            </p>
            <Link
              href="/"
              className="inline-block bg-primary hover:bg-primary-dark text-dark font-bold px-8 py-4 rounded-full transition-all hover:scale-105"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark border-t border-dark-lighter py-8 px-4">
        <div className="container mx-auto text-center text-gray-500">
          <p>&copy; 2025 Anargya ITS. Always Energized.</p>
        </div>
      </footer>
    </main>
  )
}

const formatLabel = (str: string) =>
  str
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')