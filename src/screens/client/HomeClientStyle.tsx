import { StyleSheet } from 'react-native';
import { colors } from '@/colors/Colors';

export const styles = StyleSheet.create({

  // ── Layout ────────────────────────────────────────────────────
  safe: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  // ── Header ────────────────────────────────────────────────────
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.onSurface,
    letterSpacing: -0.3,
  },
  bellBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.Dark,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  bellIcon: {
    fontSize: 18,
  },

  // ── ServiceRequestCard ────────────────────────────────────────
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 24,
    shadowColor: colors.Dark,
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: colors.onSurface,
    minHeight: 80,
    backgroundColor: '#FAFAFA',
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 14,
    color: colors.primary,
  },
  locationText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  ctaBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  ctaBtnDisabled: {
    backgroundColor: colors.secondary,
  },
  ctaBtnText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 15,
  },
  ctaArrow: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },

  // ── Seção Chamados ────────────────────────────────────────────
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.onSurface,
  },
  verTodos: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },

  // ── ChamadoCard ───────────────────────────────────────────────
  chamadoCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.Dark,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 10,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
    flex: 1,
  },
  editBtn: { padding: 4 },
  editIcon: { fontSize: 14 },
  chamadoTitulo: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 12,
  },
  profRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  profAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profAvatarText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  profNome: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.onSurface,
    flex: 1,
  },
  chatBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatIcon: { fontSize: 16 },
  cancelarBtn: {
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 9,
    paddingVertical: 10,
    alignItems: 'center',
  },
  cancelarText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  avaliarBtn: {
    backgroundColor: colors.primary,
    borderRadius: 9,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  avaliarText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },

  // ── Empty state ───────────────────────────────────────────────
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 8,
  },
  emptyIcon: { fontSize: 36 },
  emptyText: {
    fontSize: 14,
    color: colors.onSurfaceVariant,
  },


});