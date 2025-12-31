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
        paddingHorizontal: 24,
        marginBottom: 30,
        marginTop: 10,
    },
    progressTrack: {
        height: 6,
        backgroundColor: Palette.cardBg,
        borderRadius: 3,
        marginBottom: 8,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Palette.primary,
        borderRadius: 3,
    },
    stepText: {
        color: Palette.textGray,
        fontSize: 12,
        alignSelf: 'flex-end',
    },

    // --- Hero Section ---
    heroContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    dashedCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#333',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    innerCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#1C1C1E',
        justifyContent: 'center',
        alignItems: 'center',
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
        paddingHorizontal: 20,
        lineHeight: 22,
    },

    // --- List Cards ---
    cardsList: {
        width: '100%',
    },
    listCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1C1C1E',
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
    cardIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#2C2C2E',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardTextContainer: {
        flex: 1,
    },
    listCardTitle: {
        color: Palette.text,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    listCardDesc: {
        color: '#888',
        fontSize: 13,
        lineHeight: 18,
    },
    radioContainer: {
        marginLeft: 10,
    },
    radioEmpty: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#444',
    },

    // --- Step 2 Header & Form ---
    headerStep2: {
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Palette.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Palette.textGray,
        marginBottom: 32,
    },
    form: {
        width: '100%',
    },

    // --- Footer & Security ---
    footerContainer: {
        marginBottom: 20,
    },
    securityNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#111',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
    },
    securityText: {
        color: '#666',
        fontSize: 12,
        flex: 1,
        lineHeight: 16,
    },
    continueButton: {
        backgroundColor: '#FFF',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonDisabled: {
        backgroundColor: '#333',
        opacity: 0.5,
    },
    continueButtonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
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
