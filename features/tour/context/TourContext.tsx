import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react';

// Define the shape of the Context
interface TourStats {
    deliveries: number;
    amount: number;
    qty: number;
    startTime: Date | null;
    duration: string;
}

interface TourContextType {
    isTourActive: boolean;
    showDeliveryForm: boolean;
    showSummary: boolean;
    stats: TourStats;
    startTour: () => void;
    openDeliveryForm: () => void;
    closeDeliveryForm: () => void;
    handleAddDelivery: (data: any) => void;
    requestEndTour: () => void;
    cancelEndTour: () => void;
    confirmEndTour: () => void;
}

const TourContext = createContext<TourContextType | undefined>(undefined);

export const TourProvider = ({ children }: { children: ReactNode }) => {
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

    const startTour = useCallback(() => {
        setIsTourActive(true);
        setStats({
            deliveries: 0,
            amount: 0,
            qty: 0,
            startTime: new Date(),
        });
    }, []);

    const openDeliveryForm = useCallback(() => {
        setShowDeliveryForm(true);
    }, []);

    const closeDeliveryForm = useCallback(() => {
        setShowDeliveryForm(false);
    }, []);

    const handleAddDelivery = useCallback((data: any) => {
        setStats(prev => ({
            ...prev,
            deliveries: prev.deliveries + 1,
            amount: prev.amount + (data.amount || 0),
            qty: prev.qty + (data.quantities.vitale + data.quantities.voltic + data.quantities.other),
        }));
        setShowDeliveryForm(false);
    }, []);

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
        // Note: In a real app we'd need a timer to update this every minute.
        // For now, it updates on render.
        const now = new Date();
        const diff = now.getTime() - stats.startTime.getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes < 10 ? '0' + minutes : minutes}`;
    };

    const value = {
        isTourActive,
        showDeliveryForm,
        showSummary,
        stats: { ...stats, duration: getDuration() },
        startTour,
        openDeliveryForm,
        closeDeliveryForm,
        handleAddDelivery,
        requestEndTour,
        cancelEndTour,
        confirmEndTour,
    };

    return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
};

export const useTourContext = () => {
    const context = useContext(TourContext);
    if (!context) {
        throw new Error('useTourContext must be used within a TourProvider');
    }
    return context;
};
