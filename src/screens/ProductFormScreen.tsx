import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { addProduct, updateProduct, getProductByCode, Product } from '../database/db';
import { COLORS } from '../constants/theme';

export const ProductFormScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as { product?: Product; code?: string } | undefined;
  
  const [code, setCode] = useState(params?.product?.code || params?.code || '');
  const [name, setName] = useState(params?.product?.name || '');
  const [date, setDate] = useState(params?.product?.date || new Date().toISOString().split('T')[0]);
  const [isEditing, setIsEditing] = useState(!!params?.product);

  const handleSave = async () => {
    if (!code.trim() || !name.trim()) {
      Alert.alert('Error', 'Código y nombre son obligatorios');
      return;
    }

    try {
      if (isEditing && params?.product) {
        await updateProduct(params.product.id, code, name, date);
        Alert.alert('Éxito', 'Producto actualizado');
      } else {
        // Verificar si el código ya existe (por si acaso)
        const existing = await getProductByCode(code);
        if (existing) {
          Alert.alert('Error', 'Ya existe un producto con ese código');
          return;
        }
        await addProduct(code, name, date);
        Alert.alert('Éxito', 'Producto agregado');
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el producto');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Código de barras"
        value={code}
        onChangeText={setCode}
        editable={!isEditing} // No permitir editar código si ya existe
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del producto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Fecha (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>{isEditing ? 'Actualizar' : 'Guardar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});