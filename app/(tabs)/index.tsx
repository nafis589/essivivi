import { Palette } from '@/constants/theme';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// --- Palette de couleurs inspirée de l'image ---
const COLORS = {
  primary: Palette.primary,
  dark: '#1E1E1E',          // Garder la carte dashboard sombre pour le contraste
  background: '#FFFFFF',    // Fond blanc demandé
  cardText: '#FFFFFF',
  textMain: '#1A1A1A',      // Texte sombre pour fond blanc
  textSec: '#666666',
  accent: '#FFC107',
  danger: Palette.error,
  lightGray: '#F5F5F5',
};

export default function HomeScreen() {
  // Mock State pour la logique "En tournée" vs "Pas en tournée"
  const [isTourActive, setIsTourActive] = useState(false);

  const toggleTour = () => {
    setIsTourActive(!isTourActive);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
        </TouchableOpacity>

        {/* Logo au centre (Texte stylisé pour l'exemple) */}
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="water" size={24} color={COLORS.primary} />
          <Text style={styles.logoText}>essivivi</Text>
        </View>

        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={26} color={COLORS.textMain} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* --- MAIN ACTION CARD (Le "Vert" de l'image) --- */}
        <View style={styles.mainCard}>
          {/* Motif de fond décoratif (lignes courbes simulées) */}
          <View style={styles.bgPatternCircle} />

          <View style={styles.mainCardContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainCardTitle}>
                {isTourActive ? 'Tournée en cours' : 'Prêt à livrer ?'}
              </Text>
              <Text style={styles.mainCardSubtitle}>
                {isTourActive
                  ? 'Zone: Centre-ville • Secteur B'
                  : 'Vous n\'avez pas encore démarré votre tournée.'}
              </Text>

              <TouchableOpacity
                style={[styles.actionBtn, isTourActive ? styles.actionBtnStop : null]}
                onPress={toggleTour}
                activeOpacity={0.8}
              >
                <Text style={styles.actionBtnText}>
                  {isTourActive ? 'Terminer' : 'Démarrer la tournée'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Illustration "Sticker" (Camion ou Livreur) */}
            <View style={styles.stickerContainer}>
              <Image
                source={{ uri: 'https://img.freepik.com/free-psd/3d-rendering-delivery-concept_23-2149557026.jpg?w=740&t=st=1704000000~exp=1704000000~hmac=xyz' }} // Placeholder 3D style
                style={styles.stickerImage}
              />
            </View>
          </View>
        </View>

        {/* --- DASHBOARD CARD (Le "Noir" de l'image) --- */}
        <View style={styles.dashboardCard}>
          <View style={styles.dashboardRow}>

            {/* Jauge circulaire (Gauche) */}
            <View style={styles.progressContainer}>
              <View style={styles.progressCircle}>
                <MaterialCommunityIcons name="water-percent" size={32} color={COLORS.primary} />
              </View>
              <Text style={styles.driverName}>Michel D.</Text>
            </View>

            {/* Grille de stats (Droite) */}
            <View style={styles.statsGrid}>
              {/* Stat 1 : Chargement */}
              <View style={[styles.statBadge, { backgroundColor: '#2C2C2E' }]}>
                <MaterialCommunityIcons name="bottle-soda" size={18} color="#FFD700" />
                <Text style={[styles.statValue, { color: '#FFD700' }]}>120 Btl</Text>
              </View>

              {/* Stat 2 : Distance */}
              <View style={[styles.statBadge, { backgroundColor: '#2C2C2E' }]}>
                <MaterialCommunityIcons name="map-marker-distance" size={18} color="#A4E638" />
                <Text style={[styles.statValue, { color: '#A4E638' }]}>3.5 km</Text>
              </View>

              {/* Stat 3 : Temps */}
              <View style={[styles.statBadge, { backgroundColor: '#1E2D3B', width: '100%', marginTop: 10 }]}>
                <Ionicons name="time" size={18} color="#4DAFFF" />
                <Text style={[styles.statValue, { color: '#4DAFFF' }]}>
                  {isTourActive ? '1h 15m en route' : '0h 00m'}
                </Text>
              </View>
            </View>

          </View>
        </View>

        {/* --- LISTE RÉCENTE (Bas de page) --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Prochaines livraisons</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {/* Liste items */}
        {[1, 2, 3].map((item, index) => (
          <View key={index} style={styles.listItem}>
            <View style={styles.listIconContainer}>
              <Image
                source={{ uri: `https://randomuser.me/api/portraits/women/${40 + index}.jpg` }}
                style={styles.clientAvatar}
              />
              <View style={styles.listBadgeIcon}>
                <MaterialCommunityIcons name="water" size={12} color="#FFF" />
              </View>
            </View>

            <View style={styles.listContent}>
              <Text style={styles.clientName}>Restaurant Le Gourmet</Text>
              <Text style={styles.listDate}>10 Caisses • 14:00 PM</Text>
            </View>

            <TouchableOpacity style={styles.listBtn}>
              <Text style={styles.listBtnText}>Détails</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>

      {/* --- BOTTOM NAVIGATION (Custom Floating Pill Style) --- */}
      {/* J'ai opté pour le style "Pill" noir flottant de l'image Mupet, adapté avec 5 icônes */}
      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNavContainer}>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <MaterialCommunityIcons name="truck-delivery" size={24} color="#666" />
          </TouchableOpacity>

          {/* Bouton Central Action */}
          <TouchableOpacity style={styles.navMainAction} onPress={toggleTour}>
            <View style={[styles.navMainCircle, isTourActive && { backgroundColor: COLORS.danger }]}>
              <FontAwesome5 name={isTourActive ? "stop" : "play"} size={18} color="#FFF" style={{ marginLeft: isTourActive ? 0 : 4 }} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="people" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={24} color="#666" />
          </TouchableOpacity>

        </View>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  profileContainer: {},
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    color: COLORS.textMain,
  },
  notificationBtn: {
    padding: 5,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: COLORS.danger,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFF',
    fontSize: 6,
    fontWeight: 'bold',
  },

  // --- Main Card (Green/Teal) ---
  mainCard: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 30,
    height: 180,
    overflow: 'hidden',
    padding: 20,
    position: 'relative',
    marginBottom: 20,
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  bgPatternCircle: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  mainCardContent: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  mainCardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#004D40', // Vert très foncé pour contraste
    marginBottom: 5,
  },
  mainCardSubtitle: {
    fontSize: 13,
    color: '#004D40',
    opacity: 0.8,
    marginBottom: 20,
    paddingRight: 10,
  },
  actionBtn: {
    backgroundColor: '#004D40',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: 'flex-start',
  },
  actionBtnStop: {
    backgroundColor: COLORS.danger,
  },
  actionBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  stickerContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    // Effet "Sticker" blanc autour de l'image
    backgroundColor: '#FFF',
    borderRadius: 20,
    transform: [{ rotate: '5deg' }], // Petite rotation dynamique comme sur l'image
    elevation: 5,
  },
  stickerImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },

  // --- Dashboard Card (Dark) ---
  dashboardCard: {
    backgroundColor: COLORS.dark,
    marginHorizontal: 20,
    borderRadius: 30,
    padding: 20,
    marginBottom: 25,
  },
  dashboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContainer: {
    alignItems: 'center',
    width: '35%',
  },
  progressCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  driverName: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  statsGrid: {
    width: '60%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    width: '48%', // Pour faire 2 colonnes
    marginBottom: 8,
  },
  statValue: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 12,
  },

  // --- List Section ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.textMain,
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.textSec,
    fontWeight: '600',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  listIconContainer: {
    position: 'relative',
  },
  clientAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
  },
  listBadgeIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.primary,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  listContent: {
    flex: 1,
    marginLeft: 15,
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textMain,
  },
  listDate: {
    fontSize: 13,
    color: COLORS.textSec,
    marginTop: 4,
  },
  listBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  listBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMain,
  },

  // --- Bottom Navigation (Custom) ---
  bottomNavWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  bottomNavContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.dark, // Fond sombre (CardBg)
    width: '100%',
    height: 70,
    borderRadius: 35, // Pilule très arrondie
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
  },
  navItem: {
    padding: 10,
  },
  navMainAction: {
    top: -20, // Effet surélevé
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  navMainCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#FFF', // Bordure blanche pour séparer du fond noir
  },
});
