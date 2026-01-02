import { Palette } from '@/constants/theme';
import { Platform, StatusBar, StyleSheet } from 'react-native';

export const registerStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    backButton: {
        padding: 8,
        marginRight: 8,
        marginLeft: -8, // Pour aligner visuellement
    },
    brandName: {
        color: Palette.text,
        fontWeight: '700',
        fontSize: 18,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    stepContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-between', // Répartit l'espace verticalement
        paddingTop: 20,
    },

    // --- Progress Bar ---
    progressContainer: {
        flexDirection: 'row',
        paddingHorizontal: 24,
        marginBottom: 30,
        marginTop: 10,
    },
    progressStep: {
        flex: 1,
        height: 4,
        backgroundColor: '#2C2C2E',
        marginHorizontal: 2,
        borderRadius: 2,
    },
    progressActive: {
        backgroundColor: Palette.primary,
    },

    // --- Hero Section ---
    heroSection: {
        alignItems: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    heroCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(57, 187, 249, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    heroTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: Palette.text,
        textAlign: 'center',
        marginBottom: 10,
    },
    heroSubtitle: {
        fontSize: 15,
        color: Palette.textGray,
        textAlign: 'center',
        lineHeight: 22,
    },

    // --- List Cards ---
    cardsList: {
        width: '100%',
        marginBottom: 20,
    },
    listCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E1E1E',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    listCardSelected: {
        borderColor: Palette.primary,
        backgroundColor: '#15202B',
    },
    iconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#2C2C2E',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    iconBoxSelected: {
        backgroundColor: Palette.primary,
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        color: Palette.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    cardDesc: {
        color: Palette.textGray,
        fontSize: 13,
    },
    radioButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: Palette.textGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Palette.primary,
    },

    // --- Step 2 Header & Form ---
    headerStep2: {
        marginBottom: 30,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Palette.text,
    },
    subtitle: {
        fontSize: 14,
        color: Palette.textGray,
        marginTop: 5,
    },
    form: {
        width: '100%',
    },

    // --- Footer & Security ---
    footerContainer: {
        marginTop: 'auto',
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        backgroundColor: '#1E1E1E',
        padding: 10,
        borderRadius: 8,
    },
    securityText: {
        color: Palette.textGray,
        fontSize: 12,
        marginLeft: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 20,
    },
    footerText: {
        color: Palette.textGray,
        fontSize: 14,
    },
    linkText: {
        color: Palette.text,
        fontWeight: 'bold',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
});
