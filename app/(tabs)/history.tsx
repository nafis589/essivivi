import { TransactionDetailModal } from '@/features/dashboard/components/TransactionDetailModal';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { COLORS, dashboardStyles } from '@/features/dashboard/styles/dashboard.styles';
import { DeliveryForm } from '@/features/tour/components/DeliveryForm';
import { TourSummary } from '@/features/tour/components/TourSummary';
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Keyboard,
    ListRenderItem,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

// 1. Interface for Data (Unchanged)
interface Transaction {
    id: string;
    destination: string;
    date: string;
    price: string;
    points?: string;
}

// 2. Mock Data (Unchanged)
const DATA: Transaction[] = [
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
    },
    {
        id: '4',
        destination: 'Ride to Maison De Camille Boutique Hotel',
        date: '1 Aug 2022, 10:45 PM',
        price: '40.000₫',
        points: '+2 points',
    },
    {
        id: '5',
        destination: 'Ride to Quán Hoàng Ty 1',
        date: '1 Aug 2022, 7:20 PM',
        price: '59.000₫',
        points: '+3 points',
    },
    {
        id: '6',
        destination: 'Ride to Maison De Camille Boutique Hotel',
        date: '31 Jul 2022, 3:20 PM',
        price: '41.000₫',
        points: '+2 points',
    },
    {
        id: '7',
        destination: 'Ride to Maison De Camille Boutique Hotel',
        date: '31 Jul 2022, 2:10 PM',
        price: '125.000₫',
        points: '+6 points',
    },
];

type FilterType = 'Date' | 'Client' | 'Montant';

const HistoryScreen: React.FC = () => {
    // Shared State from Context
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

    const [activeFilter, setActiveFilter] = useState<FilterType>('Date');
    const [searchQuery, setSearchQuery] = useState('');
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    // DETAIL MODAL STATE
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    const filters: FilterType[] = ['Date', 'Client', 'Montant'];
    const router = useRouter();

    // Keyboard Listener
    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    // Handle Item Click
    const handlePressItem = (item: Transaction) => {
        setSelectedTransaction(item);
        setShowDetailModal(true);
    };

    const renderItem: ListRenderItem<Transaction> = ({ item }) => (
        <TouchableOpacity
            style={localStyles.itemContainer}
            activeOpacity={0.7}
            onPress={() => handlePressItem(item)}
        >
            <View style={localStyles.iconWrapper}>
                <Ionicons name="person-circle" size={50} color={COLORS.primary} />
            </View>
            <View style={localStyles.detailsContainer}>
                <Text style={localStyles.destinationText} numberOfLines={2}>
                    {item.destination}
                </Text>
                <Text style={localStyles.dateText}>{item.date}</Text>
            </View>
            <View style={localStyles.priceContainer}>
                <Text style={localStyles.priceText}>{item.price}</Text>
                {item.points ? (
                    <Text style={localStyles.pointsText}>{item.points}</Text>
                ) : null}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={localStyles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* --- HEADER WITH SEARCH BAR --- */}
            <View style={localStyles.headerContainer}>
                <View style={localStyles.searchBarContainer}>
                    <Ionicons name="search" size={20} color="#999" style={localStyles.searchIcon} />
                    <TextInput
                        style={localStyles.searchInput}
                        placeholder="Rechercher..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color="#999" style={localStyles.clearIcon} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* FILTERS */}
            <View style={localStyles.filterContainer}>
                {filters.map((filter) => (
                    <TouchableOpacity
                        key={filter}
                        style={[
                            localStyles.filterPill,
                            activeFilter === filter ? localStyles.activePill : localStyles.inactivePill,
                        ]}
                        onPress={() => setActiveFilter(filter)}
                        activeOpacity={0.7}
                    >
                        <Text
                            style={[
                                localStyles.filterText,
                                activeFilter === filter ? localStyles.activeText : localStyles.inactiveText,
                            ]}
                        >
                            {filter}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* LIST */}
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={[localStyles.listContent, { paddingBottom: 110 }]}
                showsVerticalScrollIndicator={false}
            />

            {/* --- BOTTOM NAVIGATION (Hidden when keyboard is active) --- */}
            {!isKeyboardVisible && (
                <View style={dashboardStyles.bottomNavWrapper}>
                    <View style={dashboardStyles.bottomNavContainer}>

                        <TouchableOpacity style={dashboardStyles.navItem} onPress={() => router.push('/')}>
                            <Ionicons name="home-outline" size={24} color="#666" />
                        </TouchableOpacity>

                        <TouchableOpacity style={dashboardStyles.navItem}>
                            {/* Active State for History */}
                            <MaterialCommunityIcons name="history" size={24} color={COLORS.primary} />
                        </TouchableOpacity>

                        {/* --- MAIN FAB (Shared Logic) --- */}
                        <TouchableOpacity
                            style={dashboardStyles.navMainAction}
                            onPress={isTourActive ? openDeliveryForm : startTour}
                            activeOpacity={0.9}
                        >
                            <View style={[
                                dashboardStyles.navMainCircle,
                                isTourActive && { backgroundColor: COLORS.primary } // Keep primary but maybe pulse
                            ]}>
                                {isTourActive ? (
                                    <Ionicons name="add" size={32} color="#FFF" />
                                ) : (
                                    <FontAwesome5 name="play" size={22} color="#FFF" style={{ marginLeft: 4 }} />
                                )}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={dashboardStyles.navItem} onPress={() => router.push('/(tabs)/statistics')}>
                            <Ionicons name="stats-chart" size={24} color="#666" />
                        </TouchableOpacity>

                        <TouchableOpacity style={dashboardStyles.navItem}>
                            <Ionicons name="settings-outline" size={24} color="#666" />
                        </TouchableOpacity>

                    </View>
                </View>
            )}

            {/* --- MODALS (Shared & Detail) --- */}
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
};

const localStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    // --- Header Search Bar ---
    headerContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: COLORS.background,
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F1F6F4', // Light gray background
        borderRadius: 25, // Fully rounded
        paddingHorizontal: 15,
        height: 44, // Standard touch height
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: COLORS.textMain,
        height: '100%',
        paddingVertical: 0,
    },
    clearIcon: {
        marginLeft: 10,
    },

    // --- Filters ---
    filterContainer: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop: 0,
    },
    filterPill: {
        paddingVertical: 8,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activePill: {
        backgroundColor: COLORS.primary,
    },
    inactivePill: {
        backgroundColor: COLORS.lightGray,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeText: {
        color: '#FFFFFF',
    },
    inactiveText: {
        color: COLORS.primary,
    },

    // --- List Items ---
    listContent: {
        paddingTop: 10,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Centered alignment
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    iconWrapper: {
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsContainer: {
        flex: 1,
        paddingRight: 12,
    },
    destinationText: {
        fontSize: 16,
        color: COLORS.textMain,
        fontWeight: '400',
        marginBottom: 6,
        lineHeight: 22,
    },
    dateText: {
        fontSize: 13,
        color: COLORS.textSec,
    },
    priceContainer: {
        alignItems: 'flex-end',
        minWidth: 70,
    },
    priceText: {
        fontSize: 16,
        color: COLORS.textMain,
        fontWeight: '500',
        marginBottom: 4,
    },
    pointsText: {
        fontSize: 12,
        color: COLORS.textSec,
    },
});

export default HistoryScreen;
