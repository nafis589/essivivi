
import { useCallback, useState } from 'react';

export const useDashboard = () => {
    // --- State ---
    const [isTourActive, setIsTourActive] = useState(false);
    const [showDeliveryForm, setShowDeliveryForm] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const [stats, setStats] = useState({
        deliveries: 0,
        amount: 0,
        qty: 0,
        startTime: null as Date | null,
    });

    // --- Actions ---

    // 1. Initial State -> Active
    const startTour = useCallback(() => {
        setIsTourActive(true);
        setStats({
            deliveries: 0,
            amount: 0,
            qty: 0,
            startTime: new Date(),
        });
    }, []);

    // 2. Add Delivery Flow
    const openDeliveryForm = useCallback(() => {
        setShowDeliveryForm(true);
    }, []);

    const closeDeliveryForm = useCallback(() => {
        setShowDeliveryForm(false);
    }, []);

    const handleAddDelivery = useCallback((data: any) => {
        // Update stats mock
        setStats(prev => ({
            ...prev,
            deliveries: prev.deliveries + 1,
            amount: prev.amount + (data.amount || 0),
            qty: prev.qty + (data.quantities.vitale + data.quantities.voltic + data.quantities.other),
        }));
        setShowDeliveryForm(false);
    }, []);

    // 3. End Tour Flow
    const requestEndTour = useCallback(() => {
        setShowSummary(true);
    }, []);

    const cancelEndTour = useCallback(() => {
        setShowSummary(false);
    }, []);

    const confirmEndTour = useCallback(() => {
        setIsTourActive(false);
        setShowSummary(false);
        setStats({
            deliveries: 0,
            amount: 0,
            qty: 0,
            startTime: null,
        });
    }, []);

    // Helper to get duration string
    const getDuration = () => {
        if (!stats.startTime) return '0h 00';
        const now = new Date();
        const diff = now.getTime() - stats.startTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes < 10 ? '0' + minutes : minutes}`;
    };

    return {
        // State
        isTourActive,
        showDeliveryForm,
        showSummary,
        stats: { ...stats, duration: getDuration() },

        // Actions
        startTour,
        openDeliveryForm,
        closeDeliveryForm,
        handleAddDelivery,
        requestEndTour,
        cancelEndTour,
        confirmEndTour,
    };
};
