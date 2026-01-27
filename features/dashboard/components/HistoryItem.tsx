
import { COLORS } from '@/features/dashboard/styles/dashboard.styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Reuse the Transaction interface (can be exported from a central place later)
export interface Transaction {
    id: string;
    destination: string;
    date: string;
    price: string;
    points?: string;
}

interface HistoryItemProps {
    item: Transaction;
    onPress: (item: Transaction) => void;
}

export const HistoryItem: React.FC<HistoryItemProps> = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.itemContainer}
            activeOpacity={0.7}
            onPress={() => onPress(item)}
        >
            <View style={styles.iconWrapper}>
                <Ionicons name="person-circle" size={50} color={COLORS.primary} />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.destinationText} numberOfLines={2}>
                    {item.destination}
                </Text>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{item.price}</Text>
                {item.points ? (
                    <Text style={styles.pointsText}>{item.points}</Text>
                ) : null}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: COLORS.background, // Ensure background matches
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
