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
            setQtyVitale(0);
            setQtyVoltic(0);
            setQtyOther(0);
            setAmount('');
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
            setStep(2);
        } else if (step === 2) {
            // Validate Qty (Optional)
            setStep(3);
            // Trigger GPS simulation on step 3
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

    const ProductRow = ({
        title,
        subtitle,
        price,
        quantity,
        onChange,
        imageSource
    }: any) => {

        // Gérer l'incrément
        const handleIncrement = () => onChange(quantity + 1);

        // Gérer le décrément (minimum 0)
        const handleDecrement = () => {
            if (quantity > 0) onChange(quantity - 1);
        };

        // Gérer la saisie manuelle (convertir texte en nombre)
        const handleManualChange = (text: string) => {
            // On ne garde que les chiffres
            const numericValue = text.replace(/[^0-9]/g, '');
            onChange(numericValue === '' ? 0 : parseInt(numericValue, 10));
        };

        return (
            <View style={styles.productRowContainer}>
                {/* 1. Image du produit */}
                <Image
                    source={imageSource}
                    style={styles.productImage}
                    resizeMode="cover"
                />

                {/* 2. Infos Texte (Titre + Prix/Poids) */}
                <View style={styles.productInfoContainer}>
                    <Text style={styles.productTitle} numberOfLines={2}>
                        {title}
                    </Text>
                    <Text style={styles.productSubtitle}>
                        {price} • {subtitle}
                    </Text>
                </View>

                {/* 3. Contrôleur de quantité (+ Input Manuel) */}
                <View style={styles.counterContainer}>
                    {/* Bouton Moins */}
                    <TouchableOpacity
                        style={styles.counterBtn}
                        onPress={handleDecrement}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="remove" size={18} color="#333" />
                    </TouchableOpacity>

                    {/* Input Manuel */}
                    <TextInput
                        style={styles.counterInput}
                        value={quantity.toString()}
                        onChangeText={handleManualChange}
                        keyboardType="number-pad"
                        selectTextOnFocus={true} // Sélectionne tout le texte au clic
                        maxLength={3}
                    />

                    {/* Bouton Plus */}
                    <TouchableOpacity
                        style={styles.counterBtn}
                        onPress={handleIncrement}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="add" size={18} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

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
                            {step === 1 ? 'Client' : step === 2 ? 'Produits' : 'Paiement'}
                        </Text>
                        <Text style={styles.stepIndicator}>Étape {step}/3</Text>
                    </View>

                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

                            {/* STEP 1: CLIENT SELECTION */}
                            {step === 1 && (
                                <View>
                                    {!isCreatingClient ? (
                                        <View>
                                            <View style={styles.stepHeaderContainer}>
                                                <Text style={styles.stepTitle}>Qui livrez-vous ?</Text>
                                                <TouchableOpacity
                                                    style={styles.fabInline}
                                                    onPress={() => { setIsCreatingClient(true); setSelectedClientId(null); setClientName(''); }}
                                                >
                                                    <Ionicons name="add" size={24} color="#FFF" />
                                                </TouchableOpacity>
                                            </View>

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

                            {/* STEP 2: DETAILS (Products) */}
                            {step === 2 && (
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => setStep(1)} style={{ padding: 5 }}>
                                            <Ionicons name="arrow-back-circle" size={30} color="#333" />
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{clientName}</Text>
                                            <Text style={{ color: '#666', fontSize: 13 }}>{clientPhone || 'Client Existant'}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.sectionContainer}>
                                        <Text style={styles.sectionTitle}>Quantités Livrées</Text>

                                        <ProductRow
                                            title="Vitale (Pack)"
                                            price="290 F"
                                            subtitle="Pack de 6"
                                            quantity={qtyVitale}
                                            onChange={setQtyVitale}
                                            imageSource={{ uri: 'https://ui-avatars.com/api/?name=VI&background=0D8ABC&color=fff&size=128' }}
                                        />

                                        <ProductRow
                                            title="Voltic (Pack)"
                                            price="490 F"
                                            subtitle="500ml x 12"
                                            quantity={qtyVoltic}
                                            onChange={setQtyVoltic}
                                            imageSource={{ uri: 'https://ui-avatars.com/api/?name=VO&background=27AE60&color=fff&size=128' }}
                                        />

                                        <ProductRow
                                            title="Autres Produits"
                                            price="-- F"
                                            subtitle="Divers"
                                            quantity={qtyOther}
                                            onChange={setQtyOther}
                                            imageSource={{ uri: 'https://ui-avatars.com/api/?name=Au&background=95A5A6&color=fff&size=128' }}
                                        />
                                    </View>
                                </View>
                            )}

                            {/* STEP 3: PAYMENT & PROOF */}
                            {step === 3 && (
                                <View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                                        <TouchableOpacity onPress={() => setStep(2)} style={{ padding: 5 }}>
                                            <Ionicons name="arrow-back-circle" size={30} color="#333" />
                                        </TouchableOpacity>
                                        <View style={{ marginLeft: 10 }}>
                                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Récapitulatif</Text>
                                            <Text style={{ color: '#666', fontSize: 13 }}>Total Articles: {qtyVitale + qtyVoltic + qtyOther}</Text>
                                        </View>
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
                                    <View style={styles.sectionContainer}>
                                        <Text style={{ marginBottom: 10, fontWeight: 'bold', fontSize: 16 }}>Preuves de livraison</Text>
                                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: '#AAA', justifyContent: 'center', marginBottom: 10 }}>
                                            <Ionicons name="camera-outline" size={24} color="#666" />
                                            <Text style={{ marginLeft: 10, color: '#666' }}>Photo de preuve (Optionnel)</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 15, borderRadius: 10, borderWidth: 1, borderStyle: 'dashed', borderColor: '#AAA', justifyContent: 'center' }}>
                                            <Ionicons name="pencil-outline" size={24} color="#666" />
                                            <Text style={{ marginLeft: 10, color: '#666' }}>Signature Client</Text>
                                        </TouchableOpacity>
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
                                {step === 3 ? (isSubmitting ? 'Enregistrement...' : 'Valider la livraison') : 'Suivant'}
                            </Text>
                        </TouchableOpacity>
                    </View>



                </View>
            </View>
        </Modal>
    );
};
