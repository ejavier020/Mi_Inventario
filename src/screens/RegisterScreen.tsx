import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './RegisterScreen.styles';
import { COLORS } from '../constants/theme';
import { User } from '../types';

interface Props {
  onRegister: (newUser: User) => void;
  onBack: () => void;
}

export const RegisterScreen: React.FC<Props> = ({ onRegister, onBack }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleCreate = () => {
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert("Campos incompletos", "Por favor llena toda la información.");
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      username: formData.username,
      email: formData.email,
      role: 'employee', // Por defecto todos son empleados al registrarse
      createdAt: new Date().toISOString()
    };

    onRegister(newUser);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Ionicons name="person-add" size={50} color={COLORS.primary} />
          <Text style={styles.title}>Nuevo Usuario</Text>
          <Text style={styles.subtitle}>Crea una cuenta para gestionar el inventario</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nombre de usuario</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color={COLORS.textSecondary} />
            <TextInput 
              placeholder="Ej: Juan Perez" 
              style={styles.input}
              onChangeText={(val) => setFormData({...formData, username: val})}
            />
          </View>

          <Text style={styles.label}>Correo electrónico</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
            <TextInput 
              placeholder="correo@ejemplo.com" 
              style={styles.input}
              autoCapitalize="none"
              onChangeText={(val) => setFormData({...formData, email: val})}
            />
          </View>

          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="key-outline" size={20} color={COLORS.textSecondary} />
            <TextInput 
              placeholder="Mínimo 6 caracteres" 
              style={styles.input} 
              secureTextEntry 
              onChangeText={(val) => setFormData({...formData, password: val})}
            />
          </View>

          <TouchableOpacity style={styles.registerBtn} onPress={handleCreate}>
            <Text style={styles.registerBtnText}>Crear Cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backLink} onPress={onBack}>
            <Text style={styles.backLinkText}>¿Ya tienes cuenta? Inicia sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};