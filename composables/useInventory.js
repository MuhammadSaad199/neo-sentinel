import { ref } from 'vue'

const products = ref([
    { id: 1, category: "men's clothing", title: "Mens Cotton Jacket", price: 55.99 },
    { id: 2, category: "men's clothing", title: "Mens Casual Slim Fit", price: 15.99 },
    { id: 3, category: "women's clothing", title: "Women's Dress", price: 25.99 },
    { id: 4, category: "electronics", title: "Smartphone", price: 199.99 },
    { id: 5, category: "jewelery", title: "Gold Ring", price: 99.99 },
    { id: 6, category: "electronics", title: "Laptop", price: 499.99 },
    { id: 7, category: "women's clothing", title: "Women's Jacket", price: 45.99 },
    { id: 8, category: "jewelery", title: "Silver Necklace", price: 79.99 },
    { id: 9, category: "men's clothing", title: "Mens T-Shirt", price: 19.99 },
    { id: 10, category: "electronics", title: "Headphones", price: 89.99 },
    { id: 11, category: "jewelery", title: "Diamond Earrings", price: 299.99 },
    { id: 12, category: "women's clothing", title: "Skirt", price: 35.99 },
    { id: 13, category: "men's clothing", title: "Mens Jeans", price: 39.99 },
    { id: 14, category: "electronics", title: "Smartwatch", price: 149.99 },
    { id: 15, category: "women's clothing", title: "Blouse", price: 29.99 },
    { id: 16, category: "jewelery", title: "Bracelet", price: 59.99 },
    { id: 17, category: "men's clothing", title: "Leather Belt", price: 24.99 },
    { id: 18, category: "electronics", title: "Camera", price: 399.99 },
    { id: 19, category: "women's clothing", title: "Scarf", price: 14.99 },
    { id: 20, category: "jewelery", title: "Watch", price: 199.99 },
])

export const useInventory = () => {
  const addProduct = (product) => {
    products.value.push({ ...product, id: Date.now() })
  }

  return { products, addProduct }
}
