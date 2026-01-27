import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { COLORS, dashboardStyles } from '@/features/dashboard/styles/dashboard.styles';
import { DeliveryForm } from '@/features/tour/components/DeliveryForm';
import { TourSummary } from '@/features/tour/components/TourSummary';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { ArrowUpRight, Download, Upload, Users, Wallet } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Types ---
type Period = 'Daily' | 'Weekly' | 'Monthly';

interface ChartData {
    label: string;
    value: number;
    active?: boolean;
}

interface StatData {
    totalBalance: string;
    withdrawal: string;
    deposit: string;
    chartData: ChartData[];
}

// --- Données Simulées (Mock Data) ---
const DATA: Record<Period, StatData> = {
    Daily: {
        totalBalance: "12,450 FCFA",
        withdrawal: "8,200",
        deposit: "4,250",
        chartData: [
            { label: '08h', value: 30 },
            { label: '10h', value: 45 },
            { label: '12h', value: 90, active: true },
            { label: '14h', value: 40 },
            { label: '16h', value: 65 },
            { label: '18h', value: 25 },
        ],
    },
    Weekly: {
        totalBalance: "67,545 FCFA",
        withdrawal: "60,500",
        deposit: "20,500",
        chartData: [
            { label: 'Lun', value: 40 },
            { label: 'Mar', value: 65 },
            { label: 'Mer', value: 35 },
            { label: 'Jeu', value: 95, active: true },
            { label: 'Ven', value: 55 },
            { label: 'Sam', value: 75 },
        ],
    },
    Monthly: {
        totalBalance: "145,200 FCFA",
        withdrawal: "90,000",
        deposit: "55,200",
        chartData: [
            { label: 'Jan', value: 45 },
            { label: 'Fév', value: 55 },
            { label: 'Mar', value: 85, active: true },
            { label: 'Avr', value: 60 },
            { label: 'Mai', value: 75 },
            { label: 'Juin', value: 50 },
        ],
    },
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function StatisticsScreen() {
    const router = useRouter();
    const [selectedPeriod, setSelectedPeriod] = useState<Period>('Weekly');
    const currentData = DATA[selectedPeriod];

    // Prepare data for Gifted Charts
    const barData = currentData.chartData.map(item => ({
        value: item.value,
        label: item.label,
        frontColor: item.active ? COLORS.primary : '#2C2E3A',
        topLabelComponent: () => (
            item.active ? <Text style={{ color: COLORS.primary, fontSize: 10, marginBottom: 4 }}>{item.value}</Text> : null
        )
    }));

    // Dashboard context for FAB and Modals
    const {
        isTourActive,
        startTour,
        openDeliveryForm,
        showDeliveryForm,
        closeDeliveryForm,
        handleAddDelivery,
        showSummary,
        cancelEndTour,
        confirmEndTour,
        stats
    } = useDashboard();

    return (
        <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
            <Stack.Screen options={{ headerShown: false }} />
            {/* Respect Global StatusBar Style */}
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Statistiques</Text>
                </View>

                {/* Tab Selector */}
                <View style={styles.tabContainer}>
                    {(['Daily', 'Weekly', 'Monthly'] as Period[]).map((tab) => {
                        const isActive = selectedPeriod === tab;
                        const label = tab === 'Daily' ? 'Jour' : tab === 'Weekly' ? 'Semaine' : 'Mois';
                        return (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setSelectedPeriod(tab)}
                                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                            >
                                <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
                                    {label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Main Card */}
                <View style={styles.mainCard}>
                    <View style={styles.balanceHeader}>
                        <View>
                            <Text style={styles.balanceLabel}>Total Revenus</Text>
                            <Text style={styles.balanceValue}>{currentData.totalBalance}</Text>
                        </View>
                        <View style={styles.iconCircle}>
                            <ArrowUpRight color={COLORS.primary} size={24} />
                        </View>
                    </View>

                    {/* Filtres visuels (D, W, M, Y) */}
                    <View style={styles.chartFilterContainer}>
                        {['J', 'S', 'M', 'A'].map((item) => (
                            <View
                                key={item}
                                style={[styles.filterBadge, item === 'S' && styles.filterBadgeActive]}
                            >
                                <Text style={[styles.filterText, item === 'S' && styles.filterTextActive]}>
                                    {item}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Gifted Bar Chart */}
                    <View style={styles.chartContainer}>
                        <BarChart
                            data={barData}
                            barWidth={22}
                            noOfSections={3}
                            barBorderTopLeftRadius={8}
                            barBorderTopRightRadius={8}
                            height={200}
                            width={SCREEN_WIDTH - 80} // Adjust based on padding
                            initialSpacing={10}
                            spacing={24}
                            yAxisThickness={0}
                            xAxisThickness={0}
                            xAxisLabelTextStyle={{ color: '#8B8C9E', fontSize: 11 }}
                            yAxisTextStyle={{ color: '#8B8C9E', fontSize: 11 }}
                            hideRules
                            maxValue={100}
                            isAnimated
                        />
                    </View>
                </View>

                {/* Bottom Grid (Updated to Delivery Context) */}
                <View style={styles.gridContainer}>
                    {/* Card 1: Livraisons (Withdrawal placeholder) */}
                    <View style={styles.gridCard}>
                        <View style={styles.cardIconWrapper}>
                            <Upload color={COLORS.textSec} size={24} />
                        </View>
                        <Text style={styles.cardLabel}>Livraisons</Text>
                        <Text style={styles.cardValue}>125</Text>
                    </View>

                    {/* Card 2: Retrait/Dépôt (Deposit placeholder) */}
                    <View style={styles.gridCard}>
                        <View style={styles.cardIconWrapper}>
                            <Download color={COLORS.textSec} size={24} />
                        </View>
                        <Text style={styles.cardLabel}>Dépôts</Text>
                        <Text style={styles.cardValue}>{currentData.deposit}</Text>
                    </View>

                    {/* Card 3: Active Users -> Clients */}
                    <View style={styles.gridCard}>
                        <View style={styles.cardIconWrapper}>
                            <Users color={COLORS.textSec} size={24} />
                        </View>
                        <Text style={styles.cardLabel}>Clients Actifs</Text>
                        <Text style={styles.cardValue}>48</Text>
                    </View>

                    {/* Card 4: Wallet -> Mode de paiement */}
                    <View style={styles.gridCard}>
                        <View style={styles.cardIconWrapper}>
                            <Wallet color={COLORS.textSec} size={24} />
                        </View>
                        <Text style={styles.cardLabel}>Modes Paiement</Text>
                        <Text style={styles.cardValue}>3 Types</Text>
                    </View>
                </View>

            </ScrollView>

            {/* --- BOTTOM NAVIGATION (Shared) --- */}
            <View style={dashboardStyles.bottomNavWrapper}>
                <View style={dashboardStyles.bottomNavContainer}>

                    <TouchableOpacity style={dashboardStyles.navItem} onPress={() => router.push('/')}>
                        <Ionicons name="home-outline" size={24} color="#666" />
                    </TouchableOpacity>

                    <TouchableOpacity style={dashboardStyles.navItem} onPress={() => router.push('/(tabs)/history')}>
                        <MaterialCommunityIcons name="history" size={24} color="#666" />
                    </TouchableOpacity>

                    {/* --- MAIN FAB --- */}
                    <TouchableOpacity
                        style={dashboardStyles.navMainAction}
                        onPress={isTourActive ? openDeliveryForm : startTour}
                        activeOpacity={0.9}
                    >
                        <View style={[
                            dashboardStyles.navMainCircle,
                            isTourActive && { backgroundColor: COLORS.primary }
                        ]}>
                            {isTourActive ? (
                                <Ionicons name="add" size={32} color="#FFF" />
                            ) : (
                                <FontAwesome5 name="play" size={22} color="#FFF" style={{ marginLeft: 4 }} />
                            )}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={dashboardStyles.navItem}>
                        {/* Active State for Stats */}
                        <Ionicons name="stats-chart" size={24} color={COLORS.primary} />
                    </TouchableOpacity>

                    <TouchableOpacity style={dashboardStyles.navItem} onPress={() => { }}>
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

// --- Styles Adaptés au Projet ---
// On utilise COLORS.background (Blanc) au lieu de #0F111A
// On utilise COLORS.dark (#1E1E1E) pour les cartes pour garder le look premium contrasté
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background, // Blanc
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 110, // Space for Bottom Nav
    },
    // Header
    header: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 0,
    },
    headerTitle: {
        color: COLORS.textMain, // Noir/Sombre
        fontSize: 20,
        fontWeight: '700',
    },
    // Tabs
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
        backgroundColor: '#F1F6F4', // Light Pill Container
        padding: 4,
        borderRadius: 30,
    },
    tabButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonActive: {
        backgroundColor: COLORS.primary, // Blue
    },
    tabText: {
        color: COLORS.textSec,
        fontWeight: '500',
        fontSize: 14,
    },
    tabTextActive: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    // Main Card
    mainCard: {
        backgroundColor: COLORS.dark, // #1E1E1E (Dark Theme Card)
        borderRadius: 24,
        padding: 20,
        marginBottom: 20,
        // Add shadow
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        overflow: 'hidden'
    },
    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    balanceLabel: {
        color: '#8B8C9E',
        fontSize: 14,
        marginBottom: 5,
    },
    balanceValue: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: 'bold',
    },
    iconCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#2A2B36',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Internal Filters
    chartFilterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 0,
    },
    filterBadge: {
        width: 60,
        height: 35,
        borderRadius: 18,
        backgroundColor: '#2A2B36',
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterBadgeActive: {
        backgroundColor: COLORS.primary,
    },
    filterText: {
        color: '#8B8C9E',
        fontSize: 12,
    },
    filterTextActive: {
        color: '#FFFFFF', // White text on Blue
        fontWeight: 'bold',
    },
    // Chart Area
    chartContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -10 // Adjust for axis padding if needed
    },
    // Bottom Grid
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridCard: {
        width: '48%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 16,
        marginBottom: 15,
        height: 120,
        justifyContent: 'space-between',
        // Shadow

        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    cardIconWrapper: {
        marginBottom: 10,
    },
    cardLabel: {
        color: COLORS.textSec,
        fontSize: 12,
        marginBottom: 4,
    },
    cardValue: {
        color: COLORS.textMain,
        fontSize: 18,
        fontWeight: 'bold',
    },
});
