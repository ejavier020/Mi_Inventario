import { StyleSheet } from 'react-native';

export const COLORS = {
  primary: '#007AFF',
  background: '#F2F2F7',
  white: '#FFFFFF',
  textMain: '#1C1C1E',
  textSecondary: '#8E8E93',
  danger: '#FF3B30',
  success: '#34C759',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  shadowLarge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  }
});