import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import { RegisterFormErrors, registerSchema } from '../utils/validation';

export const useRegister = () => {
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
    const [formErrors, setFormErrors] = useState<RegisterFormErrors>({});

    const handleNextStep = () => {
        if (step === 1 && selectedRole) {
            setStep(2);
        } else {
            Alert.alert("Sélection requise", "Veuillez sélectionner un profil.");
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
        setFormErrors({});

        // 1. Validation Zod
        const result = registerSchema.safeParse({
            fullName,
            email,
            password,
            confirmPassword
        });

        if (!result.success) {
            const formattedErrors: RegisterFormErrors = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof RegisterFormErrors;
                formattedErrors[path] = issue.message;
            });
            setFormErrors(formattedErrors);
            return;
        }

        // 2. Simulation API
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            Alert.alert(
                "Compte créé",
                `Bienvenue ${fullName} !\nVotre compte (${selectedRole}) a été créé avec succès.`,
                [
                    { text: "Accéder au tableau de bord", onPress: () => router.replace('/(tabs)') }
                ]
            );
        }, 2000);
    };

    return {
        // State
        step,
        selectedRole, setSelectedRole,
        fullName, setFullName,
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,

        isLoading,
        formErrors,

        // Actions
        handleNextStep,
        handlePrevStep,
        handleRegister,
        goToLogin: () => router.push('/login'),
    };
};
