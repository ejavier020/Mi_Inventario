import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ProfileScreen.styles';
import { User } from '../types';

interface Props {
  user: User | null;
  onLogout: () => void;
  onBack: () => void;
}

export const ProfileScreen: React.FC<Props> = ({ user, onLogout, onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Botón de volver */}
      <TouchableOpacity onPress={onBack} style={{ padding: 20 }}>
        <Ionicons name="arrow-back" size={28} color="#1A1A1A" />
      </TouchableOpacity>

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={50} color="#007AFF" />
        </View>
        <Text style={styles.userName}>{user?.username || 'Usuario'}</Text>
        <Text style={styles.userRole}>{user?.role}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Ionicons name="mail-outline" size={24} color="#8E8E93" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="calendar-outline" size={24} color="#8E8E93" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoLabel}>Miembro desde</Text>
            <Text style={styles.infoValue}>{user?.createdAt || 'Reciente'}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};