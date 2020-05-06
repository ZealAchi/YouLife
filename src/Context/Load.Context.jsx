import React, { useContext, useState, createContext, useEffect } from "react";
import { useLoading } from "../Hooks/useLoading";
export const LoadingContext = createContext();

function LoadingContextProvider({ children }) {
    const {setState,state} = useLoading()
    const LoadingIconTrue = () =>  setState({ type: 'Icon',Loading:true })
    const LoadingScreenTrue = () =>  setState({ type: 'Screen',Loading:true })
    const LoadingFalse = () => setState({  Loading: false,type:null })
    return (
        <LoadingContext.Provider
            value={{
                ...state,
                LoadingIconTrue,
                LoadingScreenTrue,
                LoadingFalse
            }}
        >
            {children}
        </LoadingContext.Provider>
    );
}

export default LoadingContextProvider;