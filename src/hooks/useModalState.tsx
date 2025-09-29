'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalStateContextType {
    isModalOpen: boolean;
    setModalOpen: (open: boolean) => void;
}

const ModalStateContext = createContext<ModalStateContextType | undefined>(undefined);

export function ModalStateProvider({ children }: { children: ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const setModalOpen = (open: boolean) => {
        setIsModalOpen(open);
    };

    return (
        <ModalStateContext.Provider value={{ isModalOpen, setModalOpen }}>
            {children}
        </ModalStateContext.Provider>
    );
}

export function useModalState() {
    const context = useContext(ModalStateContext);
    if (context === undefined) {
        throw new Error('useModalState must be used within a ModalStateProvider');
    }
    return context;
}