
import { Palette } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const tourSummaryStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        backgroundColor: '#FFF',
        borderRadius: 25,
        padding: 25,
        width: '100%',
        alignItems: 'center',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },
    iconContainer: {
        marginBottom: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 25,
        textAlign: 'center',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        marginBottom: 25,
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        borderRadius: 15,
        padding: 15,
    },
    statItem: {
        width: '48%',
        marginBottom: 10,
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 12,
        color: '#888',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Palette.primary,
    },
    warningContainer: {
        flexDirection: 'row',
        backgroundColor: '#EEF0F2',
        padding: 12,
        borderRadius: 10,
        marginBottom: 25,
        alignItems: 'center',
    },
    warningText: {
        fontSize: 12,
        color: '#555',
        marginLeft: 8,
        flex: 1,
    },
    confirmButton: {
        backgroundColor: Palette.error, // Red for "Close Day"
        width: '100%',
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 10,
    },
    confirmButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        paddingVertical: 15,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
});
