import { useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { firebaseApi } from '../api/firebase';
import { Alert } from 'react-native';

export const useInventory = () => {
  const [inventory, setInventory] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const loadInventory = useCallback(async () => {
    setLoading(true);
    try {
      const data = await firebaseApi.getProducts();
      setInventory(data || []); // Evitamos que sea null si la base está vacía
    } catch (error) {
      console.error("Error cargando inventario:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (code: string) => {
    // 1. Evitar códigos vacíos
    if (!code) return;

    setLoading(true);
    try {
      const newProd = {
        code,
        name: `Producto-${code.slice(-4)}`,
        date: new Date().toLocaleDateString('es-ES') 
      };
      
      await firebaseApi.saveProduct(newProd);
      await loadInventory(); 
      return true; 
    } catch (error) {
      Alert.alert("Error de Conexión", "No se pudo guardar en la nube.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeProduct = async (id: string) => {
    try {
      await firebaseApi.deleteProduct(id);
      setInventory(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      Alert.alert("Error", "No se pudo eliminar el producto.");
    }
  };

  const editProduct = async (product: Product) => {
    try {
      const { id, ...rest } = product;
      await firebaseApi.updateProduct(id, rest);
      await loadInventory();
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar.");
    }
  };

  useEffect(() => {
    loadInventory();
  }, [loadInventory]);

  return { 
    inventory, 
    loading, 
    addProduct, 
    removeProduct, 
    editProduct, 
    refresh: loadInventory 
  };
};