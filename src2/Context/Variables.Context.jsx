import React, { useState, createContext } from "react";
export const VariablesContext = createContext();
const DataInit = {
    uri: 'http://45.236.130.116:92'
}

function VariablesContextProvider({children}) {
    const [state, setState] = useState(DataInit);
    return (
        <VariablesContext.Provider
            value={{ ...state, }}
        >
            {children}
        </VariablesContext.Provider>
    );
}

export default VariablesContextProvider;