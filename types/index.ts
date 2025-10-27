// Product Types
export interface Product {
  id: string
  name: string
  price: string
  rating: number
  description?: string
  imageUrl?: string
  category?: string
}

// Category Types
export interface Category {
  id: string
  name: string
  icon: string
  color: string
  description?: string
}

// User Types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt?: string
}

// Navigation Types
export type RootStackParamList = {
  '(tabs)': undefined
  ProductDetail: { productId: string }
  CategoryDetail: { categoryId: string }
}
