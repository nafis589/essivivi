import { Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { z } from 'zod';

import { registerStyles as styles } from '@/features/auth/styles/register.styles';

/* ------------------ Validation ------------------ */

const registerSchema = z
    .object({
        fullName: z.string().min(2, 'Le nom doit comporter au moins 2 caractères'),
        email: z.string().email('Adresse email invalide'),
        dob: z.string().optional(),
        phone: z.string().optional(),
        password: z.string().min(6, 'Le mot de passe doit faire au moins 6 caractères'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Les mots de passe ne correspondent pas',
        path: ['confirmPassword'],
    });

type RegisterFormErrors = {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export default function RegisterScreen() {
    const router = useRouter();

    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState<'client' | 'livreur' | null>(null);

    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

    /* ------------------ Navigation ------------------ */

    const handleNextStep = () => {
        if (step === 1 && selectedRole) setStep(2);
        else if (step === 2) setStep(3);
    };

    const handlePrevStep = () => {
        if (step === 3) setStep(2);
        else if (step === 2) setStep(1);
        else router.back();
    };

    const handleRegister = () => {
        setFormErrors({});

        const result = registerSchema.safeParse({
            fullName,
            email,
            password,
            confirmPassword,
        });

        if (!result.success) {
            const errors: RegisterFormErrors = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0] as keyof RegisterFormErrors;
                errors[key] = issue.message;
            });
            setFormErrors(errors);
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                'Compte créé !',
                `Bienvenue ${fullName}. Votre compte ${selectedRole} est prêt.`,
                [{ text: 'OK', onPress: () => router.replace('/login') }]
            );
        }, 2000);
    };

    /* ------------------ UI ------------------ */

    const renderProgressBar = () => {
        const progressWidth = step === 1 ? '33%' : step === 2 ? '66%' : '100%';
        return (
            <View style={styles.progressContainer}>
                <View style={styles.progressTrack}>
                    <View
                        style={[
                            styles.progressBar,
                            { width: progressWidth },
                        ]}
                    />
                </View>
                <Text style={styles.stepText}>Étape {step} sur 3</Text>
            </View>
        );
    };

    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            <View style={styles.heroContainer}>
                <View style={styles.dashedCircle}>
                    <View style={styles.innerCircle}>
                        <Ionicons
                            name={selectedRole === 'livreur' ? 'bicycle' : 'person'}
                            size={40}
                            color="#FFF"
                        />
                    </View>
                </View>
                <Text style={styles.heroTitle}>Créer un compte</Text>
                <Text style={styles.heroSubtitle}>
                    Sélectionnez votre profil pour commencer l'expérience sur essivivi.
                </Text>
            </View>

            <View style={styles.cardsList}>
                {(['client', 'livreur'] as const).map((role) => (
                    <TouchableOpacity
                        key={role}
                        style={[
                            styles.listCard,
                            selectedRole === role && styles.listCardSelected,
                        ]}
                        onPress={() => setSelectedRole(role)}
                    >
                        <View style={styles.cardIconContainer}>
                            <Ionicons
                                name={role === 'client' ? 'person' : 'bicycle'}
                                size={24}
                                color="#FFF"
                            />
                        </View>
                        <View style={styles.cardTextContainer}>
                            <Text style={styles.listCardTitle}>
                                {role === 'client' ? 'Client' : 'Livreur'}
                            </Text>
                            <Text style={styles.listCardDesc}>
                                {role === 'client'
                                    ? "Commander de l'eau et suivre vos livraisons."
                                    : 'Effectuer des livraisons et gérer vos tournées.'}
                            </Text>
                        </View>
                        <View style={styles.radioContainer}>
                            {selectedRole === role ? (
                                <Ionicons
                                    name="checkmark-circle"
                                    size={24}
                                    color={Palette.primary}
                                />
                            ) : (
                                <View style={styles.radioEmpty} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.footerContainer}>
                <View style={styles.securityNote}>
                    <Ionicons name="lock-closed" size={16} color="#666" />
                    <Text style={styles.securityText}>
                        Vos données personnelles sont chiffrées et sécurisées.
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#666" />
                </View>

                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        !selectedRole && styles.continueButtonDisabled,
                    ]}
                    disabled={!selectedRole}
                    onPress={handleNextStep}
                >
                    <Text style={styles.continueButtonText}>Continuer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            {/* Using styles.heroTitle/subtitle to match Step 1 typography */}
            <Text style={styles.heroTitle}>Informations</Text>
            <Text style={styles.subtitle}>Complétez vos informations personnelles</Text>

            {/* Your Name Input */}
            <View style={inputStyles.inputGroup}>
                <Text style={inputStyles.label}>Nom complet:</Text>
                <TextInput
                    style={inputStyles.input}
                    placeholder="Entrez votre nom complet"
                    placeholderTextColor="#666"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>

            {/* E-mail Input */}
            <View style={inputStyles.inputGroup}>
                <Text style={inputStyles.label}>E-mail:</Text>
                <TextInput
                    style={inputStyles.input}
                    placeholder="Entrez votre adresse email"
                    placeholderTextColor="#666"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>

            {/* Date of Birth Input */}
            <View style={inputStyles.inputGroup}>
                <Text style={inputStyles.label}>Date de naissance:</Text>
                <View style={inputStyles.dateInput}>
                    <TextInput
                        style={[inputStyles.dateText, { flex: 1, color: '#FFF' }]}
                        placeholder="07 November, 1986"
                        placeholderTextColor="#666"
                        value={dob}
                        onChangeText={setDob}
                    />
                    <Ionicons name="chevron-down" size={20} color="#FFF" />
                </View>
            </View>

            <TouchableOpacity
                style={[
                    styles.continueButton,
                    // slightly adjusting style to match step 1 button look if needed, but styles.continueButton is white
                ]}
                onPress={handleNextStep}
            >
                <Text style={styles.continueButtonText}>Continuer</Text>
            </TouchableOpacity>
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.heroTitle}>Sécurité</Text>
            <Text style={styles.subtitle}>Sécurisez votre compte</Text>

            {/* Phone Input */}
            <View style={inputStyles.inputGroup}>
                <Text style={inputStyles.label}>Numéro de téléphone:</Text>
                <TextInput
                    style={inputStyles.input}
                    placeholder="+228 90 00 00 00"
                    placeholderTextColor="#666"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            {/* Password Input */}
            <View style={inputStyles.inputGroup}>
                <Text style={inputStyles.label}>Mot de passe:</Text>
                <TextInput
                    style={inputStyles.input}
                    placeholder="Entrez votre mot de passe"
                    placeholderTextColor="#666"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* Confirm Password Input */}
            <View style={inputStyles.inputGroup}>
                <Text style={inputStyles.label}>Confirmer le mot de passe:</Text>
                <TextInput
                    style={inputStyles.input}
                    placeholder="Confirmer le mot de passe"
                    placeholderTextColor="#666"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            {/* Terms Checkbox */}
            <TouchableOpacity
                style={inputStyles.checkboxContainer}
                onPress={() => setIsChecked(!isChecked)}
                activeOpacity={0.8}
            >
                <View style={[inputStyles.checkbox, isChecked && inputStyles.checkboxChecked]}>
                    {isChecked && <Ionicons name="checkmark" size={16} color="#FFF" />}
                </View>
                <Text style={inputStyles.checkboxLabel}>
                    J'accepte les <Text style={styles.linkText}>conditions d'utilisation</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.continueButton,
                    !isChecked && styles.continueButtonDisabled
                ]}
                onPress={handleRegister}
                disabled={!isChecked || isLoading}
            >
                <Text style={[styles.continueButtonText, { color: '#000' }]}>
                    {isLoading ? 'Création en cours...' : 'Créer le compte'}
                </Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Palette.background} />

            <View style={styles.topBar}>
                <TouchableOpacity onPress={handlePrevStep} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Palette.text} />
                </TouchableOpacity>
                <Text style={styles.brandName}>Inscription</Text>
            </View>

            {renderProgressBar()}

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    {step === 1 ? renderStep1() : step === 2 ? renderStep2() : renderStep3()}

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Déjà un compte ? </Text>
                        <TouchableOpacity onPress={() => router.replace('/login')}>
                            <Text style={styles.linkText}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const inputStyles = StyleSheet.create({
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#FFF',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#1C1C1E', // Dark background matching Step 1 cards
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#FFF',
        borderWidth: 1,
        borderColor: '#333',
    },
    dateInput: {
        backgroundColor: '#1C1C1E',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    dateText: {
        fontSize: 16,
        color: '#FFF',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: '#1C1C1E',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#333',
    },
    checkboxChecked: {
        backgroundColor: Palette.primary,
        borderColor: Palette.primary,
    },
    checkboxLabel: {
        fontSize: 15,
        color: '#FFF',
    },
});
