import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, globalStyles } from '../constants/theme';
import { styles } from './HomeScreen.styles'; 

interface Props {
  onScanPress: () => void;
  inventoryCount: number;
}

export const HomeScreen: React.FC<Props> = ({ onScanPress, inventoryCount }) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.welcomeSection}>
          <View style={[styles.logoContainer, globalStyles.shadowLarge]}>
            <Ionicons name="cube" size={50} color={COLORS.primary} />
          </View>
          <Text style={styles.mainTitle}>StockMaster</Text>
          <Text style={styles.mainSubtitle}>Gestión de Inventario Pro</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={globalStyles.card}>
            <Text style={styles.statNumber}>{inventoryCount}</Text>
            <Text style={styles.statLabel}>Items en Stock</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Acciones</Text>
        
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