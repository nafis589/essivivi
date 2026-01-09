import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { COLORS, dashboardStyles as styles } from '@/features/dashboard/styles/dashboard.styles';
import { DeliveryForm } from '@/features/tour/components/DeliveryForm';
import { TourSummary } from '@/features/tour/components/TourSummary';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  UIManager,
  View
} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function HomeScreen() {
  const {
    isTourActive,
    showDeliveryForm,
    showSummary,
    stats,
    startTour,
    openDeliveryForm,
    closeDeliveryForm,
    handleAddDelivery,
    requestEndTour,
    cancelEndTour,
    confirmEndTour
  } = useDashboard();
  const router = useRouter();

  // Trigger animation on state change
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }, [isTourActive]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileContainer} onPress={() => router.push('/profile' as any)}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
        </TouchableOpacity>

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

        {/* --- MAIN ACTION CARD --- */}
        <View style={styles.mainCard}>
          <View style={styles.bgPatternCircle} />

          <View style={styles.mainCardContent}>
            <View style={{ flex: 1 }}>
              <Text style={styles.mainCardTitle}>
                {isTourActive ? 'Tournée en cours' : 'Prêt à livrer ?'}
              </Text>
              <Text style={styles.mainCardSubtitle}>
                {isTourActive
                  ? 'Secteur: Centre-ville\nGPS Actif • Suivi en temps réel'
                  : 'Vous n\'avez pas encore démarré votre tournée.'}
              </Text>

              {/* Only show 'Stop' button here if tour is active. 
                  Start is handled by the bottom FAB. */}
              {isTourActive && (
                <TouchableOpacity
                  style={[styles.actionBtn, styles.actionBtnStop]}
                  onPress={requestEndTour}
                  activeOpacity={0.8}
                >
                  <Text style={styles.actionBtnText}>Terminer la tournée</Text>
                </TouchableOpacity>
              )}
              {!isTourActive && (
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                  <Ionicons name="arrow-down-circle-outline" size={20} color="#004D40" />
                  <Text style={{ marginLeft: 5, color: '#004D40', fontSize: 12 }}>
                    Appuyez sur le bouton Play en bas
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.illustrationContainer}>
              <Image
                source={require('@/assets/images/DESIGN.png')}
                style={styles.illustrationImage}
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
                {isTourActive ? stats.amount.toLocaleString() : '—'}
              </Text>
              <Text style={styles.statLabel}>FCFA</Text>
            </View>

            {/* 2. Livraisons */}
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <MaterialCommunityIcons name="package-variant-closed" size={25} color="#FFF" />
              </View>
              <Text style={[styles.statValue, !isTourActive && styles.statValueInactive]}>
                {isTourActive ? stats.deliveries : '0'}
              </Text>
              <Text style={styles.statLabel}>Livraisons</Text>
            </View>

            {/* 3. Activité (Durée) */}
            <View style={styles.statItem}>
              <View style={styles.statIconContainer}>
                <Ionicons name="time-outline" size={25} color="#FFF" />
              </View>
              <Text style={[styles.statValue, !isTourActive && styles.statValueInactive]}>
                {isTourActive ? stats.duration : '—'}
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
                {isTourActive ? 'ON' : 'OFF'}
              </Text>
              <Text style={styles.statLabel}>GPS</Text>
            </View>

          </View>
        </View>

        {/* --- LISTE RÉCENTE --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {isTourActive ? 'Dernières livraisons' : 'Plans de tournée'}
          </Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {/* Liste items mockés */}
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
              <Text style={styles.clientName}>Client Standard #{index + 1}</Text>
              <Text style={styles.listDate}>
                {isTourActive ? 'Livré à 10:30' : 'Prévu aujourd\'hui'}
              </Text>
            </View>

            <TouchableOpacity style={styles.listBtn}>
              <Text style={styles.listBtnText}>Détails</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>

      {/* --- BOTTOM NAVIGATION (Transformed) --- */}
      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNavContainer}>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <MaterialCommunityIcons name="history" size={24} color="#666" />
          </TouchableOpacity>

          {/* --- MAIN FAB --- */}
          {/* Action depends on isTourActive */}
          <TouchableOpacity
            style={styles.navMainAction}
            onPress={isTourActive ? openDeliveryForm : startTour}
            activeOpacity={0.9}
          >
            <View style={[
              styles.navMainCircle,
              isTourActive && { backgroundColor: COLORS.primary } // Keep primary but maybe pulse or change icon
            ]}>
              {/* Icon Transition */}
              {isTourActive ? (
                <Ionicons name="add" size={32} color="#FFF" />
              ) : (
                <FontAwesome5 name="play" size={22} color="#FFF" style={{ marginLeft: 4 }} />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="stats-chart" size={24} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="settings-outline" size={24} color="#666" />
          </TouchableOpacity>

        </View>
      </View>

      {/* --- MODALS --- */}
      <DeliveryForm
        visible={showDeliveryForm}
        onClose={closeDeliveryForm}
        onSubmit={handleAddDelivery}
      />

      <TourSummary
        visible={showSummary}
        onCancel={cancelEndTour}
        onConfirm={confirmEndTour}
        stats={stats}
      />

    </SafeAreaView>
  );
}
