import { useState } from 'react';

export const useDashboard = () => {
    // Logic for tour status
    const [isTourActive, setIsTourActive] = useState(false);

    const toggleTour = () => {
        setIsTourActive(!isTourActive);
    };

    return {
        isTourActive,
        toggleTour,
    };
};
