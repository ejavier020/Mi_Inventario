import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  listContent: { padding: 20 },
  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: COLORS.primary + '10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  info: { flex: 1 },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.textMain },
  code: { fontSize: 13, color: COLORS.textSecondary, marginTop: 2 },
  date: { fontSize: 11, color: '#A1A1A1', marginTop: 4 },
  deleteBtn: { padding: 10 },
});