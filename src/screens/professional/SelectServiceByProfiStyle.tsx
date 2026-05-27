import { StyleSheet } from 'react-native';
import { colors } from '../../colors/Colors';

const CARD_RADIUS = 16;

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 10,
    backgroundColor: colors.background,
  },
  headerTitle: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: '800',
    color: colors.onSurface,
    letterSpacing: -0.5,
  },
  bellBtn: {
    marginTop: 30,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.Dark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },

  // Category pills
  pillsRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: '#E8E8E8',
    shadowColor: colors.Dark,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    marginRight: 6,
  },
  pillSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurfaceVariant,
  },
  pillLabelSelected: {
    color: colors.white,
  },

  // List
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    gap: 14,
  },

  // Card
  card: {
    width: '100%',
    height: 160,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#DDD',
    shadowColor: colors.Dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 2,
  },
  cardCover: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.38)',
    borderRadius: CARD_RADIUS,
  },
  cardInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 14,
  },
  cardText: {
    flex: 1,
  },
  cardName: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.3,
  },
  cardRole: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2.5,
    borderColor: colors.white,
    backgroundColor: '#CCC',
  },

  // Empty state
  emptyState: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.onSurfaceVariant,
    fontSize: 15,
  },
});