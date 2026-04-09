import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  logoBadge: {
    width: 120,
    height: 120,
    backgroundColor: COLORS.primary + '15', 
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  brandName: {
    fontSize: 40,
    fontWeight: '900',
    color: COLORS.primary,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 24,
  },
  illustration: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    gap: 15,
  },
  getStartedBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
});