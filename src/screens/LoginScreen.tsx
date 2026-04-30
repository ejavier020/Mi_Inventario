import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './LoginScreen.styles';
import { COLORS } from '../constants/theme';

interface Props {
  onLogin: (email: string) => void;
  onGoToRegister: () => void; // <--- AGREGAMOS ESTO
}

export const LoginScreen: React.FC<Props> = ({ onLogin, onGoToRegister }) => {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="lock-closed" size={50} color={COLORS.primary} />
        <Text style={styles.title}>Acceso Seguro</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail-outline" size={20} color={COLORS.textSecondary} />
          <TextInput 
            placeholder="Correo electrónico" 
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputWrapper}>
          <Ionicons name="key-outline" size={20} color={COLORS.textSecondary} />
          <TextInput placeholder="Contraseña" style={styles.input} secureTextEntry />
        </View>
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={() => onLogin(email)}>
        <Text style={styles.loginBtnText}>Entrar al Sistema</Text>
      </TouchableOpacity>

      {/* BOTÓN PARA IR A REGISTRO */}
      <TouchableOpacity style={{ marginTop: 20, alignItems: 'center' }} onPress={onGoToRegister}>
        <Text style={{ color: COLORS.primary, fontWeight: '600' }}>
          ¿No tienes cuenta? Regístrate aquí
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};