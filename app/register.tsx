import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { ThemedInput } from '@/components/ui/ThemedInput';
import { Palette } from '@/constants/theme';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export default function RegisterScreen() {
    const {
        step,
        selectedRole, setSelectedRole,
        fullName, setFullName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        isLoading,
        formErrors,
        handleNextStep,
        handlePrevStep,
        handleRegister,
        goToLogin
    } = useRegister();

    // --- Rendu Barre de progression ---
    const renderProgressBar = () => (
        <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: step === 1 ? '50%' : '100%' }]} />
            </View>
            <Text style={styles.stepText}>Étape {step} sur 2</Text>
        </View>
    );

    // --- Rendu Étape 1 : Choix Rôle ---
    const renderStep1 = () => (
        <View style={styles.stepContainer}>

            {/* --- 1. Hero Section (Icône centrale avec pointillés) --- */}
            <View style={styles.heroContainer}>
                <View style={styles.dashedCircle}>
                    <View style={styles.innerCircle}>
                        {/* Icône qui change selon la sélection ou icône générique */}
                        <Ionicons
                            name={selectedRole === 'livreur' ? "bicycle" : "person"}
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

            {/* --- 2. Vertical List Cards --- */}
            <View style={styles.cardsList}>

                {/* Carte Client */}
                <TouchableOpacity
                    style={[
                        styles.listCard,
                        selectedRole === 'client' && styles.listCardSelected
                    ]}
                    onPress={() => setSelectedRole('client')}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardIconContainer}>
                        <Ionicons name="person" size={24} color="#FFF" />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.listCardTitle}>Client</Text>
                        <Text style={styles.listCardDesc}>Commander de l'eau et suivre vos livraisons.</Text>
                    </View>
                    {/* Radio Button / Checkmark à droite */}
                    <View style={styles.radioContainer}>
                        {selectedRole === 'client' ? (
                            <Ionicons name="checkmark-circle" size={24} color={Palette.primary} />
                        ) : (
                            <View style={styles.radioEmpty} />
                        )}
                    </View>
                </TouchableOpacity>

                {/* Carte Livreur */}
                <TouchableOpacity
                    style={[
                        styles.listCard,
                        selectedRole === 'livreur' && styles.listCardSelected
                    ]}
                    onPress={() => setSelectedRole('livreur')}
                    activeOpacity={0.7}
                >
                    <View style={styles.cardIconContainer}>
                        <Ionicons name="bicycle" size={24} color="#FFF" />
                    </View>
                    <View style={styles.cardTextContainer}>
                        <Text style={styles.listCardTitle}>Livreur</Text>
                        <Text style={styles.listCardDesc}>Effectuer des livraisons et gérer vos tournées.</Text>
                    </View>
                    <View style={styles.radioContainer}>
                        {selectedRole === 'livreur' ? (
                            <Ionicons name="checkmark-circle" size={24} color={Palette.primary} />
                        ) : (
                            <View style={styles.radioEmpty} />
                        )}
                    </View>
                </TouchableOpacity>
            </View>

            {/* --- 3. Footer Section (Info + Button) --- */}
            <View style={styles.footerContainer}>

                {/* Note de sécurité (Comme le "All photos..." sur l'image) */}
                <View style={styles.securityNote}>
                    <Ionicons name="lock-closed" size={16} color="#666" style={{ marginRight: 8 }} />
                    <Text style={styles.securityText}>
                        Vos données personnelles sont chiffrées et sécurisées.
                    </Text>
                    <Ionicons name="chevron-forward" size={16} color="#666" style={{ marginLeft: 'auto' }} />
                </View>

                {/* Bouton "Continue" (Style blanc pillule comme l'image) */}
                <TouchableOpacity
                    style={[
                        styles.continueButton,
                        !selectedRole && styles.continueButtonDisabled
                    ]}
                    onPress={handleNextStep}
                    disabled={!selectedRole}
                >
                    <Text style={styles.continueButtonText}>Continuer</Text>
                </TouchableOpacity>
            </View>

        </View>
    );

    // --- Rendu Étape 2 : Formulaire ---
    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            <View style={styles.headerStep2}>
                <View>
                    <Text style={styles.title}>Informations personnelles</Text>
                    <Text style={styles.subtitle}>Complétez votre profil {selectedRole}</Text>
                </View>
            </View>

            <View style={styles.form}>
                <ThemedInput
                    label="Nom complet"
                    placeholder="Entrer votre nom"
                    value={fullName}
                    onChangeText={setFullName}
                    error={formErrors.fullName}
                />

                <ThemedInput
                    label="Email"
                    placeholder="Entrer votre email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    error={formErrors.email}
                />

                <ThemedInput
                    label="Mot de passe"
                    placeholder="Entrer votre mot de passe"
                    isPassword
                    value={password}
                    onChangeText={setPassword}
                    error={formErrors.password}
                />

                <ThemedInput
                    label="Confirmer le mot de passe"
                    placeholder="Confirmer votre mot de passe"
                    isPassword
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    error={formErrors.confirmPassword}
                />

                {/* Bouton Submit */}
                <PrimaryButton
                    title="Créer le compte"
                    onPress={handleRegister}
                    isLoading={isLoading}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={Palette.background} />

            {/* Top Bar avec Bouton Retour */}
            <View style={styles.topBar}>
                <TouchableOpacity onPress={handlePrevStep} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={Palette.text} />
                </TouchableOpacity>
                <Text style={styles.brandName}>Inscription</Text>
            </View>

            {/* Barre de progression */}
            {renderProgressBar()}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {step === 1 ? renderStep1() : renderStep2()}

                    {/* Footer Lien connexion */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Déjà un compte ? </Text>
                        <TouchableOpacity onPress={goToLogin}>
                            <Text style={styles.linkText}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

import { registerStyles as styles } from '@/features/auth/styles/register.styles';

