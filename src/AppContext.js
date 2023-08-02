import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [idPelanggan, setIdPelanggan] = useState(null);
    const [idLevel, setIdLevel] = useState(null);

    return (
        <AppContext.Provider
            value={{
                user,
                setUser,
                idPelanggan,
                setIdPelanggan,
                idLevel,
                setIdLevel,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};