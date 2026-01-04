
import { Palette } from '@/constants/theme';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const deliveryFormStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#F8F9FA', // Clean greyish background like modern apps
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: '92%',
        width: '100%',
        paddingTop: 0,
        overflow: 'hidden',
    },

    // --- Wizard Header ---
    wizardHeader: {
        backgroundColor: '#FFF',
        paddingTop: 20,
        paddingBottom: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },
    wizardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111',
    },
    stepIndicator: {
        fontSize: 12,
        color: '#999',
        fontWeight: '600',
    },
    closeButton: {
        padding: 5,
    },

    // --- Content Area ---
    scrollContent: {
        padding: 10, // Adjusted padding for grid
        paddingBottom: 100, // Space for bottom button
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111',
        marginBottom: 20,
        paddingHorizontal: 10,
    },

    // --- Client Cards (Modern Grid) ---
    clientGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    clientCardModern: {
        width: '48%', // Pour avoir 2 colonnes avec un espace
        borderRadius: 32, // Arrondi très prononcé comme sur l'image
        padding: 16,
        marginBottom: 16,
        justifyContent: 'space-between',
        minHeight: 180, // Hauteur minimale pour l'aspect ratio
        backgroundColor: '#F4F5F7', // Palette.cardUnselected
    },
    clientCard: {
        backgroundColor: '#F4F5F7',
    },
    clientCardSelected: {
        backgroundColor: '#FFE55C', // Palette.cardSelected
    },

    // Header (Avatar + Nom)
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        marginRight: 12,
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    clientName: {
        fontSize: 17,
        fontWeight: '600',
        color: '#1A1A1A', // Palette.textPrimary
        lineHeight: 22,
    },

    // Company Text
    cardSubtitle: { // Renamed from companyName to match usage
        fontSize: 13,
        color: '#888888', // Palette.textSecondary
        marginBottom: 20,
        fontWeight: '400',
    },

    // Footer
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 'auto', // Pousse le footer vers le bas
    },

    // La "Pilule" contenant le prix
    amountPill: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 24,
        justifyContent: 'center',
    },
    amountPillUnselected: {
        backgroundColor: '#FFFFFF', // Souvent blanc sur fond gris clair
    },
    amountPillSelected: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)', // Légère bordure sur le fond jaune
    },
    amountText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A', // Palette.textPrimary
    },
    pipelineText: {
        fontSize: 9,
        color: '#888888', // Palette.textSecondary
        marginTop: 2,
    },

    // Le bouton rond avec la flèche
    iconCircle: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCircleUnselected: {
        backgroundColor: '#FFFFFF',
    },
    iconCircleSelected: {
        backgroundColor: '#101010', // Noir profond sur fond jaune
    },

    // --- Floating Action Button ---
    fabContainer: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    fabAdd: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Palette.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Palette.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    // --- Footer Wizard Actions ---
    wizardFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    nextButton: {
        backgroundColor: '#111',
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
    },
    nextButtonDisabled: {
        backgroundColor: '#E0E0E0',
    },
    nextButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    // --- Old Inputs (kept for compatibility or reuse) ---
    sectionContainer: { marginBottom: 25, backgroundColor: '#FFF', padding: 15, borderRadius: 15 },
    textInput: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 12, fontSize: 16, marginBottom: 10 },
    qtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#FFF', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#F0F0F0' },
    qtyLabel: { fontSize: 16, color: '#333', fontWeight: '500', flex: 1 },
    qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 15 },
    circleBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F0F0F0', alignItems: 'center', justifyContent: 'center' },
    qtyValue: { fontSize: 18, fontWeight: 'bold', color: '#333', width: 30, textAlign: 'center' },
    gpsContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', padding: 10, borderRadius: 10, marginTop: 10 },
    gpsText: { color: '#2E7D32', fontWeight: '600', marginLeft: 8, fontSize: 13 },
    // Unused but kept for reference or preventing breaks if referenced
    clientCardSelectedLegacy: {
        borderColor: Palette.primary,
        backgroundColor: '#F0F9FF',
    },
    selectedBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: Palette.primary,
        width: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F0F0F0',
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    cardStat: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    cardStatText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#555',
    },
});
