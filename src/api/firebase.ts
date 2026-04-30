// src/api/firebase.ts
const BASE_URL = 'https://stockmaster-61d56-default-rtdb.firebaseio.com/'; 

export const firebaseApi = {
  getProducts: async () => {
    const response = await fetch(`${BASE_URL}products.json`);
    const data = await response.json();
    if (!data) return [];
    return Object.keys(data).map(key => ({ id: key, ...data[key] }));
  },

  saveProduct: async (product: any) => {
    const response = await fetch(`${BASE_URL}products.json`, {
      method: 'POST',
      body: JSON.stringify(product),
    });
    return await response.json();
  },

  deleteProduct: async (id: string) => {
    await fetch(`${BASE_URL}products/${id}.json`, {
      method: 'DELETE',
    });
  },

  updateProduct: async (id: string, data: any) => {
    await fetch(`${BASE_URL}products/${id}.json`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  },

  post: async (path: string, data: any) => {
    await fetch(`${BASE_URL}${path}.json`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  get: async (path: string) => {
    const response = await fetch(`${BASE_URL}${path}.json`);
    const data = await response.json();
    if (!data) return [];
    return Object.keys(data).map(key => ({ id: key, ...data[key] }));
  }
};