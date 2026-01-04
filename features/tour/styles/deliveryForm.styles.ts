
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
        paddingBottom: 120, // Space for bottom button // UPDATED for better scrolling
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111',
        // marginBottom removed, handled by container
    },
    stepHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    fabInline: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Palette.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Palette.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },

    // --- Client Cards (Modern Grid) ---
    clientGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        marginTop: 0,
    },
    clientCardModern: {
        width: '48%',
        borderRadius: 32,
        padding: 16,
        marginBottom: 16,
        justifyContent: 'space-between',
        minHeight: 180,
        backgroundColor: '#F4F5F7',
    },
    clientCard: {
        backgroundColor: '#F4F5F7',
    },
    clientCardSelected: {
        backgroundColor: '#FFE55C',
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
        color: '#1A1A1A',
        lineHeight: 22,
    },

    // Company Text
    cardSubtitle: {
        fontSize: 13,
        color: '#888888',
        marginBottom: 20,
        fontWeight: '400',
    },

    // Footer
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginTop: 'auto',
    },

    // La "Pilule" contenant le prix
    amountPill: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 24,
        justifyContent: 'center',
    },
    amountPillUnselected: {
        backgroundColor: '#FFFFFF',
    },
    amountPillSelected: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.1)',
    },
    amountText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    pipelineText: {
        fontSize: 9,
        color: '#888888',
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
        backgroundColor: '#101010',
    },

    // --- Floating Action Button ---
    fabContainer: {
        position: 'absolute',
        top: 50, // UPDATED: Move it down slightly or keep relative to View
        right: 20,
        zIndex: 999, // Ensure it's on top
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

    // --- Product Row (New) ---
    productRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    productImage: {
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: '#F5F5F5',
        marginRight: 15,
    },
    productInfoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    productTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 6,
        lineHeight: 20,
    },
    productSubtitle: {
        fontSize: 13,
        color: '#888',
        fontWeight: '500',
    },

    // Counter
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    counterBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#F7F7F9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterInput: {
        minWidth: 34,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        padding: 0,
        marginHorizontal: 5,
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

    // --- Old Inputs reused ---
    sectionContainer: { marginBottom: 25, backgroundColor: '#FFF', padding: 15, borderRadius: 15 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1A1A', marginBottom: 20 },
    textInput: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 12, fontSize: 16, marginBottom: 10 },
    gpsContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F5E9', padding: 10, borderRadius: 10, marginTop: 10 },
    gpsText: { color: '#2E7D32', fontWeight: '600', marginLeft: 8, fontSize: 13 },
});
