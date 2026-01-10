import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react-native';
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
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePasswordScreen() {
    const router = useRouter();
    const [step, setStep] = useState(1);

    // Step 1 State
    const [currentPassword, setCurrentPassword] = useState('');
    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);

    // Step 2 State
    const [newPassword, setNewPassword] = useState('');
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);

    const [confirmPassword, setConfirmPassword] = useState('');
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    // Requirements list
    const requirements = [
        "8 or more characters",
        "Numbers",
        "Letters",
        "Special characters"
    ];

    const isStep1Valid = currentPassword.length > 0;
    const isStep2Valid = newPassword.length > 0 && confirmPassword.length > 0;
    const isButtonEnabled = step === 1 ? isStep1Valid : isStep2Valid;

    const handleBack = () => {
        if (step === 2) {
            setStep(1);
        } else {
            router.back();
        }
    };

    const handleContinue = () => {
        if (step === 1) {
            // Mock validation
            if (currentPassword.length > 0) {
                setStep(2);
            }
        } else {
            // Mock Submit
            router.back();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.innerContainer}>

                    {/* Header avec lien retour */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                            <ChevronLeft color="#000" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Titres */}
                    <Text style={styles.title}>Change password</Text>
                    <Text style={styles.subtitle}>
                        This password can be used both in mobile app and in browser
                    </Text>

                    {/* Form Content */}
                    {step === 1 ? (
                        // STEP 1: Current Password
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Current Password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!isCurrentPasswordVisible}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                            />
                            <TouchableOpacity
                                onPress={() => setIsCurrentPasswordVisible(!isCurrentPasswordVisible)}
                                style={styles.eyeIcon}
                            >
                                {isCurrentPasswordVisible ? (
                                    <EyeOff color="#9CA3AF" size={20} />
                                ) : (
                                    <Eye color="#9CA3AF" size={20} />
                                )}
                            </TouchableOpacity>
                        </View>
                    ) : (
                        // STEP 2: New Password + Confirm
                        <>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="New Password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!isNewPasswordVisible}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                                    style={styles.eyeIcon}
                                >
                                    {isNewPasswordVisible ? (
                                        <EyeOff color="#9CA3AF" size={20} />
                                    ) : (
                                        <Eye color="#9CA3AF" size={20} />
                                    )}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!isConfirmPasswordVisible}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                <TouchableOpacity
                                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                    style={styles.eyeIcon}
                                >
                                    {isConfirmPasswordVisible ? (
                                        <EyeOff color="#9CA3AF" size={20} />
                                    ) : (
                                        <Eye color="#9CA3AF" size={20} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    {/* Requirements - Displayed on Step 2 */}
                    {step === 2 && (
                        <View style={styles.requirementsContainer}>
                            <Text style={styles.requirementsTitle}>Your password must contain:</Text>

                            {requirements.map((req, index) => (
                                <View key={index} style={styles.requirementItem}>
                                    <View style={styles.dash} />
                                    <Text style={styles.requirementText}>{req}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={{ flex: 1 }} />

                    {/* Button */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={20}
                    >
                        <TouchableOpacity
                            style={[
                                styles.button,
                                isButtonEnabled ? styles.buttonActive : styles.buttonInactive
                            ]}
                            onPress={handleContinue}
                            disabled={!isButtonEnabled}
                        >
                            <Text style={styles.buttonText}>
                                {step === 1 ? 'Next' : 'Confirm'}
                            </Text>
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
        paddingBottom: 30, // Espace en bas pour le bouton
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10, // Added margin for better positioning
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
        color: '#6B7280', // Gris moyen
        lineHeight: 22,
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6', // Gris très clair
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
    eyeIcon: {
        padding: 4,
    },
    requirementsContainer: {
        marginTop: 5,
    },
    requirementsTitle: {
        fontSize: 15,
        color: '#374151',
        marginBottom: 12,
        fontWeight: '500',
    },
    requirementItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    dash: {
        width: 10,
        height: 2,
        backgroundColor: '#9CA3AF', // Couleur du tiret
        marginRight: 12,
        borderRadius: 1,
    },
    requirementText: {
        fontSize: 15,
        color: '#6B7280',
    },
    // Button Styles customized for Active/Inactive state
    button: {
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonActive: {
        backgroundColor: '#0ea6e9', // Active Blue
        shadowColor: '#0ea6e9',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonInactive: {
        backgroundColor: '#BFDBFE', // Pale/Disabled Blue
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});
