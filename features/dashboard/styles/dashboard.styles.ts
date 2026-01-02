import { Palette } from '@/constants/theme';
import { Dimensions, Platform, StatusBar, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const COLORS = {
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

export const dashboardStyles = StyleSheet.create({
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
    },
    progressContainer: {
        width: 90,                // largeur fixe = layout stable
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },
    progressCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 3,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    driverName: {
        color: '#FFF',
        fontWeight: '600',
        fontSize: 14,
    },
    statsContainer: {
        flex: 1,                  // prend tout l’espace restant
        justifyContent: 'center',
    },
    // --- Dashboard Stats (New) ---
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statIconContainer: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    statIconContainerActive: {
        borderColor: COLORS.primary,
    },
    statValue: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
        marginBottom: 2,
        textAlign: 'center',
    },
    statLabel: {
        color: '#999999',
        fontSize: 11,
        textAlign: 'center',
        fontWeight: '500',
    },
    statValueInactive: {
        color: '#666', // Dimmed value
    },
    illustrationImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        // Placeholder background to make it visible until you insert your SVG/Image
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
    bottomStatsRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 10,
    },

    flexBadge: {
        flex: 1,
        backgroundColor: '#1E2D3B',
        justifyContent: 'center',
    }

});
