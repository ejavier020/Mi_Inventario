import React, { useState } from 'react';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from './src/types';

export default function App() {
  const [view, setView] = useState<'welcome' | 'home' | 'scanner'>('welcome');
  const [inventory, setInventory] = useState<Product[]>([]);
  const [permission, requestPermission] = useCameraPermissions();

  const handleScan = (data: string) => {
    const newProduct: Product = {
      id: Date.now().toString(),
      code: data,
      name: `Prod-${data.slice(-4)}`,
      date: new Date().toLocaleDateString()
    };
    setInventory([newProduct, ...inventory]);
    setView('home');
    Alert.alert("Éxito", "Producto añadido al inventario.");
  };

 
  if (view === 'welcome') return <WelcomeScreen onStart={() => setView('home')} />;

  if (view === 'home') {
    return (
      <HomeScreen 
        inventoryCount={inventory.length} 
        onScanPress={async () => {
          const { granted } = await requestPermission();
          if (granted) setView('scanner');
          else Alert.alert("Permiso", "Se necesita la cámara");
        }} 
      />
    );
  }

  return (
    <View style={styles.full}>
      <CameraView style={styles.full} onBarcodeScanned={({ data }) => handleScan(data)} />
      <TouchableOpacity style={styles.close} onPress={() => setView('home')}>
        <Ionicons name="close-circle" size={70} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  full: { flex: 1, backgroundColor: '#000' },
  close: { position: 'absolute', bottom: 50, alignSelf: 'center' }
});