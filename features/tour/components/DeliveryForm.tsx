import { Palette } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { MOCK_CLIENTS } from '../data/mockClients';
import { deliveryFormStyles as styles } from '../styles/deliveryForm.styles';

interface DeliveryFormProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
}

export const DeliveryForm: React.FC<DeliveryFormProps> = ({ visible, onClose, onSubmit }) => {
    // --- Wizard State ---
    const [step, setStep] = useState(1);

    // --- Data State ---
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');

    // New Client Mode
    const [isCreatingClient, setIsCreatingClient] = useState(false);

    // Delivery Details
    const [qtyVitale, setQtyVitale] = useState(0);
    const [qtyVoltic, setQtyVoltic] = useState(0);
    const [qtyOther, setQtyOther] = useState(0);
    const [amount, setAmount] = useState('');
    const [gpsLocked, setGpsLocked] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Effects ---
    useEffect(() => {
        if (visible) {
            // Reset Flow
            setStep(1);
            setSelectedClientId(null);
            setIsCreatingClient(false);
            setClientName('');
            setClientPhone('');
            setGpsLocked(false);
        }
    }, [visible]);

    // Handle Client Selection
    const handleSelectClient = (client: typeof MOCK_CLIENTS[0]) => {
        setSelectedClientId(client.id);
        setClientName(client.name);
        setClientPhone(client.phone);
    };

    const handleNextStep = () => {
        if (step === 1) {
            // Validate Client Step
            if (isCreatingClient) {
                if (!clientName) {
                    Alert.alert("Erreur", "Veuillez entrer le nom du client.");
                    return;
                }
            } else {
                if (!selectedClientId) {
                    Alert.alert("Erreur", "Veuillez sélectionner un client.");
                    return;
                }
            }
            // Move to Step 2
            setStep(2);
            // Trigger GPS simulation
            setTimeout(() => setGpsLocked(true), 1500);
        } else {
            // Submit
            handleSave();
        }
    };

    const handleSave = () => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            const deliveryData = {
                id: Math.random().toString(),
                clientName,
                clientPhone,
                quantities: { vitale: qtyVitale, voltic: qtyVoltic, other: qtyOther },
                amount: parseFloat(amount) || 0,
                timestamp: new Date().toISOString(),
                gps: gpsLocked ? '5.345, -3.987' : null,
            };
            onSubmit(deliveryData);
        }, 1000);
    };

    const QtyControl = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void }) => (
        <View style={styles.qtyRow}>
            <Text style={styles.qtyLabel}>{label}</Text>
            <View style={styles.qtyControl}>
                <TouchableOpacity style={styles.circleBtn} onPress={() => onChange(Math.max(0, value - 1))}>
                    <Ionicons name="remove" size={20} color="#333" />
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{value}</Text>
                <TouchableOpacity style={styles.circleBtn} onPress={() => onChange(value + 1)}>
                    <Ionicons name="add" size={20} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.overlay}>
                <View style={styles.container}>

                    {/* Header */}
                    <View style={styles.wizardHeader}>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={{ fontSize: 16, color: '#666' }}>Annuler</Text>
                        </TouchableOpacity>
                        <Text style={styles.wizardTitle}>
                            {step === 1 ? 'Sélection Client' : 'Détails Livraison'}
                        </Text>
                        <Text style={styles.stepIndicator}>Étape {step}/2</Text>
                    </View>

                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                            {/* STEP 1: CLIENT SELECTION */}
                            {step === 1 && (
                                <View>
                                    {!isCreatingClient ? (
                                        <View style={styles.clientGrid}>
                                            {MOCK_CLIENTS.map((client) => {
                                                const isSelected = selectedClientId === client.id;

                                                return (
                                                    <TouchableOpacity
                                                        key={client.id}
                                                        style={[
                                                            styles.clientCardModern,
                                                            isSelected ? styles.clientCardSelected : styles.clientCard
                                                        ]}
                                                        onPress={() => handleSelectClient(client)}
                                                        activeOpacity={0.9}
                                                    >
                                                        {/* Header: Avatar + Name */}
                                                        <View style={styles.cardHeader}>
                                                            <Image
                                                                source={{ uri: client.avatar }}
                                                                style={styles.avatar}
                                                            />
                                                            <View style={styles.headerTextContainer}>
                                                                <Text style={styles.clientName}>
                                                                    {client.name}
                                                                </Text>
                                                            </View>
                                                        </View>

                                                        {/* Body: Company */}
                                                        <Text style={styles.cardSubtitle} numberOfLines={2}>
                                                            {client.company}
                                                        </Text>

                                                        {/* Footer: Amount Pill + Arrow Button */}
                                                        <View style={styles.cardFooter}>
                                                            <View style={[
                                                                styles.amountPill,
                                                                isSelected ? styles.amountPillSelected : styles.amountPillUnselected
                                                            ]}>
                                                                <Text style={styles.amountText}>{client.amount}</Text>
                                                                <Text style={styles.pipelineText}>Total in Pipeline</Text>
                                                            </View>

                                                            <View style={[
                                                                styles.iconCircle,
                                                                isSelected ? styles.iconCircleSelected : styles.iconCircleUnselected
                                                            ]}>
                                                                <Ionicons
                                                                    name="arrow-up"
                                                                    size={18}
                                                                    color={isSelected ? '#FFF' : '#1A1A1A'}
                                                                    style={{ transform: [{ rotate: '45deg' }] }}
                                                                />
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                );
                                            })}
                                        </View>
                                    ) : (
                                        <View style={styles.sectionContainer}>
                                            <TouchableOpacity
                                                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}
                                                onPress={() => setIsCreatingClient(false)}
                                            >
                                                <Ionicons name="arrow-back" size={24} color={Palette.primary} />
                                                <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '600', color: Palette.primary }}>Retour</Text>
                                            </TouchableOpacity>

                                            <TextInput
                                                placeholder="Nom du Client"
                                                style={styles.textInput}
                                                value={clientName}
                                                onChangeText={setClientName}
                                            />
                                            <TextInput
                                                placeholder="Entreprise"
                                                style={styles.textInput}
                                            />
                                            <TextInput
                                                placeholder="Téléphone"
                                                keyboardType="phone-pad"
                                                style={styles.textInput}
                                                value={clientPhone}
                                                onChangeText={setClientPhone}
                                            />
                                        </View>
                                    )}
                                </View>
                            )}

                            {/* STEP 2: DETAILS */}
                            {step === 2 && (
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => setStep(1)} style={{ padding: 5 }}>
                                            <Ionicons name="arrow-back-circle" size={30} color="#333" />
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{clientName}</Text>
                                            <Text style={{ color: '#666', fontSize: 13 }}>{clientPhone}</Text>
                                        </View>
                                    </View>

                                    {/* GPS Section */}
                                    <View style={styles.gpsContainer}>
                                        {gpsLocked ? (
                                            <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
                                        ) : (
                                            <Ionicons name="sync" size={20} color="#666" />
                                        )}
                                        <Text style={[styles.gpsText, !gpsLocked && { color: '#666' }]}>
                                            {gpsLocked ? 'Position GPS Validée' : 'Acquisition GPS...'}
                                        </Text>
                                    </View>

                                    <View style={{ height: 20 }} />

                                    {/* Qty Section */}
                                    <View style={styles.sectionContainer}>
                                        <Text style={{ marginBottom: 15, fontWeight: 'bold', fontSize: 16 }}>Quantités Livrées</Text>
                                        <QtyControl label="Vitale (Pack)" value={qtyVitale} onChange={setQtyVitale} />
                                        <QtyControl label="Voltic (Pack)" value={qtyVoltic} onChange={setQtyVoltic} />
                                        <QtyControl label="Autres" value={qtyOther} onChange={setQtyOther} />
                                    </View>

                                    {/* Payment Section */}
                                    <View style={styles.sectionContainer}>
                                        <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Paiement</Text>
                                        <Text style={{ marginBottom: 5, color: '#666' }}>Montant Perçu (FCFA)</Text>
                                        <TextInput
                                            placeholder="0"
                                            keyboardType="numeric"
                                            style={[styles.textInput, { fontSize: 24, fontWeight: 'bold', color: Palette.primary, textAlign: 'center' }]}
                                            value={amount}
                                            onChangeText={setAmount}
                                        />
                                    </View>

                                    {/* Proof Section */}
                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: '#AAA', justifyContent: 'center', marginBottom: 20 }}>
                                        <Ionicons name="camera-outline" size={24} color="#666" />
                                        <Text style={{ marginLeft: 10, color: '#666' }}>Photo de preuve (Optionnel)</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                        </ScrollView>
                    </KeyboardAvoidingView>

                    {/* Footer Actions */}
                    <View style={styles.wizardFooter}>
                        <TouchableOpacity
                            style={[
                                styles.nextButton,
                                (step === 1 && !selectedClientId && !isCreatingClient) && styles.nextButtonDisabled
                            ]}
                            onPress={handleNextStep}
                            disabled={step === 1 && !selectedClientId && !isCreatingClient}
                        >
                            <Text style={styles.nextButtonText}>
                                {step === 1 ? 'Suivant' : (isSubmitting ? 'Enregistrement...' : 'Valider la livraison')}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* FAB Add Client (Only Step 1 & List Mode) */}
                    {step === 1 && !isCreatingClient && (
                        <View style={styles.fabContainer}>
                            <TouchableOpacity style={styles.fabAdd} onPress={() => { setIsCreatingClient(true); setSelectedClientId(null); setClientName(''); }}>
                                <Ionicons name="add" size={30} color="#FFF" />
                            </TouchableOpacity>
                        </View>
                    )}

                </View>
            </View>
        </Modal>
    );
};
