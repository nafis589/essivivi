import { Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ThemedInputProps extends TextInputProps {
    label: string;
    containerStyle?: StyleProp<ViewStyle>;
    isPassword?: boolean;
    error?: string;
}

export function ThemedInput({ label, containerStyle, isPassword = false, error, ...props }: ThemedInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={[styles.inputWrapper, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <View style={[
                styles.inputContainerBase,
                isPassword ? styles.passwordContainer : styles.textInput,
                error ? styles.inputError : null
            ]}>
                <TextInput
                    style={[styles.inputBase, styles.flexInput]}
                    placeholderTextColor={Palette.textGray}
                    selectionColor={Palette.primary}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    {...props}
                />
                {isPassword && (
                    <TouchableOpacity
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={isPasswordVisible ? "eye-off" : "eye"}
                            size={22}
                            color={Palette.textGray}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: 20,
    },
    label: {
        color: Palette.textGray,
        fontSize: 14,
        marginBottom: 8,
        fontWeight: '500',
    },
    inputContainerBase: {
        backgroundColor: Palette.cardBg,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: Palette.border,
        height: 56,
    },
    inputError: {
        borderColor: Palette.error,
    },
    errorText: {
        color: Palette.error,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    textInput: {
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    inputBase: {
        color: Palette.text,
        fontSize: 16,
        height: '100%',
    },
    flexInput: {
        flex: 1,
    },
    eyeIcon: {
        padding: 8,
    },
});
