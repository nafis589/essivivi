import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ThemedInput } from '@/components/ui/ThemedInput';
import { Palette } from '@/constants/theme';
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Keyboard,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';




export default function LoginScreen() {

    const router = useRouter();

    // --- États (State) ---
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [fontsLoaded] = useFonts({
        PoppinsBold: Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Palette.background }} />
        );
    }

    // --- Logique (Mockée) ---
    const handleLogin = () => {
        // Reset des erreurs
        setErrorMessage('');
        Keyboard.dismiss();

        // Validation basique
        if (!phone || !password) {
            setErrorMessage('Veuillez remplir tous les champs.');
            return;
        }

        // Simulation Appel API
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            // Mock de succès ou échec
            if (phone === '0102030405' && password === '1234') {
                Alert.alert('Succès', 'Connexion réussie ! Bienvenue sur la tournée.', [
                    { text: 'OK', onPress: () => router.replace('/(tabs)') }
                ]);
            } else {
                // En mode démo, on redirige quand même pour que l'utilisateur puisse tester
                Alert.alert('Bienvenue', `Livreur connecté : ${phone} (Démo)`, [
                    { text: 'GO', onPress: () => router.replace('/(tabs)') }
                ]);
            }
        }, 2000);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Palette.background} />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.innerContainer}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >


                    {/* --- Titres --- */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Connectez-vous</Text>
                        <Text style={styles.subtitle}>Prêt pour la tournée ? Identifiez-vous.</Text>
                    </View>

                    {/* --- Formulaire --- */}
                    <View style={styles.formContainer}>

                        <ThemedInput
                            label="Numéro de téléphone"
                            placeholder="numéro de téléphone"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />

                        <ThemedInput
                            label="Mot de passe"
                            placeholder="mot de passe"
                            isPassword
                            value={password}
                            onChangeText={setPassword}
                        />

                        {/* Remember Me & Forgot Password */}
                        <View style={styles.optionsRow}>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={() => setRememberMe(!rememberMe)}
                            >
                                <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                                    {rememberMe && <Ionicons name="checkmark" size={14} color={Palette.background} />}
                                </View>
                                <Text style={styles.optionText}>Se souvenir</Text>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Message d'erreur */}
                        {errorMessage ? (
                            <View style={styles.errorContainer}>
                                <Ionicons name="alert-circle" size={20} color={Palette.error} />
                                <Text style={styles.errorText}>{errorMessage}</Text>
                            </View>
                        ) : null}

                        {/* Bouton Connexion */}
                        <PrimaryButton
                            title="Se connecter"
                            isLoading={isLoading}
                            onPress={handleLogin}
                        />

                    </View>

                    {/* --- Footer --- */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Pas encore de compte ? </Text>
                        <TouchableOpacity onPress={() => router.push('/register')}>
                            <Text style={styles.signupText}>S'inscrire</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.background,
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
    },
    // Header
    header: {
        marginBottom: 40,
        marginTop: 20,
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
