import React, { createContext, useContext, useState } from "react";
type ContextType = {
    time: number;
    setTime: (t: number) => void;
};

const SettingsContext = createContext<ContextType | null>(null);

export const useSettingsContext = () =>
    useContext(SettingsContext) as ContextType;

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [time, setTime] = useState(300);
    return (
        <SettingsContext.Provider value={{ time, setTime }}>
            {children}
        </SettingsContext.Provider>
    )
}

