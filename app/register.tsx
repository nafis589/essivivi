import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ThemedInput } from '@/components/ui/ThemedInput';
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
    Text,
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

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

    /* ------------------ Navigation ------------------ */

    const handleNextStep = () => {
        if (step === 1 && selectedRole) setStep(2);
    };

    const handlePrevStep = () => {
        step === 2 ? setStep(1) : router.back();
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
        <View style={styles.stepContainer}>
            <Text style={styles.title}>Informations personnelles</Text>
            <Text style={styles.subtitle}>
                Complétez votre profil {selectedRole}
            </Text>

            <ThemedInput
                label="Nom complet"
                value={fullName}
                onChangeText={setFullName}
                error={formErrors.fullName}
            />
            <ThemedInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                error={formErrors.email}
            />
            <ThemedInput
                label="Mot de passe"
                isPassword
                value={password}
                onChangeText={setPassword}
                error={formErrors.password}
            />
            <ThemedInput
                label="Confirmer le mot de passe"
                isPassword
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                error={formErrors.confirmPassword}
            />

            <PrimaryButton
                title="Créer le compte"
                isLoading={isLoading}
                onPress={handleRegister}
            />
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
                    {step === 1 ? renderStep1() : renderStep2()}

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
