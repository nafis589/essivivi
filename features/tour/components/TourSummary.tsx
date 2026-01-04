import { Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { tourSummaryStyles as styles } from '../styles/tourSummary.styles';

interface TourSummaryProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    stats: {
        deliveries: number;
        amount: number;
        duration: string;
        qty: number;
    };
}

export const TourSummary: React.FC<TourSummaryProps> = ({ visible, onCancel, onConfirm, stats }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="checkmark-done-circle" size={60} color={Palette.primary} />
                    </View>

                    <Text style={styles.title}>Fin de tournée ?</Text>
                    <Text style={styles.subtitle}>Voici le récapitulatif de votre session.</Text>

                    <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Livraisons</Text>
                            <Text style={styles.statValue}>{stats.deliveries}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Quantité</Text>
                            <Text style={styles.statValue}>{stats.qty}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Montant</Text>
                            <Text style={styles.statValue}>{stats.amount.toLocaleString()} F</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Durée</Text>
                            <Text style={styles.statValue}>{stats.duration}</Text>
                        </View>
                    </View>

                    <View style={styles.warningContainer}>
                        <Ionicons name="information-circle-outline" size={20} color="#666" />
                        <Text style={styles.warningText}>
                            Cette action clôturera la journée et synchronisera toutes les données.
                        </Text>
                    </View>

                    <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                        <Text style={styles.confirmButtonText}>Clôturer la journée</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                        <Text style={styles.cancelButtonText}>Continuer la tournée</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};
