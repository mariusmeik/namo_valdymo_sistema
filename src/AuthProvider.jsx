import React, { createContext, useContext, useEffect, useState } from 'react';
import useAPI from './useAPI';

const AuthContex = createContext(null);

export function useAuth() {
    return useContext(AuthContex);
}

export function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <AuthContex.Provider value={auth}>{children}</AuthContex.Provider>;
}
// -------------------------------------------------------------------------------------------------------------

// Manages all authentication logic and return authentication props
export const useProvideAuth = () => {
    const setLocalStorage = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
    };
    const removeLocalStorage = () => {
        localStorage.removeItem('user');
    };
    const getLocalStorage = () =>
        JSON.parse(localStorage.getItem('user'));

    const fetch = useAPI();

    const [user, setUser] = useState(undefined);
    const [headerFlag, setHeaderFlag] = useState(getLocalStorage);

    useEffect(() => {
        const isSessionAuthenticated = getLocalStorage();
        if (isSessionAuthenticated) setAuth();

        return removeAuth;
    }, []);

    const setAuth = (user) => {
        setHeaderFlag(true);

        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            const storageUser = JSON.parse(localStorage.getItem('user'));
            setLocalStorage(storageUser);
            setUser(storageUser);
        }
    }

    const setHeader = () => {
        setHeaderFlag(true)
    }

    const removeAuth = () => {
        setHeaderFlag(false);
        setUser(null);
    };

    const signIn = (userName, password) =>
        new Promise((resolve) => {
            fetch({
                requestType: 'post',
                requestURL: '/Account/login',
                requestBody: { userName, password }
            }).then((user) => {
                setAuth(user);
                resolve(true);
            })
        });
    const register = (name, lastName, phoneNumber, password, isApproved, flatId, role) =>
        new Promise(() => {
            fetch({
                requestType: 'post',
                requestURL: `/Flats/${flatId}/People`,
                requestBody: {name, lastName, phoneNumber, password, isApproved, flatId, role }
            }).then(() => {
                signIn(name, password)
            })
        });

    const signOut = () =>
        new Promise((resolve, reject) => {
            if (!headerFlag || user === null) reject(new Error('You already signed out'));

            removeLocalStorage();
            removeAuth();
            resolve("Sign out is successful'");
        });

    return {
        signIn,
        signOut,
        register,
        setHeader,
        removeAuth,
        headerFlag,
        user
    };
};