import { Palette } from '@/constants/theme';
import { Platform, StatusBar, StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    innerContainer: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    backButton: {
        padding: 8,
        marginLeft: -8,
        marginBottom: 10,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoImage: {
        width: 64,
        height: 64,
        marginBottom: 8,
    },
    logoText: {
        fontSize: 28,
        fontWeight: '700',
        letterSpacing: 2.5,
        color: Palette.text,

        // Helvetica avec fallback propre
        fontFamily: Platform.select({
            ios: 'Helvetica Neue',
            android: 'sans-serif-medium',
        }),
    },
    // Titres
    titleContainer: {
        marginBottom: 32,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Palette.text,
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: Palette.textGray,
        fontWeight: '400',
    },
    // Inputs
    formContainer: {
        width: '100%',
    },
    // Options (Checkbox / Forgot)
    optionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 32,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: Palette.textGray,
        marginRight: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: Palette.primary,
        borderColor: Palette.primary,
    },
    optionText: {
        color: Palette.textGray,
        fontSize: 14,
    },
    forgotText: {
        color: Palette.text,
        fontWeight: '600',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
    // Error
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        padding: 10,
    },
    errorText: {
        color: Palette.error,
        marginLeft: 8,
        fontSize: 14,
    },
    // Footer
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
    signupText: {
        color: Palette.text,
        fontWeight: 'bold',
        fontSize: 14,
    },
});
