import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export const styles = StyleSheet.create({
  scrollContent: { 
    padding: 25, 
    paddingTop: 40 
  },
  welcomeSection: { 
    alignItems: 'center', 
    marginBottom: 40 
  },
  logoContainer: { 
    width: 100, 
    height: 100, 
    backgroundColor: '#FFF', 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20
  },
  mainTitle: { 
    fontSize: 32, 
    fontWeight: '800', 
    color: COLORS.textMain 
  },
  mainSubtitle: { 
    fontSize: 16, 
    color: COLORS.textSecondary 
  },
  statsRow: { 
    marginBottom: 30 
  },
  statNumber: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: COLORS.primary 
  },
  statLabel: { 
    color: COLORS.textSecondary, 
    fontWeight: '600' 
  },
  sectionLabel: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: COLORS.textMain, 
    marginBottom: 15 
  },
  actionButton: {
    backgroundColor: '#FFF', 
    padding: 20, 
    borderRadius: 25, 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15,
    elevation: 2, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4
  },
  iconCircle: { 
    width: 55, 
    height: 55, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 20 
  },
  actionText: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: COLORS.textMain 
  },
  actionSubtext: { 
    fontSize: 14, 
    color: COLORS.textSecondary 
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});