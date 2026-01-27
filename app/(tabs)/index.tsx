import { HistoryItem, Transaction } from '@/features/dashboard/components/HistoryItem';
import { TransactionDetailModal } from '@/features/dashboard/components/TransactionDetailModal';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { COLORS, dashboardStyles as styles } from '@/features/dashboard/styles/dashboard.styles';
import { DeliveryForm } from '@/features/tour/components/DeliveryForm';
import { TourSummary } from '@/features/tour/components/TourSummary';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
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
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const RECENT_TRANSACTIONS: Transaction[] = [
    {
      id: '1',
      destination: "Ride to Fat Tony's Burger Legian",
      date: '22 Dec 2022, 1:34 PM',
      price: 'Rp103.000',
    },
    {
      id: '2',
      destination: 'Ride to 121',
      date: '30 Nov 2022, 1:27 AM',
      price: 'S$26.80',
    },
    {
      id: '3',
      destination: 'Ride to Saigon Centre - Nam Ky Khoi Nghia Gate',
      date: '2 Aug 2022, 9:39 AM',
      price: '59.000₫',
      points: '+3 points',
    }
  ];

  const handlePressItem = (item: Transaction) => {
    setSelectedTransaction(item);
    setShowDetailModal(true);
  };

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
            Dernières livraisons
          </Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/history')}>
            <Text style={styles.seeAllText}>Voir tout</Text>
          </TouchableOpacity>
        </View>

        {/* Liste items mockés */}
        {RECENT_TRANSACTIONS.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            onPress={handlePressItem}
          />
        ))}

      </ScrollView>

      {/* --- BOTTOM NAVIGATION (Transformed) --- */}
      <View style={styles.bottomNavWrapper}>
        <View style={styles.bottomNavContainer}>

          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color={COLORS.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/history')}>
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

          <TouchableOpacity style={styles.navItem} onPress={() => router.push('/(tabs)/statistics')}>
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

      <TransactionDetailModal
        visible={showDetailModal}
        transaction={selectedTransaction}
        onClose={() => setShowDetailModal(false)}
      />

    </SafeAreaView>
  );
}
