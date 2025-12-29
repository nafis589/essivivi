import { Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="water-outline" size={64} color={Palette.primary} />
        <Text style={styles.title}>Tableau de bord</Text>
        <Text style={styles.subtitle}>Bienvenue sur HydroLogistics</Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Palette.text,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Palette.textGray,
    marginTop: 10,
    marginBottom: 40,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Palette.cardBg,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Palette.border,
  },
  logoutText: {
    color: Palette.error,
    fontWeight: '600',
  },
});
