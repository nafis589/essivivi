import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ThemedInput } from '@/components/ui/ThemedInput';
import { Palette } from '@/constants/theme';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Keyboard,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

export default function LoginScreen() {
    const {
        phone, setPhone,
        password, setPassword,
        rememberMe, setRememberMe,
        isLoading,
        formErrors,
        globalError,
        handleLogin,
        goBack,
        goToRegister
    } = useLogin();

    const [fontsLoaded] = useFonts({
        PoppinsBold: Poppins_700Bold,
    });

    if (!fontsLoaded) {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: Palette.background }} />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Palette.background} />

            {/* --- Header / Back Button (Top Level) --- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Palette.text} />
                </TouchableOpacity>
            </View>

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
                            error={formErrors.phone}
                        />

                        <ThemedInput
                            label="Mot de passe"
                            placeholder="mot de passe"
                            isPassword
                            value={password}
                            onChangeText={setPassword}
                            error={formErrors.password}
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

                        {/* Message d'erreur global si besoin (API error) */}
                        {globalError ? (
                            <View style={styles.errorContainer}>
                                <Ionicons name="alert-circle" size={20} color={Palette.error} />
                                <Text style={styles.errorText}>{globalError}</Text>
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
                        <TouchableOpacity onPress={goToRegister}>
                            <Text style={styles.signupText}>S'inscrire</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

import { loginStyles as styles } from '@/features/auth/styles/login.styles';

