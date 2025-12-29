import { Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native';

interface ThemedInputProps extends TextInputProps {
    label: string;
    containerStyle?: StyleProp<ViewStyle>;
    isPassword?: boolean;
}

export function ThemedInput({ label, containerStyle, isPassword = false, ...props }: ThemedInputProps) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View style={[styles.inputWrapper, containerStyle]}>
            <Text style={styles.label}>{label}</Text>
            <View style={[
                styles.inputContainerBase,
                isPassword ? styles.passwordContainer : styles.textInput
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
