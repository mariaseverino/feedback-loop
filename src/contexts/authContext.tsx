import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import { redirect, useNavigate } from '@tanstack/react-router';

interface IUser {
    id: string | number;
    name: string;
    email: string;
    role: 'tenant' | 'admin' | 'member';
    organization: string;
}

export interface AuthContextProps {
    currentUser: IUser | null;
    setCurrentUser: (user: IUser | null) => void;
    isAuthenticated: boolean;
    saveAuthenticatedUser: (user: IUser) => void;
    logout: () => void;
}

function getAuthenticatedUser() {
    let currentUser = localStorage.getItem('tanstack.auth.user');
    if (currentUser) {
        return JSON.parse(currentUser) as IUser;
    }
    return null;
}

function setAuthenticatedUser(user: IUser | null) {
    if (user) {
        localStorage.setItem('tanstack.auth.user', JSON.stringify(user));
    } else {
        localStorage.removeItem('tanstack.auth.user');
    }
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<IUser | null>(() =>
        getAuthenticatedUser()
    );
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        () => !!getAuthenticatedUser()
    );

    const navigate = useNavigate();

    // useEffect(() => {
    //     const user = getAuthenticatedUser();
    //     console.log({ user: user });
    //     console.log({ IsAuthenticated: !!user });
    //     setIsAuthenticated(!!user);
    //     setCurrentUser(user);
    // }, []);

    function saveAuthenticatedUser(user: IUser) {
        console.log();
        setCurrentUser(user);
        setAuthenticatedUser(user);
        setIsAuthenticated(true);
    }

    function logout() {
        setCurrentUser(null);
        setAuthenticatedUser(null);
        setIsAuthenticated(false);
        // navigate({ to: '/login' });
    }

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                isAuthenticated,
                saveAuthenticatedUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
};
