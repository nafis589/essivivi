import { Stack, useRouter } from 'expo-router';
import {
    Bell,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Heart,
    User,
    Wallet
} from 'lucide-react-native';
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

const ProfileScreen = () => {
    const router = useRouter();

    // Composant pour les lignes du menu
    const MenuItem = ({ icon: Icon, label, onPress }: { icon: any, label: string, onPress?: () => void }) => (
        <TouchableOpacity style={styles.menuItem} onPress={onPress}>
            <View style={styles.menuItemLeft}>
                <View style={styles.iconContainer}>
                    <Icon color="#555" size={20} />
                </View>
                <Text style={styles.menuLabel}>{label}</Text>
            </View>
            <ChevronRight color="#CCC" size={20} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <ChevronLeft color="#000" size={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Carte de Profil */}
                <View style={styles.profileCard}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/300?img=11' }}
                        style={styles.avatar}
                    />
                    <Text style={styles.userName}>Albert Warren</Text>
                    <Text style={styles.userEmail}>albertwarren@example.com</Text>
                </View>

                {/* Liste des Options */}
                <View style={styles.menuCard}>
                    <MenuItem
                        icon={User}
                        label="Informations Personnelles"
                        onPress={() => router.push('/profile/personal-info')}
                    />
                    <MenuItem
                        icon={Wallet}
                        label="Modification de mot de passe"
                        onPress={() => router.push('/profile/change-password')}
                    />
                    <MenuItem icon={Calendar} label="Mon adresse" />
                    <MenuItem icon={Heart} label="Notification" />
                    <MenuItem icon={Bell} label="Se deconnecter" />
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F9FF',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 30,
    },
    backButton: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 25,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    profileCard: {
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 15,
        backgroundColor: '#E1E1E1',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 14,
        color: '#888',
    },
    menuCard: {
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 0.5,
        borderBottomColor: '#F0F0F0',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        backgroundColor: '#F8FAFC',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    menuLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
});

export default ProfileScreen;
