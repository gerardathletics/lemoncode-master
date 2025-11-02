import React, { createContext, useContext, useState, ReactNode } from 'react';

interface OrganizationContextType {
    organization: string;
    setOrganization: (org: string) => void;
}

const OrganizationContext = createContext<OrganizationContextType>(undefined);

interface OrganizationProviderProps {
    children: ReactNode;
}

export const OrganizationProvider: React.FC<OrganizationProviderProps> = ({ children }) => {
    const [organization, setOrganization] = useState<string>('lemoncode');

    return <OrganizationContext.Provider value={{ organization, setOrganization }}>{children}</OrganizationContext.Provider>;
};

export const useOrganization = () => {
    const context = useContext(OrganizationContext);

    return context;
};
