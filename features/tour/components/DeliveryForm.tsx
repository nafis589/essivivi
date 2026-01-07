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
import Svg, { Path } from 'react-native-svg';
import { MOCK_CLIENTS } from '../data/mockClients';
import { deliveryFormStyles as styles } from '../styles/deliveryForm.styles';

interface DeliveryFormProps {
    visible: boolean;
    onClose: () => void;

    onSubmit: (data: any) => void;
}

// GPS Simulation Helper
const simulateGps = () => {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve('5.3600, -4.0083'); // Example coordinates
        }, 2000);
    });
};

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

    // New Client Fields
    const [managerName, setManagerName] = useState('');
    const [address, setAddress] = useState('');
    const [gpsCoords, setGpsCoords] = useState<string | null>(null);
    const [isGpsLoading, setIsGpsLoading] = useState(false);

    // Focus State
    const [focusedField, setFocusedField] = useState<string | null>(null);

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
            setManagerName('');
            setAddress('');
            setGpsCoords(null);
            setIsGpsLoading(false);
        }
    }, [visible]);

    // Simulate GPS when entering 'Create Client' mode
    useEffect(() => {
        if (isCreatingClient) {
            setIsGpsLoading(true);
            setGpsCoords(null);
            simulateGps().then((coords) => {
                setGpsCoords(coords);
                setIsGpsLoading(false);
            });
        }
    }, [isCreatingClient]);

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
                // New Client Data if creating
                ...(isCreatingClient ? {
                    managerName,
                    address,
                    gpsForClient: gpsCoords
                } : {})
            };
            onSubmit(deliveryData);
        }, 1000);
    };

    const ProductRow = ({
        title,
        subtitle,
        price,
        quantity,
        onChange
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
                <View style={[styles.productImage, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Svg width={40} height={40} viewBox="0 0 2048 2048">
                        <Path fill="#000000" d="m1344 2l704 352v785l-128-64V497l-512 256v258l-128 64V753L768 497v227l-128-64V354L1344 2zm0 640l177-89l-463-265l-211 106l497 248zm315-157l182-91l-497-249l-149 75l464 265zm-507 654l-128 64v-1l-384 192v455l384-193v144l-448 224L0 1735v-676l576-288l576 288v80zm-640 710v-455l-384-192v454l384 193zm64-566l369-184l-369-185l-369 185l369 184zm576-1l448-224l448 224v527l-448 224l-448-224v-527zm384 576v-305l-256-128v305l256 128zm384-128v-305l-256 128v305l256 128zm-320-288l241-121l-241-120l-241 120l241 121z" />
                    </Svg>
                </View>

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
                                                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25 }}
                                                onPress={() => setIsCreatingClient(false)}
                                            >
                                                <Ionicons name="arrow-back" size={24} color="#333" />
                                                <Text style={{ marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#333' }}>Retour</Text>
                                            </TouchableOpacity>

                                            <Text style={styles.formTitle}>Nouveau Client</Text>
                                            <Text style={styles.formSubtitle}>Remplissez les informations ci-dessous</Text>

                                            {/* Nom du point de vente */}
                                            <View style={[
                                                styles.formInputContainer,
                                                focusedField === 'clientName' && styles.formInputContainerFocused
                                            ]}>
                                                <Ionicons name="storefront-outline" size={20} color="#666" style={styles.formInputIcon} />
                                                <TextInput
                                                    placeholder="Nom du point de vente"
                                                    placeholderTextColor="#AAA"
                                                    style={styles.formInputField}
                                                    value={clientName}
                                                    onChangeText={setClientName}
                                                    onFocus={() => setFocusedField('clientName')}
                                                // onBlur intentionally removed to prevent flickering
                                                />
                                            </View>

                                            {/* Nom du responsable */}
                                            <View style={[
                                                styles.formInputContainer,
                                                focusedField === 'managerName' && styles.formInputContainerFocused
                                            ]}>
                                                <Ionicons name="person-outline" size={20} color="#666" style={styles.formInputIcon} />
                                                <TextInput
                                                    placeholder="Nom du responsable"
                                                    placeholderTextColor="#AAA"
                                                    style={styles.formInputField}
                                                    value={managerName}
                                                    onChangeText={setManagerName}
                                                    onFocus={() => setFocusedField('managerName')}
                                                // onBlur intentionally removed
                                                />
                                            </View>

                                            {/* Numéro de téléphone */}
                                            <View style={[
                                                styles.formInputContainer,
                                                focusedField === 'clientPhone' && styles.formInputContainerFocused
                                            ]}>
                                                <Ionicons name="call-outline" size={20} color="#666" style={styles.formInputIcon} />
                                                <TextInput
                                                    placeholder="Numéro de téléphone"
                                                    placeholderTextColor="#AAA"
                                                    keyboardType="phone-pad"
                                                    style={styles.formInputField}
                                                    value={clientPhone}
                                                    onChangeText={setClientPhone}
                                                    onFocus={() => setFocusedField('clientPhone')}
                                                // onBlur intentionally removed
                                                />
                                            </View>

                                            {/* Adresse complète */}
                                            <View style={[
                                                styles.formInputContainer,
                                                focusedField === 'address' && styles.formInputContainerFocused
                                            ]}>
                                                <Ionicons name="location-outline" size={20} color="#666" style={styles.formInputIcon} />
                                                <TextInput
                                                    placeholder="Adresse complète"
                                                    placeholderTextColor="#AAA"
                                                    style={styles.formInputField}
                                                    value={address}
                                                    onChangeText={setAddress}
                                                    onFocus={() => setFocusedField('address')}
                                                // onBlur intentionally removed
                                                />
                                            </View>

                                            {/* Coordonnées GPS */}
                                            <View style={[styles.formInputContainer, { backgroundColor: '#E8F5E9' }]}>
                                                <Ionicons name="compass-outline" size={20} color="#2E7D32" style={styles.formInputIcon} />
                                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                                    {isGpsLoading ? (
                                                        <Text style={{ color: '#666', fontStyle: 'italic' }}>Acquisition GPS en cours...</Text>
                                                    ) : (
                                                        <Text style={{ color: '#2E7D32', fontWeight: '600' }}>
                                                            {gpsCoords || "Coordonnées non disponibles"}
                                                        </Text>
                                                    )}
                                                </View>
                                                {!isGpsLoading && gpsCoords && (
                                                    <Ionicons name="checkmark-circle" size={20} color="#2E7D32" />
                                                )}
                                            </View>

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
                                        />

                                        <ProductRow
                                            title="Voltic (Pack)"
                                            price="490 F"
                                            subtitle="500ml x 12"
                                            quantity={qtyVoltic}
                                            onChange={setQtyVoltic}
                                        />

                                        <ProductRow
                                            title="Autres Produits"
                                            price="-- F"
                                            subtitle="Divers"
                                            quantity={qtyOther}
                                            onChange={setQtyOther}
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
