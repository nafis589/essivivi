import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Keyboard } from 'react-native';
import { LoginFormErrors, loginSchema } from '../utils/validation';

export const useLogin = () => {
    const router = useRouter();

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formErrors, setFormErrors] = useState<LoginFormErrors>({});
    const [globalError, setGlobalError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        // Reset des erreurs
        setFormErrors({});
        setGlobalError('');
        Keyboard.dismiss();

        // Validation Zod
        const result = loginSchema.safeParse({ phone, password });

        if (!result.success) {
            const formattedErrors: LoginFormErrors = {};
            result.error.issues.forEach((issue) => {
                const path = issue.path[0] as keyof LoginFormErrors;
                formattedErrors[path] = issue.message;
            });
            setFormErrors(formattedErrors);
            return;
        }

        // Simulation Appel API
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            // Mock de succès ou échec (pour la démo, on accepte tout pour l'instant ou règles spécifiques)
            if (phone === '0102030405' && password === '1234') {
                // Succès réel simulé
                router.replace('/(tabs)');
            } else {
                // Mode permissif pour la démo dashboard
                router.replace('/(tabs)');
            }
        }, 1500);
    };

    return {
        // State
        phone, setPhone,
        password, setPassword,
        rememberMe, setRememberMe,
        isLoading,
        formErrors,
        globalError,

        // Actions
        handleLogin,
        goBack: router.back,
        goToRegister: () => router.push('/register'),
    };
};
