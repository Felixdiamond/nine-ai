"use client";

import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

const ModelContext = createContext();

export default function ModelContextProvider ({ children }) {
    Cookies.set('model', 'Gemini Pro');
    let [model, setModel] = useState('Default (Gemini Pro)');
    return (
        <ModelContext.Provider value={{ model, setModel }}>
            {children}
        </ModelContext.Provider>
    )
}

export function useModelContext() {
    return useContext(ModelContext);
}