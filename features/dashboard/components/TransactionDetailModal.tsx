import { COLORS } from '@/features/dashboard/styles/dashboard.styles';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Transaction {
    id: string;
    destination: string;
    date: string;
    price: string;
    points?: string;
}

interface TransactionDetailModalProps {
    visible: boolean;
    transaction: Transaction | null;
    onClose: () => void;
}

export const TransactionDetailModal: React.FC<TransactionDetailModalProps> = ({ visible, transaction, onClose }) => {
    if (!transaction) return null;

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
                {/* This empty view allows clicking outside to close */}
                <View style={{ flex: 1 }} />
            </TouchableOpacity>

            <View style={styles.container}>
                {/* Header with drag indicator */}
                <View style={styles.dragIndicatorContainer}>
                    <View style={styles.dragIndicator} />
                </View>

                {/* Close Button (Optional, since we have drag indicator and overlay click) */}
                <View style={styles.header}>
                    <Text style={styles.title}>Détails</Text>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Ionicons name="close" size={24} color="#666" />
                    </TouchableOpacity>
                </View>

                {/* Content */}
                <View style={styles.content}>

                    {/* Main Info Block */}
                    <View style={styles.mainInfo}>
                        <View style={styles.iconContainer}>
                            <Ionicons name="person-circle" size={80} color={COLORS.primary} />
                        </View>
                        <Text style={styles.destination} numberOfLines={2}>
                            {transaction.destination}
                        </Text>
                        <Text style={styles.date}>{transaction.date}</Text>
                    </View>

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Stats/Details Grid */}
                    <View style={styles.detailsGrid}>
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Montant</Text>
                            <Text style={styles.value}>{transaction.price}</Text>
                        </View>

                        {transaction.points && (
                            <View style={styles.detailItem}>
                                <Text style={styles.label}>Points Earned</Text>
                                <Text style={[styles.value, { color: COLORS.primary }]}>
                                    {transaction.points}
                                </Text>
                            </View>
                        )}

                        {/* Example of other potentially useful info if available, or just keeping it clean as requested */}
                        <View style={styles.detailItem}>
                            <Text style={styles.label}>Statut</Text>
                            <View style={styles.statusBadge}>
                                <Text style={styles.statusText}>Complété</Text>
                            </View>
                        </View>
                    </View>

                    {/* Actions */}
                    <TouchableOpacity style={styles.actionButton} onPress={onClose}>
                        <Text style={styles.actionButtonText}>Fermer</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    container: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingBottom: 40,
        minHeight: 400,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    dragIndicatorContainer: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    dragIndicator: {
        width: 40,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 25,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1A1A1A',
    },
    closeButton: {
        padding: 5,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
    },
    content: {
        paddingHorizontal: 25,
        alignItems: 'center',
    },
    mainInfo: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    iconContainer: {
        marginBottom: 15,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    destination: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1A1A1A',
        textAlign: 'center',
        marginBottom: 8,
    },
    date: {
        fontSize: 14,
        color: '#888',
        fontWeight: '500',
    },
    divider: {
        width: '100%',
        height: 1,
        backgroundColor: '#f0f0f0',
        marginVertical: 20,
    },
    detailsGrid: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around', // Distribute evenly
        marginBottom: 30,
    },
    detailItem: {
        alignItems: 'center',
    },
    label: {
        fontSize: 12,
        color: '#999',
        marginBottom: 5,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    statusBadge: {
        backgroundColor: '#E8F5E9',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        color: '#2E7D32',
        fontWeight: '600',
        fontSize: 13,
    },
    actionButton: {
        width: '100%',
        backgroundColor: COLORS.primary,
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    actionButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
