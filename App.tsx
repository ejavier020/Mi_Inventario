import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';


import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { InventoryList } from './src/screens/InventoryList';


import { useInventory } from './src/hooks/useInventory';
import { useAuth } from './src/hooks/useAuth';
import { globalStyles } from './src/styles/global.styles';

export default function App() {
  const [view, setView] = useState<'welcome' | 'login' | 'register' | 'home' | 'scanner' | 'profile' | 'inventory'>('welcome');
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false); 

  
  const { inventory, loading: loadingInv, addProduct, removeProduct, editProduct } = useInventory();
  const { currentUser, login, register, logout } = useAuth();


  useEffect(() => {
    if (!currentUser && !['welcome', 'login', 'register'].includes(view)) {
      setView('login');
    }
  }, [currentUser, view]);

  const handleLogin = async (email: string) => {
    const success = await login(email); 
    if (success) {
      setView('home');
    } else {
      Alert.alert("Error", "Usuario no encontrado en la base de datos.");
    }
  };

  const handleRegister = async (newUser: any) => {
    await register(newUser); 
    setView('login');
    Alert.alert("Éxito", "Usuario creado en la nube.");
  };

  const handleScanAction = async (data: string) => {
    if (scanning) return; 
    setScanning(true);

    try {
      await addProduct(data);
      Alert.alert("Éxito", `Código ${data} guardado.`);
      setView('home');
    } catch (error) {
      Alert.alert("Error", "No se pudo sincronizar.");
    } finally {
      setScanning(false);
    }
  };

  if (view === 'welcome') return <WelcomeScreen onStart={() => setView('login')} />;
  if (view === 'register') return <RegisterScreen onRegister={handleRegister} onBack={() => setView('login')} />;
  if (view === 'login') return <LoginScreen onLogin={handleLogin} onGoToRegister={() => setView('register')} />;

  if (view === 'profile') return <ProfileScreen user={currentUser} onLogout={() => { logout(); setView('login'); }} onBack={() => setView('home')} />;

  if (view === 'inventory') return (
    <InventoryList 
      products={inventory} 
      onDelete={removeProduct} 
      onUpdate={editProduct} 
      onBack={() => setView('home')}
      loading={loadingInv} 
    />
  );

  if (view === 'home') return (
    <HomeScreen 
      inventoryCount={inventory.length} 
      onScanPress={async () => {
        const { granted } = await requestPermission();
        if (granted) setView('scanner');
        else Alert.alert("Permiso", "Se necesita acceso a la cámara.");
      }}
      onProfilePress={() => setView('profile')}
      onViewInventory={() => setView('inventory')}
    />
  );

  return (
    <View style={globalStyles.fullScanner}>
      <CameraView 
        style={globalStyles.fullScanner} 
        barcodeScannerSettings={{
          barcodeTypes: ["ean13", "qr", "code128"], 
        }}
        onBarcodeScanned={scanning ? undefined : ({ data }) => handleScanAction(data)} 
      />
      
      {scanning && (
        <View style={{ position: 'absolute', top: '50%', alignSelf: 'center' }}>
          <ActivityIndicator size="large" color="white" />
        </View> 
      )}

      <TouchableOpacity style={globalStyles.closeBtn} onPress={() => setView('home')}>
        <Ionicons name="close-circle" size={70} color="white" />
      </TouchableOpacity>
    </View>
  );
}