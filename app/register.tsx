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
            <View style={[styles.progressStep, step >= 1 && styles.progressActive]} />
            <View style={[styles.progressStep, step >= 2 && styles.progressActive]} />
        </View>
    );

    // --- Rendu Étape 1 : Choix Rôle ---
    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            {/* Hero Section */}
            <View style={styles.heroSection}>
                <View style={styles.heroCircle}>
                    <Ionicons name="people" size={40} color={Palette.primary} />
                </View>
                <Text style={styles.heroTitle}>Créer un compte</Text>
                <Text style={styles.heroSubtitle}>
                    Sélectionnez votre profil pour commencer l'expérience sur essivivi.
                </Text>
            </View>

            {/* Cartes de sélection */}
            <View style={styles.cardsList}>
                {/* Carte Client */}
                <TouchableOpacity
                    style={[styles.listCard, selectedRole === 'client' && styles.listCardSelected]}
                    onPress={() => setSelectedRole('client')}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconBox, selectedRole === 'client' && styles.iconBoxSelected]}>
                        <Ionicons
                            name="person"
                            size={24}
                            color={selectedRole === 'client' ? '#FFF' : Palette.text}
                        />
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Je suis Client</Text>
                        <Text style={styles.cardDesc}>Je commande de l'eau</Text>
                    </View>
                    <View style={styles.radioButton}>
                        {selectedRole === 'client' && <View style={styles.radioInner} />}
                    </View>
                </TouchableOpacity>

                {/* Carte Livreur */}
                <TouchableOpacity
                    style={[styles.listCard, selectedRole === 'livreur' && styles.listCardSelected]}
                    onPress={() => setSelectedRole('livreur')}
                    activeOpacity={0.8}
                >
                    <View style={[styles.iconBox, selectedRole === 'livreur' && styles.iconBoxSelected]}>
                        <Ionicons
                            name="bicycle"
                            size={24}
                            color={selectedRole === 'livreur' ? '#FFF' : Palette.text}
                        />
                    </View>
                    <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>Je suis Livreur</Text>
                        <Text style={styles.cardDesc}>Je livre les commandes</Text>
                    </View>
                    <View style={styles.radioButton}>
                        {selectedRole === 'livreur' && <View style={styles.radioInner} />}
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.footerContainer}>
                <View style={styles.securityNote}>
                    <Ionicons name="shield-checkmark-outline" size={16} color={Palette.primary} />
                    <Text style={styles.securityText}>Vos données sont sécurisées</Text>
                </View>

                {/* Bouton Continuer */}
                <PrimaryButton
                    title="Continuer"
                    onPress={handleNextStep}
                    disabled={!selectedRole}
                />
            </View>
        </View>
    );

    // --- Rendu Étape 2 : Formulaire ---
    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            <View style={styles.headerStep2}>
                <View>
                    <Text style={styles.title}>Infos personnelles</Text>
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

