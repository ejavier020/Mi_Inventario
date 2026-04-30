import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { COLORS } from '../constants/theme';

// IMPORTACIÓN DE ESTILOS INDEPENDIENTES (Punto 1 del jurado)
import { inventoryStyles } from '../styles/InventoryList.styles';

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
  onUpdate: (product: Product) => void;
  onBack: () => void;
  loading?: boolean; // Para mostrar carga desde la API
}

export const InventoryList: React.FC<Props> = ({ products, onDelete, onUpdate, onBack, loading }) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newName, setNewName] = useState('');

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setNewName(product.name);
  };

  const saveEdit = () => {
    if (editingProduct && newName.trim()) {
      onUpdate({ ...editingProduct, name: newName });
      setEditingProduct(null);
    }
  };

  return (
    <SafeAreaView style={inventoryStyles.container}>
      {/* HEADER */}
      <View style={inventoryStyles.header}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        <Text style={inventoryStyles.headerTitle}>Inventario en la Nube</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          contentContainerStyle={inventoryStyles.listContent}
          renderItem={({ item }) => (
            <View style={inventoryStyles.card}>
              <View style={inventoryStyles.iconBox}>
                <Ionicons name="cube-outline" size={24} color={COLORS.primary} />
              </View>
              <View style={inventoryStyles.info}>
                <Text style={inventoryStyles.name}>{item.name}</Text>
                <Text style={inventoryStyles.code}>ID: {item.code}</Text>
              </View>
              
              <View style={inventoryStyles.actions}>
                <TouchableOpacity style={inventoryStyles.actionBtn} onPress={() => openEditModal(item)}>
                  <Ionicons name="create-outline" size={22} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => Alert.alert("Eliminar", "¿Borrar de la base de datos?", [
                    { text: "No" }, 
                    { text: "Sí", onPress: () => onDelete(item.id) }
                  ])}
                >
                  <Ionicons name="trash-outline" size={22} color="#FF3B30" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* MODAL DE EDICIÓN */}
      <Modal visible={editingProduct !== null} animationType="slide" transparent>
        <View style={inventoryStyles.modalOverlay}>
          <View style={inventoryStyles.modalContent}>
            <Text style={inventoryStyles.modalTitle}>Editar Nombre</Text>
            <TextInput
              style={inventoryStyles.input}
              value={newName}
              onChangeText={setNewName}
              autoFocus
            />
            <View style={inventoryStyles.modalButtons}>
              <TouchableOpacity style={inventoryStyles.cancelBtn} onPress={() => setEditingProduct(null)}>
                <Text style={inventoryStyles.btnText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={inventoryStyles.saveBtn} onPress={saveEdit}>
                <Text style={[inventoryStyles.btnText, { color: 'white' }]}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};