import { Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

            {/* --- En-tête (Logo & Textes) --- */}
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>essivivi</Text>
                <Text style={styles.title}>Bienvenue!</Text>
                <Text style={styles.subtitle}>
                    Suivez et gérez efficacement vos livraisons d’eau quotidiennes.
                </Text>
            </View>

            {/* --- Zone Graphique (Bulles) --- */}
            <View style={styles.graphicContainer}>
                {/* Lignes en pointillés (Décoration) */}
                <View style={[styles.bubble, styles.bubbleTopLeft]}>
                    <Ionicons name="location-sharp" size={28} color={Palette.primary} />
                </View>

                {/* Haut Droite - Navigation */}
                <View style={[styles.bubble, styles.bubbleTopRight]}>
                    <Ionicons name="navigate" size={26} color={Palette.primary} style={{ transform: [{ rotate: '45deg' }] }} />
                </View>

                {/* Bas Gauche - Paiement */}
                <View style={[styles.bubble, styles.bubbleBottomLeft]}>
                    <Ionicons name="card" size={26} color={Palette.primary} />
                </View>

                {/* Bas Droite - Favori */}
                <View style={[styles.bubble, styles.bubbleBottomRight]}>
                    <Ionicons name="star" size={26} color={Palette.primary} />
                </View>
            </View>

            {/* --- Boutons d'action --- */}
            <View style={styles.actionContainer}>
                {/* Bouton Sign In */}
                <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={() => router.push('/login')}
                >
                    <Text style={styles.primaryButtonText}>Se connecter</Text>
                </TouchableOpacity>

                {/* Bouton Create Account */}
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => router.push('/register')}
                >
                    <Text style={styles.secondaryButtonText}>Créer un compte</Text>
                </TouchableOpacity>
            </View>

            {/* --- Sélecteur de langue (Bas de page) --- */}
            <View style={styles.footerContainer}>
                <TouchableOpacity style={styles.languageSelector}>
                    <Text style={styles.languageText}>Français</Text>
                    <Ionicons name="chevron-down" size={16} color="#999" style={{ marginLeft: 4 }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    // --- Header Styles ---
    headerContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    logo: {
        color: Palette.primary, // Bleu GPB
        fontSize: 28,
        fontWeight: '900',
        marginBottom: 16,
        letterSpacing: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
        paddingHorizontal: 10,
    },

    // --- Graphic/Grid Styles ---
    graphicContainer: {
        height: 250,
        width: '100%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    // Lignes pointillées décoratives
    gridLineHorizontal: {
        position: 'absolute',
        width: '80%',
        height: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        borderRadius: 1,
        top: '50%',
    },
    gridLineVerticalLeft: {
        position: 'absolute',
        height: '60%',
        width: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        left: '28%',
        top: '20%',
    },
    gridLineVerticalRight: {
        position: 'absolute',
        height: '60%',
        width: 1,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderStyle: 'dashed',
        right: '28%',
        top: '30%',
    },

    // Style des bulles
    bubble: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#EEF0FC', // Fond bleu très clair
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    // Positions spécifiques des bulles
    bubbleTopLeft: {
        top: 20,
        left: 20,
    },
    bubbleTopRight: {
        top: 20,
        right: 90,
    },
    bubbleBottomLeft: {
        bottom: 30,
        left: 90,
    },
    bubbleBottomRight: {
        bottom: 30,
        right: 20,
    },

    // --- Buttons Styles ---
    actionContainer: {
        width: '100%',
        marginBottom: 20,
    },
    primaryButton: {
        backgroundColor: Palette.primary, // Bleu principal
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: Palette.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: '#FFF',
        width: '100%',
        paddingVertical: 18,
        borderRadius: 30,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Palette.primary,
    },
    secondaryButtonText: {
        color: Palette.primary,
        fontSize: 16,
        fontWeight: '600',
    },

    // --- Footer Styles ---
    footerContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    languageSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    languageText: {
        color: '#999',
        fontSize: 14,
    },
});
