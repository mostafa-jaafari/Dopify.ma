'use client';
import { createContext, useState } from "react";


interface SidebarContextType {
    IsOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const StateContext = createContext<SidebarContextType | undefined>(undefined);
export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [IsOpen, setIsOpen] = useState<boolean>(false);
    return (
        <StateContext.Provider value={{IsOpen, setIsOpen}}>
            {children}
        </StateContext.Provider>
    );
};