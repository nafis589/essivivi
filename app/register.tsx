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

    const renderProgressBar = () => (
        <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
                <View
                    style={[
                        styles.progressBar,
                        { width: step === 1 ? '50%' : '100%' },
                    ]}
                />
            </View>
            <Text style={styles.stepText}>Étape {step} sur 2</Text>
        </View>
    );

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
        <View style={newStyles.formContainer}>
            {/* Your Name Input */}
            <View style={newStyles.inputGroup}>
                <Text style={newStyles.label}>Nom complet:</Text>
                <TextInput
                    style={newStyles.input}
                    placeholder="David Johnson"
                    placeholderTextColor="#A0A5BD"
                    value={fullName}
                    onChangeText={setFullName}
                />
            </View>

            {/* E-mail Input */}
            <View style={newStyles.inputGroup}>
                <Text style={newStyles.label}>E-mail:</Text>
                <TextInput
                    style={newStyles.input}
                    placeholder="login@email.com"
                    placeholderTextColor="#A0A5BD"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>

            {/* Date of Birth Input */}
            <View style={newStyles.inputGroup}>
                <Text style={newStyles.label}>Date de naissance:</Text>
                <View style={newStyles.dateInput}>
                    <TextInput
                        style={[newStyles.dateText, { flex: 1 }]}
                        placeholder="07 November, 1986"
                        placeholderTextColor="#A0A5BD"
                        value={dob}
                        onChangeText={setDob}
                    />
                    <Ionicons name="chevron-down" size={20} color="#333" />
                </View>
            </View>

            {/* FOOTER BUTTON FOR STEP 2 */}
            <View style={newStyles.footer}>
                <TouchableOpacity style={newStyles.continueButton} onPress={handleNextStep}>
                    <Text style={newStyles.continueButtonText}>Continuer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderStep3 = () => (
        <View style={newStyles.formContainer}>
            {/* Phone Input */}
            <View style={newStyles.inputGroup}>
                <Text style={newStyles.label}>Numéro de téléphone:</Text>
                <TextInput
                    style={newStyles.input}
                    placeholder="+228 90 00 00 00"
                    placeholderTextColor="#A0A5BD"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                />
            </View>

            {/* Password Input */}
            <View style={newStyles.inputGroup}>
                <Text style={newStyles.label}>Mot de passe:</Text>
                <TextInput
                    style={newStyles.input}
                    placeholder="********"
                    placeholderTextColor="#A0A5BD"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* Confirm Password Input */}
            <View style={newStyles.inputGroup}>
                <Text style={newStyles.label}>Confirmer le mot de passe:</Text>
                <TextInput
                    style={newStyles.input}
                    placeholder="********"
                    placeholderTextColor="#A0A5BD"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            {/* Terms Checkbox */}
            <TouchableOpacity
                style={newStyles.checkboxContainer}
                onPress={() => setIsChecked(!isChecked)}
                activeOpacity={0.8}
            >
                <View style={[newStyles.checkbox, isChecked && newStyles.checkboxChecked]}>
                    {isChecked && <Ionicons name="checkmark" size={16} color="#FFF" />}
                </View>
                <Text style={newStyles.checkboxLabel}>
                    J'accepte les <Text style={newStyles.linkText}>conditions d'utilisation</Text>
                </Text>
            </TouchableOpacity>

            {/* FOOTER BUTTON FOR STEP 3 */}
            <View style={newStyles.footer}>
                <TouchableOpacity
                    style={[newStyles.continueButton, { opacity: isChecked ? 1 : 0.7 }]}
                    onPress={handleRegister}
                    disabled={!isChecked || isLoading}
                >
                    <Text style={newStyles.continueButtonText}>
                        {isLoading ? 'Création en cours...' : 'Créer le compte'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    if (step === 1) {
        // Step 1: Use existing dark theme layout
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
                        {renderStep1()}
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

    // Steps 2 and 3: Use new light theme layout
    return (
        <SafeAreaView style={newStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <ScrollView contentContainerStyle={newStyles.scrollContainer}>
                {/* HEADER */}
                <View style={newStyles.header}>
                    <TouchableOpacity style={newStyles.backButton} onPress={handlePrevStep}>
                        <Ionicons name="chevron-back" size={24} color="#5e6b8b" />
                    </TouchableOpacity>
                    <Text style={newStyles.logoText}>Essivivi</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* TITLE */}
                <Text style={newStyles.title}>
                    {step === 2 ? 'Informations' : 'Sécurité'}
                </Text>

                {step === 2 ? renderStep2() : renderStep3()}

            </ScrollView>
        </SafeAreaView>
    );
}

const newStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 40,
    },
    /* Header Styles */
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
        marginTop: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F2F4FC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoText: {
        fontSize: 22,
        fontWeight: '900',
        color: '#0022CC', // Le bleu foncé du logo
        letterSpacing: 0.5,
    },
    /* Title Styles */
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A1A1A',
        marginBottom: 30,
        textAlign: 'center',
    },
    /* Form Styles */
    formContainer: {
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#EEF1FA', // Le fond bleu très clair/violet
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#333',
    },
    dateInput: {
        backgroundColor: '#EEF1FA',
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    /* Checkbox Styles */
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        backgroundColor: '#EEF1FA',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#0022CC',
    },
    checkboxLabel: {
        fontSize: 15,
        color: '#333',
    },
    linkText: {
        color: '#0022CC',
        fontWeight: '500',
    },
    /* Footer Button */
    footer: {
        marginTop: 40,
    },
    continueButton: {
        backgroundColor: '#0022CC', // Bleu vibrant
        borderRadius: 30,
        paddingVertical: 18,
        alignItems: 'center',
        shadowColor: '#0022CC',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    continueButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
