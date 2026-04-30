import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '../constants/theme';
import { styles } from './HomeScreen.styles';

interface Props {
  onScanPress: () => void;
  onProfilePress: () => void;
  onViewInventory: () => void; // <--- AGREGAMOS ESTA LÍNEA
  inventoryCount: number;
}

export const HomeScreen: React.FC<Props> = ({ 
  onScanPress, 
  onProfilePress, 
  onViewInventory, // <--- LA RECIBIMOS AQUÍ
  inventoryCount 
}) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.mainTitle}>StockMaster</Text>
            <Text style={styles.mainSubtitle}>Panel de Control</Text>
          </View>
          <TouchableOpacity style={styles.profileButton} onPress={onProfilePress}>
            <Ionicons name="person" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* HACEMOS QUE LA TARJETA DE STATS SEA CLICKEABLE */}
        <TouchableOpacity style={styles.statsRow} onPress={onViewInventory}>
          <View style={globalStyles.card}>
            <Text style={styles.statNumber}>{inventoryCount}</Text>
            <Text style={styles.statLabel}>Items en Stock (Ver Lista)</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>Acciones Rápidas</Text>
        
        <TouchableOpacity style={styles.actionButton} onPress={onScanPress}>
          <View style={[styles.iconCircle, { backgroundColor: COLORS.primary }]}>
            <Ionicons name="barcode-outline" size={28} color="#FFF" />
          </View>
          <View>
            <Text style={styles.actionText}>Escanear Producto</Text>
            <Text style={styles.actionSubtext}>Registro rápido por cámara</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};