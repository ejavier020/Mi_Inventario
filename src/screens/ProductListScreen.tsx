import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { addProduct, updateProduct, getProductByCode, Product } from '../database/db';
import { COLORS } from '../constants/theme';

export const ProductListScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');

  const loadProducts = async () => {
    const data = await getAllProducts(search);
    setProducts(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadProducts();
    }, [search])
  );

  const handleDelete = (id: number, name: string) => {
    Alert.alert('Eliminar', `¿Eliminar ${name}?`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: async () => {
          await deleteProduct(id);
          loadProducts();
        }
      }
    ]);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductForm', { product: item })}
      onLongPress={() => handleDelete(item.id, item.name)}
    >
      <View style={styles.cardContent}>
        <Text style={styles.code}>{item.code}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>📅 {item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Buscar por nombre o código"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<Text style={styles.empty}>No hay productos</Text>}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('ProductForm')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  search: {
    backgroundColor: '#FFF',
    margin: 15,
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
  },
  list: { paddingHorizontal: 15, paddingBottom: 80 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
  },
  cardContent: { gap: 5 },
  code: { fontWeight: 'bold', color: COLORS.primary, fontSize: 16 },
  name: { fontSize: 18, fontWeight: '600' },
  date: { color: '#666', fontSize: 14 },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  fabText: { color: '#FFF', fontSize: 30, fontWeight: 'bold' },
});