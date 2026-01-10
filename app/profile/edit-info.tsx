import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditInfoScreen() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const { field, label, value, placeholder } = params as { field: string, label: string, value: string, placeholder: string };

    const [inputValue, setInputValue] = useState(value || '');

    // Determine config based on field type
    const isPhone = field === 'phone';
    const isEmail = field === 'email';

    // Text content customization
    const getTitle = () => {
        if (isPhone) return "Numéro de téléphone";
        if (isEmail) return "Adresse Email";
        return label || "Information";
    };

    const getSubtitle = () => {
        if (isPhone) return "Un code de vérification sera envoyé à ce numéro.";
        if (isEmail) return "Nous vous enverrons un lien de confirmation.";
        return "Mettez à jour vos informations personnelles.";
    };

    const handleSave = () => {
        // Logic to save
        console.log('Saving', field, inputValue);
        router.back();
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>

                    {/* Header avec lien retour */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                            <ChevronLeft color="#000" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Titres */}
                    <Text style={styles.title}>{getTitle()}</Text>
                    <Text style={styles.subtitle}>{getSubtitle()}</Text>

                    {/* Champ de saisie (Input) */}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder={placeholder || label}
                            placeholderTextColor="#9CA3AF"
                            value={inputValue}
                            onChangeText={setInputValue}
                            keyboardType={isPhone ? 'phone-pad' : 'default'}
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Espace flexible */}
                    <View style={{ flex: 1 }} />

                    {/* Bouton Continuer */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={20}
                    >
                        <TouchableOpacity
                            style={[
                                styles.button,
                                inputValue ? styles.buttonActive : styles.buttonInactive
                            ]}
                            onPress={handleSave}
                            disabled={!inputValue}
                        >
                            <Text style={styles.buttonText}>Enregistrer</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>

                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    innerContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 10,
        paddingBottom: 30,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    backButton: {
        backgroundColor: '#F3F4F6',
        padding: 10,
        borderRadius: 25,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 22,
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        height: 56,
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
        height: '100%',
    },
    button: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonActive: {
        backgroundColor: '#0ea6e9', // Matches the blue used in other screens
        shadowColor: '#0ea6e9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonInactive: {
        backgroundColor: '#BFDBFE',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
