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
        marginLeft: -8,
    },
    brandName: {
        color: Palette.text,
        fontSize: 18,
        fontWeight: '700',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 40,
    },
    stepContainer: {
        flex: 1,
        paddingTop: 20,
        justifyContent: 'space-between',
    },

    progressContainer: {
        paddingHorizontal: 24,
        marginVertical: 20,
    },
    progressTrack: {
        height: 6,
        backgroundColor: Palette.cardBg,
        borderRadius: 3,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Palette.primary,
    },
    stepText: {
        marginTop: 8,
        fontSize: 12,
        color: Palette.textGray,
        alignSelf: 'flex-end',
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Palette.text,
    },
    subtitle: {
        fontSize: 16,
        color: Palette.textGray,
        marginBottom: 24,
    },

    heroContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    dashedCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: '#333',
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
    },
    heroSubtitle: {
        fontSize: 15,
        color: Palette.textGray,
        textAlign: 'center',
        paddingHorizontal: 20,
    },

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
    },
    listCardSelected: {
        borderColor: Palette.primary,
        borderWidth: 1,
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
        fontSize: 16,
        fontWeight: '600',
        color: Palette.text,
    },
    listCardDesc: {
        fontSize: 13,
        color: '#888',
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
    },
    continueButton: {
        backgroundColor: '#FFF',
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueButtonDisabled: {
        opacity: 0.5,
    },
    continueButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
    },
    footerText: {
        color: Palette.textGray,
    },
    linkText: {
        color: Palette.text,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});
