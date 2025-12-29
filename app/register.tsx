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
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RegisterScreen() {
    const router = useRouter();

    // --- États Globaux ---
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    // --- États Étape 1 : Rôle ---
    const [selectedRole, setSelectedRole] = useState<'client' | 'livreur' | null>(null);

    // --- États Étape 2 : Infos ---
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // --- Logique de Navigation ---

    const handleNextStep = () => {
        if (step === 1 && selectedRole) {
            setStep(2);
        }
    };

    const handlePrevStep = () => {
        if (step === 2) {
            setStep(1);
        } else {
            router.back();
        }
    };

    const handleRegister = () => {
        // Validation basique
        if (!fullName || !email || !password || !confirmPassword) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
            return;
        }

        // Simulation API
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                'Compte créé !',
                `Bienvenue ${fullName}. Votre compte ${selectedRole} est prêt.`,
                [
                    { text: 'OK', onPress: () => router.replace('/login') }
                ]
            );
        }, 2000);
    };

    // --- Composants Internes ---

    // Barre de progression (Stepper)
    const renderProgressBar = () => (
        <View style={styles.progressContainer}>
            <View style={styles.progressTrack}>
                <View style={[styles.progressBar, { width: step === 1 ? '50%' : '100%' }]} />
            </View>
            <Text style={styles.stepText}>Étape {step} sur 2</Text>
        </View>
    );

    // Étape 1 : Sélection du Rôle
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
                    Sélectionnez votre profil pour commencer l'expérience HydroLogistics.
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

    // Étape 2 : Formulaire
    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            <View style={styles.headerStep2}>
                <View>
                    <Text style={styles.title}>Informations personnelles</Text>
                    <Text style={styles.subtitle}>Complétez votre profil {selectedRole}</Text>
                </View>
            </View>

            <View style={styles.formContainer}>
                <ThemedInput
                    label="Nom complet"
                    placeholder="Entrer votre nom"
                    value={fullName}
                    onChangeText={setFullName}
                />

                <ThemedInput
                    label="Adresse Email"
                    placeholder="Entrer votre email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <ThemedInput
                    label="Mot de passe"
                    placeholder="Entrer votre mot de passe"
                    isPassword
                    value={password}
                    onChangeText={setPassword}
                />

                <ThemedInput
                    label="Confirmer le mot de passe"
                    placeholder="Confirmer votre mot de passe"
                    isPassword
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
                        <TouchableOpacity onPress={() => router.replace('/login')}>
                            <Text style={styles.linkText}>Se connecter</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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

    // --- Typography Global ---
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

    // --- Step 2: Form ---
    headerStep2: {
        marginBottom: 10,
    },
    formContainer: {
        width: '100%',
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

    // --- Footer ---
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
});
