import { Palette } from '@/constants/theme';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface PrimaryButtonProps extends TouchableOpacityProps {
    title: string;
    isLoading?: boolean;
}

export function PrimaryButton({ title, isLoading, style, ...props }: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                isLoading && styles.buttonDisabled,
                style
            ]}
            activeOpacity={0.8}
            disabled={isLoading || props.disabled}
            {...props}
        >
            {isLoading ? (
                <ActivityIndicator size="small" color="#FFF" />
            ) : (
                <Text style={styles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Palette.primary,
        height: 58,
        borderRadius: 30, // Forme "Pill"
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: Palette.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8, // Ombre Android
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
