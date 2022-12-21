import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [loaderIsActive, setLoaderIsActive] = useState(false);
    const [themeDark, setThemeDark] = useState(false)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => {
            unsub();
        }
    }, [])

    return <AuthContext.Provider value={{currentUser, themeDark, setThemeDark, loaderIsActive, setLoaderIsActive}}>
        {children}
    </AuthContext.Provider>
}
