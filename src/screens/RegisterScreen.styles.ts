import { StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 30,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.textMain,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 5,
  },
  form: {
    gap: 15,
  },
  inputWrapper: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.textMain,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: 5,
    marginBottom: -5,
  },
  registerBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  registerBtnText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  backLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  backLinkText: {
    color: COLORS.primary,
    fontWeight: '600',
  }
});