import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './WelcomeScreen.styles';

interface Props {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.logoBadge}>
          <Ionicons name="cube" size={60} color="#007AFF" />
        </View>
        <Text style={styles.brandName}>StockMaster</Text>
        <Text style={styles.tagline}>
          Controla tu inventario con precisión profesional y escaneo en tiempo real.
        </Text>
      </View>

      <View style={styles.illustration}>
        <Ionicons name="qr-code-outline" size={150} color="#F2F2F7" />
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.getStartedBtn} onPress={onStart}>
          <Text style={styles.btnText}>Comenzar ahora</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};