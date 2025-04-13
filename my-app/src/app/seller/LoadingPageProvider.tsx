'use client';
import { createContext, useState } from "react";


interface LoadingPageContextType {
    IsPageLoading: boolean;
    setIsPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PageLoadingContext = createContext<LoadingPageContextType | undefined>(undefined);

export const LoadingPageProvider = ({ children }: { children: React.ReactNode }) => {
    const [IsPageLoading, setIsPageLoading] = useState(false);
    return (
        <PageLoadingContext.Provider value={{IsPageLoading, setIsPageLoading}}>
            {children}
        </PageLoadingContext.Provider>
    );
};