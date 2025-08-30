import { createContext, useContext, useState, type ReactNode } from 'react';

interface IUser {
    id: string | number;
    name: string;
    email: string;
    role: 'tenant' | 'admin' | 'member';
    organization: string;
}

interface AuthContextProps {
    currentUser: IUser | null;
    setCurrentUser: (user: IUser | null) => void;
}

const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
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
