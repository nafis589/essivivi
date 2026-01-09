import { Stack, useRouter } from 'expo-router';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PersonalInfoScreen = () => {
    const router = useRouter();

    const InfoItem = ({ label, value, isLast = false }: { label: string, value: string, isLast?: boolean }) => (
        <TouchableOpacity style={[styles.infoItem, isLast && styles.noBorder]}>
            <Text style={styles.infoLabel}>{label}</Text>
            <View style={styles.infoValueContainer}>
                <Text style={styles.infoValue}>{value}</Text>
                <ChevronRight size={18} color="#CCC" />
            </View>
        </TouchableOpacity>
    );

    const PhotoItem = () => (
        <TouchableOpacity style={styles.infoItem}>
            <Text style={styles.infoLabel}>Photo de profil</Text>
            <View style={styles.infoValueContainer}>
                <Image
                    source={{ uri: 'https://i.pravatar.cc/300?img=11' }}
                    style={styles.smallAvatar}
                />
                <ChevronRight size={18} color="#CCC" />
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <ChevronLeft color="#000" size={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Informations Personnelles</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.card}>
                    <InfoItem label="Numéro d'identification agent" value="AGT-8832" />
                    <InfoItem label="Nom et prénom" value="Albert Warren" />
                    <InfoItem label="Numéro de téléphone" value="+228 90 12 34 56" />
                    <InfoItem label="Email" value="albertwarren@example.com" />
                    <PhotoItem />
                    <InfoItem label="Tricycle assigné" value="TG-1234-AB" isLast />
                </View>

                {/* Note explicative (optionnelle, comme sur l'image) */}
                <Text style={styles.footerNote}>
                    Certaines informations ne peuvent être modifiées que par l'administrateur.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F9FF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    backButton: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 25,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F5F5F5',
    },
    noBorder: {
        borderBottomWidth: 0,
    },
    infoLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    infoValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoValue: {
        fontSize: 14,
        color: '#888',
        marginRight: 10,
        textAlign: 'right',
        maxWidth: 150,
    },
    smallAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 10,
        backgroundColor: '#E1E1E1',
    },
    footerNote: {
        marginTop: 15,
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        paddingHorizontal: 10,
        lineHeight: 18,
    }
});

export default PersonalInfoScreen;
