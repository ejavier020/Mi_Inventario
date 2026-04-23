import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/theme';
import { getProductByCode } from '../database/db'; // ✅ Importación agregada

export const ScanScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    getPermissions();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    setScanned(true);
    try {
      const existingProduct = await getProductByCode(data);
      if (existingProduct) {
        Alert.alert(
          'Producto existente',
          `El código ${data} ya está registrado. ¿Deseas editarlo?`,
          [
            { text: 'Cancelar', style: 'cancel', onPress: () => setScanned(false) },
            { text: 'Editar', onPress: () => navigation.navigate('ProductForm', { product: existingProduct }) }
          ]
        );
      } else {
        navigation.navigate('ProductForm', { code: data });
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo verificar el producto');
      setScanned(false);
    }
  };

  if (hasPermission === null) return <Text>Solicitando permiso de cámara...</Text>;
  if (hasPermission === false) return <Text>Sin acceso a la cámara</Text>;

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <TouchableOpacity style={styles.button} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>Escanear otro código</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  button: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 30,
  },
  buttonText: { color: '#FFF', fontWeight: 'bold' },
});