import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { COLORS, dashboardStyles as styles } from '@/features/dashboard/styles/dashboard.styles';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const { isTourActive, toggleTour } = useDashboard();

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

        {/* --- DASHBOARD QUICK STATS --- */}
        <View style={styles.dashboardCard}>
          <View style={styles.statsGrid}>

            {/* 1. Montant */}
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <MaterialCommunityIcons name="cash-multiple" size={25} color="#FFF" />
              </View>
              <Text style={[styles.statValue, !isTourActive && styles.statValueInactive]}>
                {isTourActive ? '36 000' : '—'}
              </Text>
              <Text style={styles.statLabel}>Montant</Text>
            </View>

            {/* 2. Livraisons */}
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <MaterialCommunityIcons name="package-variant-closed" size={25} color="#FFF" />
              </View>
              <Text style={[styles.statValue, !isTourActive && styles.statValueInactive]}>
                {isTourActive ? '8' : '0'}
              </Text>
              <Text style={styles.statLabel}>Livraisons</Text>
            </View>

            {/* 3. Activité */}
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="time-outline" size={25} color="#FFF" />
              </View>
              <Text style={[styles.statValue, !isTourActive && styles.statValueInactive]}>
                {isTourActive ? '1h 15' : '—'}
              </Text>
              <Text style={styles.statLabel}>Activité</Text>
            </View>

            {/* 4. GPS */}
            <View style={styles.statItem}>
              <View style={[styles.statIconContainer, isTourActive && styles.statIconContainerActive]}>
                <MaterialCommunityIcons
                  name="crosshairs-gps"
                  size={25}
                  color={isTourActive ? '#FFF' : '#666'}
                />
              </View>
              <Text style={[styles.statValue, !isTourActive && styles.statValueInactive]}>
                {isTourActive ? 'Actif' : 'Inactif'}
              </Text>
              <Text style={styles.statLabel}>GPS</Text>
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
