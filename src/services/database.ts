import AsyncStorage from '@react-native-async-storage/async-storage';

import { User, Product } from '../types'; 

const USERS_KEY = '@StockMaster:users';
const PRODUCTS_KEY = '@StockMaster:products';


export const UserDatabase = {
  async saveUser(newUser: User): Promise<void> {
    try {
      const existingUsers = await this.getAllUsers();
      const updatedUsers = [...existingUsers, newUser];
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      throw new Error("No se pudo guardar el usuario");
    }
  },

  async getAllUsers(): Promise<User[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(USERS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      return [];
    }
  },

  async findUserByEmail(email: string): Promise<User | undefined> {
    const users = await this.getAllUsers();
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },

  async clearAll(): Promise<void> {
    await AsyncStorage.removeItem(USERS_KEY);
  }
};


export const InventoryDatabase = {
  async saveProduct(product: Product): Promise<void> {
    try {
      const existing = await this.getAllProducts();
      const updated = [product, ...existing];
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  },

  async getAllProducts(): Promise<Product[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(PRODUCTS_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const existing = await this.getAllProducts();
      const filtered = existing.filter(p => p.id !== id);
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  },

  async updateProduct(updatedProduct: Product): Promise<void> {
    try {
      const existing = await this.getAllProducts();
      const index = existing.findIndex(p => p.id === updatedProduct.id);
      if (index !== -1) {
        existing[index] = updatedProduct;
        await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(existing));
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  }
};