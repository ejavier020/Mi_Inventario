import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export const inventoryStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.background 
  },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20,
    backgroundColor: '#FFF'
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: '800', 
    marginLeft: 15 
  },
  listContent: { 
    padding: 20 
  },
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
  info: { 
    flex: 1 
  },
  name: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: COLORS.textMain 
  },
  code: { 
    fontSize: 13, 
    color: COLORS.textSecondary, 
    marginTop: 2 
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  actionBtn: {
    marginRight: 15,
    padding: 5
  },
  // Estilos del Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#F2F2F7',
    padding: 15,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 10
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: '#E5E5EA',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center'
  },
  saveBtn: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center'
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});